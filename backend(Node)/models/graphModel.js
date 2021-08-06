import mongoose from "mongoose";

const graphSchema = mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project',
    },
    label:{
        type:String,
        required:true
    },
    before:{
        type:Number,
        required:true
    },
    after:{
        type:Number,
        required:true   
    }
})
const Graph = mongoose.model('Graph',graphSchema)
export default Graph 