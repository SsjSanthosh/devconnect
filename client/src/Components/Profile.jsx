import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getProfileByUserID,
  getRepos
} from "./../Redux/Profile/profileActions";
import { Link } from "react-router-dom";
import GithubRepos from "./GithubRepos";
function Profile({ match, profile, authUser, getProfileByUserID }) {
  useEffect(() => {
    console.log(match.params.userid);
    getProfileByUserID(match.params.userid);
  }, [match]);
  console.log(profile.profile);
  return (
    <div>
      {profile.profile !== null && (
        <div className="reg-title">{profile.profile.user.name}'s profile</div>
      )}
      {profile.profile !== null && match.params.userid === authUser._id && (
        <Link to="/edit-profile" className="reg-title">
          Edit your profile
        </Link>
      )}
      {profile.profile !== null && profile.profile.githubusername && (
        <div className="reg-title">
          Github repos
          <GithubRepos username={profile.profile.githubusername} />
        </div>
      )}
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
