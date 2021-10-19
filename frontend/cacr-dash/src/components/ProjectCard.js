import React from "react";
import "../CSS/Programs.css";
import { Link } from "react-router-dom";

function ProjectCard(props) {
  const { img, title, description, id } = props;
  return <Program img={img} title={title} description={description} id={id} />;
}
const Program = (props) => {
  const { img, title, description, id } = props;
  return (
    <div className="animate__animated animate__flash">
      <div className="col">
        <div className="card h-100 ">
          <Link to={`/programs/details/${id}`}>
            <img src={img} className="card-img-top image" alt={title} />
          </Link>
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">
              {description.substring(0, 100)}...
              <Link to={`/programs/details/${id}`}>read more</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
