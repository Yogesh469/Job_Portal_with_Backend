import mongoose from "mongoose"

const connectDb=async()=>{
    const conn= await mongoose.connect(process.env.Mongo_Url)

    console.log(`mongoDb connected sucessfully:${conn.connection.host}`)



}

export default connectDb


