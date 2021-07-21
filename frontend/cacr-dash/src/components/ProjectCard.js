import React from 'react'
import img1 from '../img/img1.jpeg'
import '../CSS/Programs.css'

const firstProgram ={
    img:img1,
    title:'Wash Initiative',
    description:'Awareness sessions and distribution of personal hygiene kits to children.'
}

function ProjectCard() {
    return (
    <div class=" pro container-fluid">
        <div className="row row-cols-1 row-cols-md-3 g-4">
            <Program img={firstProgram.img} title={firstProgram.title} description={firstProgram.description}/>
        </div>
    </div>
    )
}
const Program = (props) => {
    const {img, title, description} = props;
    return <div>
    <div className="col">
        <div className="card h-100 ">
            <img src={img} class="card-img-top" alt="program image"/>
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{description}</p>
                </div>
            </div>
    </div>
</div>
  }

export default ProjectCard
