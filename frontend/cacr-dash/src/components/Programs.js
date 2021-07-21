import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import img1 from '../img/img1.jpeg'
import img2 from '../img/img2.png'
import img3 from '../img/img3.png'
import '../CSS/Programs.css'

function Programs() {
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
                <div className="col">
                    <div className="card h-100 ">
                        <img src={img3} class="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h4 className="card-title">Card title</h4>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
            </div>
  <div className="col">
    <div className="card h-100 ">
      <img src={img1} class="card-img-top" alt="..."/>
      <div className="card-body">
        <h4 className="card-title">Card title</h4>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100 ">
      <img src={img2} class="card-img-top" alt="..."/>
      <div className="card-body">
        <h4 className="card-title">Card title</h4>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This is a longer card with supporting text below as a natural lead-in to additional content.This is a longer card with supporting text below as a natural lead-in to additional content.This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100 ">
      <img src={img3} class="card-img-top" alt="..."/>
      <div className="card-body">
        <h4 className="card-title">Card title</h4>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100 ">
      <img src={img1} class="card-img-top" alt="..."/>
      <div className="card-body">
        <h4 className="card-title">Card title</h4>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100 ">
      <img src={img2} class="card-img-top" alt="..."/>
      <div className="card-body">
        <h4 className="card-title">Card title</h4>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div></div>
        </div>
    )
}

export default Programs
