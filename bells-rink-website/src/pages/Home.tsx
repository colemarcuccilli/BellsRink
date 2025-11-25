import React from 'react';
import Newsletter from '../components/Newsletter';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to Bell's Skating Rink</h1>
            <p className="hero-subtitle">Family-owned roller skating fun in New Haven, Indiana</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">4.4</span>
                <span className="stat-label">Google Rating</span>
              </div>
              <div className="stat">
                <span className="stat-number">Family</span>
                <span className="stat-label">Owned & Operated</span>
              </div>
            </div>
            <div className="hero-cta">
              <a href="tel:+12607498214" className="cta-primary">Call to Book</a>
              <a href="#hours" className="cta-secondary">View Hours</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-characters">
              <div className="character-showcase">
                <div className="character-speech">"Ready to Roll!"</div>
                <img src="/images/roofuspartyhat.png" alt="Roofus party hat" className="hero-main-character" />
              </div>
              <div className="character-showcase">
                <div className="character-speech">"Let's Skate!"</div>
                <img src="/images/kookystandingtall.png" alt="Kooky standing tall" className="hero-main-character" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="services-background">
          <img src="/images/rollerskatebusy.jpeg" alt="Roller skating fun" className="background-image" />
        </div>
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-wrapper">
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🛼</div>
                <h3>Roller Skating</h3>
                <p>Professional skating sessions with rental skates provided for all ages</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🍕</div>
                <h3>Pizza & Food</h3>
                <p>Delicious fresh pizza and snacks to fuel your skating adventure</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🧊</div>
                <h3>Shaved Ice</h3>
                <p>Cool off with our refreshing shaved ice treats in various flavors</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🎉</div>
                <h3>Party Hosting</h3>
                <p>Perfect venue for birthday parties and special celebrations</p>
              </div>
            </div>
            <div className="service-card-character">
              <img src="/images/skaterfast.png" alt="Skater fast" className="service-side-character" />
            </div>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section id="hours" className="hours">
        <div className="container">
          <h2>Public Skating Sessions</h2>
          <div className="sessions-grid">
            <div className="session-card special">
              <div className="session-header">
                <h3>Wednesday Night Rewind</h3>
                <div className="session-time">8:00 PM - 10:00 PM</div>
              </div>
              <div className="session-price">$7 per skater</div>
              <p>Includes regular skate rental</p>
            </div>

            <div className="session-card popular">
              <div className="session-header">
                <h3>Friday Night Family Pizza Party</h3>
                <div className="session-time">6:30 PM - 9:00 PM</div>
              </div>
              <div className="session-pricing">
                <div className="session-price">$10 per skater</div>
                <div className="family-deal">
                  <strong>Family of 5: $40</strong>
                  <p>Includes pizza & pitcher of pop!</p>
                </div>
              </div>
            </div>

            <div className="session-card">
              <div className="session-header">
                <h3>Saturday Afternoon Family Matinee</h3>
                <div className="session-time">12:30 PM - 3:00 PM</div>
              </div>
              <div className="session-price">$8 per skater</div>
              <p>Includes regular skate rental</p>
            </div>

            <div className="session-card glow">
              <div className="session-header">
                <h3>Saturday Night Family Roll - Glow</h3>
                <div className="session-time">6:30 PM - 9:00 PM</div>
              </div>
              <div className="session-price">$10 per skater</div>
              <div className="special-feature">
                <span className="glow-icon">✨</span>
                <p>Free glow stick for all skaters!</p>
              </div>
            </div>

            <div className="session-card popular">
              <div className="session-header">
                <h3>Sunday Funday Family Pizza Party</h3>
                <div className="session-time">12:30 PM - 3:00 PM</div>
              </div>
              <div className="session-pricing">
                <div className="session-price">$10 per skater</div>
                <div className="family-deal">
                  <strong>Family of 5: $30</strong>
                  <p>Includes pizza & pitcher of pop!</p>
                </div>
              </div>
            </div>

            <div className="session-character-only">
              <img src="/images/roofuseatingpizza.png" alt="Roofus eating pizza" className="session-character-card" />
            </div>
          </div>

          <div className="upcoming-sessions">
            <h3>Special Events This Month</h3>
            <div className="upcoming-list">
              <div className="upcoming-item special-event">
                <span className="upcoming-icon">🎵</span>
                <div className="event-details">
                  <strong>Kpop Demon Hunter Skate</strong>
                  <span className="event-date">Saturday, Dec 6th • 6:30-9PM</span>
                </div>
              </div>
              <div className="upcoming-item special-event">
                <span className="upcoming-icon">🎁</span>
                <div className="event-details">
                  <strong>Toy Drive</strong>
                  <span className="event-date">Sunday, Dec 14th</span>
                </div>
              </div>
              <div className="upcoming-item special-event">
                <span className="upcoming-icon">✝️</span>
                <div className="event-details">
                  <strong>Praise & Worship Skate</strong>
                  <span className="event-date">Monday, Dec 15th • 6-8PM</span>
                </div>
              </div>
              <div className="upcoming-item special-event">
                <span className="upcoming-icon">🎓</span>
                <div className="event-details">
                  <strong>2 For 1 School's Out</strong>
                  <span className="event-date">Monday, Dec 22nd • 12:30-3PM</span>
                </div>
              </div>
              <div className="upcoming-item special-event">
                <span className="upcoming-icon">🎸</span>
                <div className="event-details">
                  <strong>80's Night & 2 For 1</strong>
                  <span className="event-date">Friday, Dec 29th • 12:30-3PM & 6:30-9PM</span>
                </div>
              </div>
              <div className="upcoming-item special-event">
                <span className="upcoming-icon">🎉</span>
                <div className="event-details">
                  <strong>Noon Year's Eve Kids Bash</strong>
                  <span className="event-date">Wednesday, Dec 31st • 12-3PM</span>
                </div>
              </div>
            </div>
            <div className="events-cta-home">
              <a href="/events" className="view-all-events">View All Events →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2>See Our Rink in Action!</h2>
          <div className="photo-grid-2x2">
            <img src="/images/KpopNight/rollerskatecloseupwide3.webp" alt="Wide view of roller skating action" />
            <img src="/images/KpopNight/busyrinkfeetangle.webp" alt="Close-up of skating action" />
            <img src="/images/KpopNight/busynightkidsskating.webp" alt="Busy night with kids skating" />
            <img src="/images/KpopNight/closeupneonadultsskates.webp" alt="Adult skaters with neon lights" />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location">
        <div className="container">
          <h2>Find Us</h2>
          <div className="location-content">
            <div className="location-info">
              <div className="info-item">
                <h3>📍 Address</h3>
                <p>7009 IN-930<br/>Fort Wayne, IN 46803</p>
              </div>
              <div className="info-item">
                <h3>📞 Phone</h3>
                <p><a href="tel:+12607498214">(260) 749-8214</a></p>
              </div>
              <div className="info-item">
                <h3>⭐ Reviews</h3>
                <p>4.4 stars on Google<br/>Family-friendly & professional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;