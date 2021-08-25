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
    createGraph,getLabels,deleteLabel,updateGraph,getLabelById,
    createPie,getPie,deletePie,updatePie
  }from '../controllers/projectController.js'
  import {protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router();

router.route('/')
.post(createProject)
.get(getProjects)

router.route('/:id')
  .get(getProjectById)
  .delete(deleteProject)
  .put(updateProject)
  
router.route('/:id/task')
  .post(createTask)
  .get(getTasks)
  .put(updateTask)
  .delete(deleteTask)
 
router.route('/:id/graph')
.get(getLabels)
.post(createGraph)
 

router.route('/:id/graphLabel')
.get(getLabelById)
.put(updateGraph) 
.delete(deleteLabel)

router.route('/:id/PieChart')
.get(getPie)
.post(createPie)
.delete(deletePie)  
.put(updatePie)

export default router;