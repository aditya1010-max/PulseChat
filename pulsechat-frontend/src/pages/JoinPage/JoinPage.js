import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
export const JoinPage = ({ onJoin }) => {
    const [username, setUsername] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onJoin(username);
        }
    };
    return (_jsxs("div", { className: "join-page-container", children: [_jsx("h1", { children: "Welcome to PulseChat" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Enter your username", autoFocus: true }), _jsx("button", { type: "submit", children: "Join Chat" })] })] }));
};
//# sourceMappingURL=JoinPage.js.map