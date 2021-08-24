import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Admin.css";
import AdminProjects from "./AdminProjects";

function Admin() {
  const [program, setProgram] = useState({
    title: "",
    image: "",
    description: ""
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteHandler = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/projects/${id}`)
      .then((res) => {
        console.log(res);
        const projs = projects.filter((proj) => {
          return proj._id !== id;
        });
        setProjects(projs);
      })
      .catch((err) => console.log(err));
  };

  const fileUploadHandler = (e) => {
    setProgram({ ...program, image: e.target.files[0].name });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const programData = {
      title: program.title,
      image: program.image,
      description: program.description
    };
    await axios
      .post("http://localhost:5000/api/projects", programData)
      .then((res) => {
        console.log(res);
      });
    await axios
      .get("http://localhost:5000/api/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));

    setProgram({ title: "", image: "", description: "" });
  };
  return (
    <div className="createProgram container">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter program title"
          required
          onChange={(e) => setProgram({ ...program, title: e.target.value })}
          value={program.title}
        />
        <textarea
          className="form-control"
          placeholder="Enter program description"
          required
          onChange={(e) =>
            setProgram({ ...program, description: e.target.value })
          }
          value={program.description}
        ></textarea>
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          onChange={fileUploadHandler}
        />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Create Program
        </button>
      </form>
      <AdminProjects projects={projects} deleteHandler={deleteHandler} />
    </div>
  );
}

export default Admin;
