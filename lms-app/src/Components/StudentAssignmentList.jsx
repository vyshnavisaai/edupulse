import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosDocument } from "react-icons/io";
import { Button } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";

const StudentAssignmentList = () => {
  const [assignment, setAssignment] = useState([]);
  const Navigate = useNavigate();
  const { Email, uniqueLink } = useParams();

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4009/teacherassignmentget/${uniqueLink}`
      );
      setAssignment(response.data.materials);
    } catch (error) {
      console.error(
        "Error fetching materials:",
        error.response ? error.response.data : error.message
      );
    }
  };

  fetchMaterials();

  const openMaterial = (material) => {
    window.open(`http://localhost:4009/${material.filePath}`, "_blank");
  };


  
  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => Navigate(-1)} id="back" />
      </p>
      <h2 id="MainHeading2">Assignments</h2>
      {assignment.length === 0 ? (
        <p id="subHead2">No assignments available.</p>
      ) : (
        <div id="materials1">
          {assignment.map((material) => (
            <div id="materials2" key={material.uniqueLink}>
              <p onClick={() => openMaterial(material)}>
                <IoIosDocument id="materialIcon" />
              </p>
              <p>
                <span>Topic :</span>
                {material.topic}
              </p>
              <Button
                id="submission"
                onClick={() =>
                  Navigate(
                    `/studentAssUpload/${Email}/${uniqueLink}/${material.topic}`
                  )
                }
              >
                Upload
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentAssignmentList;
