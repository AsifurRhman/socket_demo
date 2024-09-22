import { useState, useEffect } from 'react'
import './App.css'
import { io } from "socket.io-client";

const socket = io.connect('http://localhost:8000');

function App() {
  const [chat, setChat] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Listen for incoming chat messages
    socket.on('chat', (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    // Clean up the event listener
    return () => socket.off('chat');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Emit the chat message to the server
      console.log(socket.id, message)
      socket.emit('chat', { message, id: socket.id });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Socket Demo</h1>
      <div className="chat-container">
        {chat.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.id === socket.id ? 'self' : 'other'}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="chat"
          placeholder='Send text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App