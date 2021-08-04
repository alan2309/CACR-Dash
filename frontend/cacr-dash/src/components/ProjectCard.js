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
    <div>
      <div className="col">
        <div className="card h-100 ">
          <Link to={`/programs/status/${id}`}>
            <img src={img} class="card-img-top" alt={title} />
          </Link>
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">
              {description.substring(0, 100)}...
              <Link to={`/programs/status/${id}`}>read more</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
