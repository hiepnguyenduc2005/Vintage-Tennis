import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import './Sidebar.css';

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

  const handleBackgroundChange = (color, type) => {
    changeBackground(color);
    // Reset all buttons to false
    setGreenClicked(false);
    setOrangeClicked(false);
    setBlueClicked(false);
    // Then activate the clicked one
    if (type === 'green') setGreenClicked(true);
    if (type === 'orange') setOrangeClicked(true);
    if (type === 'blue') setBlueClicked(true);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{justifyContent:'center'}}>
      <a className="navbar-brand" href="/">Vintage Tennis<img id="icon" src="https://img.freepik.com/free-vector/two-racket-tennis-ball-illustration_24877-60158.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1714176000&semt=sph"></img></a>

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
        <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
      </form>
      </div>
      <div className="court-buttons">
        <button onClick={() => handleBackgroundChange('green', 'green')}
          className={`btn court-btn btn-grass ${greenClicked ? 'greenActive' : ''}`}>Grass</button>
        <button onClick={() => handleBackgroundChange('orange', 'orange')}
          className={`btn court-btn btn-clay ${orangeClicked ? 'orangeActive' : ''}`}>Clay</button>
        <button onClick={() => handleBackgroundChange('blue', 'blue')}
          className={`btn court-btn btn-hard ${blueClicked ? 'blueActive' : ''}`}>Hard</button>
      </div>
    </nav>
  );
};

export default Sidebar;
