import React, { useState, useEffect } from "react";
import "../CSS/GraphAdmin.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ProgressBarAdmin() {
  const id = useParams().id;
  const [data, setData] = useState({
    name: "",
    completed: null,
    target: null,
  });
  const [labels, setLabels] = useState([]);

  const [name, setName] = useState("");
  const [target, setTarget] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [idVal, setIdVal] = useState(null);

  useEffect(() => {
    const getLabels = async () => {
      await axios
        .get(`http://localhost:5000/api/projects/${id}/task`)
        .then((res) => {
          setIdVal(res.data[0]._id);
          setLabels(res.data);
          setName(res.data[0].name);
          setTarget(res.data[0].target);
          setCompleted(res.data[0].completed);
        })
        .catch((err) => console.log(err));
    };
    getLabels();
  }, []);

  const editHandler = async (pid) => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await axios
      .get(`http://localhost:5000/api/projects/${pid}/taskLabel`,config)
      .then((res) => {
        setIdVal(pid);
        setName(res.data.name);
        setTarget(res.data.target);
        setCompleted(res.data.completed);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newData = {
      name: data.name,
      completed: data.completed,
      target: data.target,
    };
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await axios
      .post(`http://localhost:5000/api/projects/${id}/task`, newData, config)
      .then((res) => {
        setLabels([res.data, ...labels]);
      })
      .catch((err) => console.log(err));
    setData({
      name: "",
      completed: null,
      target: null,
    });
  };
  const deleteHandler = async (pid) => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await axios
      .delete(`http://localhost:5000/api/projects/${pid}/taskLabel`,config)
      .then((res) => {
        const labs = labels.filter((lab) => {
          return lab._id !== pid;
        });
        setLabels(labs);
      })
      .catch((err) => console.log(err));
  };

  const updateUser = async (pid) => {
    let item = { name, target, completed };
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await axios
      .put(`http://localhost:5000/api/projects/${pid}/taskLabel`, item,config)
      .then((res) => {
        const labs = labels.filter((lab) => {
          return lab._id !== res.data._id;
        });
        const labs2 = [res.data, ...labs];
        setLabels(labs2);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h4 className="animate__animated animate__pulse">Add Program Details</h4>
      <div className="createGraphs">
        <h4 className="animate__animated animate__pulse">Progress Bars</h4>
        <form onSubmit={submitHandler}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
              required
            />
            <input
              type="number"
              min="1"
              className="form-control"
              placeholder="Target"
              onChange={(e) => setData({ ...data, target: e.target.value })}
              value={data.target}
              required
            />
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Completed"
              onChange={(e) => setData({ ...data, completed: e.target.value })}
              value={data.completed}
              required
            />
          <div className="animate__animated animate__pulse">
            <button className="btn btn-lg btn-danger">Add</button>
          </div>
        </form>
      </div>
      <div className="animate__animated animate__zoomIn">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Label</th>
              <th>Progress</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="edit">
              <td>Changes</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter task"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Target"
                  value={target}
                  onChange={(e) => {
                    setTarget(e.target.value);
                  }}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Completed"
                  value={completed}
                  onChange={(e) => {
                    setCompleted(e.target.value);
                  }}
                  required
                />
              </td>
              <td>
                <button
                  className="btn btn-lg btn-danger"
                  onClick={() => updateUser(idVal)}
                >
                  Update
                </button>
              </td>
            </tr>
            {labels.map((label, index) => {
              return (
                <tr key={label._id}>
                  <td>{index + 1}</td>
                  <td>{label.name}</td>
                  <td>
                    {label.completed}/{label.target}
                  </td>
                  <td>
                    {label.completed < label.target
                      ? "incomplete"
                      : "completed"}
                  </td>
                  <td>
                    <button
                      onClick={() => editHandler(label._id)}
                      style={{ border: "none" }}
                    >
                      <FontAwesomeIcon
                        style={{ color: "blue" }}
                        icon={faEdit}
                      />
                    </button>
                    <button
                      onClick={() => deleteHandler(label._id)}
                      style={{ border: "none" }}
                    >
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faTrash}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="animate__animated animate__pulse">
        <Link to={`/admin/programs`}>
          <button className="btn btn-lg btn-danger">Finish</button>
        </Link>
      </div>
    </div>
  );
}

export default ProgressBarAdmin;
