import asyncHandler from 'express-async-handler'
import {Project,Task} from '../models/projectModel.js'

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ?{
    title:{
    $regex:req.query.keyword,
    $options:'i'
  }
}:{}
  const projects = await Project.find({...keyword})
  res.status(200).json(projects)
})

// @desc    get a project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (project) {
    res.status(200).json(project)
  } else {
    res.status(404)
    throw new Error('Project not found')
  }
})

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  const { title, image, description } = req.body
  const project = new Project({
    title: title,
    image: image,
    description: description,
  })

  const createdProject = await project.save()
  res.status(201).json(createdProject)
})

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (project) {
    await project.remove()
    res.json({ message: 'Project removed' })
  } else {
    res.status(404)
    throw new Error('Project not found')
  }
})

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
  if (project) {
    
    res.json(updatedProject)
  } else {
    res.status(404)
    throw new Error('Project not found')
  }
})

// @desc    Get tasks
// @route   GET /api/projects/:id/task
// @access  Private
const getTasks=asyncHandler(async (req,res)=>{
  const tasks = await Task.find({"project":req.params.id})
  res.status(200).json(tasks)
})

// @desc    Create new task
// @route   POST /api/projects/:id/task
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { name,completed,target } = req.body
  const project = await Project.findById(req.params.id)
  if(project){
    const task =new Task({
      project:req.params.id,
      name,
      completed: Number(completed),
      target:Number(target)
    })
    const taskCreated = await task.save() 
    res.status(201).json(taskCreated)
  }
  else{
    res.status(404)
    throw new Error('Project not found')
  }
})
// @desc    Update a Task
// @route   PUT /api/projects/:id/task
// @access  Private/Admin
const updateTask = asyncHandler(async (req, res) => {
})

// @desc    Delete a Task
// @route   DELETE /api/projects/:id/task
// @access  Private/Admin
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    await task.remove()
    res.json({ message: 'Task removed' })
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

const createGraph = asyncHandler(async (req,res)=>{
  const project = await Project.findById(req.params.id)
  const {label,before,after} = req.body
  if(project){
    project.labels.push(label)
    project.before.push(before)
    project.after.push(after)
    const created = await project.save()
    res.json(created)
  }
  else{
    res.status(404)
    throw new Error('Project not found')
  }
})

export {
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
}
