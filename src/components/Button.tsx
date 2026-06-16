import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', size = 'md', disabled = false, loading = false, fullWidth = false }) => {
  const containerStyles: ViewStyle[] = [
    styles.base,
    styles[`container_${variant}`],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ].filter(Boolean) as ViewStyle[];

  const textStyles: TextStyle[] = [
    styles.textBase,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    disabled && styles.textDisabled,
  ].filter(Boolean) as TextStyle[];

  const spinnerColor = variant === 'primary' || variant === 'secondary' ? colors.white : colors.primary;

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress} disabled={disabled || loading} activeOpacity={0.78}>
      {loading ? <ActivityIndicator size="small" color={spinnerColor} /> : <Text style={textStyles}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: { borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  container_primary: { backgroundColor: colors.primary, shadowColor: colors.primaryDark, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 3 },
  container_secondary: { backgroundColor: colors.charcoal, shadowColor: colors.black, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 2 },
  container_outline: { backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.borderGray },
  container_ghost: { backgroundColor: 'transparent' },
  size_sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, minHeight: 38 },
  size_md: { paddingVertical: spacing.sm + 4, paddingHorizontal: spacing.lg, minHeight: 50 },
  size_lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, minHeight: 58 },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.52 },
  textBase: { ...typography.button },
  text_primary: { color: colors.white },
  text_secondary: { color: colors.white },
  text_outline: { color: colors.charcoal },
  text_ghost: { color: colors.primary },
  textSize_sm: { fontSize: 14 },
  textSize_md: { fontSize: 16 },
  textSize_lg: { fontSize: 17 },
  textDisabled: { opacity: 0.7 },
});

export default Button;
