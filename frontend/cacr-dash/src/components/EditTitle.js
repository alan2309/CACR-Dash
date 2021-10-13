import React, { useState, useEffect } from "react";
import "../CSS/Admin.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "animate.css";

const EditTitle = () => {
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [idVal, setIdVal] = useState(null);

  useEffect(() => {
    const getLabels = async () => {
      await axios
        .get(`http://localhost:5000/api/projects/${id}`)
        .then((res) => {
          setIdVal(res.data._id);
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch((err) => console.log(err));
    };
    getLabels();
  }, []);

  const updateProgram = async (pid) => {
    let item = {
      title: title,
      description: description,
      image: "/images/img1.jpeg",
    };
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
    await axios
      .put(`http://localhost:5000/api/projects/${pid}`, item,config)
      .then((res) => {
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="createProgram container">
      <form>
        <div className="animate__animated animate__zoomIn">
          <input
            type="text"
            className="form-control"
            placeholder="Enter program title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </div>
        <div className="animate__animated animate__zoomIn">
          <textarea
            className="form-control"
            placeholder="Enter program description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          ></textarea>
        </div>
        <div className="animate__animated animate__zoomIn">
          <input type="file" className="custom-file-input" id="customFile" />
        </div>
        <div className="animate__animated animate__pulse">
          <button
            className="w-100 btn btn-lg btn-danger"
            onClick={() => updateProgram(idVal)}
          >
            Update Program
          </button>
        </div>
      </form>
      <div className="animate__animated animate__pulse">
        <Link to={`/admin/programs/${id}/graphs`}>
          <button className="btn btn-lg btn-danger">Proceed</button>
        </Link>
      </div>
    </div>
  );
};

export default EditTitle;
