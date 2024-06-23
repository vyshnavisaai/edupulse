import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";
import { NameContext } from "./Router";

const TeacherClassDetailPage = () => {
  const [createdClasses, setCreatedClasses] = useState([]);
  const navigate = useNavigate();
  const { Email } = useParams();
  const [TeacherName, setTeacherName] = useContext(NameContext);
  console.log(TeacherName);
  useEffect(() => {
    const fetchCreatedClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4009/teacherClasses/${Email}`
        );
        setCreatedClasses(response.data.createdClasses);
      } catch (error) {
        console.error(
          "Error fetching created classes:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCreatedClasses();
  }, [Email]);
  

  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>
      <center>
        <h2 id="MainHeading2">Your Created Classes</h2>
        {createdClasses.length === 0 ? (
          <p className="subHead">No classes created yet.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {createdClasses.map((classroom, index) => (
              <div
                id="classrooms"
                onClick={() =>
                  navigate(
                    `/teacherclassroompage/${Email}/${classroom.uniqueLink}`
                  )
                }
                key={classroom.uniqueLink}
                className={`color-box-${index % 2}`}
              >
                <p>Subject : {classroom.subject}</p>
                <p>Unique Link: {classroom.uniqueLink}</p>
              </div>
            ))}
          </div>
        )}
        <Button
          id="functionButton2"
          onClick={() => navigate(`/addclass/${Email}`)}
        >
          Create Class
        </Button>
      </center>
    </div>
  );
};

export default TeacherClassDetailPage;
