import React from 'react';
import styles from './MessageBubble.module.css';

// Make sure this interface matches the one in ChatRoom.tsx
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface MessageBubbleProps {
  message: Message;
  isMyMessage: boolean;
}

/**
 * A helper function to format an ISO date string into a simple time string.
 * e.g., "2025-09-04T06:38:27.123Z" -> "12:08 PM"
 * @param isoString The ISO date string from the server.
 * @returns A formatted time string.
 */
const formatTime = (isoString: string) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};


export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMyMessage }) => {
  const bubbleClass = isMyMessage 
    ? `${styles.messageBubble} ${styles.myMessage}` 
    : styles.messageBubble;

  return (
    <div className={bubbleClass}>
      <div className={styles.sender}>{message.sender}</div>
      <p>{message.text}</p>
      {/* Add the formatted timestamp below the message text */}
      <div className={styles.timestamp}>{formatTime(message.timestamp)}</div>
    </div>
  );
};