import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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
    setPhone(formattedPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Here you would integrate with your chosen email/SMS platform
    // For now, we'll use Formspree to collect the data
    try {
      const response = await fetch('https://formspree.io/f/xldwzory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          phone,
          preferences,
          type: 'newsletter_signup',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing! We\'ll keep you updated on special events and deals.');
        setEmail('');
        setPhone('');
        setPreferences({ email: true, sms: false });

        // Track conversion in Google Analytics
        if (window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: `${preferences.email ? 'email' : ''}${preferences.sms ? '_sms' : ''}`
          });
        }
      } else {
        setStatus('error');
        setMessage('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Oops! Something went wrong. Please try again.');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <div className="newsletter-text">
          <h2>🛼 Stay in the Loop!</h2>
          <p>Get exclusive deals, birthday discounts, and be the first to know about special events!</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={preferences.email}
              className="newsletter-input"
            />
            <input
              type="tel"
              placeholder="Phone (optional for texts)"
              value={phone}
              onChange={handlePhoneChange}
              className="newsletter-input"
              maxLength={14}
            />
          </div>
          <div className="preference-row">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.email}
                onChange={(e) => setPreferences({...preferences, email: e.target.checked})}
              />
              <span>Email updates</span>
            </label>
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.sms}
                onChange={(e) => setPreferences({...preferences, sms: e.target.checked})}
              />
              <span>Text alerts</span>
            </label>
          </div>
          <button
            type="submit"
            className="newsletter-button"
            disabled={status === 'loading' || (!preferences.email && !preferences.sms)}
          >
            {status === 'loading' ? 'Subscribing...' : 'Join the Fun! 🎉'}
          </button>
          {message && (
            <div className={`newsletter-message ${status}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Add type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default Newsletter;