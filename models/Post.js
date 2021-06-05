const mongoose = require("mongoose")

/** This model represents "ONE-to-MANY" relationships.
 *  That means, One user has many post.
 */

const postSchema = mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
      required: ["Post body can't be empty!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
)

const post = mongoose.model("Post", postSchema)
module.exports = post
