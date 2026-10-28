import axios from "axios"
import { useEffect, useState } from "react"

const fetchCompany=(URL)=>{
    const [data,setdata] =useState([])

    const fetchcompanydata=async()=>{
        try {
            const res =await axios.get(URL)
             console.log(res.data.Company)
             setdata(res.data.Company)
            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        fetchcompanydata()
    },[URL])
    
  return {data ,setdata}

}

export default fetchCompany

