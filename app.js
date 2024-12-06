//######## Require modules ########//
const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

//====> Other imports
const dbConnect = require("./db/dbconnect");

//====> Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(cookieParser(process.env.jwt_Secret));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//====> Router imports
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userrouter");
const postRouter = require("./router/postRouter");
const nonApiRouter = require("./router/nonAPIRoute");

//====> Test routes
// app.get("/test", (req, res) => {
//   try {
//     res.render("index"); // Ensure "views/index.ejs" exists
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.get("/lol", (req, res) => {
//   try {
//     res.send("hello");
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.get("/article/:postId/:userId", async (req, res) => {
//   console.log("from non API insight-article ");
//   try {
//     // const { postId, userId } = req.params;
//     // const post = await Post.findById({ _id: postId }).populate("user");

//     // if (!post) {
//     //   // Handle the case where the post is not found
//     //   console.error("Post not found");
//     //   return res.status(404).send("Post not found");
//     // }

//     res.render("insight");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

//######## Routers ########//
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/", nonApiRouter);

//######## Start connection ########//
const port = process.env.Port || 8080;
const start = async () => {
  try {
    console.log("Connecting to DB...");
    await dbConnect(process.env.uri);
    console.log("DB connection successful");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

start();
