const express = require("express");

const auth = require("./../middleware/authjwt");
const { check, validationResult } = require("express-validator");
const User = require("./../models/Users");
const Profile = require("./../models/Profiles");
const Post = require("./../models/Posts");
const router = express.Router();

// @route  POST api/posts
// @desc   Test route
// @access Private
router.post("/", [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      name: user.name,
      text: req.body.postText,
      avatar: user.avatar,
      user: req.user.id
    });
    console.log(req.body);
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "SERVER ERROR", err: err });
  }
});

// @route  GET api/posts
// @desc   Get all the posts
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "SERVER ERROR", err: err });
  }
});

// @route  GET api/posts
// @desc   Get a signle post through ID
// @access Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "SERVER ERROR", err: err });
  }
});

// @route  DELETE api/posts
// @desc   Delete a signle post through ID
// @access Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.remove();
    res.json({ msg: "Post deleted" });
  } catch (err) {
    res.status(500).json({ msg: "SERVER ERROR", err: err });
  }
});

// @route  PUT api/posts/likes/:post_id
// @desc   Like a signle post through ID
// @access Private

router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (
      post.likes.filter(like => like.user.toString() == req.user.id).length > 0
    ) {
      res.status(400).json({ msg: "Post already liked by the user" });
    } else {
      post.likes.push({ user: req.user.id });
      await post.save();
      res.json(post.likes);
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// @route  PUT api/posts/likes/:post_id
// @desc   UnLike a signle post through ID
// @access Private

router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    post.likes = post.likes.filter(like => like.user.toString() != req.user.id);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// @route  POST api/posts/comments/:post_id
// @desc   Comment a signle post through ID
// @access Private

router.post(
  "/comments/:post_id",
  [
    auth,
    [
      check("text", "Comment requires text")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const post = await Post.findById(req.params.post_id);

      const user = await User.findById(req.user.id);
      const newComment = {
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        text: req.body.text
      };

      post.comments.push(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err });
    }
  }
);

// @route  Delete api/posts/comments/:post_id/:comment_id
// @desc   Delete a signle comment through ID
// @access Private

router.delete("/comments/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const comment = post.comments.find(
      comment => comment.id == req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "Comment doesnt exist" });
    }

    if (comment.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Unauthorized cannot delete" });
    }

    const users = post.comments.map(comment => comment.user.toString());

    const index = users.indexOf(req.params.comment_id);

    post.comments.splice(index, 1);

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err: err });
  }
});
module.exports = router;
