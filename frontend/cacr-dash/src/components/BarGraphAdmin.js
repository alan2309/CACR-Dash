import React, { useState, useEffect } from "react";
import "../CSS/GraphAdmin.css";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "animate.css";

function BarGraphAdmin() {
  const id = useParams().id;
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState({
    label: "",
    before: "",
    after: "",
  });

  const [cause, setCause] = useState("");
  const [beforeVal, setBeforeVal] = useState(null);
  const [afterVal, setAfterVal] = useState(null);
  const [idVal, setIdVal] = useState(null);

  useEffect(() => {
    const getLabels = async () => {
      await axios
        .get(`http://localhost:5000/api/projects/${id}/graph`)
        .then((res) => {
          setIdVal(res.data[0]._id);
          setLabels(res.data);
          setCause(res.data[0].label);
          setBeforeVal(res.data[0].before);
          setAfterVal(res.data[0].after);
        })
        .catch((err) => console.log(err));
    };
    getLabels();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(data.label === "" || data.after === "" || data.before === ""){return}
    if(isNaN(data.before) ||isNaN(data.after) ){return}
    const newData = {
      label: data.label,
      before: data.before,
      after: data.after,
    };
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await axios
      .post(`http://localhost:5000/api/projects/${id}/graph`, newData, config)
      .then((res) => {
        setLabels([res.data, ...labels]);
      })
      .catch((err) => console.log(err));
    setData({
      label: "",
      before: "",
      after: "",
    });
  };
  const editHandler = async (pid) => {
    const token = localStorage.getItem("authToken");
    const config2 = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await axios
      .get(`http://localhost:5000/api/projects/${pid}/graphLabel`,config2)
      .then((res) => {
        setIdVal(pid);
        setCause(res.data.label);
        setBeforeVal(res.data.before);
        setAfterVal(res.data.after);
      });
  };

  const deleteHandler = async (pid) => {
    const token = localStorage.getItem("authToken");
    const config2 = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await axios
      .delete(`http://localhost:5000/api/projects/${pid}/graphLabel`,config2)
      .then((res) => {
        const labs = labels.filter((lab) => {
          return lab._id !== pid;
        });
        setLabels(labs);
      })
      .catch((err) => console.log(err));
  };

  const updateUser = async (pid) => {
    let item = { cause, beforeVal, afterVal };
    const token = localStorage.getItem("authToken");
    const config2 = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await axios
      .put(`http://localhost:5000/api/projects/${pid}/graphLabel`, item,config2)
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
        <h4 className="animate__animated animate__pulse">Bar Graphs</h4>
        <form onSubmit={submitHandler}>
            <input
              className="animate__animated animate__zoomIn"
              type="text"
              className="form-control"
              placeholder="Enter a cause"
              onChange={(e) => setData({ ...data, label: e.target.value })}
              value={data.label}
              required
            />
            <input
            style={{width:"100px"}}
              className="animate__animated animate__zoomIn"
              type="text"
              className="form-control"
              placeholder="Before..."
              onChange={(e) => setData({ ...data, before: e.target.value })}
              value={data.before}
              required
            />
            <input
            style={{width:"100px"}}
              className="animate__animated animate__zoomIn"
              type="text"
              className="form-control"
              placeholder="After..."
              onChange={(e) => setData({ ...data, after: e.target.value })}
              value={data.after}
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
              <th>Before</th>
              <th>After</th>
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
                  placeholder="Before..."
                  value={beforeVal}
                  onChange={(e) => {
                    setBeforeVal(e.target.value);
                  }}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="After..."
                  value={afterVal}
                  onChange={(e) => {
                    setAfterVal(e.target.value);
                  }}
                  required
                />
              </td>
              <td>
                <div className="animate__animated animate__pulse">
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
                  <td>{label.before}</td>
                  <td>{label.after}</td>
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
        <Link to={`/admin/programs/${id}/PieChart`}>
          <button className="btn btn-lg btn-danger">Proceed</button>
        </Link>
      </div>
    </div>
  );
}

export default BarGraphAdmin;
