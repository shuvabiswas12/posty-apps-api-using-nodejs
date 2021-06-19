const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")

dotenv.config()
const app = express()
app.use(cors())

require("./db")

/**
 * "express.urlencoded({ extended: false })"  => just tell the express to add
 * the user submitted data onto our request object
 * so that we can access it from 'request.body'
 * this is work on traditional html form submit
 */
app.use(express.urlencoded({ extended: false }))

app.use(express.json()) // works on sending json data

app.use(cookieParser())

const PORT = process.env.PORT || 3000

app.use("/", require("./router"))

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
