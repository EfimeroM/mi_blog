const mongoose = require("mongoose")
const { MONGO_URI } = require("../config")

const connection = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("Database Connected!")
  } catch (error) {
    console.log(error)
    throw new Error("Error to connect database")
  }
}

module.exports = {
  connection
}