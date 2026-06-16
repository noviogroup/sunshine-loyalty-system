import { Platform } from 'react-native';

export const fontFamily = {
  regular: Platform.select({ web: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', default: 'Inter_400Regular' }),
  medium: Platform.select({ web: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', default: 'Inter_500Medium' }),
  semiBold: Platform.select({ web: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', default: 'Inter_600SemiBold' }),
  bold: Platform.select({ web: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', default: 'Inter_700Bold' }),
  extraBold: Platform.select({ web: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', default: 'Inter_800ExtraBold' }),
};

export const typography = {
  display: { fontSize: 36, fontWeight: '800' as const, fontFamily: fontFamily.extraBold, lineHeight: 42, letterSpacing: -0.8 },
  h1: { fontSize: 30, fontWeight: '800' as const, fontFamily: fontFamily.extraBold, lineHeight: 36, letterSpacing: -0.5 },
  h2: { fontSize: 23, fontWeight: '700' as const, fontFamily: fontFamily.bold, lineHeight: 30, letterSpacing: -0.25 },
  h3: { fontSize: 18, fontWeight: '700' as const, fontFamily: fontFamily.bold, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, fontFamily: fontFamily.regular, lineHeight: 23 },
  bodyMedium: { fontSize: 16, fontWeight: '500' as const, fontFamily: fontFamily.medium, lineHeight: 23 },
  bodyBold: { fontSize: 16, fontWeight: '700' as const, fontFamily: fontFamily.bold, lineHeight: 23 },
  caption: { fontSize: 14, fontWeight: '400' as const, fontFamily: fontFamily.regular, lineHeight: 20 },
  captionBold: { fontSize: 14, fontWeight: '700' as const, fontFamily: fontFamily.bold, lineHeight: 20 },
  small: { fontSize: 12, fontWeight: '400' as const, fontFamily: fontFamily.regular, lineHeight: 17 },
  smallBold: { fontSize: 12, fontWeight: '700' as const, fontFamily: fontFamily.bold, lineHeight: 17 },
  overline: { fontSize: 11, fontWeight: '800' as const, fontFamily: fontFamily.extraBold, lineHeight: 14, letterSpacing: 0.8, textTransform: 'uppercase' as const },
  button: { fontSize: 16, fontWeight: '700' as const, fontFamily: fontFamily.bold, lineHeight: 20, letterSpacing: 0.1 },
  kpiValue: { fontSize: 34, fontWeight: '800' as const, fontFamily: fontFamily.extraBold, lineHeight: 40, letterSpacing: -0.6 },
};
