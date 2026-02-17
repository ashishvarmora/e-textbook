import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>📚 Digital Textbook</h2>
      </div>
      <nav className="sidebar-nav">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          🏠 Dashboard
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
