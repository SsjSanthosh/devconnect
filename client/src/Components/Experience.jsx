import React from "react";
import Moment from "react-moment";
import { deleteExperience } from "./../Redux/Profile/profileActions";
import { connect } from "react-redux";
function Experience({ profile, deleteExperience }) {
  const render = profile
    ? profile.experience.map(exp => {
        return (
          <div className="experience">
            <div className="experience-deets">
              Title - <span className="golden">{exp.title}</span>{" "}
            </div>
            <div className="experience-deets">
              Company - <span className="golden">{exp.company}</span>
            </div>
            {exp.location && (
              <div className="experience-deets">
                Location - <span className="golden">{exp.location}</span>
              </div>
            )}
            <div className="experience-deets">
              Duration -{" "}
              <span>
                <Moment format="DD/MM/YYYY" className="golden">
                  <span>{exp.from}</span>
                </Moment>{" "}
                -{" "}
                {exp.current ? (
                  <span className="golden">Current</span>
                ) : (
                  <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                )}
              </span>
            </div>
            {exp.description && <div>Job description - {exp.description}</div>}
            <button
              className="btn"
              onClick={() => {
                console.log("clicked");
                deleteExperience(exp._id);
              }}
            >
              Delete experience
            </button>
          </div>
        );
      })
    : null;
  return <div>{render}</div>;
}

export default connect(null, { deleteExperience })(Experience);
