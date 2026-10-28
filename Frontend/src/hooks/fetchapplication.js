import axios from "axios"
import { useEffect, useState } from "react"



const fetchapplication = (url) => {
    const [data, setdata] = useState([])

    const appdata = async () => {
        try {
            const res = await axios.get(url)
            console.log(res.data.applications)
            setdata(res.data.applications)

        } catch (error) {
            console.log(`Error :${error}`)

        }

    }

    useEffect(() => {
        appdata()

    }, [url])

    return {data ,setdata} 
}

export default fetchapplication