import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');

  const { Email, uniqueLink } = useParams();
  const socket = io('http://localhost:4009'); // Adjust the URL accordingly

  useEffect(() => {
    const room = uniqueLink;
    setUsername(Email);

    socket.emit('joinRoom', { room, username: Email });

    fetch(`http://localhost:4009/get-messages/${uniqueLink}`)
      .then(response => response.json())
      .then(data => {
        setMessages(data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });

    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [Email, uniqueLink, socket]);

  
  const formatTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp);
    return dateObject.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const room = uniqueLink;
      const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
      const messageData = { room, username: Email, message: newMessage, timestamp };
  
      fetch(`http://localhost:4009/chatroom/add-message/${Email}/${uniqueLink}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      })
        .then(response => response.json())
        .then(data => console.log('Response from backend:', data))
        .catch(error => console.error('Error in frontend fetch:', error));
  
      socket.emit('sendMessage', messageData);
      setMessages((prevMessages) => [...prevMessages, { username: Email, text: newMessage, timestamp }]);
      setNewMessage('');
    }
  };

  return (
    <div id='body'>
      {/* <div id='messagearea'>
        {messages.map((message, index) => (
          <div id='messagebox' key={index}>
            <p id='message2'>
              <span id='message1'>{message.username === Email ? 'You' : message.username}:</span><br /> {message.text}
              <p id='time'>{formatTimestamp(message.timestamp)}</p>
            </p>
          </div>
        ))}
      </div> */}
      <div id='messagearea'>
        {messages.map((message, index) => (
          <div
            key={index}
            id={message.username === Email ? "messagebox" : "messagebox2"}
          >
            <p id='message1'>
              {message.username === Email ? 'You' : message.username}:
              <br /><span id='message2'> {message.text}</span>
              <br />
              <span id='time'>{formatTimestamp(message.timestamp)}</span>
            </p>
          </div>
        ))}
      </div>
      <div>
        <input
          id='input2'
          type="text"
          value={newMessage}
          autocomplete="off"
          class="bordered-input"
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button id='functionButton' onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}

export default ChatRoom;
