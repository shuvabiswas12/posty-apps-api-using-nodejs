const User = require("../models/User")

exports.logout = async function (req, res) {
  User.findByIdAndUpdate({ _id: req.user_id }, { rememberToken: "" }, function (err, user) {
    if (err) {
      return res.status(500).send({ errorName: "LogoutError", message: "Could not have logged out." })
    }
    req.user_id = null
    res.clearCookie("jwtToken", { path: "/" })
    return res.status(200).send({ message: "User successfully logged out." })
  })
}
