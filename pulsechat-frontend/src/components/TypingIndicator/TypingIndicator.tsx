import React from 'react';
// You can create a simple CSS file for this component if you like
// import styles from './TypingIndicator.module.css'; 

interface TypingIndicatorProps {
  typingUsers: string[];
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ typingUsers }) => {
  if (typingUsers.length === 0) {
    return null; // Don't render anything if no one is typing
  }

  let text = '';
  if (typingUsers.length === 1) {
    text = `${typingUsers[0]} is typing...`;
  } else if (typingUsers.length === 2) {
    text = `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
  } else {
    text = 'Several people are typing...';
  }

  return <div /*className={styles.typingIndicator}*/>{text}</div>;
};