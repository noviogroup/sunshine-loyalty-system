import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

interface KPICardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  change,
  changeLabel,
  icon,
}) => {
  const isPositive = change !== undefined && change >= 0;
  const changeColor = isPositive ? colors.success : colors.error;
  const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';
  const formattedChange = change !== undefined
    ? `${isPositive ? '+' : ''}${change.toFixed(1)}%`
    : null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {icon ? (
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={20} color={colors.primary} />
          </View>
        ) : null}
      </View>

      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>

      <Text style={styles.label}>{label}</Text>

      {change !== undefined ? (
        <View style={styles.changeRow}>
          <Ionicons name={changeIcon} size={14} color={changeColor} />
          <Text style={[styles.changeText, { color: changeColor }]}>
            {formattedChange}
          </Text>
          {changeLabel ? (
            <Text style={styles.changeLabel}>{changeLabel}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    ...typography.kpiValue,
    color: colors.charcoal,
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.mediumGray,
    marginBottom: spacing.sm,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    ...typography.smallBold,
  },
  changeLabel: {
    ...typography.small,
    color: colors.mediumGray,
  },
});

export default KPICard;
