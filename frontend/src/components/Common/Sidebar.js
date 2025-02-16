import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar bg-light sticky-top">
      <nav className="navbar-nav">
        <ul className="nav flex-row">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/medications" className="nav-link">Medications</Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule" className="nav-link">Schedule</Link>
          </li>
          <li className="nav-item">
            <Link to="/recommendation" className="nav-link">Recommendations</Link>
          </li>
          <li className="nav-item">
            <a href="/augmented-reality/pill-identifier.html" className="nav-link" target="_blank">Pill Identifier</a>
          </li>
          <li className="nav-item">
            <Link to="/notification-alerts" className="nav-link">Notification Alerts</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Sidebar;
