import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import "./Styling/SubStyling.css";
import { Button } from "react-bootstrap";
import { IoArrowBackCircle } from "react-icons/io5";

const MaterialList = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [topic, setTopic] = useState("");

  const navigate = useNavigate();
  const { uniqueLink } = useParams();

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
        `http://localhost:4009/uploadMaterial/${uniqueLink}`,
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
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4009/teachermaterialGet/${uniqueLink}`
      );
      setMaterials(response.data.materials);
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
        <IoArrowBackCircle onClick={() => navigate(-1)} id="back" />
      </p>
      <br />
      <h2 id="MainHeading2">Materials</h2>
      {materials.length === 0 ? (
        <p id="subHead2">No materials available.</p>
      ) : (
        <div id="materials1">
          {materials.map((material) => (
            <div id="materials2" key={material.uniqueLink}>
              <p onClick={() => openMaterial(material)}>
                <FaBook id="materialIcon" />
              </p>
              <p>
                <span className="subHead">Topic : </span>
                <br />
                {material.topic}
              </p>
            </div>
          ))}
        </div>
      )}
      <div id="upload">
        <center>
          <h4 id="subHead2">Upload Material</h4>
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

export default MaterialList;
