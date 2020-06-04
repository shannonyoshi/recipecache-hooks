import React from "react";
import { NavLink, Link } from "react-router-dom";
import { logoutUser } from "../util/authFuncs";

import "../styling/header.scss";

const Header = (props) => {
  const { setUserStatus } = props;

  const logout = () => {
    logoutUser();
    setUserStatus({ isLoggedIn: false, error: null });
  };

  return (
    <header className="header">
      {/* need to changes css, in original, this is wrapped in nav, not header tag */}
      <div className="nav-logo-set">
        <Link to="/home" className="logo-link">
          {/* TODO: add logo image here later*/}
          <p className="nav-title">Recipe Cache</p>
        </Link>
      </div>

      <nav className="nav">
        <NavLink
          to="/home"
          className="inactive-nav"
          activeClassName="active-nav">
          Home
        </NavLink>
        <NavLink
          to="/add"
          className="inactive-nav"
          activeClassName="active-nav">
          Add Recipe
        </NavLink>
        <button className="inactive-nav" onClick={logout}>
          Log Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
