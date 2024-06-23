import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

function StudentSignup() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [login, setlogin] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log(Name, Email, Password);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4009/signupStudent", {
        Name,
        Email,
        Password,
      });
      console.log(response.data);

      if (Email && Password) {
        setlogin(true);
        navigate(`/studenthomepage/${Email}`);
      } else {
        alert("error");
      }
    } catch (error) {
      console.error(
        "Signup Error",
        error.response ? error.response.data : error.message
      );
      alert("Signup failed. Please check your inputs and try again.");
    }
  };


  
  return (
    <div>
      <div id="body2">
        <br />
        <p>
          <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
        </p>
        <center>
          <br />
          <div id="tablebg">
            <br />
            <h3 id="MainHeading">Register Here..!</h3>

            <Table id="table">
              <tr>
                <td>Name :</td>
                <td>
                  <input
                    id="input"
                    type="text"
                    name="Name"
                    autocomplete="off"
                    value={Name}
                    className="input"
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Email :</td>
                <td>
                  <input
                    id="input"
                    type="text"
                    name="Email"
                    value={Email}
                    className="input"
                    autocomplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Password :</td>
                <td>
                  <input
                    id="input"
                    type="password"
                    name="Password"
                    value={Password}
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
            </Table>
            <Button id="functionButton" onClick={handleLogin}>
              Sign Up
            </Button>
            <p
              id="login"
              onClick={() => {
                navigate("/studentlogin");
              }}
            >
              Login
            </p>
            <br />
          </div>
        </center>
      </div>
    </div>
  );
}

export default StudentSignup;
