// Sidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Sidebar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Vintage Tennis</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Create a Post</NavLink>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </nav>
  );
};

export default Sidebar;
