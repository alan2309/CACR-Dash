import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project',
      },
    name:{
        type:String,
        required:true
    },
    completed:{
        type:Number,
        required:true,
        default:0
    },
    target:{
        type:Number,
        required:true,
        default:0
    }
 },
 {
    timestamps: true,
 })
const projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    labels:[String],
    before:[Number],
    after:[Number]
},{
    timestamps:true
})

const Project = mongoose.model('Project',projectSchema)
const Task = mongoose.model('Task',taskSchema)

export {Project,Task}