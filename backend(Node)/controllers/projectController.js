import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({})
  res.json(projects)
})

// @desc    get a product
// @route   GET /api/products/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (project) {
    res.json(project)
  } else {
    res.status(404)
    throw new Error('Project not found')
  }
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

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  const { title, image, desc } = req.body
  const project = new Project({
    title: title,
    image: image,
    description: desc,
  })

  const createdProject = await project.save()
  res.status(201).json(createdProject)
})

// @desc    Create new task
// @route   POST /api/projects/:id/task
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { name,completed,target } = req.body
  const project = await Project.findById(req.params.id)
  if(project){
    const task = {
      name,
      completed: Number(completed),
      target:Number(target)
    }
    project.tasks.push(task)
    await project.save()
    res.status(201).json({ message: 'Task added' })
  }
  else{
    res.status(404)
    throw new Error('Project not found')
  }
})
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (project) {
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject,
  createTask
}
