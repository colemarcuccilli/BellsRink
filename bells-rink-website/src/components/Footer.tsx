import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Bell's Skating Rink</h3>
          <p>Family-owned roller skating fun in New Haven, Indiana. Creating memories since day one.</p>
          <div className="footer-rating">
            <span className="rating-stars">⭐⭐⭐⭐⭐</span>
            <span className="rating-text">4.4 Google Rating</span>
          </div>
          <div className="footer-mascots">
            <img src="/images/skaterhappytophalffototer.png" alt="Skater happy footer" className="footer-mascot-main" />
            <img src="/images/roofusholdingdiscoball.png" alt="Roofus disco ball footer" className="footer-mascot-main" />
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/parties">Birthday Parties</Link></li>
            <li><Link to="/policies">Safety & Policies</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Hours</h4>
          <div className="footer-hours">
            <div className="hour-item">
              <span>Friday:</span>
              <span>6:30 PM - 9:05 PM</span>
            </div>
            <div className="hour-item">
              <span>Saturday:</span>
              <span>12 PM - 3 PM<br/>6:30 PM - 9 PM</span>
            </div>
            <div className="hour-item">
              <span>Sunday:</span>
              <span>12 PM - 3 PM</span>
            </div>
            <div className="hour-item closed">
              <span>Mon - Thu:</span>
              <span>Closed</span>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-details">
            <p>📍 7009 IN-930<br/>Fort Wayne, IN 46803</p>
            <p>📞 <a href="tel:+12607498214">(260) 749-8214</a></p>
          </div>
          <div className="footer-cta">
            <a href="tel:+12607498214" className="footer-call-btn">Call Now</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Bell's Skating Rink. All rights reserved.</p>
          <p className="footer-tagline">Family-owned • Professional • Fun Guaranteed</p>
          <p className="footer-legal-links">
            <Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;