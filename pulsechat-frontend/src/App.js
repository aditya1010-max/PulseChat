import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { ChatRoom } from './pages/ChatRoom/ChatRoom';
import { JoinPage } from './pages/JoinPage/JoinPage';
function App() {
    // State to hold the current user's name. null means not logged in.
    const [username, setUsername] = useState(null);
    // This function will be passed to the JoinPage
    const handleJoin = (name) => {
        setUsername(name);
    };
    return (_jsx("div", { className: "App", children: !username ? (_jsx(JoinPage, { onJoin: handleJoin })) : (_jsx(ChatRoom, { username: username })) }));
}
export default App;
//# sourceMappingURL=App.js.map