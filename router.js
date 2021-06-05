const apiRouter = require("express").Router()
const loginController = require("./controllers/loginController")
const logoutController = require("./controllers/logoutController")
const registrationController = require("./controllers/registrationController")
const postController = require("./controllers/postController")
const auth = require("./middleware/auth")

apiRouter.get("/", (req, res) => {
  res.send("<h1>Api is working perfectly! Here you go...</h1>")
})

// This route will create user account.
apiRouter.post("/register", registrationController.saveUserRegistrations)
apiRouter.post("/login", loginController.login)
apiRouter.post("/logout", auth.auth, logoutController.logout)

// the route is regarding to post and delete post
apiRouter.post("/post", auth.auth, postController.savePost)
apiRouter.post("/:post_id/delete", postController.deleteOnePost)

// get all post by a user
apiRouter.get("/:user_id/posts", postController.getAllPostByUser)

// get all posts from all user
apiRouter.get("/posts", postController.getAllPosts)

// test the auth validation
apiRouter.get("/auth", auth.auth)

module.exports = apiRouter
