import express from "express"
import connectDb from "./config/db.js"
import dotenv from "dotenv"
import route from "./routes/userRoutes.js"
import cors from "cors"
import comproute from "./routes/companyRoutes.js"
import regroute from "./routes/RegsiterRoute.js"
import appRoute from "./routes/applicationRoutes.js"


 dotenv.config()
 const app = express()

const port = 3000

connectDb()


// app.use(express.json())
app.use(express.json({ limit: "5mb" }))

app.use(cors({
    origin: "http://localhost:5173"
}))


app.get("/", (req, res) => {
    res.send("Hello this is the backend")
    console.log("something is cooking")
})

app.post("/create", (req, res) => {
    console.log(req.body)
    res.send("The user created sucessfully")



})

app.use("/api" ,route)
app.use("/api2",comproute)
app.use("/api3",regroute)
app.use("/api4" ,appRoute)





app.listen(port, () => {
    console.log(`The server is runing on : http://localhost:${port}`)
})

