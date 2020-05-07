import React from "react";
import { NavLink, Link } from "react-router-dom";

import "../styling/header.scss";

const Header = () => {
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
        <NavLink
          to="/log-out"
          className="inactive-nav"
          activeClassName="active-nav">
          Log Out
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
