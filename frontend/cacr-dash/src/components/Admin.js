import React, { useState, useEffect, Redirect } from "react";
import axios from "axios";
import "../CSS/Admin.css";
import AdminProjects from "./AdminProjects";

function Admin() {
  const [program, setProgram] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [projects, setProjects] = useState([]);
  const [popup, setPopup] = useState(false);
  const [projId, setProjId] = useState("");
  const [imagee, setImage] = useState();

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://localhost:5000/api/projects", config)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const popupYes = () => {
    setPopup(true);
  };
  const popupNo = () => {
    setPopup(false);
  };
  const deleteHandler = async (id) => {
    const token = localStorage.getItem("authToken");
    const config2 = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .delete(`http://localhost:5000/api/projects/${id}`, config2)
      .then((res) => {
        const projs = projects.filter((proj) => {
          return proj._id !== id;
        });
        setProjects(projs);
      })
      .catch((err) => console.log(err));
  };
  function uploadFileHandler(e){
    setImage(e.target.files[0])

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if(imagee === undefined) return;
    let form_data = new FormData();
    form_data.append('image', imagee, imagee.name);
    form_data.append('title', program.title);
    form_data.append('description', program.description);
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data'",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post("http://localhost:5000/api/projects", form_data, config)
      .then((res) => {
        setProjects([res.data, ...projects]);
      })
      .catch((err) => console.log(err));

    setProgram({ title: "", description: "" });
  };
  return (
    <div className="createProgram container">
      <form onSubmit={submitHandler}>
        <div className="animate__animated animate__zoomIn">
          <input
            type="text"
            className="form-control"
            placeholder="Enter program title"
            required
            onChange={(e) => setProgram({ ...program, title: e.target.value })}
            value={program.title}
          />
        </div>
        <div className="animate__animated animate__zoomIn">
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

        
                    <input type="file"
                   id="image"
                   accept="image/png, image/jpeg,image/jpg"  onChange={uploadFileHandler} required/>
        <div className="animate__animated animate__pulse">
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Create Program
          </button>
        </div>
      </form>
      <div className="animate__animated animate__pulse">
        <h4>Existing Projects</h4>
      </div>
      <div className="animate__animated animate__zoomIn">
        <AdminProjects
          projects={projects}
          popupYes={popupYes}
          setProjId={setProjId}
        />
      </div>
      {popup && (
        <div className="animate__animated animate__slideInDown alert alert-light" role="alert"
          style={{
            position: "absolute",
            top: "8%",
            left: "40%"
          }}
        >
          <p>Are you sure you want to delete entry?</p>
          <button className="btn-danger"
            onClick={() => {
              deleteHandler(projId);
              popupNo();
            }}
          >
            YES
          </button>
          <button className="btn-success"
          onClick={popupNo}>
            NO
          </button>
        </div>
      )}
    </div>
  );
}

export default Admin;
