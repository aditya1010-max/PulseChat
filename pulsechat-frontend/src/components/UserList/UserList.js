import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const UserList = ({ users }) => {
    return (_jsxs("div", { className: "user-list", children: [_jsxs("h3", { children: ["Online (", users.length, ")"] }), _jsx("ul", { children: users.map(user => (_jsx("li", { children: user }, user))) })] }));
};
//# sourceMappingURL=UserList.js.map