import React from 'react';
interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: string;
}
interface MessageBubbleProps {
    message: Message;
    isMyMessage: boolean;
}
export declare const MessageBubble: React.FC<MessageBubbleProps>;
export {};
//# sourceMappingURL=MessageBubble.d.ts.map