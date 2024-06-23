import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Styling/Mainstyling.css";

import { PiStudentFill, PiChalkboardTeacherFill } from "react-icons/pi";
import { GiBookshelf } from "react-icons/gi";

function Main() {
  const Navigate = useNavigate();
  return (
    <div id="body">
      <center>
        <br />
        <br />
        <h2 id="Heading">
          {" "}
          eDuPulSe <GiBookshelf id="logo2" />
        </h2>
        <Button id="ProfileButton" onClick={() => Navigate("/signup")}>
          <PiChalkboardTeacherFill id="profileicon" />
        </Button>
        <Button id="ProfileButton" onClick={() => Navigate("/studentsignup")}>
          <PiStudentFill id="profileicon" />
        </Button>
      </center>
    </div>
  );
}

export default Main;
