import React, { useState, useEffect } from "react";
import "../CSS/GraphAdmin.css";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function BarGraphAdmin() {
  const id = useParams().id;
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState({
    label: "",
    before: null,
    after: null
  });

  useEffect(() => {
    const getLabels = async () => {
      await axios
        .get(`http://localhost:5000/api/projects/${id}/graph`)
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
      before: data.before,
      after: data.after
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    await axios
      .post(`http://localhost:5000/api/projects/${id}/graph`, newData, config)
      .then((res) => {
        console.log(res.data);
        setLabels([res.data, ...labels]);
      })
      .catch((err) => console.log(err));
    setData({
      label: "",
      before: null,
      after: null
    });
  };
  const deleteHandler = async (pid) => {
    await axios
      .delete(`http://localhost:5000/api/projects/${pid}/graph`)
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
        <h4>Bar Graphs</h4>
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
            placeholder="Before..."
            onChange={(e) => setData({ ...data, before: e.target.value })}
            value={data.before}
            required
          />
          <input
            type="number"
            min="0"
            className="form-control"
            placeholder="After..."
            onChange={(e) => setData({ ...data, after: e.target.value })}
            value={data.after}
            required
          />
          <button className="btn btn-lg btn-danger">Add</button>
        </form>
      </div>
      <Link to={`/admin/programs/${id}/PieChart`}>
        <button className="btn btn-lg btn-danger">Proceed</button>
      </Link>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Label</th>
            <th>Before</th>
            <th>After</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, index) => {
            return (
              <tr key={label._id}>
                <td>{index + 1}</td>
                <td>{label.label}</td>
                <td>{label.before}</td>
                <td>{label.after}</td>
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

export default BarGraphAdmin;
