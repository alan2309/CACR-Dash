import React from 'react'
import '../CSS/GraphAdmin.css'
function GraphsAdmin() {
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

export default GraphsAdmin
