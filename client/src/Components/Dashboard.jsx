import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Experience from "./Experience";

import { connect } from "react-redux";
import { getProfile } from "./../Redux/Profile/profileActions";
import DashboardActions from "./DashboardActions";

import Education from "./Education";
function Dashboard({ getProfile, loading, profile, user }) {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return loading && !profile ? (
    <div>LOADING</div>
  ) : (
    <div className="dashboard-container">
      <p className="dashboard-welcome">
        {" "}
        Welcome , <span className="dashboard-user">{user.name}</span>
      </p>
      {profile == null && (
        <div className="dashboard-noprof">
          You dont seem to have a profile yet, click on the button to start your
          journey!
          <div>
            <Link to="/create-profile">
              <button className="btn btn-primary btn-sm createprofbtn">
                Create profile
              </button>
            </Link>
          </div>
        </div>
      )}
      {profile !== null && <DashboardActions />}
      <div className="dashboard-exp-edu">
        {profile !== null && profile.experience.length > 0 ? (
          <div>
            <span className="utc"> Professional Experiences </span> -{" "}
            <Experience profile={profile} />
          </div>
        ) : (
          <div className="missingdeets">
            You have not added any previous professional experiences.
          </div>
        )}

        {profile !== null && profile.education.length > 0 ? (
          <div>
            Educational background - <Education profile={profile} />{" "}
          </div>
        ) : (
          <div className="missingdeets">You have not added any Education.</div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.profile.loading,
    profile: state.profile.profile,
    user: state.auth.user
  };
};
export default connect(mapStateToProps, { getProfile })(Dashboard);
