import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addEducation } from "./../Redux/Profile/profileActions";
function AddEducation(props) {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    university: "",
    cgpa: 0,
    from: "",
    to: "",
    current: ""
  });
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const [showToDate, toggleToDate] = useState(false);
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    props.addEducation(formData, props.history);
  };
  return (
    <div className="education-container">
      <h1 className=" reg-title">Add Your Education</h1>
      <p className="lead reg-title">
        <i className="fas fa-graduation-cap "></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small style={{ color: "goldenrod" }}>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group   reg-form">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group  reg-form">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group reg-form">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
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
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleToDate(!showToDate);
              }}
              checked={showToDate}
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group reg-form">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            disabled={showToDate}
            value={to}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group reg-form">
          <textarea
            name="description"
            cols="54"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => onChange(e)}
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

export default connect(null, { addEducation })(withRouter(AddEducation));
