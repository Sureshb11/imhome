// Design tokens ported from the original I'mHome.Care site (:root CSS variables).
export const colors = {
  teal: '#0D9488',
  tealDark: '#0F766E',
  tealLight: '#E6FAF8',
  midnight: '#0F3460',
  slate: '#1E3A5F',
  warm: '#F3F8FC',
  cream: '#FAFCFF',
  amber: '#F59E0B',
  text: '#1C2B3A',
  muted: '#6B7D8E',
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  border: '#DDE8F2',
  green: '#34D399',
  footerBg: '#07101C',
} as const;

// Font family names — registered in App.tsx via @expo-google-fonts.
export const fonts = {
  serif: 'DMSerifDisplay_400Regular',
  serifItalic: 'DMSerifDisplay_400Regular_Italic',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyLight: 'Inter_300Light',
  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
} as const;

// Single breakpoint mirrors the original `@media (max-width: 900px)`.
export const MOBILE_BREAKPOINT = 900;
