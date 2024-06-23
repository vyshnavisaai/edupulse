import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styling/Mainstyling.css";
import { IoArrowBackCircle } from "react-icons/io5";

function Signup() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [login, setlogin] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log(Name, Email, Password);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4009/signup", {
        Name,
        Email,
        Password,
      });
      console.log(response.data);

      if (Email && Password) {
        setlogin(true);
        navigate(`/home/${Email}`);
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
    <div id="body2">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>
      <br />
      <center>
        <div id="tablebg">
          <br />
          <center>
            <h3 id="MainHeading">Register Here..!</h3>

            <Table id="table">
              <tr>
                <td>Name :</td>
                <td>
                  <input
                    id="input"
                    type="text"
                    name="Name"
                    value={Name}
                    className="input"
                    autocomplete="off"
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
          </center>
          <Button id="functionButton" onClick={handleLogin}>
            Sign Up
          </Button>
          <p
            id="login"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </p>
          <br />
        </div>
      </center>
    </div>
  );
}

export default Signup;
