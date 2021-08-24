import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../CSS/Details.css";
import Chart from "./Chart";
import PieChart from "./pieChart";
import { Link } from "react-router-dom";

function Details() {
  const id = useParams().id;
  const [proj, setProj] = useState({});
  useEffect(() => {
    const getProject=async()=>{
      await axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then((res) => {
        setProj(res.data);
      })
      .catch((err) => console.log(err));
    }
    getProject();
  }, []);
  return (
    <div className="container">
      <h4>{proj.title}</h4>
      <div className="description">{proj.description}</div>
      <Link to={`/programs/status/${id}`}><button className="btn btn-success" type="submit">View Completion Status</button></Link>
      <div className="graphs">
        <div className="col1">
          <div className="bar-graph">
            <Chart />
          </div>
        </div>
        <div className="col1">
          <div className="pie-chart">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Details;
