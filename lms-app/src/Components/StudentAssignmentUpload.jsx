import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

function StudentAssignmentUpload() {
  const [file, setFile] = useState(null);
  const { Email, uniqueLink, topic } = useParams();

  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState("");
  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please choose a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `http://localhost:4009/studentuploadassignment/${Email}/${uniqueLink}/${topic}`,
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
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  
  return (
    <div id="body">
      <br />
      <p>
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>
      <br />
      <center>
        <h2 id="MainHeading2">Upload Assignment</h2>
        <br />
        <input type="file" onChange={handleFileChange} />
        <br />
        <br />
        <Button id="functionButton" onClick={handleUpload}>
          Upload
        </Button>
        <p>{uploadStatus}</p>
      </center>
    </div>
  );
}

export default StudentAssignmentUpload;
