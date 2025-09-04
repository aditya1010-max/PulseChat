import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import styles from './MessageBubble.module.css';
/**
 * A helper function to format an ISO date string into a simple time string.
 * e.g., "2025-09-04T06:38:27.123Z" -> "12:08 PM"
 * @param isoString The ISO date string from the server.
 * @returns A formatted time string.
 */
const formatTime = (isoString) => {
    if (!isoString)
        return '';
    return new Date(isoString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};
export const MessageBubble = ({ message, isMyMessage }) => {
    const bubbleClass = isMyMessage
        ? `${styles.messageBubble} ${styles.myMessage}`
        : styles.messageBubble;
    return (_jsxs("div", { className: bubbleClass, children: [_jsx("div", { className: styles.sender, children: message.sender }), _jsx("p", { children: message.text }), _jsx("div", { className: styles.timestamp, children: formatTime(message.timestamp) })] }));
};
//# sourceMappingURL=MessageBubble.js.map