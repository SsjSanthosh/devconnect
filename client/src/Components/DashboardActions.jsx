import React from "react";
import { Link } from "react-router-dom";

export default function DashboardActions() {
  return (
    <div>
      <Link to="/edit-profile">
        <button className="btn">Edit your profile</button>
      </Link>
      <Link to="/add-education">
        <button className="btn">Add education</button>
      </Link>
      <Link to="/add-experience">
        <button className="btn">Add experience</button>
      </Link>
    </div>
  );
}
