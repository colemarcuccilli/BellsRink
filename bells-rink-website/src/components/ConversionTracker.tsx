import { useEffect } from 'react';
import { track } from '../lib/analytics';

/**
 * Sitewide interaction tracking. Mounts once and delegates all clicks,
 * turning the meaningful ones into named analytics events:
 *
 *   tel: link            → "Call Click"       (the #1 conversion — bookings by phone)
 *   mailto: link         → "Email Click"
 *   map link             → "Directions Click"
 *   social link          → "Social Click"     (Facebook/Instagram/TikTok/YouTube)
 *   other external link  → "Outbound Click"
 *   internal CTA button  → "CTA Click"         (which button drove intent + where it goes)
 *
 * Page-to-page navigation is already captured automatically as page views,
 * so this layer focuses on the clicks that page views can't tell you about.
 * Every event records the page it happened on.
 */

const SOCIAL = /facebook|instagram|tiktok|youtube|twitter|x\.com|linkedin|snapchat/i;
// Classes that mark an element as a call-to-action across the site.
const CTA_CLASS = /\b(cta|btn-arrow|ann-btn|view-all|anniversary-cta|nav-cta|character-cta|phone-cta|link-button|map-link)/i;

function label(el: Element): string {
  return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
}

function hostOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

const ConversionTracker: React.FC = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || !el.closest) return;
      const page = window.location.pathname;

      const anchor = el.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href') || '';

        if (href.startsWith('tel:')) return track('Call Click', { page, number: href.slice(4) });
        if (href.startsWith('mailto:')) return track('Email Click', { page, to: href.slice(7) });
        if (/maps\.app\.goo\.gl|google\.[^/]+\/maps/.test(href)) return track('Directions Click', { page });

        if (/^https?:\/\//i.test(href)) {
          const host = hostOf(href);
          if (host && !host.endsWith('bellsrink.com')) {
            if (SOCIAL.test(host)) return track('Social Click', { page, network: host });
            return track('Outbound Click', { page, to: host });
          }
        }

        // Internal call-to-action link (e.g. "Book a Party", "View Hours", "Upload Photos")
        if (CTA_CLASS.test(anchor.className || '')) {
          return track('CTA Click', { page, label: label(anchor), to: href });
        }
        return;
      }

      // Call-to-action <button> (not a form submit — those fire their own events)
      const btn = el.closest('button');
      if (btn && btn.getAttribute('type') !== 'submit' && CTA_CLASS.test(btn.className || '')) {
        track('CTA Click', { page, label: label(btn) });
      }
    };

    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true } as any);
  }, []);

  return null;
};

export default ConversionTracker;
