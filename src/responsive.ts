import { useWindowDimensions } from 'react-native';
import { MOBILE_BREAKPOINT } from './theme';

// Layout helper: `isMobile` drives single-column stacking, hidden nav links, etc.
export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isMobile = width <= MOBILE_BREAKPOINT;
  // Horizontal page padding = 5% of viewport in the original CSS.
  const pagePadding = Math.max(16, Math.round(width * 0.05));
  return { width, height, isMobile, pagePadding };
}
