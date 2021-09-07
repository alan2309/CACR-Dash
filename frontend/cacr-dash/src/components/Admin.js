import React, { useState, useEffect, Redirect } from "react";
import axios from "axios";
import "../CSS/Admin.css";
import AdminProjects from "./AdminProjects";

function Admin() {
  const [program, setProgram] = useState({
    title: "",
    description: "",
    image: null,
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
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };
    const programData = {
      title: program.title,
      description: program.description,
      image: program.image,
    };
    await axios
      .post("http://localhost:5000/api/projects", programData, config)
      .then((res) => {
        console.log(res);
        setProjects([res.data, ...projects]);
      })
      .catch((err) => console.log(err));

    setProgram({ title: "", description: "", image: null });
  };
  return (
    <div className="createProgram container">
      <form onSubmit={submitHandler}>
        <div class="animate__animated animate__zoomIn">
          <input
            type="text"
            className="form-control"
            placeholder="Enter program title"
            required
            onChange={(e) => setProgram({ ...program, title: e.target.value })}
            value={program.title}
          />
        </div>
        <div class="animate__animated animate__zoomIn">
          <textarea
            className="form-control"
            placeholder="Enter program description"
            required
            onChange={(e) =>
              setProgram({ ...program, description: e.target.value })
            }
            value={program.description}
          ></textarea>
        </div>
        <div class="animate__animated animate__zoomIn">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={(e) =>
              setProgram({ ...program, image: e.target.files[0] })
            }
          />
        </div>
        <div class="animate__animated animate__pulse">
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Create Program
          </button>
        </div>
      </form>
      <div class="animate__animated animate__pulse">
        <h4>Existing Projects</h4>
      </div>
      <div class="animate__animated animate__zoomIn">
        <AdminProjects projects={projects} deleteHandler={deleteHandler} />
      </div>
    </div>
  );
}

export default Admin;
