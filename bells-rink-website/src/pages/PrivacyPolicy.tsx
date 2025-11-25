import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy">
      {/* Hero Section */}
      <section className="legal-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="legal-date">Effective Date: January 1, 2025</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="legal-content">
        <div className="container">
          <div className="legal-document">

            <div className="legal-intro">
              <p>
                At Bell's Skating Rink, we value your privacy and are committed to protecting
                your personal information. This Privacy Policy explains how we collect, use,
                and safeguard your information when you visit our facility or use our services.
              </p>
            </div>

            <div className="legal-section">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you provide to us directly when you:
              </p>
              <h3>Party Reservations</h3>
              <ul>
                <li>Name (party host and contact person)</li>
                <li>Phone number</li>
                <li>Email address (optional)</li>
                <li>Party details (date, time, number of guests)</li>
                <li>Payment information (processed securely)</li>
              </ul>
              <h3>Newsletter Signup</h3>
              <ul>
                <li>Email address</li>
                <li>Name (optional)</li>
              </ul>
              <h3>Contact Forms</h3>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Message content</li>
                <li>Inquiry type</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul>
                <li><strong>Party Reservations:</strong> To process and confirm your birthday party booking, communicate event details, and provide customer service</li>
                <li><strong>Newsletter:</strong> To send you updates about special events, promotions, and news about Bell's Skating Rink</li>
                <li><strong>Contact Inquiries:</strong> To respond to your questions, comments, or requests for information</li>
                <li><strong>Service Improvement:</strong> To better understand our customers' needs and improve our facility and services</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>3. Information Sharing</h2>
              <div className="privacy-highlight">
                <p>
                  <strong>We do not sell, trade, or rent your personal information to third parties.</strong>
                </p>
              </div>
              <p>
                We may share your information only in the following limited circumstances:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, processing payments, or conducting our business (e.g., email service providers, payment processors)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law, court order, or government regulation</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>4. Cookies & Tracking Technologies</h2>
              <h3>Website Analytics</h3>
              <p>
                We use Google Analytics to understand how visitors interact with our website.
                This service collects information such as:
              </p>
              <ul>
                <li>Pages visited and time spent on each page</li>
                <li>Device type and browser information</li>
                <li>Geographic location (city/region level)</li>
                <li>Referral source (how you found our website)</li>
              </ul>
              <p>
                Google Analytics uses cookies to collect this data. You can opt out of Google
                Analytics by installing the Google Analytics Opt-out Browser Add-on.
              </p>
              <h3>Cookies</h3>
              <p>
                Our website may use cookies to enhance your experience. You can control cookie
                preferences through your browser settings.
              </p>
            </div>

            <div className="legal-section">
              <h2>5. Newsletter Communications</h2>
              <h3>Opt-In</h3>
              <p>
                Our newsletter is opt-in only. We will only send you promotional emails if you
                explicitly subscribe to our mailing list.
              </p>
              <h3>Unsubscribe</h3>
              <p>
                You can unsubscribe from our newsletter at any time by:
              </p>
              <ul>
                <li>Clicking the "unsubscribe" link at the bottom of any newsletter email</li>
                <li>Contacting us directly at (260) 749-8214 or (260) 403-3766</li>
              </ul>
              <p>
                We will process your unsubscribe request promptly, typically within 48 hours.
              </p>
            </div>

            <div className="legal-section">
              <h2>6. Children's Privacy</h2>
              <p>
                Bell's Skating Rink is a family-friendly facility that serves children and
                families. We do not knowingly collect personal information from children under
                13 without parental consent.
              </p>
              <p>
                For party reservations involving children under 13, we collect information from
                the parent or legal guardian only. Parents have the right to:
              </p>
              <ul>
                <li>Review information collected about their child</li>
                <li>Request deletion of their child's information</li>
                <li>Refuse further collection of their child's information</li>
              </ul>
              <p>
                If you believe we have collected information from a child under 13 without
                proper consent, please contact us immediately.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Data Security</h2>
              <p>
                We take reasonable measures to protect your personal information from
                unauthorized access, use, or disclosure. These measures include:
              </p>
              <ul>
                <li>Secure payment processing through trusted providers</li>
                <li>Limited access to personal information by authorized personnel only</li>
                <li>Regular security assessments and updates</li>
              </ul>
              <p>
                However, no method of transmission over the Internet or electronic storage is
                100% secure. While we strive to protect your information, we cannot guarantee
                absolute security.
              </p>
            </div>

            <div className="legal-section">
              <h2>8. Your Privacy Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we have about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the information
                provided in Section 11.
              </p>
            </div>

            <div className="legal-section">
              <h2>9. Data Retention</h2>
              <p>
                We retain your personal information only as long as necessary to fulfill the
                purposes for which it was collected, including:
              </p>
              <ul>
                <li>Party reservation records: Retained for business and tax purposes</li>
                <li>Newsletter subscriptions: Until you unsubscribe</li>
                <li>Contact form inquiries: Deleted after resolution of your inquiry</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or legal requirements. We will post the updated policy on our website
                with a new effective date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically. Your continued use
                of our services after changes are posted constitutes acceptance of the updated
                policy.
              </p>
            </div>

            <div className="legal-section">
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy
                or our privacy practices, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>Bell's Skating Rink</strong></p>
                <p>7009 IN-930, Fort Wayne, IN 46803</p>
                <p>Phone: (260) 749-8214</p>
                <p>Phone: (260) 403-3766</p>
                <p>Owners: Eric & Stacy Dunlap</p>
              </div>
              <p className="contact-note">
                We will respond to your inquiry as soon as possible, typically within 3-5
                business days.
              </p>
            </div>

            <div className="legal-footer">
              <p>
                Thank you for trusting Bell's Skating Rink with your personal information.
                We are committed to protecting your privacy and providing a safe, enjoyable
                experience for all our guests.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
