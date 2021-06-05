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
        return res.status(400).json({ email: "This email has taken already." })
      } else if (password !== confirmPassword) {
        return res.status(400).json({ password: "Password and confirm password does not match." })
      }
      const user = new User({ name, email, username, password })
      user
        .save()
        .then(() => res.status(200).json({ message: "User registration is successful." }))
        .catch((err) => {
          return res.status(400).send(handlingErrors(err))
        })
    })
    .catch((err) => console.log(err))
}
