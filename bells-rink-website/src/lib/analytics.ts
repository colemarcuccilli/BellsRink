import { track as vercelTrack } from '@vercel/analytics';

type Props = Record<string, string | number | boolean | null>;

/**
 * Fire a custom conversion event.
 * Sends to Vercel Web Analytics AND mirrors to Google Analytics (gtag)
 * if it's present, so both dashboards stay in sync.
 */
export function track(name: string, props?: Props): void {
  try {
    vercelTrack(name, props);
  } catch {
    /* analytics must never break the page */
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name.toLowerCase().replace(/\s+/g, '_'), props ?? {});
  }
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
