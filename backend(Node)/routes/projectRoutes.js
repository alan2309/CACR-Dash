import express from 'express';
import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'
import {
    getProjects,
    getProjectById,
    deleteProject,
    createProject,
    updateProject,
    createTask,
  }from '../controllers/projectController.js'
  import {protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router();

router.get('/',getProjects)
router.post('/create',createProject)
router.post('/:id/task',createTask)
router
  .route('/:id')
  .get(getProjectById)
  .delete(protect, admin, deleteProject)
  .put(protect, admin, updateProject)

export default router;