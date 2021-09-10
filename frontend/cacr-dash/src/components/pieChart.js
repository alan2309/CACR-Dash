import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import axios from "axios";

function PieChart() {
  const [data, setData] = useState({});
  var id = useParams().id;
  const chartx = async () => {
    let labels = [];
    let values = [];
    await axios
      .get(`http://localhost:5000/api/projects/${id}/PieChart`)
      .then((res) => {
        let data = res.data;
        for (let x in data) {
          labels.push(data[x].label);
          values.push(data[x].value);
        }
        setData({
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                "rgb(242,165,152)",
                "rgb(255,232,157)",
                "rgb(236,107,109)",
                "rgb(122,231,125)",
                "rgb(195,233,151)",
                "rgb(0,0,153)",
                "rgb(51,255,255)",
                "rgb(255,255,0)",
                "rgb(102,0,102)",
                "rgb(128,128,128)",
                "rgb(102,0,204)",
                "rgb(128,128,0)",
                "rgb(0,128,128)"
              ]
            }
          ],

          plugins: {
            labels: {
              render: "percentage",
              fontColor: ["green", "white", "red"],
              precision: 2
            }
          },
          text: "23%"
        });
      });
  };
  useEffect(() => {
    chartx();
  }, []);
  return (
    <div>
      <Doughnut
        data={data}
        options={{
          elements: {
            center: {
              legend: { display: true, position: "right" },
              text: "Red is 2/3 the total numbers",
              color: "#FF6384", 
              fontStyle: "Arial", 
              sidePadding: 20, 
              minFontSize: 20,
              lineHeight: 25 
            }
          }
        }}
      />
    </div>
  );
}

export default PieChart;
