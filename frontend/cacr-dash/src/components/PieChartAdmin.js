import React, { useState, useEffect } from "react";
import "../CSS/GraphAdmin.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "animate.css";

function PieChartAdmin() {
  const id = useParams().id;
  const [data, setData] = useState({
    label: "",
    val: null
  });
  const [labels, setLabels] = useState([]);

  const [cause, setCause] = useState("");
  const [value, setValue] = useState(null);
  const [idVal, setIdVal] = useState(null);

  useEffect(() => {
    const getLabels = async () => {
      await axios
        .get(`http://localhost:5000/api/projects/${id}/PieChart`)
        .then((res) => {
          setIdVal(res.data[0]._id);
          setCause(res.data[0].label);
          setValue(res.data[0].value);
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
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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

  const editHandler = async (pid) => {
    await axios
      .get(`http://localhost:5000/api/projects/${pid}/pieLabel`)
      .then((res) => {
        setIdVal(pid);
        setCause(res.data.label);
        setValue(res.data.value);
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
      .delete(`http://localhost:5000/api/projects/${pid}/pieLabel`, config)
      .then((res) => {
        console.log(res);
        const labs = labels.filter((lab) => {
          return lab._id !== pid;
        });
        setLabels(labs);
      })
      .catch((err) => console.log(err));
  };

  const updateUser = async (pid) => {
    let item = { cause, value };
    await axios
      .put(`http://localhost:5000/api/projects/${pid}/pieLabel`, item)
      .then((res) => {
        console.log(res.data);
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
      <h4 class="animate__animated animate__pulse">Add Program Details</h4>
      <div className="createGraphs">
        <h4 class="animate__animated animate__pulse">Pie Chart</h4>
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
          <div class="animate__animated animate__pulse">
            <button className="btn btn-lg btn-danger">Add</button>
          </div>
        </form>
      </div>
      <div class="animate__animated animate__zoomIn">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Label</th>
              <th>Value</th>
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
                  placeholder="Enter a cause"
                  value={cause}
                  onChange={(e) => {
                    setCause(e.target.value);
                  }}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Value..."
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  required
                />
              </td>
              <td>
                <div class="animate__animated animate__pulse">
                  <button
                    className="btn btn-lg btn-danger"
                    onClick={() => updateUser(idVal)}
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
            {labels.map((label, index) => {
              return (
                <tr key={label._id}>
                  <td>{index + 1}</td>
                  <td>{label.label}</td>
                  <td>{label.value}</td>
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
      <div class="animate__animated animate__pulse">
        <Link to={`/admin/programs/${id}/Progress`}>
          <button className="btn btn-lg btn-danger">Proceed</button>
        </Link>
      </div>
    </div>
  );
}

export default PieChartAdmin;
