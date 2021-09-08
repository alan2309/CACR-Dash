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
    getTasks,getTaskById,
    updateTask,
    deleteTask,
    createGraph,getLabels,deleteLabel,updateGraph,getLabelById,
    createPie,getPie,deletePie,updatePie,getPieById
  }from '../controllers/projectController.js'
  import {protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router();

router.route('/')
.post(protect,createProject)
.get(getProjects)

router.route('/:id')
  .get(getProjectById)
  .delete(protect,deleteProject)
  .put(protect,updateProject)
  
router.route('/:id/task')
  .post(protect,createTask)
  .get(getTasks)
 
router.route('/:id/taskLabel')
  .get(getTaskById)
  .put(protect,updateTask)
  .delete(protect,deleteTask)
 
router.route('/:id/graph')
.get(getLabels)
.post(protect,createGraph)
 

router.route('/:id/graphLabel')
.get(protect,getLabelById)
.put(protect,updateGraph) 
.delete(protect,deleteLabel)

router.route('/:id/PieChart')
.get(getPie)
.post(protect,createPie)


router.route('/:id/pieLabel')
.get(protect,getPieById)
.delete(protect,deletePie)  
.put(protect,updatePie)

export default router;