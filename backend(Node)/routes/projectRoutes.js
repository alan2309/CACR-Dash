import express from 'express';
import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'
const router = express.Router();

router.get('/',asyncHandler(async (req,res)=>{
const projects= await Project.find({});
res.json(projects);
}))

router.get('/:id',asyncHandler(async(req,res)=>{
    const project = await Project.findById(req.params.id);
    if(project){
        res.json(project);
    }
    else{
        res.status(404).json({message:'Project not found'})
    }
}))

export default router;