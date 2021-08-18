import React, {useState} from 'react'
import axios from "axios";
import '../CSS/Admin.css';

function Admin() {
    const [program, setProgram] =useState({title:'',image: '',description:''});
    const fileUploadHandler = e =>{
        setProgram({...program, image: e.target.files[0].name});
    }


    const submitHandler = e => {
        e.preventDefault();
        const programData = {
            title: program.title,
            image:program.image,
            description:program.description,
        };
        axios.post('http://localhost:5000/api/projects',
        programData)
        .then((res) => {
            console.log(res);
        });
    }
    return (
        <div className="createProgram container">
            <form onSubmit={submitHandler}>
            <input type="text" className="form-control" placeholder="Enter program title" required onChange={e => setProgram({...program, title: e.target.value})} value={program.title}/>
            <textarea className="form-control" placeholder="Enter program description" required onChange={e => setProgram({...program, description: e.target.value})} value={program.description}></textarea>
            <input type="file" className="custom-file-input" id="customFile" onChange={fileUploadHandler}/>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Create Program</button>
            </form>
        </div>
    )
}

export default Admin
