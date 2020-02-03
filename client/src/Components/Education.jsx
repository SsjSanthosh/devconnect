import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "./../Redux/Profile/profileActions";
function Education({ profile, deleteEducation }) {
  const render = profile
    ? profile.education.map(edu => {
        return (
          <div className="education">
            <div className="education-deets">
              School / University <span className="golden"> {edu.school} </span>
            </div>
            <div className="education-deets">
              Degree <span className="golden">{edu.degree}</span>{" "}
            </div>

            <div className="education-deets">
              Duration -{" "}
              <div>
                <span className="golden">
                  <Moment format="DD/MM/YYYY">{edu.from}</Moment>
                </span>{" "}
                -{" "}
                {edu.current ? (
                  <span className="golden">Current</span>
                ) : (
                  <Moment format="DD/MM/YYYY">
                    <span className="golden">{edu.to}</span>
                  </Moment>
                )}
              </div>
            </div>
            <button className="btn" onClick={() => deleteEducation(edu._id)}>
              {" "}
              Delete this education{" "}
            </button>
          </div>
        );
      })
    : null;
  return <div>{render}</div>;
}

export default connect(null, { deleteEducation })(Education);
