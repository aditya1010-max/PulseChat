import type { Message } from './message.types';
export interface SocketCallbacks {
    onConnect: () => void;
    onDisconnect: (reason?: string) => void;
    onReconnect: () => void;
    onError: (error: Error) => void;
    onMessage: (message: Message) => void;
    onMessageDelivered: (messageId: string) => void;
    onMessageRead: (messageId: string, userId: string) => void;
    onUserJoined: (user: string) => void;
    onUserLeft: (user: string) => void;
    onUserOnline: (user: string) => void;
    onUserOffline: (user: string) => void;
    onUserIsTyping: (user: string) => void;
    onUserStoppedTyping: (user: string) => void;
}
//# sourceMappingURL=socketCallbacks.d.ts.map