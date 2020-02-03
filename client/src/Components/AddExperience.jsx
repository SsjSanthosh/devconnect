import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addExperience } from "./../Redux/Profile/profileActions";
function AddExperience(props) {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const [showToDate, toggleToDate] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    props.addExperience(formData, props.history);
  };
  return (
    <div className="experience-container">
      <h1 className="large reg-title">Add An Experience</h1>
      <p className="lead reg-title">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small style={{ color: "goldenrod" }}>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group reg-form">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group reg-form">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group reg-form">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group reg-form">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group reg-form">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value=""
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleToDate(!showToDate);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group reg-form">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => onChange(e)}
            disabled={showToDate ? "disabled" : ""}
          />
        </div>
        <div className="form-group reg-form">
          <textarea
            name="description"
            cols="54"
            rows="5"
            value={description}
            onChange={e => onChange(e)}
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard">
          Go Back
        </a>
      </form>
    </div>
  );
}

export default connect(null, { addExperience })(withRouter(AddExperience));
