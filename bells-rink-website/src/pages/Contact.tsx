import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("xldwzory");

  if (state.succeeded) {
    return (
      <div className="contact">
        <div className="contact-hero">
          <div className="container">
            <div className="success-message">
              <h1>Thank You!</h1>
              <p>Your message has been sent successfully. We'll get back to you soon!</p>
              <a href="/" className="btn-primary">Return Home</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Contact Bell's Skating Rink</h1>
              <p className="hero-subtitle">Get in touch with us - we'd love to hear from you!</p>
            </div>
            <div className="hero-image">
              <div className="hero-characters">
                <div className="character-showcase">
                  <div className="character-speech">"Call Us!"</div>
                  <img src="/images/roofuseatingshavedice.png" alt="Roofus eating shaved ice" className="hero-main-character" />
                </div>
                <div className="character-showcase">
                  <div className="character-speech">"Visit Soon!"</div>
                  <img src="/images/kookyskatingfast.png" alt="Kooky skating fast" className="hero-main-character" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-grid">
            <div className="info-cards">
              <div className="info-card">
                <div className="card-icon">📍</div>
                <h3>Visit Us</h3>
                <p>7009 IN-930<br/>Fort Wayne, IN 46803</p>
                <a 
                  href="https://maps.app.goo.gl/dC9siLxcJ4K9FvX59" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="link-button"
                >
                  Get Directions
                </a>
              </div>

              <div className="info-card">
                <div className="card-icon">📞</div>
                <h3>Call Us</h3>
                <p><a href="tel:+12607498214">(260) 749-8214</a> - Main</p>
                <p><a href="tel:+12604033766">(260) 403-3766</a> - Reservations</p>
                <p><a href="tel:+12607101245">(260) 710-1245</a> - Manager</p>
                <p className="card-note">Call during business hours for immediate assistance</p>
              </div>

              <div className="info-card">
                <div className="card-icon">🕒</div>
                <h3>Hours</h3>
                <div className="hours-list">
                  <div className="hour-row">
                    <span>Friday:</span>
                    <span>6:30 PM - 9:05 PM</span>
                  </div>
                  <div className="hour-row">
                    <span>Saturday:</span>
                    <span>12 PM - 3 PM<br/>6:30 PM - 9 PM</span>
                  </div>
                  <div className="hour-row">
                    <span>Sunday:</span>
                    <span>12 PM - 3 PM</span>
                  </div>
                  <div className="hour-row closed">
                    <span>Mon - Thu:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>Have questions about parties, events, or just want to say hello? We'd love to hear from you!</p>
              </div>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    type="text" 
                    name="name"
                    required
                    placeholder="Your full name"
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email" 
                    name="email"
                    required
                    placeholder="your.email@example.com"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel" 
                    name="phone"
                    placeholder="(123) 456-7890"
                  />
                  <ValidationError 
                    prefix="Phone" 
                    field="phone"
                    errors={state.errors}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select id="subject" name="subject" required>
                    <option value="">Select a topic</option>
                    <option value="general">General Question</option>
                    <option value="birthday-party">Birthday Party Booking</option>
                    <option value="group-event">Group Event</option>
                    <option value="hours-info">Hours & Pricing Info</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  <ValidationError 
                    prefix="Subject" 
                    field="subject"
                    errors={state.errors}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us how we can help you..."
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={state.submitting}
                  className="submit-button"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="map-section">
        <div className="container">
          <h2>Find Us</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-icon">📍</div>
              <h3>Bell's Skating Rink</h3>
              <p>7009 IN-930, Fort Wayne, IN 46803</p>
              <a 
                href="https://maps.app.goo.gl/dC9siLxcJ4K9FvX59" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-button"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="quick-contact">
        <div className="container">
          <div className="quick-contact-content">
            <h2>Need to Reach Us Right Away?</h2>
            <p>Give us a call during business hours for immediate assistance</p>
            <a href="tel:+12607498214" className="phone-cta">
              📞 (260) 749-8214
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;