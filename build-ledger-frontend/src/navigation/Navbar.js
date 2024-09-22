import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Build Ledger
      </Link>

      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/create-project" className="nav-link">
            Create Project
          </Link>
        </li>
      </div>
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/all-projects" className="nav-link">
            All Projects
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
