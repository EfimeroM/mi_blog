const { connection } = require("./database/connection")
const express = require("express")
const cors = require("cors")
const { PORT } = require("./config")

console.log("Node App started!")

connection()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, ()=> console.log(`Running server in port: ${PORT}`))