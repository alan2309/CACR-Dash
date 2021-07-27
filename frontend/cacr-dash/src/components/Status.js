import React from 'react'
import ProgressBar from './ProgressBar'
import '../CSS/ProgressBar.css'

function Status(props) {
    const { task, target, completed } = props;
    return (
          <SetStatus task={task} target={target} completed={completed} />
    );
  }

  const SetStatus = (props) => {
    const { task, target, completed } = props;
    return (
        <div className="card">
            <h5 className="card-header">{task}</h5>
            <div className="card-body">
                <p className="card-text">Target : {target}<br/> Completed: {completed}</p>
                <ProgressBar done={Math.floor(parseFloat(completed)/parseFloat(target)*100)}/>
            </div>
        </div>
    );
  };
  
  export default Status;
