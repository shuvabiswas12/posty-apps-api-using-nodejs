const express = require("express")
const dotenv = require("dotenv")

dotenv.config()
const app = express()

require("./db")

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, OPTIONS")
  next()
})

/**
 * "express.urlencoded({ extended: false })"  => just tell the express to add
 * the user submitted data onto our request object
 * so that we can access it from 'request.body'
 * this is work on traditional html form submit
 */
app.use(express.urlencoded({ extended: false }))

app.use(express.json()) // works on sending json data

const PORT = process.env.PORT || 3000

app.use("/", require("./router"))

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
