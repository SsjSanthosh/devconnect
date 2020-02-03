import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllProfiles } from "./../Redux/Profile/profileActions";
import { Link } from "react-router-dom";
function Profiles({ getAllProfiles, profiles }) {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  const render = profiles.map(p => {
    return (
      <div key={p._id} className="reg-title profile mt-5">
        <div className="profile-name">
          <div className="avatar-container">
            <img src={p.user.avatar} alt="avatar" />
          </div>
          <span className="dashboard-user"> {p.user.name}</span>
          <span>{p.company && `Working at ${p.company}`}</span>
        </div>
        <Link to={`/profile/${p.user._id}`} className="genlink">
          Go to my profile
        </Link>
      </div>
    );
  });
  return (
    <div>
      {" "}
      <p className="reg-title utc mt-4">SHOWING ALL PROFILES</p>
      <div className="profiles-container">
        <div className="profiles">{render}</div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { profiles: state.profile.profiles, loading: state.profile.loading };
};
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
