import React from "react";
import "../CSS/Programs.css";

function ProjectCard(props) {
  const { img, title, description } = props;
  return (
        <Program img={img} title={title} description={description} />
  );
}
const Program = (props) => {
  const { img, title, description } = props;
  return (
    <div>
      <div className="col">
        <div className="card h-100 ">
          <img src={img} class="card-img-top" alt={title} />
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
