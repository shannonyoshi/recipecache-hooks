import React from "react";
import {NavLink} from "react-router-dom"

const Header = () => {
  return (
    <header className="header">
      {/* need to changes css, in original, this is wrapped in nav, not header tag */}
        <div className="nav-logo-set">
          {/* TODO: add logo image here later*/}
          <p className="nav-title"> Recipe Cache</p>
        </div>

      <nav className="nav">
        <NavLink to="/"><button>Home</button></NavLink>
        <NavLink to="/add-recipe"><button>Add Recipe</button></NavLink>
      </nav>
    </header>
  );
};

export default Header
