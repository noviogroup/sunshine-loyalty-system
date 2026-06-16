import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

type BadgeVariant =
  | 'earned'
  | 'redeemed'
  | 'pending'
  | 'expired'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'default';

type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  earned: { bg: colors.successLight, text: colors.success },
  redeemed: { bg: colors.infoLight, text: colors.info },
  pending: { bg: colors.warningLight, text: '#92400E' },
  expired: { bg: colors.errorLight, text: colors.error },
  success: { bg: colors.successLight, text: colors.success },
  warning: { bg: colors.warningLight, text: '#92400E' },
  error: { bg: colors.errorLight, text: colors.error },
  info: { bg: colors.infoLight, text: colors.info },
  default: { bg: colors.lightGray, text: colors.mediumGray },
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
}) => {
  const colorSet = variantColors[variant];

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colorSet.bg },
        size === 'sm' ? styles.badgeSm : styles.badgeMd,
      ]}
    >
      <Text
        style={[
          size === 'sm' ? styles.textSm : styles.textMd,
          { color: colorSet.text },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeMd: {
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs,
  },
  textSm: {
    ...typography.small,
    fontWeight: '600',
  },
  textMd: {
    ...typography.caption,
    fontWeight: '600',
  },
});

export default Badge;
