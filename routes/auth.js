const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("./../middleware/authjwt");
const User = require("./../models/Users");

// @route  GET api/auth
// @desc   Returns the user of the jwt token
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name _id");
    res.json({ status: "success", data: { user } });
  } catch (err) {
    res.status(400).json({ msg: "Invalid user" });
  }
});

// @route POST /auth
// @desc  Logs in user
// @access public

router.post(
  "/",
  // VALIDATORS
  [
    // checking for email and password
    check("email", "Invalid email").isEmail(),

    check("password").exists()
  ],

  async (req, res) => {
    // will return non empty if errors found in the body

    const errors = validationResult(req);

    // handling errors

    if (!errors.isEmpty()) {
      // returning to avoid resing twice

      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const { email, password } = req.body;

      try {
        // checking if user exists already in the database
        let user = await User.findOne({ email });

        // if user exists, handle error
        if (!user) {
          return res.status(404).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(404).json({ message: "Invalid credentials" });
        }
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
      } catch (error) {
        res.status(400).json({ message: "Invalid credentials", error });
      }
    }
  }
);

module.exports = router;
