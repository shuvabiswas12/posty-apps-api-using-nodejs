const Like = require("../models/Like")
const Post = require("../models/Post")
const User = require("../models/User")

exports.doLike = function (req, res) {
  const postId = req.params["post_id"]
  const like = new Like({ user: req.user_id, post: postId })
  like
    .save()
    .then((likesData) => {
      return res.status(200).send({ message: "User liked the post successfully." })
    })
    .catch((err) => {
      return res.status(400).send(err)
    })
}

exports.doUnlike = function (req, res) {
  const postId = req.params["post_id"]
  Like.findOneAndDelete({ user: req.user_id, post: postId }, function (err, data) {
    if (err) {
      return res.status(400).send(err)
    }
    if (data) {
      return res.status(200).send({ message: "You just unlike the post." })
    } else {
      return res.status(400).send({ errorName: "UnlikeError", message: "You can not unlike the post because you may not have liked the post yet." })
    }
  })
}
