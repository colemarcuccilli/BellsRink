import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <h2>Bell's Skating Rink</h2>
          </Link>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/')}`}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about')}`}
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link 
            to="/parties" 
            className={`nav-link ${isActive('/parties')}`}
            onClick={handleLinkClick}
          >
            Parties
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact')}`}
            onClick={handleLinkClick}
          >
            Contact
          </Link>
          <a 
            href="tel:+12607498214" 
            className="nav-cta"
            onClick={handleLinkClick}
          >
            Call Now
          </a>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;