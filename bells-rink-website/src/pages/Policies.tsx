import React from 'react';
import { Link } from 'react-router-dom';
import './Policies.css';

const Policies: React.FC = () => {
  return (
    <div className="policies">
      {/* Hero Section */}
      <section className="policies-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Safety & Conduct Policies</h1>
            <p className="hero-subtitle">Ensuring a safe, enjoyable, and memorable experience for all our guests</p>
          </div>
        </div>
      </section>

      {/* Safety Rules */}
      <section className="safety-rules">
        <div className="container">
          <h2>🛼 Skating Safety & Conduct</h2>
          <div className="rules-grid">
            <div className="rule-card safety">
              <div className="rule-icon">🛡️</div>
              <h3>Supervised Skating</h3>
              <p>Skating is strictly supervised to ensure the safety of our skaters at all times</p>
            </div>

            <div className="rule-card warning">
              <div className="rule-icon">⚠️</div>
              <h3>Safe Skating Only</h3>
              <p>Fast or otherwise reckless skating, weaving in and out of crowds putting others in unnecessary danger, playing tag, etc. will result in being politely asked to stop, and if not, to take off their skates</p>
            </div>

            <div className="rule-card info">
              <div className="rule-icon">🎯</div>
              <h3>Skate Within Your Ability</h3>
              <p>Skaters must skate within one's own ability level for everyone's safety</p>
            </div>

            <div className="rule-card important">
              <div className="rule-icon">⚖️</div>
              <h3>Skate at Your Own Risk</h3>
              <p>Bell's Skating Rink is not responsible for accidents or injuries. Skaters assume all risks of roller skating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Behavior Policies */}
      <section className="behavior-policies">
        <div className="container">
          <h2>👨‍👩‍👧‍👦 Behavior & Environment</h2>
          <div className="policies-content">
            <div className="policy-card zero-tolerance">
              <div className="policy-header">
                <div className="policy-icon">🚫</div>
                <h3>Zero Tolerance Policy</h3>
              </div>
              <p><strong>No Bullying!</strong> Anyone suspected of bullying or harassing someone else will be politely asked to leave the premises</p>
            </div>

            <div className="policy-card age-restriction">
              <div className="policy-header">
                <div className="policy-icon">🔞</div>
                <h3>Age Restrictions</h3>
              </div>
              <p>No in/out privileges for anyone under 18 years old</p>
            </div>

            <div className="policy-card substance">
              <div className="policy-header">
                <div className="policy-icon">🚱</div>
                <h3>Substance Policy</h3>
              </div>
              <p>Alcoholic beverages or any person suspected of being under the influence of drugs or alcohol will not be permitted on the premises</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section className="dress-code">
        <div className="container">
          <h2>👕 Dress Code</h2>
          <div className="dress-grid">
            <div className="dress-card allowed">
              <div className="dress-header">
                <h3>✅ What's Welcome</h3>
              </div>
              <ul>
                <li>Casual dress is acceptable</li>
                <li>Appropriate athletic wear</li>
                <li>Comfortable skating attire</li>
                <li>Family-friendly clothing</li>
              </ul>
            </div>

            <div className="dress-card not-allowed">
              <div className="dress-header">
                <h3>❌ Not Permitted</h3>
              </div>
              <ul>
                <li>Clothing with offensive language or imagery</li>
                <li>Clothing that promotes violence</li>
                <li>Clothing that promotes drugs or alcohol</li>
                <li>Inappropriate or revealing attire</li>
              </ul>
              <p className="dress-note">Bell's Skating Rink codes of conduct and dress are dictated by good taste</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Rules */}
      <section className="facility-rules">
        <div className="container">
          <h2>🏢 Facility Policies</h2>
          <div className="facility-grid">
            <div className="facility-card">
              <div className="facility-icon">🍕</div>
              <h3>Food & Beverage Policy</h3>
              <p>No outside food or drinks permitted unless hosting a birthday party</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">🚫</div>
              <h3>No Loitering</h3>
              <p>Please respect our facility and other guests by not loitering in common areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Help */}
      <section className="help-contact">
        <div className="container">
          <div className="help-content">
            <h2>Need Help or Assistance?</h2>
            <p>Please notify the manager on duty or call us directly</p>
            <div className="contact-options">
              <a href="tel:+12604033766" className="contact-btn primary">
                📞 (260) 403-3766
              </a>
              <a href="tel:+12607101245" className="contact-btn secondary">
                📞 (260) 710-1245
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-footer">
        <div className="container">
          <div className="mission-content">
            <h2>Our Commitment to You</h2>
            <blockquote>
              "Bell's Skating Rink is committed to providing a family friendly/kid friendly
              environment for all to enjoy. These policies are put in place to
              ensure all of our wonderful customers have a safe, enjoyable, and
              memorable experience."
            </blockquote>
            <cite>— Eric & Stacy Dunlap, Owners</cite>
          </div>
        </div>
      </section>

      {/* Legal Documents Section */}
      <section className="legal-documents">
        <div className="container">
          <h2>📄 Legal Documents</h2>
          <div className="legal-docs-grid">
            <Link to="/terms" className="legal-doc-card">
              <div className="legal-doc-icon">📋</div>
              <h3>Terms of Service</h3>
              <p>Read our complete terms and conditions for using Bell's Skating Rink facility</p>
              <span className="read-more">Read Full Document →</span>
            </Link>
            <Link to="/privacy" className="legal-doc-card">
              <div className="legal-doc-icon">🔒</div>
              <h3>Privacy Policy</h3>
              <p>Learn how we collect, use, and protect your personal information</p>
              <span className="read-more">Read Full Document →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policies;