import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About Bell's Skating Rink</h1>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Bell's Skating Rink has been bringing joy and excitement to families in New Haven, Indiana. 
                Owned and operated by <strong>Eric & Stacy Dunlap</strong>, we understand the importance of creating lasting memories 
                and providing a safe, fun environment for skaters of all ages.
              </p>
              <p>
                What started as a passion for roller skating has grown into a beloved community gathering place 
                where generations come together to enjoy the timeless fun of rolling on wheels. We take pride 
                in maintaining our rink to the highest standards while preserving the classic charm that makes 
                roller skating so special.
              </p>
              <div className="mission-statement">
                <h3>Our Mission</h3>
                <p>
                  <em>"Bell's Skating Rink is committed to providing a family friendly/kid friendly 
                  environment for all to enjoy. The following policies are put in place to 
                  ensure all of our wonderful customers have a safe, enjoyable, and 
                  memorable experience."</em>
                </p>
                <p className="signature">— Eric & Stacy Dunlap</p>
              </div>
              <div className="story-stats">
                <div className="stat-item">
                  <h3>4.4⭐</h3>
                  <p>Google Rating</p>
                </div>
                <div className="stat-item">
                  <h3>Family</h3>
                  <p>Owned & Operated</p>
                </div>
                <div className="stat-item">
                  <h3>100%</h3>
                  <p>Fun Guaranteed</p>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="hero-characters">
                <div className="character-showcase">
                  <div className="character-speech">"Come Skate With Us!"</div>
                  <img src="/images/kookyeatingpizza.png" alt="Kooky eating pizza" className="hero-main-character" />
                </div>
                <div className="character-showcase">
                  <div className="character-speech">"Fun Times Ahead!"</div>
                  <img src="/images/roofusholdingdiscoball.png" alt="Roofus holding disco ball" className="hero-main-character" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="detailed-services">
        <div className="container">
          <h2>What Makes Us Special</h2>
          <div className="services-list">
            <div className="service-detail">
              <div className="service-icon">🛼</div>
              <div className="service-content">
                <h3>Professional Roller Skating</h3>
                <p>
                  Our smooth, well-maintained rink provides the perfect surface for skaters of all skill levels. 
                  We provide high-quality rental skates in all sizes, regularly maintained and sanitized for 
                  your safety and comfort.
                </p>
                <ul>
                  <li>All sizes available from toddler to adult</li>
                  <li>Regular maintenance and cleaning</li>
                  <li>Professional-grade skating surface</li>
                  <li>Safe environment for beginners and experts</li>
                </ul>
              </div>
            </div>

            <div className="service-detail">
              <div className="service-icon">🍕</div>
              <div className="service-content">
                <h3>Fresh Pizza & Snacks</h3>
                <p>
                  Work up an appetite skating? We've got you covered with delicious, freshly made pizza 
                  and a variety of snacks and beverages to keep you fueled for more fun.
                </p>
                <ul>
                  <li>Fresh, hot pizza made to order</li>
                  <li>Variety of toppings available</li>
                  <li>Snacks and refreshing beverages</li>
                  <li>Family-friendly pricing</li>
                </ul>
              </div>
            </div>

            <div className="service-detail">
              <div className="service-icon">🧊</div>
              <div className="service-content">
                <h3>Refreshing Shaved Ice</h3>
                <p>
                  Cool down after your skating session with our delicious shaved ice treats. 
                  Available in multiple flavors, it's the perfect way to end a fun day at the rink.
                </p>
                <ul>
                  <li>Multiple delicious flavors</li>
                  <li>Made fresh throughout the day</li>
                  <li>Perfect cool-down treat</li>
                  <li>Kid and adult favorite</li>
                </ul>
              </div>
            </div>

            <div className="service-detail">
              <div className="service-icon">🎉</div>
              <div className="service-content">
                <h3>Birthday Parties & Events</h3>
                <p>
                  Make your special day unforgettable! We specialize in hosting birthday parties 
                  and special events that your guests will talk about for years to come.
                </p>
                <ul>
                  <li>Birthday party packages available</li>
                  <li>Group rates and special pricing</li>
                  <li>Party planning assistance</li>
                  <li>Memorable experiences guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>👨‍👩‍👧‍👦 Family First</h3>
              <p>As a family-owned business, we understand the importance of family time and creating experiences that bring people together.</p>
            </div>
            <div className="value-card">
              <h3>🛡️ Safety Always</h3>
              <p>Your safety is our top priority. Our equipment is regularly maintained and our staff is trained to ensure a safe environment.</p>
            </div>
            <div className="value-card">
              <h3>🎯 Quality Service</h3>
              <p>We're committed to providing professional, friendly service that keeps our customers coming back with smiles on their faces.</p>
            </div>
            <div className="value-card">
              <h3>🏘️ Community</h3>
              <p>We're proud to be part of the New Haven community and strive to create a welcoming space for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skates Showcase */}
      <section className="skates-showcase">
        <div className="container">
          <h2>The Art of Skating</h2>
          <div className="wide-image-container">
            <img src="/images/3RollerSkates.jpeg" alt="Three different roller skate designs" className="skates-wide-image" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Roll?</h2>
            <p>Come experience the Bell's Skating Rink difference for yourself!</p>
            <div className="cta-buttons">
              <a href="tel:+12607498214" className="btn-primary">Call Now</a>
              <a href="/contact" className="btn-secondary">Get Directions</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;