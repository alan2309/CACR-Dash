import React from 'react'
import '../CSS/ProgressBar.css'
import Status from './Status'

function Statuses() {
    return (
        <div className="container">
            <h4>Program Completiton Status</h4>
            <hr/>
            <Status task ="Distribute Sanitary Pads" target="90" completed="60"/>
        </div>
    );
}

export default Statuses
