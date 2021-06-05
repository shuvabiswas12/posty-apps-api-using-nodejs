const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.auth = async function (req, res, next) {
  const jwtToken = req.cookies.jwtToken
  if (jwtToken) {
    const user = await User.findOne({ rememberToken: jwtToken }, { _id: 1, name: 1, username: 1 })

    /** this returns me an object like {_id, iat, exp}  */
    const verifiedUser = jwt.verify(jwtToken, process.env.SECRET_KEY)

    if (verifiedUser._id == user._id) {
      // store the userID
      req.user_id = user._id
      next()
    } else {
      return res.status(401).send({ errorName: "InvalidUser", message: "Credential does not match." })
    }
  } else {
    return res.status(401).send({ errorName: "AccessTokenError", message: "No access token found." })
  }
}
