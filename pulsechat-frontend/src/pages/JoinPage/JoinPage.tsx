import React, { useState } from 'react';

// Define the component's props
interface JoinPageProps {
  onJoin: (username: string) => void;
}

export const JoinPage: React.FC<JoinPageProps> = ({ onJoin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username);
    }
  };

  return (
    <div className="join-page-container">
      <h1>Welcome to PulseChat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          autoFocus
        />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
};