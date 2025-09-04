import { useState } from 'react';
import { ChatRoom } from './pages/ChatRoom/ChatRoom';
import { JoinPage } from './pages/JoinPage/JoinPage';

function App() {
  // State to hold the current user's name. null means not logged in.
  const [username, setUsername] = useState<string | null>(null);

  // This function will be passed to the JoinPage
  const handleJoin = (name: string) => {
    setUsername(name);
  };

  return (
    <div className="App">
      {/* Conditionally render the page based on whether a username is set */}
      {!username ? (
        <JoinPage onJoin={handleJoin} />
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
}

export default App;