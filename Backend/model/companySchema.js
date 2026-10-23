import mongoose from "mongoose"

const Companyschema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    logo: {
        type: String,
        required: true

    },
    industry: {
        type: String,
        required: true
    },

    location:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
         type:Number,
         required:true
    },

    website:{
        type:String,
        required:true
    },

    foundedYear:{
        type:String,
        required:true

    },

    companySize:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    workCulture:{
        type:String,
        required:true
    },

    benefits:{
        type:String,
        required:true
    },
    linkedIn:{
        type:String,
        required:true
    }



})


const   company =mongoose.model("company" ,Companyschema)

export default company