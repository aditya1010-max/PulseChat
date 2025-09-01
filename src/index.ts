// --- Imports ---
import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createClient } from 'redis';

import type { Application } from 'express';
import type { RawData } from 'ws';
import type { RedisClientType } from 'redis';

// --- Custom WebSocket type ---
interface CustomWebSocket extends WebSocket {
    room?: string;
    username?: string;
}

// --- App & server setup ---
const port: number = Number(process.env.PORT) || 3000;
const app: Application = express();
app.use(express.static('public'));

const server: http.Server = http.createServer(app);

// --- WebSocket server ---
const wss: WebSocketServer = new WebSocketServer({ server });

// --- Redis setup ---
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error("REDIS_URL must be set");
}

const publisher: RedisClientType = createClient({ url: redisUrl });
const subscriber: RedisClientType = publisher.duplicate();

// --- Handle new client connections ---
wss.on('connection', (ws: CustomWebSocket) => {
    console.log('Client connected');

    ws.on('message', async (message: RawData) => {
        const data = JSON.parse(message.toString());

        if (data.type === 'join') {
            ws.room = data.room;
            ws.username = data.username;
            console.log(`User '${ws.username}' joined room '${ws.room}'`);
        } else if (data.type === 'message') {
            if (ws.room && ws.username) {
                const chatMessage = JSON.stringify({
                    type: 'message',
                    username: ws.username,
                    text: data.text
                });
                await publisher.publish(`chat:${ws.room}`, chatMessage);
            }
        }
    });

    ws.on('close', () => {
        console.log(`User '${ws.username}' disconnected`);
    });
});

// --- Start server and subscribe to Redis ---
async function startServer() {
    try {
        await Promise.all([publisher.connect(), subscriber.connect()]);
        console.log('✅ Connected to Redis');

        // Subscribe to all chat rooms
        await subscriber.pSubscribe('chat:*', (message: string, channel: string) => {
            const room = channel.split(':')[1];

            wss.clients.forEach((client: WebSocket) => {
                const customClient = client as CustomWebSocket;
                if (customClient.readyState === WebSocket.OPEN && customClient.room === room) {
                    customClient.send(message);
                }
            });
        });

        server.listen(port, () => {
            console.log(`🚀 Server is ready on port ${port}`);
        });
    } catch (err) {
        console.error("❌ Error starting server:", err);
        process.exit(1);
    }
}

startServer();
