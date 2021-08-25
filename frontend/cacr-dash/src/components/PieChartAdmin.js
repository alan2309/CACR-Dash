import React, { useState, useEffect } from "react";
import "../CSS/GraphAdmin.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function PieChartAdmin() {
  const id = useParams().id;
  const [data, setData] = useState({
    label: "",
    val: null
  });
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const getLabels = async () => {
      await axios
        .get(`http://localhost:5000/api/projects/${id}/PieChart`)
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
      label: data.label,
      value: data.val
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    await axios
      .post(
        `http://localhost:5000/api/projects/${id}/PieChart`,
        newData,
        config
      )
      .then((res) => {
        console.log(res.data);
        setLabels([res.data, ...labels]);
      })
      .catch((err) => console.log(err));
    setData({
      label: "",
      val: null
    });
  };
  const deleteHandler = async (pid) => {
    await axios
      .delete(`http://localhost:5000/api/projects/${pid}/PieChart`)
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
        <h4>Pie Chart</h4>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter a cause"
            onChange={(e) => setData({ ...data, label: e.target.value })}
            value={data.label}
            required
          />
          <input
            type="number"
            min="0"
            className="form-control"
            placeholder="Enter achieved target..."
            id="val"
            onChange={(e) => setData({ ...data, val: e.target.value })}
            value={data.val}
            required
          />
          <button className="btn btn-lg btn-danger">Add</button>
        </form>
      </div>
      <Link to={`/admin/programs/${id}/Progress`}>
        <button className="btn btn-lg btn-danger">Proceed</button>
      </Link>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Label</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, index) => {
            return (
              <tr key={label._id}>
                <td>{index + 1}</td>
                <td>{label.label}</td>
                <td>{label.value}</td>
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

export default PieChartAdmin;
