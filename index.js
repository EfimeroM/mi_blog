const express = require("express")
const cors = require("cors")

const { connection } = require("./database/connection")
const { swaggerDocs } = require("./swagger")
const { PORT } = require("./config")

connection()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const articles_routes = require("./routes/article")

app.use("/api", articles_routes)

app.listen(PORT, () => {
  console.log(`Running server in port: ${PORT}`)
  swaggerDocs(app, PORT)
})