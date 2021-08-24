import React from 'react'
import '../CSS/GraphAdmin.css'
function ProgressBarAdmin() {
    return (
        <div className="container">
            <h4>Add Program Details</h4>
        <div className="createGraphs">
        <h4>Progress Bars</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          required
        />
        <input
          type="number" min="1"
          className="form-control"
          placeholder="Target"
          required
        />
        <input
          type="number" min="0"
          className="form-control"
          placeholder="Completed"
          required
        />
        <button className="btn btn-lg btn-danger">Add</button>
        </div>
        </div>
    )
}

export default ProgressBarAdmin
