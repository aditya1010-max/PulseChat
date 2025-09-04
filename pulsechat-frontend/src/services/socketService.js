// Replace this with your actual WebSocket server URL
const SOCKET_URL = 'ws://localhost:3000';
let socket;
export const socketService = {
    /**
     * Connects to the WebSocket server and sets up event listeners.
     * @param username The name of the user who is connecting.
     * @param callbacks An object of callback functions to handle different server events.
     */
    connect: (username, callbacks) => {
        socket = new WebSocket(SOCKET_URL);
        socket.onopen = () => {
            console.log('WebSocket connected');
            // Announce to the server that a new user has joined
            const joinMessage = {
                type: 'join',
                username: username,
            };
            socket.send(JSON.stringify(joinMessage));
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Route the message to the correct callback based on its type
            switch (data.type) {
                case 'chat_message':
                    callbacks.onChatMessage(data.message);
                    break;
                case 'user_list':
                    callbacks.onUserList(data.users);
                    break;
                case 'user_joined':
                    callbacks.onUserJoined(data.user);
                    break;
                case 'user_left':
                    callbacks.onUserLeft(data.user);
                    break;
                case 'user_is_typing':
                    callbacks.onUserIsTyping(data.user);
                    break;
                case 'user_stopped_typing':
                    callbacks.onUserStoppedTyping(data.user);
                    break;
                default:
                    console.warn('Received unknown message type:', data.type);
            }
        };
        socket.onclose = () => console.log('WebSocket disconnected');
        socket.onerror = (error) => console.error('WebSocket error:', error);
    },
    /**
     * Sends a chat message to the server.
     * @param message The message object to send.
     */
    sendMessage: (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const payload = {
                type: 'chat_message',
                message: message,
            };
            socket.send(JSON.stringify(payload));
        }
        else {
            console.error('WebSocket is not connected.');
        }
    },
    /**
     * Informs the server that the user has started typing.
     */
    sendStartTyping: () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'start_typing' }));
        }
    },
    /**
     * Informs the server that the user has stopped typing.
     */
    sendStopTyping: () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'stop_typing' }));
        }
    },
    /**
     * Closes the WebSocket connection.
     */
    disconnect: () => {
        if (socket) {
            socket.close();
        }
    },
};
//# sourceMappingURL=socketService.js.map