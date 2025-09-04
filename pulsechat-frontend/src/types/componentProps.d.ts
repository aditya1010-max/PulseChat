import type { Message } from './message.types';
export interface MessageInputProps {
    onSendMessage: (message: string) => void;
    onTypingStart?: () => void;
    onTypingStop?: () => void;
    disabled?: boolean;
}
export interface MessageListProps {
    messages: Message[];
    username: string;
    typingUsers?: string[];
}
export interface UserListProps {
    users: string[];
    currentUser?: string;
    typingUsers?: string[];
}
//# sourceMappingURL=componentProps.d.ts.map