// YourComponent.js
import React from 'react';
import ChatRoom from './ChatRoom';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';

const YourComponent = () => {
    const {Email,uniqueLink}=useParams()
    const Navigate=useNavigate()

    
  return (
    <div id='body'>
      <p>
        <IoArrowBackCircle onClick={() => Navigate(-1)} id="back" />
      </p>
      <center>
        <br />
      <h1 id='MainHeading2'>Chat Room</h1>
      <ChatRoom Email={Email} uniqueLink={uniqueLink} />
      </center>
    </div>
  );
};

export default YourComponent;
