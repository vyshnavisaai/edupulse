import React, { useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { IoMdHome, IoMdLogOut, IoMdPerson } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import "./Styling/SubStyling.css";
import { PiChalkboardTeacherFill, PiStudentFill } from "react-icons/pi";

function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    navigate("/login");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div>
      <Navbar expand="lg" id="nav">
        <Container>
          <Navbar.Brand href="#home">
            <GiBookshelf id="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="nav2" id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="Link" to={"/"}>
                <IoMdHome />
              </Link>
              <NavDropdown
                id="LOGIN"
                title={<IoMdPerson className="Link" />}
                className="custom-dropdown"
              >
                <NavDropdown.Item>
                  <Link className="Link2" to={"/login"}>
                    Teacher <PiChalkboardTeacherFill id="dropicon" />{" "}
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className="Link2" to={"/studentlogin"}>
                    Student <PiStudentFill id="dropicon" />
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Link className="Link" to={"/"}>
                <IoMdLogOut onClick={handleLogout} />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
