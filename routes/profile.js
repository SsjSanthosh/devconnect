const express = require("express");
const Profile = require("./../models/Profiles");
const User = require("./../models/Users");
const request = require("request");
const config = require("config");
const auth = require("./../middleware/authjwt");
const { check, validationResult } = require("express-validator");
const {
  getAllProfiles,
  getCurrentUserProfile,
  getGithubRepos,
  getUserThroughId,
  deleteProfileEducation,
  deleteProfileExperience,
  deleteProfileWithUser,
  createAndUpdateProfile,
  addProfileEducation,
  addProfileExperience
} = require("./controllers/userController");
const router = express.Router();

// @route  GET api/profile/user/:user_id
// @desc   Get profile through user_ids
// @access Public

router.get("/user/:user_id", getUserThroughId);

// @route  GET api/profile
// @desc   Get all the profiles
// @access Public

router.get("/", getAllProfiles);

// @route  GET api/profile/me
// @desc   Get current user's profile
// @access Private
router.get("/me", auth, getCurrentUserProfile);

// @route  DELETE api/profile
// @desc   Delete profile,user and posts
// @access Private

router.delete("/", auth, deleteProfileWithUser);

// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  addProfileExperience
);

// @route  DELETE api/profile/experience
// @desc   Delete profile experience
// @access Private
router.delete("/experience/:exp_id", auth, deleteProfileExperience);

// @route  PUT api/profile/education
// @desc   Add profile education
// @access Private

router.put("/education", [
  auth,
  [
    check("school", "school is required")
      .not()
      .isEmpty(),
    check("degree", "degree is required")
      .not()
      .isEmpty(),
    check("fieldofstudy", "field of study required")
      .not()
      .isEmpty(),
    check("from", "From date is required")
      .not()
      .isEmpty(),

    check("cgpa", "CGPA is required")
      .not()
      .isEmpty()
  ],
  addProfileEducation
]);

// @route  DELETE api/profile/experience
// @desc   Delete profile experience
// @access Private
router.delete("/education/:edu_id", auth, deleteProfileEducation);

// @route  GET api/profile/github/:username
// @desc   Get user github repos, latest
// @access Public

router.get("/github/:username", getGithubRepos);
// @route  POST api/profile
// @desc   Create or update user profile
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills are required")
        .not()
        .isEmpty()
    ]
  ],
  createAndUpdateProfile
);
module.exports = router;
