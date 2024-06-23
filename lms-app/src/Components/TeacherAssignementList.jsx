import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosDocument } from "react-icons/io";
import { Button } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";

const AssignmentList = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [topic, setTopic] = useState("");
  const { uniqueLink } = useParams();

  const Navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please choose a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("topic", topic);

      const response = await axios.post(
        `http://localhost:4009/uploadAssignment/${uniqueLink}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus(response.data.message);
    } catch (error) {
      console.error(
        "Error uploading material:",
        error.response ? error.response.data : error.message
      );
      setUploadStatus("Error uploading material. Please try again.");
    }
  };
  const [assignment, setAssignment] = useState([]);

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
                    `/assignmentsubmittedstudents/${uniqueLink}/${material.topic}`
                  )
                }
              >
                Submission Details
              </Button>
            </div>
          ))}
        </div>
      )}
      <div id="upload">
        <center>
          <h4 id="subHead2">Upload Assignment</h4>
          <label id="subHead2">Topic :</label>
          <input
            id="input"
            type="text"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <br />
          <br />
          <input type="file" onChange={handleFileChange} />
          <br />
          <Button id="functionButton" onClick={handleUpload}>
            Upload
          </Button>
          <p>{uploadStatus}</p>
        </center>
      </div>
    </div>
  );
};

export default AssignmentList;
