import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRepos } from "./../Redux/Profile/profileActions";
import uniqid from "uniqid";
function GithubRepos(props) {
  const { getRepos, username } = props;
  useEffect(() => {
    getRepos(username);
  }, [getRepos, username]);
  const render =
    props.repos != null
      ? props.repos.map(repo => {
          return <div key={uniqid()}>{repo.name}</div>;
        })
      : null;

  return <div>{render}</div>;
}

const mapStateToProps = state => {
  return { repos: state.profile.repos };
};
export default connect(mapStateToProps, { getRepos })(GithubRepos);
