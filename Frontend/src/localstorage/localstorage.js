
export const setData = (jobs) => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}


export const getData = () => {
    return JSON.parse(localStorage.getItem("jobs")) || [];
}

export const setcompany =(companies)=>{
    localStorage.setItem("companies" ,JSON.stringify(companies))

}

export const getcompany =()=>{
    return JSON.parse(localStorage.getItem("companies")) ||[]

}