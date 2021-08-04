import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";

function Chart() {
  const [chartData, setChartData] = useState({});
  var id = useParams().id;
  const chartx = () => {
    let labels = [];
    let before = [];
    let after = [];
    axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then((res) => {
        labels = res.data.labels;
        before = res.data.before;
        after = res.data.after;
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "BEFORE",
              data: before,
              backgroundColor: "pink",
              borderColor: "red",
              borderWidth: 1
            },
            {
              label: "AFTER",
              data: after,
              backgroundColor: "lightblue",
              borderColor: "blue",
              borderWidth: 1
            }
          ]
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    chartx();
  }, []);
  return (
    <div className="App">
      <h1>Graphical Data</h1>
      <div>
        <Bar
          data={chartData}
          width={100}
          height={50}
          options={{
            responsive: true,
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: "Chart.js Bar Chart"
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
}
export default Chart;
