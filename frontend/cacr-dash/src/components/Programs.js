import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../img/img1.jpeg";
import img2 from "../img/img2.png";
import img3 from "../img/img3.png";
import "../CSS/Programs.css";
import ProjectCard from "./ProjectCard";
import axios from "axios";

function Programs() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects").then((res) => {
      setProjects(res.data);
    });
  }, []);
  return (
    <div className="car container-flex">
      <Carousel controls={false} fade>
        <Carousel.Item interval={3000}>
          <img
            className="d-inline-block w-100 h-25"
            src={img1}
            alt="First slide"
            height="20px"
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-inline-block w-100 h-25"
            src={img2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-inline-block w-100 h-25"
            src={img3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <h4 align="center">Our Programs</h4>
<div class=" pro container-fluid">
  <div className="row row-cols-1 row-cols-md-3 g-4">
      {projects.map((proj) => {
        return (
          <ProjectCard
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
