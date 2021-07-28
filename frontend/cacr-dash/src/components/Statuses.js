import React, { useState, useEffect } from "react";
import "../CSS/ProgressBar.css";
import Status from "./Status";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Statuses() {
  const [tasks, setTasks] = useState([]);
  var id = useParams().id;
  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}/task`).then((res) => {
      setTasks(res.data);
    });
  }, []);
  return (
    <div className="container">
      <h4>Program Completiton Status</h4>
      <hr />
      {tasks.map((task) => {
        return (
          <Status
            task={task.name}
            target={task.target}
            completed={task.completed}
          />
        );
      })}
    </div>
  );
}

export default Statuses;
