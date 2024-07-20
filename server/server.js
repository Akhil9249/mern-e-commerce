const express = require("express")
const app = express()
const datas = require("./datas.json")
const cors = require("cors")

const userRoute = require('./routes/userRoute')

app.use(cors())
app.use(express.json())

app.use("/", userRoute);

const PORT = 5000;
app.listen(5000,()=> console.log(`Server running on http://localhost:${PORT}`))