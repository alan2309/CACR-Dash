import React from 'react'
import '../CSS/GraphAdmin.css'
import { Link } from "react-router-dom";

function PieChartAdmin() {
    return (
        <div className="container">
            <h4>Add Program Details</h4>
            <div className="createGraphs">
        <h4>Pie Chart</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a cause"
          required
        />
        <input
          type="number" min="0"
          className="form-control"
          placeholder="Enter achieved target..." id="val"
          required
        />
        <button className="btn btn-lg btn-danger">Add</button>
        </div>
        <Link to="/admin/programs/Progress">
        <button className="btn btn-lg btn-danger">Proceed</button>
        </Link>
        </div>
    )
}

export default PieChartAdmin