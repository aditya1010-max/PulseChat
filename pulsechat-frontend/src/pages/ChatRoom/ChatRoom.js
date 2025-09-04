import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import { MessageList } from '../../components/MessageList/MessageList';
import { UserList } from '../../components/UserList/UserList';
import { TypingIndicator } from '../../components/TypingIndicator/TypingIndicator';
import { socketService } from '../../services/socketService';
import styles from './ChatRoom.module.css';
export const ChatRoom = ({ username }) => {
    // State for storing the list of messages
    const [messages, setMessages] = useState([]);
    // State for storing the list of online users
    const [users, setUsers] = useState([]);
    // State for storing the list of users who are currently typing
    const [typingUsers, setTypingUsers] = useState([]);
    useEffect(() => {
        // Connect to the WebSocket server with all necessary callbacks
        socketService.connect(username, {
            onChatMessage: (newMessage) => {
                setMessages(prev => [...prev, newMessage]);
            },
            onUserList: (userList) => {
                setUsers(userList);
            },
            onUserJoined: (newUser) => {
                setUsers(prev => [...prev, newUser]);
            },
            onUserLeft: (leftUser) => {
                setUsers(prev => prev.filter(user => user !== leftUser));
            },
            onUserIsTyping: (typingUser) => {
                // Add the typing user to the list, preventing duplicates
                setTypingUsers(prev => [...new Set([...prev, typingUser])]);
            },
            onUserStoppedTyping: (stoppedUser) => {
                // Remove the user who stopped typing from the list
                setTypingUsers(prev => prev.filter(user => user !== stoppedUser));
            },
        });
        // Return a cleanup function to disconnect when the component unmounts
        return () => {
            socketService.disconnect();
        };
    }, [username]); // Dependency array ensures reconnection if the username changes
    /**
     * Handles sending a new message to the server.
     * @param messageText The text from the MessageInput component.
     */
    const handleSendMessage = (messageText) => {
        const newMessage = {
            text: messageText,
            sender: username,
        };
        socketService.sendMessage(newMessage);
    };
    return (_jsxs("div", { className: styles.chatRoomContainer, children: [_jsx("div", { className: styles.userListPanel, children: _jsx(UserList, { users: users }) }), _jsxs("div", { className: styles.chatPanel, children: [_jsx(MessageList, { messages: messages, username: username }), _jsx(TypingIndicator, { typingUsers: typingUsers.filter(u => u !== username) }), _jsx(MessageInput, { onSendMessage: handleSendMessage })] })] }));
};
//# sourceMappingURL=ChatRoom.js.map