import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

const StudentList = () => {
  const { uniqueLink } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4009/studentslist/${uniqueLink}`
        );
        setStudents(response.data.students);
      } catch (error) {
        console.error(
          "Error fetching students:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchStudents();
  }, [uniqueLink]);

  
  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>
      <h2 id="MainHeading2">Students in the Class</h2>
      {students.length === 0 ? (
        <p id="subHead2">No students in the class.</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li style={{ color: "#0e3746" }} key={index}>
              <p>
                <span id="subHead2">Email:</span> {student.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
