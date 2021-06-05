const User = require("../models/User")
const validator = require("validator")
const bcrypt = require("bcryptjs")

exports.login = function (req, res) {
  const { email, password } = req.body

  const error = {}

  /** cleanup starts for check email and password is validate or not.*/
  if (!email.trim()) {
    error["email"] = "Email can't be empty!"
  }

  if (!password.trim()) {
    error["password"] = "Password can't be empty!"
  }
  /** cleanup ends for check email and password is validate or not.*/

  // now send back to this error to user
  if (Object.keys(error).length) {
    return res.status(400).send(error)
  }

  User.findOne({
    $or: [{ email: email }, { username: email }],
  })
    .then(async (user) => {
      if (!user) {
        // this if block will work only when user will be NULL. That means user = null
        return res.status(400).send({ email: "User not found. You might have entered wrong email!" })
      }

      let isPasswordMatched = bcrypt.compareSync(password, user.password)

      if (!isPasswordMatched) {
        // this if block will work only when isPasswordMatched will be NULL. That means isPasswordMatched = null
        return res.status(400).send({ password: "Password did not match. Enter the correct password." })
      }

      let token = ""
      if (user.rememberToken) {
        token = user.rememberToken
      } else token = await user.generateAuthToken()

      res.cookie("jwtToken", token, {
        /**
         * expiration value 2592000000 means 30 days.
         * that means 30 days = 2592000000 milliseconds
         */
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      })
      res.status(201).send({ message: "User signed in successfully.", token })
    })
    .catch((err) => console.log(err))
}
