const express = require("express");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const postsRouter = require("./routes/posts");
const path = require("path");
const app = express();

// body-parser
app.use(express.json({ extended: false }));
// Router for the users route
app.use("/api/users", userRouter);

// Router for the posts route
app.use("/api/posts", postsRouter);

// Router for the profile route
app.use("/api/profile", profileRouter);

// Router for the auth route
app.use("/api/auth", authRouter);

// serve static assets in production

app.use(express.static("./client/build"));

app.get("*", (req, res) => {
  const loc = path.join(__dirname, "client", "build", "index.html");
  res.sendFile(loc);
});
module.exports = app;
