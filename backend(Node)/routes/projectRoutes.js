import express from "express";
import asyncHandler from "express-async-handler";
import { Project } from "../models/projectModel.js";
import {
  getProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject,
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createGraph,
  getLabels,
  deleteLabel,
  updateGraph,
  getLabelById,
  createPie,
  getPie,
  deletePie,
  updatePie,
  getPieById,
} from "../controllers/projectController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(createProject).get(getProjects);

router
  .route("/:id")
  .get(getProjectById)
  .delete(deleteProject)
  .put(updateProject);

router.route("/:id/task").post(createTask).get(getTasks);

router
  .route("/:id/taskLabel")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

router.route("/:id/graph").get(getLabels).post(createGraph);

router
  .route("/:id/graphLabel")
  .get(getLabelById)
  .put(updateGraph)
  .delete(deleteLabel);

router.route("/:id/PieChart").get(getPie).post(createPie);

router.route("/:id/pieLabel").get(getPieById).delete(deletePie).put(updatePie);

export default router;
