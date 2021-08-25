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
    target: null
  });
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const getLabels = async () => {
      await axios
        .get(`http://localhost:5000/api/projects/${id}/task`)
        .then((res) => {
          setLabels(res.data);
        })
        .catch((err) => console.log(err));
    };
    getLabels();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newData = {
      name: data.name,
      completed: data.completed,
      target: data.target
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    await axios
      .post(`http://localhost:5000/api/projects/${id}/task`, newData, config)
      .then((res) => {
        console.log(res.data);
        setLabels([res.data, ...labels]);
      })
      .catch((err) => console.log(err));
    setData({
      name: "",
      completed: null,
      target: null
    });
  };
  const deleteHandler = async (pid) => {
    await axios
      .delete(`http://localhost:5000/api/projects/${pid}/task`)
      .then((res) => {
        console.log(res);
        const labs = labels.filter((lab) => {
          return lab._id !== pid;
        });
        setLabels(labs);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <h4>Add Program Details</h4>
      <div className="createGraphs">
        <h4>Progress Bars</h4>
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
          <button className="btn btn-lg btn-danger">Add</button>
        </form>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Label</th>
            <th>Progress</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, index) => {
            return (
              <tr key={label._id}>
                <td>{index + 1}</td>
                <td>{label.name}</td>
                <td>
                  {label.completed}/{label.target}
                </td>
                <td>
                  {label.completed < label.target ? "incomplete" : "completed"}
                </td>
                <td>
                  <FontAwesomeIcon style={{ color: "blue" }} icon={faEdit} />
                  <button
                    onClick={() => deleteHandler(label._id)}
                    style={{ border: "none" }}
                  >
                    <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ProgressBarAdmin;
