import express from 'express';
import asyncHandler from 'express-async-handler'
import {Project }from '../models/projectModel.js'
import {
    getProjects,
    getProjectById,
    deleteProject,
    createProject,
    updateProject,
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    createGraph
  }from '../controllers/projectController.js'
  import {protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router();

router.get('/',getProjects)
router.post('/create',createProject)
router.route('/:id/task')
  .post(createTask)
  .get(getTasks)
  .put(updateTask)
  .delete(deleteTask)
router
  .route('/:id')
  .get(getProjectById)
  .delete(protect, admin, deleteProject)
  .put(protect, admin, updateProject)
 
router.route('/:id/graph').post(createGraph)  

export default router;