import { Platform } from 'react-native';

const fontFamily = Platform.select({
  web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  default: undefined,
});

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, fontFamily, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '700' as const, fontFamily, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, fontFamily, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, fontFamily, lineHeight: 22 },
  bodyBold: { fontSize: 16, fontWeight: '600' as const, fontFamily, lineHeight: 22 },
  caption: { fontSize: 14, fontWeight: '400' as const, fontFamily, lineHeight: 18 },
  captionBold: { fontSize: 14, fontWeight: '600' as const, fontFamily, lineHeight: 18 },
  small: { fontSize: 12, fontWeight: '400' as const, fontFamily, lineHeight: 16 },
  smallBold: { fontSize: 12, fontWeight: '600' as const, fontFamily, lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '600' as const, fontFamily, lineHeight: 20 },
  kpiValue: { fontSize: 32, fontWeight: '700' as const, fontFamily, lineHeight: 38 },
};
