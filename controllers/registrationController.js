const User = require("../models/User")
const { handlingErrors } = require("./errorHandler")

exports.saveUserRegistrations = function (req, res) {
  const { name, username, email, password, confirmPassword } = req.body

  /**
   * Quest-1: I want to check if user exits or not by using {email && username} because
   * both should be unique.
   */

  User.findOne({ email: email })
    .then((userData) => {
      if (userData) {
        return res.status(400).send({ email: "This email has taken already." })
      } else if (password !== confirmPassword) {
        return res.status(400).send({ password: "Password and confirm password does not match." })
      }
      const user = new User({ name, email, username, password })
      user
        .save()
        .then(() => res.status(200).send({ message: "User registration is successful." }))
        .catch((err) => {
          return res.status(400).send(handlingErrors(err))
        })
    })
    .catch((err) => console.log(err))
}

exports.getAllUser = function (req, res) {
  User.find({})
    .select("-password -rememberToken -__v")
    .then((users) => {
      return res.status(200).send(users)
    })
    .catch((err) => {
      console.log(err)
    })
}
