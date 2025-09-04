import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const TypingIndicator = ({ typingUsers }) => {
    if (typingUsers.length === 0) {
        return null; // Don't render anything if no one is typing
    }
    let text = '';
    if (typingUsers.length === 1) {
        text = `${typingUsers[0]} is typing...`;
    }
    else if (typingUsers.length === 2) {
        text = `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
    }
    else {
        text = 'Several people are typing...';
    }
    return _jsx("div", { children: text });
};
//# sourceMappingURL=TypingIndicator.js.map