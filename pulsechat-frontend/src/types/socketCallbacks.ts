// src/types/socketCallbacks.ts
import type { Message } from './message.types';

// The shape of the callbacks object that the component will provide
export interface SocketCallbacks {
  // Connection lifecycle callbacks
  onConnect: () => void;
  onDisconnect: (reason?: string) => void;
  onReconnect: () => void;
  onError: (error: Error) => void;
  
  // Message callbacks
  onMessage: (message: Message) => void;
  onMessageDelivered: (messageId: string) => void;
  onMessageRead: (messageId: string, userId: string) => void;
  
  // User presence callbacks
  onUserJoined: (user: string) => void;
  onUserLeft: (user: string) => void;
  onUserOnline: (user: string) => void;
  onUserOffline: (user: string) => void;
  
  // Typing indicators
  onUserIsTyping: (user: string) => void;
  onUserStoppedTyping: (user: string) => void;
}