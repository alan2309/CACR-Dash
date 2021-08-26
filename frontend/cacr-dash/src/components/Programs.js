import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../CSS/Programs.css";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import SearchBar from "./SearchBar";

function Programs() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects").then((res) => {
      setProjects(res.data);
    }).catch(err=>console.log(err));
  }, []);
  return (
    <div className="car container-flex">
      <Carousel controls={false} fade>
        {projects.map(proj=>{
          return  <Carousel.Item interval={3000}>
          <img
            className="d-inline-block w-100 h-25"
            src={proj.image}
            alt={proj.title}
            height="20px"
          />
        </Carousel.Item> 
        })}
      </Carousel>
      <h4 align="center">Our Programs</h4>
      <div class=" pro container-fluid">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {projects.map((proj) => {
            return (
              <ProjectCard
                id={proj._id}
                img={proj.image}
                title={proj.title}
                description={proj.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Programs;
