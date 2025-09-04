import React, { useRef, useEffect } from 'react'; // 1. Import useRef and useEffect
import { MessageBubble } from '../MessageBubble/MessageBubble';
import styles from './MessageList.module.css';
import type { MessageListProps } from '../../types/message.types';



export const MessageList: React.FC<MessageListProps> = ({ messages, username }) => {
  // 2. Create a ref. This will be an invisible element at the bottom of our list.
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

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

  return (
    <div className={styles.messageListContainer}>
      {messages.map((msg) => (
        <MessageBubble 
          key={msg.id} 
          message={msg} 
          isMyMessage={msg.sender === username}
        />
      ))}
      {/* 4. Attach the ref to this empty div at the end of the list */}
      <div ref={messagesEndRef} />
    </div>
  );
};