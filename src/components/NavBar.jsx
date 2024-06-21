import React from "react";
import { navStyles } from "../styles/navStyles";

const NavBar = ({ setCurrentPage }) => {
  return (
    <div style={navStyles.navBar}>
      <button
        style={navStyles.navButton}
        onClick={() => setCurrentPage("workout")}
      >
        Workout
      </button>
      <button
        style={navStyles.navButton}
        onClick={() => setCurrentPage("timer")}
      >
        Timer
      </button>
    </div>
  );
};

export default NavBar;
