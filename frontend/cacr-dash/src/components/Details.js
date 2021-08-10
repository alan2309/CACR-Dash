import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../CSS/Details.css";
import Chart from "./Chart";
import PieChart from "./pieChart";

function Details() {
  const id = useParams().id;
  const [proj, setProj] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then((res) => {
        setProj(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>{proj.title}</h1>
      <div className="description">{proj.description}</div>
      <div className="graphs">
        <div className="col">
          <div className="bar-graph">
            <Chart />
          </div>
        </div>
        <div className="col">
          <div className="pie-chart">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Details;
