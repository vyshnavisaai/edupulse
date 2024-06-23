import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdDelete,MdModeEdit } from "react-icons/md";

const TeacherClassroom = () => {
  const { Email,uniqueLink } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const handleCopyLink = () => {
    if (classroom && classroom[0] && classroom[0].uniqueLink) {
      const linkToCopy = classroom[0].uniqueLink;
      navigator.clipboard
        .writeText(linkToCopy)
        .then(() => alert("Link copied to clipboard"))
        .catch((error) => console.error("Error copying link:", error));
    }
  };

  if (!classroom) {
    return <div>Loading...</div>;
  }

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteClass = async (uniqueLink) => {
    try {
      await axios.delete(`http://localhost:4009/deleteClass/${uniqueLink}`);
      navigate(-1);
    } catch (error) {
      console.error(
        "Error deleting class:",
        error.response ? error.response.data : error.message
      );
      alert("Error deleting class. Please try again.");
    }
  };

  
  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>
      <div>
        <center>
          <h2 id="MainHeading2">Classroom Details</h2>

          <div>
            {classroom.map((classroom) => (
              <div id="classdetail" key={classroom.uniqueLink}>
                <br />
                <br />
                <p>
                  <span className="subHead">Subject :</span> {classroom.subject}
                </p>
                <p>
                  <span className="subHead">Teacher :</span> {classroom.teacher}
                </p>
                <p>
                  <span className="subHead">Class :</span> {classroom.classes}
                </p>
                <p>
                  <span className="subHead">Class Link :</span>{" "}
                  {classroom.uniqueLink}
                  <FaCopy onClick={handleCopyLink} id="copylink" />
                </p>
                <MdDelete id="DeleteIcon" onClick={handleShowModal} />
                <MdModeEdit id="DeleteIcon" onClick={()=>navigate(`/UpdateClassroom/${uniqueLink}`)} />
                <br />
              </div>
            ))}
          </div>
          <Button
            id="functionButton"
            onClick={() => navigate(`/teachermaterialget/${uniqueLink}`)}
          >
            Materials
          </Button>
          <Button
            id="functionButton"
            onClick={() => navigate(`/assignmentlist/${uniqueLink}`)}
          >
            Assignments
          </Button>
          <Button
            id="functionButton"
            onClick={() => navigate(`/studentlist/${uniqueLink}`)}
          >
            Students
          </Button>
          <Button
            id="functionButton"
            onClick={() => navigate(`/chatroom/${Email}/${uniqueLink}`)}
          >
            Chat
          </Button>
        </center>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton />
        <Modal.Body style={{ fontSize: 17 }}>
          Are you sure you want to delete this class? 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDeleteClass(classroom.uniqueLink);
              handleCloseModal();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeacherClassroom;
