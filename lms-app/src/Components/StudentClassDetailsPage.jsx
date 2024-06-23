import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";
import { NameContext } from "./Router";

const StudentClassDetailPage = () => {
  const [joinedClasses, setJoinedClasses] = useState([]);
  const Navigate = useNavigate();
  const { Email } = useParams();
  const [Name, setName] = useContext(NameContext);
  console.log(Name);
  useEffect(() => {
    const fetchJoinedClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4009/getClasses/${Email}`
        );
        setJoinedClasses(response.data.joinedClasses);
        console.log(joinedClasses);
      } catch (error) {
        console.error(
          "Error fetching joined classes:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchJoinedClasses();
  }, [Email]);

  
  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => Navigate(-1)} id="back" />
      </p>
      <center>
        <h2 id="MainHeading2">Your Joined Classes</h2>
        {joinedClasses.length === 0 ? (
          <p id="subHead2">No classes joined yet.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {joinedClasses.map((classroom, index) => (
              <div
                id="classrooms"
                onClick={() =>
                  Navigate(
                    `/studentclassroompage/${Email}/${classroom.uniqueLink}`
                  )
                }
                key={classroom.uniqueLink}
                className={`color-box-${index % 2}`}
              >
                <p>Subject: {classroom.subject}</p>
                <p>Teacher: {classroom.teacher}</p>
              </div>
            ))}
          </div>
        )}
        <Button
          id="functionButton"
          onClick={() => Navigate(`/joinclass/${Email}`)}
        >
          Join Class
        </Button>
      </center>
    </div>
  );
};

export default StudentClassDetailPage;
