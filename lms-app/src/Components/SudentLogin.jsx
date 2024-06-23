import React, { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { NameContext } from "./Router";

function StudentLogin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [login, setlogin] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    console.log(Email, Password);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4009/loginStudent", {
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
        <br />
        <br />
        <center>
          <div id="tablebg">
            <br />
            <h3 id="MainHeading"> Login Here..!</h3>

            <Table id="table">
              <tr>
                <td>Email :</td>
                <td>
                  <input
                    id="input"
                    type="text"
                    name="Email"
                    value={Email}
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                    autocomplete="off"
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
              Login
            </Button>
            <br />
            <br />
          </div>
        </center>
      </div>
    </div>
  );
}

export default StudentLogin;
