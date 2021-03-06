import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile } from "./../Redux/Profile/profileActions";
function CreateProfile(props) {
  const [formData, setFormData] = useState({
    company: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });
  const [showSocialFields, toggleSocialFields] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createProfile(formData, props.history);
  };
  return (
    <div className="createprof-container">
      <h1 className=" reg-title ">Create Your Profile</h1>
      <p className="lead reg-title">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small style={{ color: " goldenrod " }}>* = required field</small>
      <form className="form reg-title" onSubmit={handleSubmit}>
        <div className="form-group reg-form">
          <select name="status" value={status} onChange={e => handleChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group reg-form">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group reg-form">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group reg-form">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group reg-form">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group reg-form">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group reg-form">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => handleChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light mx-4"
            onClick={() => toggleSocialFields(!showSocialFields)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {showSocialFields ? (
          <>
            <div className="form-group reg-form social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                onChange={e => handleChange(e)}
                value={twitter}
              />
            </div>

            <div className="form-group reg-form social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => handleChange(e)}
              />
            </div>

            <div className="form-group reg-form social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => handleChange(e)}
              />
            </div>

            <div className="form-group reg-form social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => handleChange(e)}
              />
            </div>

            <div className="form-group reg-form social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => handleChange(e)}
              />
            </div>
          </>
        ) : null}
        <input type="submit" className="btn btn-primary mx-5 mb-4" />
        <a className="btn btn-light mx-5 mb-4" href="dashboard">
          Go Back
        </a>
      </form>
    </div>
  );
}

export default connect(null, { createProfile })(withRouter(CreateProfile));
