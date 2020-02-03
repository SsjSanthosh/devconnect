const express = require("express");
const Profile = require("./../../models/Profiles");
const User = require("./../../models/Users");
const request = require("request");
const config = require("config");
const auth = require("./../../middleware/authjwt");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const getUserThroughId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "NO profile found" });
    }
    res.json(profile);
    console.log("hitting");
  } catch (err) {
    res.status(500).json({ msg: "failed to get profiles" });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ msg: "failed to get profiles" });
  }
};

const getCurrentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "NOT FOUND" });
    }
    return res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteProfileWithUser = async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User and profile deleted" });
  } catch (err) {
    res.status(500).json({ msg: "failed to get profiles" });
  }
};

const addProfileExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "failed to get profiles" });
  }
};

const deleteProfileExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const index = profile.experience
      .map(exp => exp.id)
      .indexOf(req.params.exp_id);
    console.log("index is ", index);
    profile.experience.splice(index, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ msg: "Cant find experience" });
  }
};

const addProfileEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    school,
    degree,
    university,
    cgpa,
    fieldofstudy,
    from,
    to,
    current
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    university,
    cgpa,
    from,
    to,
    current
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteProfileEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const index = profile.education
      .map(exp => exp.id)
      .indexOf(req.params.edu_id);
    console.log("index is ", index);
    profile.education.splice(index, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ msg: "Cant find education" });
  }
};

const getGithubRepos = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };
    request(options, (err, response, body) => {
      if (err) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err);
  }
};

const createAndUpdateProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    facebook,
    twitter,
    linkedin,
    githubURL,
    skills,
    status,
    githubusername,
    bio,
    company,
    title,
    website,
    location
  } = req.body;

  // build profile fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = location;
  if (githubusername) profileFields.githubusername = githubusername;
  if (status) profileFields.status = status;
  if (title) profileFields.title = title;
  if (skills) {
    profileFields.skills = skills.split(",").map(skill => skill.trim());
  }
  profileFields.social = {};
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (githubURL) profileFields.social.githubURL = github;
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addProfileEducation,
  addProfileExperience,
  getAllProfiles,
  getCurrentUserProfile,
  getGithubRepos,
  getUserThroughId,
  deleteProfileEducation,
  deleteProfileExperience,
  deleteProfileWithUser,
  createAndUpdateProfile
};
