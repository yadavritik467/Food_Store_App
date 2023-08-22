// utils/analytics.js
import ReactGA from 'react-ga';

export const initGA = (trackingId) => {
  ReactGA.initialize(trackingId);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

// You can add more functions to track custom events if needed
// For example, tracking button clicks, form submissions, etc.
