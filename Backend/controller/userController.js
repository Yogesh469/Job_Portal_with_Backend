import User from "../model/usersSchema.js"

export const createUser =async(req,res)=>{
       try {
          const user =await User.insertMany(req.body)

          res.status(200).json({message:"The job created suscessfully" ,success:true ,user})
        
       } catch (error) {

        res.status(500).json({message :`failed to create the user:${error.message}` ,success:false })
        
       }



}


export const Deleteuser=async(req,res)=>{
       const {id}=req.params
       console.log(req.body)
     try {
        const user =await User.findByIdAndDelete(id)

        res.status(200).json({message:"The user delete sucesfully" ,success:true ,user})
      
     } catch (error) {
      res.status(500).json({message:`can not be delete:${error} :` ,success:false})


      
     }

}



export const Updateuser=async(req,res)=>{
    const {id }= req.params
   try {
       const user= await User.findByIdAndUpdate(id ,req.body ,{new:true})

       res.status(200).json({message:"The User update sucessfully", success:true ,user})
      
   } catch (error) {
      res.status(500).json({message:`The user updated sucessfully:${error}` , success:false })
      
   }

}


export const getAlluser=async(req,res)=>{
   try {
      const user =await User.find()

      res.status(200).json({message:"This The API" , sucess:true ,user})
      
   } catch (error) {
      res.status(500).json({message:`cannot get User ${error}` ,sucess:false})
      
   }
}