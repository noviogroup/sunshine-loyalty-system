import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

interface RewardCardProps {
  title: string;
  description?: string;
  pointsCost: number;
  companyName?: string;
  expiryDate?: string;
  onPress?: () => void;
  isAvailable?: boolean;
}

const RewardCard: React.FC<RewardCardProps> = ({
  title,
  description,
  pointsCost,
  companyName,
  expiryDate,
  onPress,
  isAvailable = true,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, !isAvailable && styles.cardUnavailable]}
      onPress={onPress}
      activeOpacity={isAvailable ? 0.7 : 1}
      disabled={!isAvailable}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={[styles.pointsBadge, !isAvailable && styles.pointsBadgeUnavailable]}>
            <Ionicons
              name="diamond"
              size={12}
              color={isAvailable ? colors.primary : colors.mediumGray}
            />
            <Text style={[styles.pointsText, !isAvailable && styles.pointsTextUnavailable]}>
              {pointsCost.toLocaleString()}
            </Text>
          </View>
        </View>

        {companyName ? (
          <Text style={styles.companyName}>{companyName}</Text>
        ) : null}
      </View>

      {description ? (
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      ) : null}

      <View style={styles.footer}>
        {expiryDate ? (
          <View style={styles.expiryRow}>
            <Ionicons name="time-outline" size={14} color={colors.mediumGray} />
            <Text style={styles.expiryText}>Expires {expiryDate}</Text>
          </View>
        ) : (
          <View />
        )}

        <View style={[styles.ctaButton, !isAvailable && styles.ctaButtonDisabled]}>
          <Text style={[styles.ctaText, !isAvailable && styles.ctaTextDisabled]}>
            {isAvailable ? 'Redeem' : 'Unavailable'}
          </Text>
          {isAvailable ? (
            <Ionicons name="chevron-forward" size={14} color={colors.primary} />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
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
  cardUnavailable: {
    opacity: 0.7,
  },
  header: {
    marginBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.bodyBold,
    color: colors.charcoal,
    flex: 1,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  pointsBadgeUnavailable: {
    backgroundColor: colors.lightGray,
  },
  pointsText: {
    ...typography.smallBold,
    color: colors.primaryDark,
  },
  pointsTextUnavailable: {
    color: colors.mediumGray,
  },
  companyName: {
    ...typography.caption,
    color: colors.mediumGray,
    marginTop: 2,
  },
  description: {
    ...typography.caption,
    color: colors.darkGray,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expiryText: {
    ...typography.small,
    color: colors.mediumGray,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ctaButtonDisabled: {},
  ctaText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  ctaTextDisabled: {
    color: colors.mediumGray,
  },
});

export default RewardCard;
