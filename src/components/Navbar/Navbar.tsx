import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../axios';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      // handle logout logic
      const response = await api.get('/api/logout', { withCredentials: true });
      navigate('/login', { state: location.pathname, replace: true });
      setUser(null);
      // close dropdown
      setIsDropdownOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">apiMARKET</div>
      {user?.email ? (
        <div className="navbar-user">
          <div className="navbar-username" onClick={handleDropdownClick}>
            {user.email} ▼
          </div>
          {isDropdownOpen && (
            <div className="navbar-dropdown">
              <div className="navbar-dropdown-item">Settings</div>
              <div className="navbar-dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar-buttons">
          <button
            onClick={() =>
              navigate('/login', { state: location.pathname, replace: true })
            }
            className="navbar-button"
          >
            Login
          </button>
          <button
            onClick={() =>
              navigate('/register', { state: location.pathname, replace: true })
            }
            className="navbar-button"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
