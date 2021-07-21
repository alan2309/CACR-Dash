import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({})
  res.json(projects)
})

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

const updateProject = asyncHandler(async (req, res) => {})
export {
  getProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject,
}
