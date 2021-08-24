import React, { useState, useEffect, Redirect } from "react";
import axios from "axios";
import "../CSS/Admin.css";
import AdminProjects from "./AdminProjects";

function Admin() {
  const [program, setProgram] = useState({
    title: "",
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

  const submitHandler = async (e) => {
    e.preventDefault();
    <Redirect to="/admin/programs/graphs" />;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const programData = {
      title: program.title,
      description: program.description,
      image: "/images/img1.jpeg"
    };
    await axios
      .post("http://localhost:5000/api/projects", programData, config)
      .then((res) => {
        console.log(res);
        setProjects([res.data, ...projects]);
      })
      .catch((err) => console.log(err));

    setProgram({ title: "", description: "" });
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
        <input type="file" className="custom-file-input" id="customFile" />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Create Program
        </button>
      </form>
      <h4>Existing Projects</h4>
      <AdminProjects projects={projects} deleteHandler={deleteHandler} />
    </div>
  );
}

export default Admin;
