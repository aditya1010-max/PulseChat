let ws; // We will define this when the user joins

// Get all the new elements from the HTML
const joinScreen = document.getElementById('join-screen');
const chatScreen = document.getElementById('chat-screen');
const joinForm = document.getElementById('join-form');
const chatForm = document.getElementById('chat-form');

const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const roomNameDisplay = document.getElementById('room-name');

// This code runs when the user submits the "Join" form
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const room = roomInput.value;

    if (username && room) {
        // Create the WebSocket connection now
        ws = new WebSocket(`ws://${window.location.host}`);

        // This runs once the connection is open
        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            // Send a special "join" message to the server
            ws.send(JSON.stringify({
                type: 'join',
                username: username,
                room: room
            }));

            // Switch the UI to the chat screen
            joinScreen.style.display = 'none';
            chatScreen.style.display = 'flex';
            roomNameDisplay.textContent = `Room: ${room}`;
        };

        // This runs when a message is received from the server
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            
            const item = document.createElement('li');
            item.textContent = `${message.username}: ${message.text}`;
            messages.appendChild(item);
            messages.scrollTop = messages.scrollHeight;
        };
    }
});

// This code runs when the user sends a chat message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        // Send a regular chat message
        ws.send(JSON.stringify({
            type: 'message',
            text: input.value
        }));
        input.value = ''; // Clear the input
    }
});