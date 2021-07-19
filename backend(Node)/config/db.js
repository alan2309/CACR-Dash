import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        console.log(`connected to ${conn.connection.host}`)
    }catch(error){
        console.error(`Error: ${error}`)
        process.exit(1)
    }
}

export default connectDB;