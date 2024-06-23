import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

function SubmittedStudents() {
  const { topic, uniqueLink } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4009/submittedstudentslist/${uniqueLink}/${topic}`
        );
        setStudents(response.data.submittedStudents);
      } catch (error) {
        console.error(
          "Error fetching students:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchStudents();
  }, [topic, uniqueLink]);

  const openMaterial = (material) => {
    window.open(`http://localhost:4009/${material.filePath}`, "_blank");
  };

  
  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>
      <h2 id="MainHeading2">Submitted Students</h2>
      <ul>
        {students.map((submittedStudent) => (
          <li style={{ color: "#0e3746" }}>
            <p key={submittedStudent.email}>
              <span id="subHead2">Email : </span>
              {submittedStudent.email}
              <p id="open" onClick={() => openMaterial(submittedStudent)}>
                open
              </p>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubmittedStudents;
