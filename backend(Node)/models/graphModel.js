import mongoose from "mongoose";

const pieSchema=mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project',
    },
    label:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    }
},
{
    timestamps: true,
})
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
},
{
    timestamps: true,
}
)
const Graph = mongoose.model('Graph',graphSchema)
const Pie = mongoose.model('Pie',pieSchema)
export{Graph,Pie}