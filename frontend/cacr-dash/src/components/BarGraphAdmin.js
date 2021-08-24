import React, { useState, useEffect } from "react";
import "../CSS/GraphAdmin.css";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";

function BarGraphAdmin() {
  const id = useParams().id;
  const [labels, setLabels] = useState([]);

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

  return (
    <div className="container">
      <h4>Add Program Details</h4>
      <div className="createGraphs">
        <h4>Bar Graphs</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a cause"
          required
        />
        <input
          type="number"
          min="0"
          className="form-control"
          placeholder="Before..."
          required
        />
        <input
          type="number"
          min="0"
          className="form-control"
          placeholder="After..."
          required
        />
        <button className="btn btn-lg btn-danger">Add</button>
      </div>
      <Link to="/admin/programs/PieChart">
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
                <td>{index}</td>
                <td>{label.label}</td>
                <td>{label.before}</td>
                <td>{label.after}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default BarGraphAdmin;