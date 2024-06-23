import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";

const ClassroomJoin = () => {
  const [uniqueLink, setUniqueLink] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [error, setError] = useState("");
  const { Email } = useParams();
  const navigate = useNavigate();

  const handleJoinClassroom = async () => {
    try {
      const response = await axios.post("http://localhost:4009/joinClassroom", {
        uniqueLink,
        studentEmail: Email,
      });

      console.log(response.data.message);

      navigate(`/studentclassroompage/${Email}/${uniqueLink}`);
    } catch (error) {
      console.error(
        "Error joining classroom:",
        error.response ? error.response.data : error.message
      );
      setError(
        "Error joining classroom. Please check your input and try again."
      );
    }
  };


  
  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>
      <br />
      <h2 id="MainHeading2">Join Classroom</h2>
      <br />
      <center>
        <label>
          <span id="subHead2">Unique Link:</span>
          <input
            id="input"
            type="text"
            value={uniqueLink}
            onChange={(e) => setUniqueLink(e.target.value)}
            autocomplete="off"
          />
        </label>
        <br />
        <br />
        <Button id="functionButton" onClick={handleJoinClassroom}>
          Join 
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </center>
    </div>
  );
};

export default ClassroomJoin;
