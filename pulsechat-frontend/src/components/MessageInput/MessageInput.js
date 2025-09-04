import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import { socketService } from '../../services/socketService';
export const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    // Use a ref to keep track of the typing timeout
    const typingTimeoutRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
            // Stop typing immediately when a message is sent
            socketService.sendStopTyping();
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    };
    const handleInputChange = (e) => {
        setMessage(e.target.value);
        // Announce that we've started typing
        socketService.sendStartTyping();
        // Clear the previous timeout if it exists
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        // Set a new timeout. If the user doesn't type for 2 seconds,
        // we'll announce that they've stopped typing.
        typingTimeoutRef.current = window.setTimeout(() => {
            socketService.sendStopTyping();
        }, 2000);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "text", value: message, onChange: handleInputChange, placeholder: "Type a message..." }), _jsx("button", { type: "submit", children: "Send" })] }));
};
//# sourceMappingURL=MessageInput.js.map