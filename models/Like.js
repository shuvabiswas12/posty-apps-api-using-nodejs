const mongoose = require("mongoose")
const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  { timestamps: true }
)

/** This pre mongoose hooks check if a post liked previously or not.
 *  If its find any like duplication then it throw an error.
 */
likeSchema.pre("save", function (next) {
  this.constructor.findOne({ user: this.user, post: this.post }, function (err, result) {
    if (err) {
      console.log(err)
      return err
    } else {
      if (result) {
        next({ errorName: "DuplicatesLiking", message: "A post can not be liked second time because you are already liked this post." })
      }
      next()
    }
  })
})

const Like = mongoose.model("Like", likeSchema)
module.exports = Like
