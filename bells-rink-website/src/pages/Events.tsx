import React from 'react';
import './Events.css';

const Events: React.FC = () => {
  const events = [
    {
      date: 'Friday, December 5th',
      name: null,
      time: null,
      icon: '🎄',
      color: 'holiday'
    },
    {
      date: 'Saturday, December 6th',
      name: 'Kpop Demon Hunter Skate',
      time: '6:30 PM - 9:00 PM',
      icon: '🎵',
      color: 'music'
    },
    {
      date: 'Saturday, December 13th',
      name: null,
      time: null,
      icon: '⛸️',
      color: 'default'
    },
    {
      date: 'Sunday, December 14th',
      name: 'Toy Drive',
      time: null,
      icon: '🎁',
      color: 'special'
    },
    {
      date: 'Monday, December 15th',
      name: 'Praise And Worship Skate',
      time: '6:00 PM - 8:00 PM',
      icon: '✝️',
      color: 'worship'
    },
    {
      date: 'Monday, December 22nd',
      name: '2 For 1 School\'s Out Skate',
      time: '12:30 PM - 3:00 PM',
      icon: '🎓',
      color: 'deal'
    },
    {
      date: 'Friday, December 29th',
      name: '2 For 1 School\'s Out Skate & 80\'s Night',
      time: '12:30 PM - 3:00 PM & 6:30 PM - 9:00 PM',
      icon: '🎸',
      color: 'retro'
    },
    {
      date: 'Monday, December 29th',
      name: '2 For 1 School\'s Out Skate',
      time: '12:30 PM - 3:00 PM',
      icon: '🎓',
      color: 'deal'
    },
    {
      date: 'Wednesday, December 31st',
      name: 'Noon Year\'s Eve Kids Bash',
      time: '12:00 PM - 3:00 PM',
      icon: '🎉',
      color: 'celebration'
    }
  ];

  return (
    <div className="events">
      {/* Hero Section */}
      <section className="events-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Special Events</h1>
              <p className="hero-subtitle">Join us for exciting themed skate nights and special celebrations at Bell's Skating Rink!</p>
              <div className="hero-cta">
                <a href="tel:+12607498214" className="cta-primary">Call for Details</a>
                <a href="/parties" className="cta-secondary">View Parties</a>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-characters">
                <div className="character-showcase">
                  <div className="character-speech">"Fun Events Ahead!"</div>
                  <img src="/images/roofuspartyhat.png" alt="Roofus party hat" className="hero-main-character" />
                </div>
                <div className="character-showcase">
                  <div className="character-speech">"Let's Celebrate!"</div>
                  <img src="/images/kookypartypopper.png" alt="Kooky party popper" className="hero-main-character" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar Section */}
      <section className="events-calendar">
        <div className="events-background">
          <img src="/images/busynightkidsskating.webp" alt="Kids skating at night" className="background-image" />
        </div>
        <div className="container">
          <h2>December 2025 Events</h2>
          <div className="events-grid">
            {events.map((event, index) => (
              <div key={index} className={`event-card ${event.color}`}>
                <div className="event-icon">{event.icon}</div>
                <div className="event-date">{event.date}</div>
                {event.name && (
                  <div className="event-name">{event.name}</div>
                )}
                {event.time && (
                  <div className="event-time">{event.time}</div>
                )}
                {!event.name && !event.time && (
                  <div className="event-tba">Details Coming Soon</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="event-highlights">
        <div className="container">
          <h2>Event Highlights</h2>
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">🎵</div>
              <h3>Themed Music Nights</h3>
              <p>Experience special music themes like Kpop, 80's Night, and Praise & Worship skating sessions!</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🎁</div>
              <h3>Holiday Celebrations</h3>
              <p>Join us for festive events including our Toy Drive and Noon Year's Eve Kids Bash!</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">💰</div>
              <h3>2 For 1 Deals</h3>
              <p>Take advantage of our School's Out specials with 2 for 1 admission throughout the holidays!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Showcase Section */}
      <section className="photo-showcase">
        <div className="container">
          <h2>Experience the Excitement</h2>
          <div className="photo-gallery">
            <div className="photo-card large">
              <img src="/images/KpopNight/closeupneonadultsskates.webp" alt="Neon roller skates closeup" className="showcase-photo" />
              <div className="photo-overlay">
                <div className="photo-caption">Glow in the Dark Fun!</div>
              </div>
            </div>
            <div className="photo-card">
              <img src="/images/KpopNight/busynightkidsskating.webp" alt="Busy night kids skating" className="showcase-photo" />
              <div className="photo-overlay">
                <div className="photo-caption">Family Night Fun</div>
              </div>
            </div>
            <div className="photo-card">
              <img src="/images/KpopNight/closeupkidsskates.webp" alt="Kids skating closeup" className="showcase-photo" />
              <div className="photo-overlay">
                <div className="photo-caption">All Ages Welcome</div>
              </div>
            </div>
            <div className="photo-card">
              <img src="/images/KpopNight/rollerskatecloseupwide.webp" alt="Roller skate closeup" className="showcase-photo" />
              <div className="photo-overlay">
                <div className="photo-caption">Classic Skating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Character Showcase */}
      <section className="character-section">
        <div className="container">
          <div className="character-display">
            <img src="/images/skaterfast.png" alt="Skater fast" className="event-character" />
            <div className="character-message">
              <h3>Don't Miss Out!</h3>
              <p>Follow us for updates on special events and last-minute announcements!</p>
              <a href="tel:+12607498214" className="character-cta">Call (260) 749-8214</a>
            </div>
            <img src="/images/roofuseatingpizza.png" alt="Roofus eating pizza" className="event-character" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="events-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Want More Information?</h2>
            <p>Call us to learn more about our special events and themed nights!</p>
            <div className="cta-buttons">
              <a href="tel:+12607498214" className="btn-primary">
                📞 Call (260) 749-8214
              </a>
              <a href="/parties" className="btn-secondary">Book a Party</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
