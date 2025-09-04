import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useEffect } from 'react'; // 1. Import useRef and useEffect
import { MessageBubble } from '../MessageBubble/MessageBubble';
import styles from './MessageList.module.css';
export const MessageList = ({ messages, username }) => {
    // 2. Create a ref. This will be an invisible element at the bottom of our list.
    const messagesEndRef = useRef(null);
    /**
     * A function to scroll the referenced element into view.
     */
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    // 3. Use an effect hook. This code will run every time the 'messages' array changes.
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    return (_jsxs("div", { className: styles.messageListContainer, children: [messages.map((msg) => (_jsx(MessageBubble, { message: msg, isMyMessage: msg.sender === username }, msg.id))), _jsx("div", { ref: messagesEndRef })] }));
};
//# sourceMappingURL=MessageList.js.map