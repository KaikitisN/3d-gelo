// Analytics utility - logs events to console (can be replaced with real analytics)
export function logAnalyticsEvent(eventName: string, params?: Record<string, any>) {
  console.log(`[Analytics] ${eventName}`, params);
  
  // In production, this would send to your analytics service:
  // - Google Analytics 4
  // - Mixpanel
  // - Segment
  // - etc.
}
