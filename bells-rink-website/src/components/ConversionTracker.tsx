import { useEffect } from 'react';
import { track } from '../lib/analytics';

/**
 * Sitewide conversion tracking. Mounts once and listens for clicks on the
 * links that signal real intent for a phone-driven rink business:
 *   • tel:  links  → "Call Click"  (the #1 conversion — bookings happen by phone)
 *   • mailto links → "Email Click"
 *   • map links    → "Directions Click"  (someone planning a visit)
 * Each event records which page it came from, so you can see (for example)
 * how many calls the Parties page drives vs. the Home page.
 */
const ConversionTracker: React.FC = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const anchor = el && el.closest ? el.closest('a') : null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const page = window.location.pathname;

      if (href.startsWith('tel:')) {
        track('Call Click', { page, number: href.replace('tel:', '') });
      } else if (href.startsWith('mailto:')) {
        track('Email Click', { page, to: href.replace('mailto:', '') });
      } else if (/maps\.app\.goo\.gl|google\.[^/]+\/maps/.test(href)) {
        track('Directions Click', { page });
      }
    };
    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true } as any);
  }, []);

  return null;
};

export default ConversionTracker;
