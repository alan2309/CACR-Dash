import React from "react";
import { Doughnut } from "react-chartjs-2";

function PieChart() {
  const data = {
    labels: ["Critical case", "Urgent case", "Errors", "Reviewed", "Success"],
    datasets: [
      {
        data: [30, 30, 5, 15, 20],
        backgroundColor: [
          "rgb(242,165,152)",
          "rgb(255,232,157)",
          "rgb(236,107,109)",
          "rgb(122,231,125)",
          "rgb(195,233,151)"
        ],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
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
  };
  return (
    <div>
      <Doughnut
        data={data}
        options={{
          elements: {
            center: {
              legend: { display: true, position: "right" },
              text: "Red is 2/3 the total numbers",
              color: "#FF6384", // Default is #000000
              fontStyle: "Arial", // Default is Arial
              sidePadding: 20, // Default is 20 (as a percentage)
              minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
              lineHeight: 25 // Default is 25 (in px), used for when text wraps
            }
          }
        }}
      />
    </div>
  );
}

export default PieChart;
