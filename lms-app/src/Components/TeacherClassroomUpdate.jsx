import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";


const ClassroomUpdate = () => {
    const [subject, setSubject] = useState("");
    const [classes, setClasses] = useState("");
    const navigate = useNavigate();
    const { uniqueLink } = useParams();
  
    const handleEdit = async () => {
      try {
        await axios.put(`http://localhost:4009/updateClass/${uniqueLink}`, {
          subject,
          classes,
        });
        navigate(-1);
      } catch (error) {
        console.error(
          "Error updating class:",
          error.response ? error.response.data : error.message
        );
        alert("Error updating class. Please try again.");
      }
    };
  
    
    return (
      <div id="body">
        <br />
        <p>
          <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
        </p>
        <br />
        <h2 id="MainHeading2">Edit Here..!</h2>
        <br />
        <center>
          <label>
            <span id="subHead2">Subject:</span>
            <input
              id="input"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <br />
          <label>
            <span id="subHead2">Class:</span>
            <input
              id="input"
              type="text"
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
            />
          </label>
          <br />
          <br />
          <br />
          <Button id="functionButton2" onClick={handleEdit}>
            Done
          </Button>
        </center>
      </div>
    );
  };
  
  export default ClassroomUpdate;
  