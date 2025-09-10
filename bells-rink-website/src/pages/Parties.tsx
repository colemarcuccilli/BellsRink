import React from 'react';
import './Parties.css';

const Parties: React.FC = () => {
  return (
    <div className="parties">
      {/* Hero Section */}
      <section className="parties-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Birthday Party Packages</h1>
              <p className="hero-subtitle">Book that next special birthday party with Bell's Skating Rink and bring the kids out for a rockin' rollin' great time!</p>
              <div className="hero-cta">
                <a href="tel:+12604033766" className="cta-primary">Call (260) 403-3766 for Reservations</a>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-characters">
                <div className="character-showcase">
                  <div className="character-speech">"Let's Party!"</div>
                  <img src="/images/skatereatincake.png" alt="Skater eating cake" className="hero-main-character" />
                </div>
                <div className="character-showcase">
                  <div className="character-speech">"Time to Celebrate!"</div>
                  <img src="/images/kookypartypopper.png" alt="Kooky with party popper" className="hero-main-character" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages">
        <div className="container">
          <h2>Choose Your Perfect Party Package</h2>
          <div className="packages-grid">
            
            {/* Package 1 */}
            <div className="package-card">
              <div className="package-header">
                <h3>Package #1</h3>
                <div className="package-size">Up to 10 Skaters</div>
              </div>
              <div className="package-pricing">
                <div className="price-main">
                  <span className="price-cash">$100</span>
                  <span className="price-label">Cash</span>
                </div>
                <div className="price-alt">
                  <span className="price-cc">$110</span>
                  <span className="price-label">Credit Card</span>
                </div>
              </div>
              <div className="package-features">
                <div className="feature">
                  <span className="feature-icon">⏰</span>
                  <span>2.5 Hours of Skating</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🪑</span>
                  <span>Reserved Seating w/1 Table</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🛼</span>
                  <span>Admission & Skate Rental for Up to 10</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎵</span>
                  <span>Special DJ Announcement with Birthday Song</span>
                </div>
                <div className="feature special">
                  <span className="feature-icon">✨</span>
                  <span>Free Glow Stick for Birthday Child</span>
                </div>
              </div>
            </div>

            {/* Package 2 */}
            <div className="package-card popular">
              <div className="package-header">
                <h3>Package #2</h3>
                <div className="package-size">Up to 20 Skaters</div>
              </div>
              <div className="package-pricing">
                <div className="price-main">
                  <span className="price-cash">$210</span>
                  <span className="price-label">Cash</span>
                </div>
                <div className="price-alt">
                  <span className="price-cc">$220</span>
                  <span className="price-label">Credit Card</span>
                </div>
              </div>
              <div className="package-features">
                <div className="feature">
                  <span className="feature-icon">⏰</span>
                  <span>2.5 Hours of Skating</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🪑</span>
                  <span>Reserved Seating w/2 Tables</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🛼</span>
                  <span>Admission & Skate Rental for Up to 20</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎵</span>
                  <span>Special DJ Announcement with Birthday Song</span>
                </div>
                <div className="feature special">
                  <span className="feature-icon">✨</span>
                  <span>Free Glow Stick for Birthday Child</span>
                </div>
              </div>
            </div>

            {/* Package 3 */}
            <div className="package-card premium">
              <div className="package-header">
                <h3>Package #3 (Party Room)</h3>
                <div className="package-size">Unlimited Skaters</div>
              </div>
              <div className="package-pricing">
                <div className="price-main">
                  <span className="price-cash">$290</span>
                  <span className="price-label">Cash</span>
                </div>
                <div className="price-alt">
                  <span className="price-cc">$300</span>
                  <span className="price-label">Credit Card</span>
                </div>
              </div>
              <div className="package-features">
                <div className="feature">
                  <span className="feature-icon">⏰</span>
                  <span>2.5 Hours of Skating</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🛼</span>
                  <span>Admission & Skate Rental for Unlimited Skaters</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎵</span>
                  <span>Special DJ Announcement with Birthday Song</span>
                </div>
                <div className="feature special">
                  <span className="feature-icon">✨</span>
                  <span>Free Glow Stick for Birthday Child</span>
                </div>
              </div>
            </div>

            {/* Private Party */}
            <div className="package-card exclusive">
              <div className="package-header">
                <h3>Private Birthday Party</h3>
                <div className="package-size">Unlimited Skaters - Rink Privately</div>
              </div>
              <div className="package-pricing">
                <div className="price-main">
                  <span className="price-cash">$380</span>
                  <span className="price-label">Cash</span>
                </div>
                <div className="price-alt">
                  <span className="price-cc">$390</span>
                  <span className="price-label">Credit Card</span>
                </div>
              </div>
              <div className="package-features">
                <div className="feature">
                  <span className="feature-icon">⏰</span>
                  <span>2 Hours of Skating</span>
                </div>
                <div className="feature exclusive-feature">
                  <span className="feature-icon">🏆</span>
                  <span>Rink Privately - Just for You!</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🛼</span>
                  <span>Admission & Skate Rental for Unlimited Skaters</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎵</span>
                  <span>Special DJ Announcement with Birthday Song</span>
                </div>
                <div className="feature special">
                  <span className="feature-icon">✨</span>
                  <span>Free Glow Stick for Birthday Child</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Party Details */}
      <section className="party-details">
        <div className="container">
          <div className="details-grid">
            <div className="details-card">
              <h3>🍕 Bring Your Own Everything!</h3>
              <p>You're more than welcome to bring in all of your own:</p>
              <ul>
                <li>Pop/Beverages</li>
                <li>Cake & Ice Cream</li>
                <li>Food & Snacks</li>
                <li>Decorations</li>
              </ul>
              <p className="note">Available with any of our party packages!</p>
            </div>

            <div className="details-card">
              <h3>📅 Package Availability</h3>
              <div className="availability">
                <h4>Packages 1-3 Available:</h4>
                <ul>
                  <li>Friday & Saturday Nights: 6:30 PM - 9:00 PM</li>
                  <li>Saturday & Sunday Afternoons: 12:30 PM - 3:00 PM</li>
                </ul>
                <h4>Private Parties Available:</h4>
                <ul>
                  <li>Saturday & Sunday Afternoons: 4:00 PM - 6:00 PM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="party-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Book Your Party?</h2>
            <p>Call us today to reserve your perfect birthday party package!</p>
            <div className="cta-buttons">
              <a href="tel:+12604033766" className="btn-primary">
                📞 Call (260) 403-3766
              </a>
              <a href="/contact" className="btn-secondary">Get More Info</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parties;