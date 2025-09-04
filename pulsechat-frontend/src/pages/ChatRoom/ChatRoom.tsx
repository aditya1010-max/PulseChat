import React, { useState, useEffect } from 'react';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import { MessageList } from '../../components/MessageList/MessageList';
import { UserList } from '../../components/UserList/UserList';
import { TypingIndicator } from '../../components/TypingIndicator/TypingIndicator';
import { socketService } from '../../services/socketService';
import styles from './ChatRoom.module.css';

// Define the shape of a message object
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

// Define the props for the ChatRoom component
interface ChatRoomProps {
  username: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ username }) => {
  // State for storing the list of messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State for storing the list of online users
  const [users, setUsers] = useState<string[]>([]);
  // State for storing the list of users who are currently typing
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    // Connect to the WebSocket server with all necessary callbacks
    socketService.connect(username, {
      onChatMessage: (newMessage: Message) => {
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
  const handleSendMessage = (messageText: string) => {
    const newMessage = {
      text: messageText,
      sender: username,
    };
    socketService.sendMessage(newMessage);
  };

  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.userListPanel}>
        <UserList users={users} />
      </div>
      <div className={styles.chatPanel}>
        <MessageList messages={messages} username={username} />
        <TypingIndicator typingUsers={typingUsers.filter(u => u !== username)} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};