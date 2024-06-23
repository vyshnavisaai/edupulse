import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

const StudentMaterialList = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const navigate = useNavigate();
  const { uniqueLink } = useParams();

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
                <span id="subHead2">Topic : </span>
                <br />
                {material.topic}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMaterialList;
