const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const dbConnection = require("./Db_Connection/dbConnection")
const authRoute = require("./Routes/userRoutes")
const expenceRoute = require("./Routes/expenceRouter")
const categoryRoute = require("./Routes/categoryRoute")

dotenv.config()

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors({
    origin : "*"
}))

dbConnection()


app.use("/auth",authRoute)
app.use("/expence",expenceRoute)
app.use("/category",categoryRoute)


app.get("/",(req,res)=>{ 
    res.send("Welcome to My App")
})

app.listen(port,()=>{
    console.log(`The server un on port ${port}`)
})