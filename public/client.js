const protocol = window.location.protocol === "https:" ? "wss" : "ws";
let ws; // declare once

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

joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const room = roomInput.value;

    if (username && room) {
        // create connection dynamically
        ws = new WebSocket(`${protocol}://${window.location.host}`);

        ws.onopen = () => {
            console.log('✅ Connected to WebSocket server');
            ws.send(JSON.stringify({
                type: 'join',
                username,
                room
            }));

            joinScreen.style.display = 'none';
            chatScreen.style.display = 'flex';
            roomNameDisplay.textContent = `Room: ${room}`;
        };

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