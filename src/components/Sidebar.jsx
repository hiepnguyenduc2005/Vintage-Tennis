// Sidebar.js

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

const Sidebar = ({ changeBackground }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [greenClicked, setGreenClicked] = useState(false);
  const [orangeClicked, setOrangeClicked] = useState(false);
  const [blueClicked, setBlueClicked] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  const greenClick = () => {
    setGreenClicked(true);
    setOrangeClicked(false);
    setBlueClicked(false);
  }

  const orangeClick = () => {
    setOrangeClicked(true);
    setGreenClicked(false);
    setBlueClicked(false);
  }

  const blueClick = () => {
    setBlueClicked(true);
    setGreenClicked(false);
    setOrangeClicked(false);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a className="navbar-brand" href="/">Vintage Tennis</a>

      <div className="navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Create a Post</NavLink>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </form>
      </div>
      <button onClick={() => {
          changeBackground('green')
          greenClick()
        } 
      } className="btn court-btn" style={{ backgroundColor: greenClicked ? 'green' : ''  }}>Grass</button>
      <button onClick={() => {
          changeBackground('orange')
          orangeClick()
        }
      } className="btn court-btn" style={{ backgroundColor: orangeClicked ? 'orange' : ''  }}>Clay</button>
      <button onClick={() => {
          changeBackground('blue')
          blueClick()
        }
      } className="btn court-btn" style={{ backgroundColor: blueClicked ? 'blue' : ''  }}>Hard</button>
    </nav>
  );
};

export default Sidebar;
