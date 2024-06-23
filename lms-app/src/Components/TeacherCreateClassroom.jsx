import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import "./Styling/SubStyling.css";

const ClassroomCreation = () => {
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [students, setStudent] = useState("");
  const [assignment, setAssignment] = useState("");
  const [classes, setclasses] = useState("");
  const [submittedStudents, setSubmittedStudents] = useState("");
  const navigate = useNavigate();
  const { Email } = useParams();

  const handleCreateClassroom = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4009/createClassroom/${Email}`,
        {
          subject,
          teacher,
          students,
          assignment,
          submittedStudents,
          classes,
        }
      );

      const createdClassroom = response.data;
      console.log(createdClassroom);

      navigate(`/teacherclassroompage/${Email}/${createdClassroom.uniqueLink}`);
    } catch (error) {
      console.error("Error creating classroom:", error);
    }
  };

  
  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>
      <br />
      <h2 id="MainHeading2">Create a Classroom</h2>
      <br />
      <center>
        <label>
          <span id="subHead2">Subject:</span>
          <input
            id="input"
            type="text"
            value={subject}
            autocomplete="off"
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
            autocomplete="off"
            onChange={(e) => setclasses(e.target.value)}
          />
        </label>
        <br />
        <label>
          <span id="subHead2">Teacher :</span>
          {Email}
        </label>
        <br />
        <br />
        <Button id="functionButton2" onClick={handleCreateClassroom}>
          Create Classroom
        </Button>
      </center>
    </div>
  );
};

export default ClassroomCreation;
