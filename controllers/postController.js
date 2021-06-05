const Post = require("../models/Post")
const User = require("../models/User")
const { handlingErrors } = require("./errorHandler")

exports.savePost = function (req, res) {
  const { body } = req.body
  const post = new Post({ body: body, user: req.user_id })
  post
    .save()
    .then(() => res.status(200).send({ message: "Post is successfully created." }))
    .catch((err) => {
      return res.status(400).send(handlingErrors(err))
    })
}
exports.deleteOnePost = function (req, res) {
  const postId = req.params["post_id"]
  Post.findOneAndDelete({ _id: postId }, function (err) {
    if (err) {
      return res.status(400).send({ errorName: "DeletionError", message: "Could not have deleted. Data may not have found in database." })
    }
    return res.status(200).send({ message: "Deletion Successful." })
  })
}

exports.getAllPostByUser = function (req, res) {
  const userId = req.params["user_id"] // getting the id from route parameter

  // first of all we need to check if the user is exists or not.
  User.findOne({ _id: userId }, { email: 0, password: 0 }, function (userError, user) {
    if (userError) {
      console.log(userError)
      return res.status(400).send({ errorName: "UserError", message: "User does not exists." })
    }

    // if user exists then get all data based on that user
    Post.find({ user: userId }, function (postError, data) {
      if (postError) {
        return res.status(400).send(postError)
      }
      return res.status(200).send({ user: user, data: data })
    })
  })
}

exports.getAllPosts = function (req, res) {
  Post.find({}, function (err, data) {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(200).send(data)
  })
}
