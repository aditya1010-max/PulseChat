import type { Message } from '../types/message.types';
interface ConnectionCallbacks {
    onChatMessage: (message: Message) => void;
    onUserList: (users: string[]) => void;
    onUserJoined: (user: string) => void;
    onUserLeft: (user: string) => void;
    onUserIsTyping: (user: string) => void;
    onUserStoppedTyping: (user: string) => void;
}
export declare const socketService: {
    /**
     * Connects to the WebSocket server and sets up event listeners.
     * @param username The name of the user who is connecting.
     * @param callbacks An object of callback functions to handle different server events.
     */
    connect: (username: string, callbacks: ConnectionCallbacks) => void;
    /**
     * Sends a chat message to the server.
     * @param message The message object to send.
     */
    sendMessage: (message: unknown) => void;
    /**
     * Informs the server that the user has started typing.
     */
    sendStartTyping: () => void;
    /**
     * Informs the server that the user has stopped typing.
     */
    sendStopTyping: () => void;
    /**
     * Closes the WebSocket connection.
     */
    disconnect: () => void;
};
export {};
//# sourceMappingURL=socketService.d.ts.map