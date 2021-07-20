import express from 'express';
import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'
import {
    getProjects,
    getProjectById,
    deleteProject,
    createProject,
    updateProject,
  }from '../controllers/projectController.js'
const router = express.Router();

router.get('/',getProjects)
router.get('/:id',getProjectById)

export default router;