const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required.",
      trim: true,
      validate(value) {
        if (value.length < 2) {
          throw new Error("name length should be minimum 2 chars.")
        }
      },
    },
    username: {
      type: String,
      required: "username is required.",
      trim: true,
      minLength: [4, "username length should be minimum 4-letter."],
    },
    email: {
      type: String,
      required: "Email is required.",
      trim: true,
      validate: {
        validator: function (value) {
          let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
          return emailRegex.test(value)
        },
        message: "Email should be valid.",
      },
    },
    password: {
      type: String,
      required: "Password is required.",
      trim: true,
      validate(value) {
        if (value.length < 4) {
          throw new Error("Password should be 4 chars length minimum.")
        }
      },
    },
    rememberToken: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

// hashing the password

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // '12' is a length of salt's character.
    this.password = await bcrypt.hashSync(this.password, 12)
  }
  next()
})

// auth token generation

userSchema.methods.generateAuthToken = async function () {
  try {
    let generatedToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
    this.rememberToken = generatedToken
    this.save()
    return generatedToken
  } catch (err) {
    console.log(err)
  }
}

const User = mongoose.model("User", userSchema)
module.exports = User
