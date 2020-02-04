import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getProfileByUserID,
  getRepos
} from "./../Redux/Profile/profileActions";
import { Link } from "react-router-dom";
import GithubRepos from "./GithubRepos";
import Education from "./Education";
import Experience from "./Experience";
function Profile({ match, profile, authUser, getProfileByUserID }) {
  useEffect(() => {
    getProfileByUserID(match.params.userid);
  }, [match.params.userid, getProfileByUserID]);

  return (
    <div>
      {profile.profile != null && (
        <div className="userprofile-container">
          <span className="profile-name profile-text">
            {profile.profile.user.name}
          </span>

          <div className="avatar-container">
            <img src={profile.profile.user.avatar} alt="avatar" />
          </div>
          {profile.profile !== null && match.params.userid === authUser._id && (
            <div className="editprof">
              <Link to="/edit-profile" className="reg-title">
                <button className="btn m-0"> Edit your profile</button>
              </Link>
            </div>
          )}
          <div className="profile-work reg-title">
            <p>
              {profile.profile.status && (
                <span className="golden">{profile.profile.status}</span>
              )}
            </p>
            {profile.profile.company ? (
              <span>
                Currently working at{" "}
                <span className="golden">{profile.profile.company}</span>
              </span>
            ) : (
              <span>Currently not working.</span>
            )}
            <p>
              {profile.profile.location && (
                <span className="golden">{profile.profile.location}</span>
              )}
            </p>
          </div>
          <div className="profile-skills">
            <p>Skills - </p>
            <ul className="skill-list">
              {profile.profile !== null && profile.profile.skills ? (
                profile.profile.skills.map(s => {
                  return (
                    <li className="skill" key={Math.random()}>
                      <i className="fas fa-cog mx-4 my-3 fa-2x"></i>
                      {s}
                    </li>
                  );
                })
              ) : (
                <span>No skills mentioned.</span>
              )}
            </ul>
          </div>
          <div className="dashboard-exp-edu">
            {profile.profile !== null &&
            profile.profile.experience.length > 0 ? (
              <div className="reg-title">
                <span className="utc "> Professional Experiences </span> -{" "}
                <Experience profile={profile.profile} />
              </div>
            ) : (
              <div className="missingdeets reg-title">
                You have not added any previous professional experiences.
              </div>
            )}

            {profile.profile !== null &&
            profile.profile.education.length > 0 ? (
              <div className="reg-title">
                <span> Educational background</span> -{" "}
                <Education profile={profile.profile} />{" "}
              </div>
            ) : (
              <div className="missingdeets reg-title">
                You have not added any Education.
              </div>
            )}
          </div>
          <div>
            {profile.profile != null && profile.profile.githubusername ? (
              <div className="mt-3 profile-repos">
                <span className="golden">Latest 5 github repositories - </span>
                <GithubRepos username={profile.profile.githubusername} />
              </div>
            ) : (
              <span>Github profile not linked!</span>
            )}
          </div>
          {/* <div className="profile-links reg-title">
            Website -{" "}
            <a href={profile.profile.website} className="golden">
              {profile.profile.website}
            </a> */}
          {/* </div> */}
        </div>
      )}
      {/* {profile.profile !== null && (
        <div className="reg-title">{profile.profile.user.name}'s profile</div>
      )}
      
      {profile.profile !== null && profile.profile.githubusername && (
        <div className="reg-title">
          Github repos
          <GithubRepos username={profile.profile.githubusername} />
        </div>
      )} */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    isAuthenticated: state.auth.isAuthenticated,
    authUser: state.auth.user
  };
};
export default connect(mapStateToProps, { getProfileByUserID, getRepos })(
  Profile
);
