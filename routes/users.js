const express = require("express");
const User = require("./../models/Users");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route  POSTS api/users
// @desc   Test route
// @access Public

router.post(
  "/",
  // VALIDATORS
  [
    // checking for name,email and password

    check("name", "Name is required")
      .not()
      .isEmpty(),

    check("email", "Please enter a valid email").isEmail(),

    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    // will return non empty if errors found in the body

    const errors = validationResult(req);

    // handling errors

    if (!errors.isEmpty()) {
      // returning to avoid resing twice

      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;

      // generating avatars from dicebear, huge shoutout, amazing api

      const avatar = `https://avatars.dicebear.com/v2/jdenticon/${uniqid()}.svg`;
      try {
        // checking if user exists already in the database
        let user = await User.findOne({ email });

        // if user exists, handle error
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        } else {
          // create salt for password hash

          const salt = await bcrypt.genSalt(10);

          // hash password

          let encryptedPassword = await bcrypt.hash(password, salt);

          // create a new User with the parameters

          user = new User({ name, email, password: encryptedPassword, avatar });

          // save users onto the database

          await user.save();

          // return JSON web token

          const payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 36000 },
            (err, token) => {
              if (err) {
                res.status(500).json({ status: "failed", message: "JWT fail" });
                throw err;
              }
              return res.status(200).json(token);
            }
          );
        }
      } catch (err) {
        res.status(500).json("Error in connecting to DB", err);
      }
    }
  }
);

router.get("/", async (req, res) => {
  let users = await User.find();

  res.json(users);
});
module.exports = router;
