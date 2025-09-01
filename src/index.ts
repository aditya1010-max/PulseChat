// --- Imports for code that runs ---
import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createClient } from 'redis';

// --- Imports for TypeScript types only ---
import type { Application } from 'express';
import type { RawData } from 'ws';
import type { RedisClientType } from 'redis';

// We add properties to the WebSocket type to store user/room info
interface CustomWebSocket extends WebSocket {
    room?: string;
    username?: string;
}

const port: number = Number(process.env.PORT) || 3000;
const app: Application = express();
app.use(express.static('public'));

const server: http.Server = http.createServer(app);
const wss: WebSocketServer = new WebSocketServer({ server });

// const publisher: RedisClientType = createClient();
const publisher: RedisClientType = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
}); //changed above line to this to be pushed in production 
const subscriber: RedisClientType = publisher.duplicate();

// This runs when a new user connects
wss.on('connection', (ws: CustomWebSocket) => {
    console.log('Client connected');

    // This runs when the server receives a message from a specific user
// Find this block in your index.ts
    ws.on('message', async (message: RawData) => {
        const data = JSON.parse(message.toString());

        if (data.type === 'join') {
            ws.room = data.room;
            ws.username = data.username;
            console.log(`User '${ws.username}' joined room '${ws.room}'`);
        } 
        // This is the block to check
        else if (data.type === 'message') {
            if (ws.room && ws.username) {
                // ✅ CRITICAL: Make sure you are creating the full message object here
                const chatMessage = JSON.stringify({
                    type: 'message',
                    username: ws.username, // This line is essential
                    text: data.text
                });
                await publisher.publish(`chat:${ws.room}`, chatMessage);
            }
        }
    });

    ws.on('close', () => {
        console.log(`User '${ws.username}' disconnected`);
        // Here you could broadcast a "user left" message to the room
    });
});

// This main function connects to Redis and starts the server.
async function startServer() {
    try {
        await Promise.all([publisher.connect(), subscriber.connect()]);
        console.log('✅ Connected to Redis');

        // Use pSubscribe to listen to a PATTERN of channels (e.g., 'chat:*')
        await subscriber.pSubscribe('chat:*', (message: string, channel: string) => {
            // Get the room name from the channel (e.g., "chat:general" -> "general")
            const room = channel.split(':')[1];
            
            // Loop through all connected clients
            wss.clients.forEach((client: WebSocket) => {
                const customClient = client as CustomWebSocket;
                // Send the message ONLY to clients that are in the correct room
                if (customClient.readyState === WebSocket.OPEN && customClient.room === room) {
                    customClient.send(message);
                }
            });
        });

        // Start the server AFTER Redis is connected and subscribed
        server.listen(port, () => {
            console.log(`🚀 Server is ready and listening on port ${port}`);
        });

    } catch (err) {
        console.error("❌ Error starting server:", err);
        process.exit(1);
    }
}

// Call the function to start everything
startServer();