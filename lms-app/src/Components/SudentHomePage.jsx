import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";

const StudentHomepage = () => {
  const [joinedClasses, setJoinedClasses] = useState([]);
  const Navigate = useNavigate();
  const { Email } = useParams();
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
        <p id="landing1">
          Hey..👋
        </p>
        <p >
          <span id="landing3">" Elevate Your Education Experience "</span> <br />{" "}
          <span id="Heading">eDuPulSe</span>
          <br /> <span id="landing4">– Your Learning Companion –</span>
        </p>
        <br />
        <Button
          id="functionButton2"
          onClick={() => Navigate(`/studentclassroomDetails/${Email}`)}
        >
          Let's Get Started
        </Button>
      </center>
    </div>
  );
};

export default StudentHomepage;
