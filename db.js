const mongoose = require("mongoose")
const connectionString = process.env.CONNECTION_STRING

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Db connection successful!"))
  .catch((e) => {
    console.log("Db connection failed! Check the error!")
    console.log(e)
  })
