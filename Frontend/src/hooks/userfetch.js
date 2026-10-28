import axios from "axios"
import { useEffect, useState } from "react"

const userfetch = (url) => {
    const [data, setdata] = useState([])

    const fetchdata = async () => {
        try {
            const res = await axios.get(url)
            console.log(res.data.user)
            setdata(res.data.user)


        } catch (error) {
            console.log(error)

        }

    }

    useEffect(()=>{
        fetchdata()
    },[url])


    return {data ,setdata}





}

export default userfetch

