import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

const RewardCard: React.FC<RewardCardProps> = ({ title, description, pointsCost, companyName, expiryDate, onPress, isAvailable = true }) => {
  return (
    <TouchableOpacity style={[styles.card, !isAvailable && styles.cardUnavailable]} onPress={onPress} activeOpacity={isAvailable ? 0.76 : 1} disabled={!isAvailable}>
      <View style={styles.topRow}>
        <View style={styles.rewardIcon}>
          <MaterialCommunityIcons name="gift-outline" size={24} color={isAvailable ? colors.primary : colors.mediumGray} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {companyName ? <Text style={styles.companyName}>{companyName}</Text> : null}
        </View>
        <View style={[styles.pointsBadge, !isAvailable && styles.pointsBadgeUnavailable]}>
          <MaterialCommunityIcons name="star-four-points" size={12} color={isAvailable ? colors.primaryDark : colors.mediumGray} />
          <Text style={[styles.pointsText, !isAvailable && styles.pointsTextUnavailable]}>{pointsCost.toLocaleString()}</Text>
        </View>
      </View>

      {description ? <Text style={styles.description} numberOfLines={2}>{description}</Text> : null}

      <View style={styles.footer}>
        {expiryDate ? (
          <View style={styles.expiryRow}>
            <MaterialCommunityIcons name="calendar-clock-outline" size={14} color={colors.mediumGray} />
            <Text style={styles.expiryText}>Expires {expiryDate}</Text>
          </View>
        ) : <View />}

        <View style={[styles.ctaButton, !isAvailable && styles.ctaButtonDisabled]}>
          <Text style={[styles.ctaText, !isAvailable && styles.ctaTextDisabled]}>{isAvailable ? 'Redeem' : 'Unavailable'}</Text>
          {isAvailable ? <MaterialCommunityIcons name="arrow-right" size={14} color={colors.primary} /> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.md, borderWidth: 1, borderColor: colors.borderGray, shadowColor: colors.charcoal, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 2 },
  cardUnavailable: { opacity: 0.7 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, marginBottom: spacing.sm },
  rewardIcon: { width: 44, height: 44, borderRadius: borderRadius.lg, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  headerText: { flex: 1 },
  title: { ...typography.bodyBold, color: colors.charcoal },
  pointsBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryLight, paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs, borderRadius: borderRadius.full, gap: 4 },
  pointsBadgeUnavailable: { backgroundColor: colors.lightGray },
  pointsText: { ...typography.smallBold, color: colors.primaryDark },
  pointsTextUnavailable: { color: colors.mediumGray },
  companyName: { ...typography.caption, color: colors.mediumGray, marginTop: 1 },
  description: { ...typography.caption, color: colors.darkGray, marginBottom: spacing.sm, lineHeight: 20 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.borderGray },
  expiryRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  expiryText: { ...typography.small, color: colors.mediumGray },
  ctaButton: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ctaButtonDisabled: {},
  ctaText: { ...typography.captionBold, color: colors.primary },
  ctaTextDisabled: { color: colors.mediumGray },
});

export default RewardCard;
