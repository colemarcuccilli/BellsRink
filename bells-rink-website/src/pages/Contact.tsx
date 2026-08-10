import React, { useState } from 'react';
import { track } from '../lib/analytics';
import './Contact.css';

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzpxgZEf9siRcwvGQbMkudtZ9SzV3FSaeItjWFB9Qm7ZhVJizM5NZDkojakcUvT0Sn7BQ/exec';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    phone: '',
    email: '',
    subject: '',
    howDidYouHear: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'succeeded' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPhone = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formattedPhone }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          'Birthday': formData.birthday,
          'Phone': formData.phone,
          'Email': formData.email,
          'Subject': formData.subject,
          'How did you hear about us?': formData.howDidYouHear,
          'Message': formData.message
        })
      });

      // With no-cors mode, we can't read the response, so we assume success
      setStatus('succeeded');
      track('Contact Form Submit', { subject: formData.subject || 'unspecified' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or call us directly.');
    }
  };

  if (status === 'succeeded') {
    return (
      <div className="contact">
        <div className="contact-hero">
          <div className="container">
            <div className="success-message">
              <div className="eyebrow-divider">Message Received</div>
              <h1 className="poster-headline hero-poster">
                Thank <span className="script-accent gold">you!</span>
              </h1>
              <p>Your message has been sent successfully. We'll get back to you soon.</p>
              <a href="/" className="btn-arrow solid">
                Return Home <span className="arrow">→</span>
              </a>
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
              <div className="eyebrow-divider">Phone · Form · In Person</div>
              <h1 className="poster-headline hero-poster">
                Get in <span className="script-accent gold">touch.</span>
              </h1>
              <p className="hero-subtitle">Questions about parties, events, or hours? We're here. Call, write, or just stop by.</p>
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
                <span className="meta-label">Address</span>
                <h3>Visit us</h3>
                <p>7009 IN-930<br/>Fort Wayne, IN 46803</p>
                <a
                  href="https://maps.app.goo.gl/dC9siLxcJ4K9FvX59"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                >
                  Get Directions →
                </a>
              </div>

              <div className="info-card">
                <span className="meta-label">Phone</span>
                <h3>Call us</h3>
                <p><a href="tel:+12607498214">(260) 749-8214</a> — Main</p>
                <p><a href="tel:+12604033766">(260) 403-3766</a> — Reservations</p>
                <p><a href="tel:+12607101245">(260) 710-1245</a> — Manager</p>
                <p className="card-note">Call during business hours for immediate assistance</p>
              </div>

              <div className="info-card">
                <span className="meta-label">Hours</span>
                <h3>When we're open</h3>
                <div className="hours-list">
                  <div className="hour-row">
                    <span>Tuesday:</span>
                    <span>8 PM - 10:30 PM (21+)</span>
                  </div>
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
                    <span>Mon, Wed, Thu:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <div className="section-eyebrow">
                  <span className="eyebrow-tag">Drop us a line</span>
                </div>
                <h2 className="poster-headline section-headline">
                  Send us a <span className="script-accent">message.</span>
                </h2>
                <p>Have questions about parties, events, or just want to say hello? We'd love to hear from you.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="contact-form">
                {errorMessage && (
                  <div className="form-error">{errorMessage}</div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="First name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="(123) 456-7890"
                      maxLength={14}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                      id="birthday"
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="General Question">General Question</option>
                      <option value="Birthday Party Booking">Birthday Party Booking</option>
                      <option value="Group Event">Group Event</option>
                      <option value="Hours & Pricing Info">Hours & Pricing Info</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="howDidYouHear">How did you hear about us?</label>
                  <select
                    id="howDidYouHear"
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Friend/Family">Friend/Family</option>
                    <option value="Drove By">Drove By</option>
                    <option value="Returning Customer">Returning Customer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="submit-button"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="contact-gallery-section">
        <div className="container">
          <div className="section-eyebrow">
            <span className="eyebrow-tag">The rink</span>
          </div>
          <h2 className="poster-headline section-headline">
            Come <span className="script-accent gold">visit us.</span>
          </h2>
          <div className="photo-grid-2x2">
            <img src="/images/KpopNight/rollerskatecloseupwide4.webp" alt="Wide view of our skating rink" />
            <img src="/images/KpopNight/rollerskatecloseupwide5.webp" alt="Action on the rink floor" />
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-eyebrow">
            <span className="eyebrow-tag">On the map</span>
          </div>
          <h2 className="poster-headline section-headline">
            Find <span className="script-accent">us.</span>
          </h2>
          <div className="map-container">
            <iframe
              title="Bell's Skating Rink Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8!2d-85.0493289!3d41.0697206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8815e5c7e2e7e7e7%3A0x1234567890abcdef!2s7009%20IN-930%2C%20Fort%20Wayne%2C%20IN%2046803!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-info">
              <p>
                <strong>Bell's Skating Rink</strong><br />
                7009 IN-930, Fort Wayne, IN 46803
              </p>
              <a
                href="https://maps.app.goo.gl/dC9siLxcJ4K9FvX59"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link-button"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="quick-contact">
        <div className="container">
          <div className="quick-contact-content">
            <h2 className="poster-headline section-headline">
              Need us <span className="script-accent gold">right now?</span>
            </h2>
            <p>Give us a call during business hours for immediate assistance.</p>
            <a href="tel:+12607498214" className="btn-arrow solid-gold">
              Call (260) 749-8214 <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;