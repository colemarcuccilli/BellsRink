import React, { useMemo } from 'react';
import Newsletter from '../components/Newsletter';
import './Home.css';

const Home: React.FC = () => {
  const allSpecialEvents = useMemo(() => {
    return [
      {
        name: 'Kpop Demon Hunter Skate',
        date: 'Saturday, Dec 6th',
        time: '6:30-9PM',
        dateValue: new Date('2025-12-06'),
        icon: '🎵'
      },
      {
        name: 'Toy Drive',
        date: 'Sunday, Dec 14th',
        time: 'During Regular Hours',
        dateValue: new Date('2025-12-14'),
        icon: '🎁'
      },
      {
        name: 'Praise & Worship Skate',
        date: 'Monday, Dec 15th',
        time: '6-8PM',
        dateValue: new Date('2025-12-15'),
        icon: '✝️'
      },
      {
        name: '2 For 1 School\'s Out',
        date: 'Monday, Dec 22nd',
        time: '12:30-3PM',
        dateValue: new Date('2025-12-22'),
        icon: '🎓'
      },
      {
        name: '80\'s Night & 2 For 1',
        date: 'Friday, Dec 29th',
        time: '12:30-3PM & 6:30-9PM',
        dateValue: new Date('2025-12-29'),
        icon: '🎸'
      },
      {
        name: 'Noon Year\'s Eve Kids Bash',
        date: 'Wednesday, Dec 31st',
        time: '12-3PM',
        dateValue: new Date('2025-12-31'),
        icon: '🎉'
      },
      {
        name: 'Praise & Worship Skate',
        date: 'Monday, Jan 26th',
        time: '6-8PM',
        dateValue: new Date('2026-01-26'),
        icon: '✝️'
      },
      {
        name: 'Afternoon Homeschool Skate',
        date: 'Friday, Jan 30th',
        time: '12-2PM',
        dateValue: new Date('2026-01-30'),
        icon: '📚'
      },
      {
        name: 'Afternoon Homeschool Skate',
        date: 'Friday, Feb 13th',
        time: '12-2PM',
        dateValue: new Date('2026-02-13'),
        icon: '📚'
      },
      {
        name: 'Valentine\'s Day Late Skate',
        date: 'Saturday, Feb 14th',
        time: '6:30-11PM',
        dateValue: new Date('2026-02-14'),
        icon: '❤️'
      },
      {
        name: 'Schools Out Skate',
        date: 'Monday, Feb 16th',
        time: '12:30-3PM',
        dateValue: new Date('2026-02-16'),
        icon: '🎓'
      },
      {
        name: 'Dollar Skate',
        date: 'Wednesday, Feb 18th',
        time: '6-8PM',
        dateValue: new Date('2026-02-18'),
        icon: '💰'
      },
      {
        name: 'Dollar Skate',
        date: 'Wednesday, Feb 25th',
        time: '6-8PM',
        dateValue: new Date('2026-02-25'),
        icon: '💰'
      },
      {
        name: 'Afternoon Homeschool Skate',
        date: 'Friday, Feb 27th',
        time: '12-2PM',
        dateValue: new Date('2026-02-27'),
        icon: '📚'
      },
      {
        name: 'Late Night Glow Skate with DJ Krazy K',
        date: 'Saturday, Feb 28th',
        time: '6:30-9PM',
        dateValue: new Date('2026-02-28'),
        icon: '🎵'
      },
      {
        name: '$1 Night',
        date: 'Wednesday, Apr 15th',
        time: '6-8PM',
        dateValue: new Date('2026-04-15'),
        icon: '💰'
      },
      {
        name: 'Family Pizza Night with DJ Krazy K',
        date: 'Friday, Apr 17th',
        time: '6:30-9PM',
        dateValue: new Date('2026-04-17'),
        icon: '🍕'
      },
      {
        name: 'Roll & Glow with DJ Krazy K',
        date: 'Saturday, Apr 18th',
        time: '6:30-9PM',
        dateValue: new Date('2026-04-18'),
        icon: '✨'
      },
      {
        name: 'Family Fun Skate',
        date: 'Sunday, Apr 19th',
        time: '12:30-3PM',
        dateValue: new Date('2026-04-19'),
        icon: '⛸️'
      },
      {
        name: 'Adult Skate Night 18+ with DJ Krazy K',
        date: 'Sunday, Apr 19th',
        time: '8-11PM',
        dateValue: new Date('2026-04-19'),
        icon: '🌙'
      },
      {
        name: '$1 Night',
        date: 'Wednesday, Apr 29th',
        time: '6-8PM',
        dateValue: new Date('2026-04-29'),
        icon: '💰'
      }
    ];
  }, []);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allSpecialEvents
      .filter(event => event.dateValue >= today)
      .slice(0, 6);
  }, [allSpecialEvents]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="eyebrow-divider">Fort Wayne · Since 1926 · Family Owned</div>
            <h1 className="poster-headline hero-poster">
              Roll, Glow &amp; <span className="script-accent gold">family fun</span><br />
              On Wheels.
            </h1>
            <p className="hero-subtitle">A neighborhood skating rink where the disco lights never quit, the pizza comes hot, and every family knows which lane is theirs. Three generations rolling on these floors.</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="meta-label">Google Rating</span>
                <span className="stat-number">4.4 ★</span>
              </div>
              <div className="stat">
                <span className="meta-label">Owned & Operated</span>
                <span className="stat-number">Family</span>
              </div>
            </div>
            <div className="hero-cta">
              <a href="tel:+12607498214" className="btn-arrow solid">
                Call to Book <span className="arrow">→</span>
              </a>
              <a href="#hours" className="btn-arrow outline">
                View Hours <span className="arrow">→</span>
              </a>
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

      {/* Marquee scroller */}
      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {/* Duplicated content for seamless loop */}
          <span className="marquee-purple">DISCO NIGHTS</span>
          <span className="marquee-star">★</span>
          <span className="marquee-script">family fun,</span>
          <span className="marquee-star">★</span>
          <span className="marquee-gold">PIZZA &amp; PITCHERS</span>
          <span className="marquee-star">★</span>
          <span className="marquee-script">roll &amp; glow</span>
          <span className="marquee-star">★</span>
          <span className="marquee-pink">SKATE EVERY WEEK</span>
          <span className="marquee-star">★</span>
          <span className="marquee-script">since 1926</span>
          <span className="marquee-star">★</span>
          {/* Duplicate */}
          <span className="marquee-purple">DISCO NIGHTS</span>
          <span className="marquee-star">★</span>
          <span className="marquee-script">family fun,</span>
          <span className="marquee-star">★</span>
          <span className="marquee-gold">PIZZA &amp; PITCHERS</span>
          <span className="marquee-star">★</span>
          <span className="marquee-script">roll &amp; glow</span>
          <span className="marquee-star">★</span>
          <span className="marquee-pink">SKATE EVERY WEEK</span>
          <span className="marquee-star">★</span>
          <span className="marquee-script">since 1926</span>
          <span className="marquee-star">★</span>
        </div>
      </section>

      {/* 100th Anniversary Banner */}
      <section className="anniversary-banner">
        <div className="container">
          <div className="anniversary-content">
            <div className="anniversary-badge-home">
              <span className="ann-number">100</span>
              <span className="ann-label">YEARS</span>
            </div>
            <div className="anniversary-text">
              <h2>Celebrating 100 Years of Bell's!</h2>
              <p>
                Since 1926, Bell's Skating Rink has been a Fort Wayne tradition. We're celebrating
                a century of family fun and we want YOUR photos! Share pictures from over the years —
                last weekend or decades ago.
              </p>
            </div>
            <div className="anniversary-actions">
              <a href="/gallery#upload" className="ann-btn-primary">📸 Upload Photos</a>
              <a href="mailto:bellsrollerrink@gmail.com" className="ann-btn-secondary">🎥 Email Videos</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="services-background">
          <img src="/images/Valentines/groupogkidsskating.webp" alt="Kids skating at the rink" className="background-image" />
        </div>
        <div className="container">
          <div className="section-eyebrow">
            <span className="eyebrow-tag">What we do</span>
          </div>
          <h2 className="poster-headline section-headline">
            Skating, snacks &amp; <span className="script-accent">good times.</span>
          </h2>
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
          <div className="section-eyebrow">
            <span className="eyebrow-tag">Summer hours</span>
          </div>
          <h2 className="poster-headline section-headline">
            Summer skating, <span className="script-accent">all week long.</span>
          </h2>
          <div className="sessions-grid">
            <div className="session-card special">
              <div className="session-header">
                <h3>Tuesday Night Adult Skate/Dance</h3>
                <div className="session-time">8:00 PM - 10:30 PM</div>
              </div>
              <div className="session-price">$10 Admission</div>
              <p>21+ Only • DJ Krazy K • Includes skate rental</p>
            </div>

            <div className="session-card deal">
              <div className="session-header">
                <h3>Wednesday Dollar Night</h3>
                <div className="session-time">6:00 PM - 8:00 PM</div>
              </div>
              <div className="session-pricing">
                <div className="session-price">$1 Admission</div>
                <div className="family-deal">
                  <strong>$1 Skate Rental</strong>
                  <p>The best deal in town!</p>
                </div>
              </div>
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
                <h3>Saturday Night with DJ Krazy K</h3>
                <div className="session-time">8:00 PM - 10:00 PM</div>
              </div>
              <div className="session-price">$10 Admission</div>
              <div className="special-feature">
                <span className="glow-icon">✨</span>
                <p>Starting 6/27 • Skates included</p>
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

            <div className="session-card special">
              <div className="session-header">
                <h3>Sunday Adult Skate Night</h3>
                <div className="session-time">8:00 PM - 11:00 PM</div>
              </div>
              <div className="session-price">$10 Admission</div>
              <p>18+ Only • DJ Krazy K • Includes skate rental</p>
            </div>

            <div className="session-character-only">
              <img src="/images/roofuseatingpizza.png" alt="Roofus eating pizza" className="session-character-card" />
            </div>
          </div>

          <div className="upcoming-sessions">
            <h3>Special Events This Month</h3>
            <div className="upcoming-list">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <div key={index} className="upcoming-item special-event">
                    <span className="upcoming-icon">{event.icon}</span>
                    <div className="event-details">
                      <strong>{event.name}</strong>
                      <span className="event-date">
                        {event.date}{event.time ? ` • ${event.time}` : ''}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-upcoming-events">No upcoming events at this time. Check back soon!</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-eyebrow">
            <span className="eyebrow-tag">Photos</span>
          </div>
          <h2 className="poster-headline section-headline">
            See the rink <span className="script-accent gold">in motion.</span>
          </h2>
          <div className="photo-grid-2x2">
            <img src="/images/Valentines/groupofkids.webp" alt="Group of kids at the rink" />
            <img src="/images/Valentines/DJ.webp" alt="DJ spinning tracks at the rink" />
            <img src="/images/Valentines/dancer.webp" alt="Skater showing off dance moves" />
            <img src="/images/Valentines/overlookingskatinggame.webp" alt="Overlooking a skating game" />
          </div>
          <div className="events-cta-home">
            <a href="/gallery" className="view-all-events">View Full Gallery</a>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location">
        <div className="container">
          <div className="section-eyebrow">
            <span className="eyebrow-tag">Visit</span>
          </div>
          <h2 className="poster-headline section-headline">
            Where the <span className="script-accent">good times</span> roll.
          </h2>
          <div className="location-content">
            <div className="location-info">
              <div className="info-item">
                <span className="meta-label">Address</span>
                <p className="info-value">7009 IN-930<br/>Fort Wayne, IN 46803</p>
              </div>
              <div className="info-item">
                <span className="meta-label">Phone</span>
                <p className="info-value"><a href="tel:+12607498214">(260) 749-8214</a></p>
              </div>
              <div className="info-item">
                <span className="meta-label">Reviews</span>
                <p className="info-value">4.4 stars on Google<br/>Family-friendly & professional</p>
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