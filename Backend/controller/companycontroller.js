import company from "../model/companySchema.js";

export const createCompany= async(req ,res)=>{
    try {
        const Company= await company.create(req.body)

        res.status(200).json({
            message:"The user create Sucessfully" , success:true , Company
        })


        
    } catch (error) {
        res.status(500).json({ 
            message:`The user cannot be created:${error}` ,success:false
        })
        
    }

}


export const deleteCompany=async(req,res)=>{
        const {id}= req.params
    try {
        const Company = await company.findByIdAndDelete(id)
        res.status(200).json({message:"The user is delete Sucessfully" , success:true ,Company})

        
    } catch (error) {
        res.status(500).json({message:`cannot delete user:${error}`, success:false})
        
    }

}


export const updateCompany =async(req ,res)=>{
         const {id}= req.params
    try {
        const Company = await company.findByIdAndUpdate(id , req.body ,{new:true})
        res.status(200).json({message:" The Company Updated Scuessfully" ,success:true , Company})
        
    } catch (error) {
        res.status(500).json({message:" The Company can not be updated" ,success:false})

        
    }

}


export const getAllcompany=async(req,res)=>{
    try {
        const Company =await company.find()
        res.status(200).json({message:"All companies" , success:true ,Company})
        
    } catch (error) {
        res.status(500).json({message:`can not get user:${error}` ,success:false})
        
    }

}


