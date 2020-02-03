import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRepos } from "./../Redux/Profile/profileActions";
import uniqid from "uniqid";
function GithubRepos({ getRepos, username, repos }) {
  useEffect(() => {
    getRepos(username);
  }, [getRepos, username]);
  const render =
    repos != null
      ? repos.map(repo => {
          return (
            <div key={uniqid()} className="repo">
              <a href={repo.html_url} alt="link">
                <span className="repo-name">{repo.name}</span>
              </a>
              {/* 
              {repo.homepage && (
                <a className="repo-site" href={repo.homepage}>
                  Deployed website
                </a>
              )} */}
              <span className="repo-stars">
                <span className="golden">{repo.stargazers_count}</span> stars
              </span>
            </div>
          );
        })
      : null;

  return <div className="userprofile-container reg-title">{render}</div>;
}

const mapStateToProps = state => {
  return { repos: state.profile.repos };
};
export default connect(mapStateToProps, { getRepos })(GithubRepos);
