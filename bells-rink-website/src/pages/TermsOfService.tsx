import React from 'react';
import './TermsOfService.css';

const TermsOfService: React.FC = () => {
  return (
    <div className="terms-of-service">
      {/* Hero Section */}
      <section className="legal-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p className="legal-date">Effective Date: January 1, 2025</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="legal-content">
        <div className="container">
          <div className="legal-document">

            <div className="legal-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By entering Bell's Skating Rink located at 7009 IN-930, Fort Wayne, IN 46803,
                you agree to comply with and be bound by these Terms of Service. If you do not
                agree to these terms, please do not use our facility.
              </p>
            </div>

            <div className="legal-section">
              <h2>2. Use of Facility</h2>
              <p>
                Bell's Skating Rink provides roller skating entertainment for individuals and
                families. All guests must follow facility rules and staff instructions.
              </p>
              <h3>Skating Rules</h3>
              <ul>
                <li>Skating is strictly supervised to ensure safety of all skaters</li>
                <li>Fast or reckless skating is prohibited</li>
                <li>Weaving through crowds and putting others in danger is not permitted</li>
                <li>Playing tag or roughhousing on skates is prohibited</li>
                <li>Skaters must skate within their ability level</li>
                <li>Follow all posted signs and staff directions</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>3. Assumption of Risk & Waiver</h2>
              <div className="legal-highlight">
                <p>
                  <strong>IMPORTANT:</strong> Roller skating is a physical activity that carries
                  inherent risks. By participating in roller skating at Bell's Skating Rink, you
                  acknowledge and assume all risks associated with the activity, including but
                  not limited to:
                </p>
                <ul>
                  <li>Falls and collisions with other skaters or objects</li>
                  <li>Injuries including sprains, fractures, and bruises</li>
                  <li>Equipment-related injuries</li>
                  <li>Other physical injuries or property damage</li>
                </ul>
                <p>
                  <strong>Bell's Skating Rink, its owners, employees, and agents are not responsible
                  for accidents or injuries that occur on the premises. You skate at your own risk.</strong>
                </p>
              </div>
            </div>

            <div className="legal-section">
              <h2>4. Age Requirements & Supervision</h2>
              <h3>Minors</h3>
              <p>
                Children under 18 years of age must have parental consent to skate. Parents or
                legal guardians are responsible for the safety and conduct of their children.
              </p>
              <h3>In/Out Privileges</h3>
              <p>
                No in/out privileges are permitted for anyone under 18 years old for safety
                and security reasons.
              </p>
            </div>

            <div className="legal-section">
              <h2>5. Party Reservations & Cancellations</h2>
              <h3>Reservations</h3>
              <p>
                Birthday party reservations require advance booking and may require a deposit.
                Party packages are subject to availability.
              </p>
              <h3>Cancellations</h3>
              <p>
                Cancellation policies vary by package. Please contact us at (260) 749-8214 or
                (260) 403-3766 for specific cancellation terms.
              </p>
              <h3>Food Policy</h3>
              <p>
                Outside food and beverages are not permitted except for guests hosting a
                birthday party reservation.
              </p>
            </div>

            <div className="legal-section">
              <h2>6. Payment Terms</h2>
              <p>
                Bell's Skating Rink offers different pricing for cash and credit card payments:
              </p>
              <ul>
                <li><strong>Cash Pricing:</strong> Preferred payment method with discounted rates</li>
                <li><strong>Credit Card Pricing:</strong> Slightly higher rates apply to cover processing fees</li>
              </ul>
              <p>
                All prices are subject to change. Current pricing is displayed at the facility
                and on our website.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Prohibited Conduct</h2>
              <p>
                The following behaviors are strictly prohibited and may result in immediate
                removal from the premises:
              </p>
              <ul>
                <li><strong>Bullying or harassment</strong> of any kind</li>
                <li><strong>Violence or threats</strong> toward others</li>
                <li><strong>Possession or consumption</strong> of alcohol or illegal drugs</li>
                <li><strong>Being under the influence</strong> of drugs or alcohol</li>
                <li><strong>Offensive language</strong> or behavior</li>
                <li><strong>Inappropriate clothing</strong> with offensive language, imagery promoting violence, drugs, or alcohol</li>
                <li><strong>Loitering</strong> in common areas</li>
                <li><strong>Theft or vandalism</strong></li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>8. Dress Code</h2>
              <p>
                Casual dress is acceptable. Bell's Skating Rink dress codes are dictated by
                good taste and family-friendly standards. We reserve the right to refuse entry
                to anyone wearing inappropriate attire.
              </p>
            </div>

            <div className="legal-section">
              <h2>9. Liability Limitations</h2>
              <p>
                To the maximum extent permitted by law, Bell's Skating Rink and its owners,
                employees, and agents shall not be liable for:
              </p>
              <ul>
                <li>Personal injuries sustained while on the premises</li>
                <li>Loss or theft of personal property</li>
                <li>Damages to vehicles in the parking lot</li>
                <li>Injuries caused by other guests</li>
              </ul>
              <p>
                By using our facility, you agree to release and hold harmless Bell's Skating
                Rink from any and all claims, liabilities, and damages arising from your use
                of the facility.
              </p>
            </div>

            <div className="legal-section">
              <h2>10. Right to Refuse Service</h2>
              <p>
                Bell's Skating Rink reserves the right to refuse service to anyone for any
                reason, including but not limited to:
              </p>
              <ul>
                <li>Violation of these Terms of Service</li>
                <li>Violation of facility rules and policies</li>
                <li>Disruptive or dangerous behavior</li>
                <li>Failure to follow staff instructions</li>
              </ul>
              <p>
                Management has final say in all matters concerning facility use and guest conduct.
              </p>
            </div>

            <div className="legal-section">
              <h2>11. Photography & Video</h2>
              <p>
                By entering Bell's Skating Rink, you consent to being photographed or recorded
                for promotional purposes. If you do not wish to be photographed, please notify
                staff immediately.
              </p>
            </div>

            <div className="legal-section">
              <h2>12. Changes to Terms</h2>
              <p>
                Bell's Skating Rink reserves the right to modify these Terms of Service at any
                time. Changes will be effective immediately upon posting. Your continued use of
                the facility constitutes acceptance of any modified terms.
              </p>
            </div>

            <div className="legal-section">
              <h2>13. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the
                laws of the State of Indiana, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="legal-section">
              <h2>14. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>Bell's Skating Rink</strong></p>
                <p>7009 IN-930, Fort Wayne, IN 46803</p>
                <p>Phone: (260) 749-8214</p>
                <p>Phone: (260) 403-3766</p>
                <p>Owners: Eric & Stacy Dunlap</p>
              </div>
            </div>

            <div className="legal-footer">
              <p>
                By using Bell's Skating Rink, you acknowledge that you have read, understood,
                and agree to be bound by these Terms of Service.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
