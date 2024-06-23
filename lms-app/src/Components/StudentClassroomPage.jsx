// ClassroomComponent.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";

const ClassroomComponent = () => {
  const { Email, uniqueLink } = useParams();
  const [classroom, setClassroom] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchClassroomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4009/getClassroom/${uniqueLink}`
        );
        setClassroom(response.data);
      } catch (error) {
        console.error(
          "Error fetching classroom details:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchClassroomDetails();
  }, [uniqueLink]);

  if (!classroom) {
    return <div>Loading...</div>;
  }
  

  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => Navigate(-1)} id="back" />
      </p>
      <div>
        <center>
          <h2 id="MainHeading2">Classroom Details</h2>

          <div>
            {classroom.map((classroom) => (
              <div id="classdetail">
                <br />
                <br />
                <p>
                  <span className="subHead">Subject:</span> {classroom.subject}
                </p>
                <p>
                  <span className="subHead">Teacher:</span> {classroom.teacher}
                </p>
                <p>
                  <span className="subHead">Class:</span> {classroom.classes}
                </p>
                <p>
                  <span className="subHead">Unique Link:</span>{" "}
                  {classroom.uniqueLink}
                </p>
                <br />
              </div>
            ))}
          </div>
          <Button
            id="functionButton"
            onClick={() => Navigate(`/studentmaterial/${uniqueLink}`)}
          >
            Materials
          </Button>
          <Button
            id="functionButton"
            onClick={() =>
              Navigate(`/studentassignmentlist/${Email}/${uniqueLink}`)
            }
          >
            Assignments
          </Button>
          <Button
            id="functionButton"
            onClick={() => Navigate(`/studentlist/${uniqueLink}`)}
          >
            Students
          </Button>
          <Button
            id="functionButton"
            onClick={() => Navigate(`/chatroom/${Email}/${uniqueLink}`)}
          >
            Chat
          </Button>
          
        </center>
      </div>
    </div>
  );
};

export default ClassroomComponent;
