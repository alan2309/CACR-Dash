import asyncHandler from 'express-async-handler'
import {Project,Task} from '../models/projectModel.js'
import {Graph,Pie }from '../models/graphModel.js'

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
  const projects = await Project.find({...keyword}).sort([['createdAt', -1]])
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
  const tasks = await Task.find({"project":req.params.id})
  const labels = await Graph.find({"project":req.params.id})
  const pieLabel = await Pie.find({"project":req.params.id})
  if (project) {
    if(tasks){
      for(let i=0;i<tasks.length;i++){
      await tasks[i].remove()
      }
    }
    if(labels){
      for(let i=0;i<labels.length;i++){
      await labels.remove()
      }
    }
    if(pieLabel){
      for(let i=0;i<pieLabel.length;i++){
      await pieLabel.remove()
      }
    }
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
  const {
    title,
    description,
    image
  } = req.body
  if (project) {
    project.title = title
    project.description = description
    project.image = image
    const updatedProject = await project.save()
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
// @desc    GET Task Label by id
// @route   GET /api/projects/:id/taskLabel
// @access  Private/admin
const getTaskById=asyncHandler(async (req,res)=>{
  const label = await Task.findById(req.params.id)
  if(label){
  res.status(200).json(label)
}
else{
  res.status(404)
  throw new Error('Label not found')
}
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
// @route   PUT /api/projects/:id/taskLabel
// @access  Private/Admin
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
  const {
    name,
    target,completed
  } = req.body
  if (task) {
    task.name = name
    task.target = Number(target)
    task.completed = Number(completed)
    const updatedTask = await task.save()
    res.json(updatedTask)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

// @desc    Delete a Task
// @route   DELETE /api/projects/:id/taskLabel
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

// @desc    GET project Labels
// @route   GET /api/projects/:id/graph
// @access  Private/admin
const getLabels=asyncHandler(async (req,res)=>{
  const project = await Project.findById(req.params.id)
  if(project){
  const labels = await Graph.find({"project":req.params.id}).sort([['createdAt', -1]])
  res.status(200).json(labels)
}
else{
  res.status(404)
  throw new Error('Project not found')
}
})
// @desc    GET graph Label by id
// @route   GET /api/projects/:id/graphLabel
// @access  Private/admin
const getLabelById=asyncHandler(async (req,res)=>{
  const label = await Graph.findById(req.params.id)
  if(label){
  res.status(200).json(label)
}
else{
  res.status(404)
  throw new Error('Label not found')
}
})

// @desc    Create project Labels
// @route   POST /api/projects/:id/graph
// @access  Private/admin
const createGraph = asyncHandler(async (req,res)=>{
  const project = await Project.findById(req.params.id)
  const {label,before,after} = req.body
  if(project){
    const graph =new Graph({
      project:req.params.id,
      label,
      before: Number(before),
      after:Number(after)
    })
    const labelCreated = await graph.save() 
    res.status(201).json(labelCreated)
  }
  else{
    res.status(404)
    throw new Error('Project not found')
  }
})
// @desc    Delete a Label
// @route   DELETE /api/projects/:id/graphLabel
// @access  Private/Admin
const deleteLabel= asyncHandler(async (req, res) => {
  const label = await Graph.findById(req.params.id)
  if (label) {
    await label.remove()
    res.json({ message: 'label removed' })
  } else {
    res.status(404)
    throw new Error('label not found')
  }
})

// @desc    Update Graph Label
// @route   PUT /api/projects/:id/graphLabel
// @access  Private/Admin
const updateGraph = asyncHandler(async (req, res) => {
  const Label = await Graph.findById(req.params.id)
  const {
    cause,
    beforeVal,afterVal
  } = req.body
  if (Label) {
    Label.label = cause
    Label.before = Number(beforeVal)
    Label.after = Number(afterVal)
    const updatedLabel = await Label.save()
    res.json(updatedLabel)
  } else {
    res.status(404)
    throw new Error('Label not found')
  }
})

// @desc    GET Pie Labels
// @route   GET /api/projects/:id/PieChart
// @access  Private/admin
const getPie=asyncHandler(async (req,res)=>{
  const project = await Project.findById(req.params.id)
  if(project){
  const labels = await Pie.find({"project":req.params.id}).sort([['createdAt', -1]])
  res.status(200).json(labels)
}
else{
  res.status(404)
  throw new Error('Project not found')
}
})
// @desc    GET Pie Label by id
// @route   GET /api/projects/:id/pieLabel
// @access  Private/admin
const getPieById=asyncHandler(async (req,res)=>{
  const label = await Pie.findById(req.params.id)
  if(label){
  res.status(200).json(label)
}
else{
  res.status(404)
  throw new Error('Label not found')
}
})

// @desc    Create Pie Labels
// @route   POST /api/projects/:id/PieChart
// @access  Private/admin
const createPie = asyncHandler(async (req,res)=>{
  const project = await Project.findById(req.params.id)
  const {label,value} = req.body
  if(project){
    const pie =new Pie({
      project:req.params.id,
      label,
      value: Number(value),
    })
    const labelCreated = await pie.save() 
    res.status(201).json(labelCreated)
  }
  else{
    res.status(404)
    throw new Error('Project not found')
  }
})
// @desc    Delete a Pie Label
// @route   DELETE /api/projects/:id/pieLabel
// @access  Private/Admin
const deletePie= asyncHandler(async (req, res) => {
  const label = await Pie.findById(req.params.id)
  if (label) {
    await label.remove()
    res.json({ message: 'label removed' })
  } else {
    res.status(404)
    throw new Error('label not found')
  }
})
// @desc    Update Pie Label
// @route   PUT /api/projects/:id/pieLabel
// @access  Private/Admin
const updatePie = asyncHandler(async (req, res) => {
  const pieLabel = await Pie.findById(req.params.id)
  const {
    cause,
    value
  } = req.body
  if (pieLabel) {
    pieLabel.label = cause
    pieLabel.value = value
    const updatedLabel = await pieLabel.save()
    res.json(updatedLabel)
  } else {
    res.status(404)
    throw new Error('Label not found')
  }
})


export {
  getProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject,
  createTask,getTaskById,
  getTasks,
  updateTask,
  deleteTask,
  createGraph,
  getLabels,
  deleteLabel,updateGraph,getLabelById,
  createPie,getPie,deletePie,updatePie,getPieById
}
