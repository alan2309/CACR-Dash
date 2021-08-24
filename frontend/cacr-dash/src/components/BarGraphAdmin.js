import React from 'react'
import '../CSS/GraphAdmin.css'
import { Link } from "react-router-dom";

function BarGraphAdmin() {
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
          type="number" min="0"
          className="form-control"
          placeholder="Before..."
          required
        />
        <input
          type="number" min="0"
          className="form-control"
          placeholder="After..."
          required
        />
        <button className="btn btn-lg btn-danger">Add</button>
        </div>
        <Link to="/admin/programs/PieChart">
        <button className="btn btn-lg btn-danger">Proceed</button>
        </Link>
        </div>
    )
}

export default BarGraphAdmin
