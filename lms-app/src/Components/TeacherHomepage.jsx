import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";
import { NameContext } from "./Router";

const TeacherHomepage = () => {
  const navigate = useNavigate();
  const { Email } = useParams();

  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>

      <center>
        <p id="landing1">
          Hey..👋
        </p>
        <p >
          <span id="landing3"> " Elevate Your Teaching Experience "</span> <br />{" "}
          <span id="Heading">eDuPulSe</span>
          <br />{" "}
          <span id="landing4">– Your Partner in Teaching Excellence –</span>
        </p>
        <br />
        <Button
          id="functionButton2"
          onClick={() => navigate(`/teacherclassroomDetails/${Email}`)}
        >
          Let's Get Started
        </Button>
      </center>
    </div>
  );
};

export default TeacherHomepage;
