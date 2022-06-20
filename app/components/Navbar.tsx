import React from "react";
import { Theme } from "utils/theme-provider";

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <header>
      <nav className="flex shadow-lg p-7 justify-between">
        <div>
          <h1 className="text-1xl font-bold text-darktext dark:text-white">
            Where in the world?
          </h1>
        </div>
        <div>
          {theme === Theme.DARK ? (
            <i className="fa-solid fa-moon text-darktext dark:text-white"></i>
          ) : (
            <i className="fa-solid fa-sun text-darktext dark:text-white"></i>
          )}
          <button className="ml-2" onClick={toggleTheme}>
            <h3 className="text-darktext dark:text-white">Dark mode</h3>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
