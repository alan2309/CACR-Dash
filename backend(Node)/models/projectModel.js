import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    completed:{
        type:Number,
        required:true
    },
    target:{
        type:Number,
        required:true
    }
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
    tasks:[taskSchema]
},{
    timestamps:true
})

const Project = mongoose.model('Project',projectSchema)

export default Project;