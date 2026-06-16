import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../src/theme';
import { Card } from '../../src/components';

interface TierData {
  tier: string;
  percentage: number;
  color: string;
  count: number;
}

const tierDistribution: TierData[] = [
  { tier: 'Bronze', percentage: 45, color: colors.tierBronze, count: 561 },
  { tier: 'Silver', percentage: 30, color: colors.tierSilver, count: 374 },
  { tier: 'Gold', percentage: 18, color: colors.tierGold, count: 225 },
  { tier: 'Platinum', percentage: 7, color: colors.tierPlatinum, count: 87 },
];

interface RedemptionCategory {
  category: string;
  percentage: number;
  icon: string;
}

const topRedemptions: RedemptionCategory[] = [
  { category: 'Insurance Discounts', percentage: 32, icon: 'shield-checkmark-outline' },
  { category: 'Financial Services', percentage: 28, icon: 'wallet-outline' },
  { category: 'Gift Cards', percentage: 22, icon: 'card-outline' },
  { category: 'Priority Services', percentage: 12, icon: 'flash-outline' },
  { category: 'Experiences', percentage: 6, icon: 'ticket-outline' },
];

function TierBar({ tier, percentage, color, count }: TierData) {
  return (
    <View style={tierStyles.row}>
      <View style={tierStyles.labelContainer}>
        <View style={[tierStyles.dot, { backgroundColor: color }]} />
        <Text style={tierStyles.tierName}>{tier}</Text>
      </View>
      <View style={tierStyles.barContainer}>
        <View
          style={[
            tierStyles.barFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <View style={tierStyles.valuesContainer}>
        <Text style={tierStyles.percentage}>{percentage}%</Text>
        <Text style={tierStyles.count}>{count.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const tierStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
  },
  labelContainer: {
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  tierName: {
    ...typography.captionBold,
    color: colors.darkGray,
  },
  barContainer: {
    flex: 1,
    height: 20,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    marginHorizontal: spacing.sm,
  },
  barFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  valuesContainer: {
    width: 70,
    alignItems: 'flex-end',
  },
  percentage: {
    ...typography.captionBold,
    color: colors.charcoal,
  },
  count: {
    ...typography.small,
    color: colors.mediumGray,
  },
});

export default function InsightsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Customer Insights</Text>
        <Text style={styles.pageSubtitle}>
          Membership analytics and engagement metrics
        </Text>

        {/* Tier Distribution */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tier Distribution</Text>
        </View>

        <Card style={styles.tierCard}>
          <View style={styles.tierHeader}>
            <Ionicons name="podium-outline" size={20} color={colors.charcoal} />
            <Text style={styles.tierHeaderText}>
              1,247 Total Members Across All Tiers
            </Text>
          </View>
          {tierDistribution.map((tier) => (
            <TierBar key={tier.tier} {...tier} />
          ))}
        </Card>

        {/* Cross-Company Engagement */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cross-Company Engagement</Text>
        </View>

        <Card style={styles.engagementCard}>
          <View style={styles.engagementRow}>
            <View style={styles.engagementIcon}>
              <Ionicons name="link" size={28} color={colors.primary} />
            </View>
            <View style={styles.engagementContent}>
              <Text style={styles.engagementValue}>34%</Text>
              <Text style={styles.engagementLabel}>
                of members are linked to 2 or more companies
              </Text>
            </View>
          </View>
          <View style={styles.engagementDivider} />
          <View style={styles.engagementDetails}>
            <View style={styles.engagementDetail}>
              <Text style={styles.detailValue}>66%</Text>
              <Text style={styles.detailLabel}>Single Company</Text>
            </View>
            <View style={styles.engagementDetailDivider} />
            <View style={styles.engagementDetail}>
              <Text style={styles.detailValue}>34%</Text>
              <Text style={styles.detailLabel}>Multi-Company</Text>
            </View>
          </View>
          <Text style={styles.engagementNote}>
            Members linked to both Sunshine Finance and Sunshine Insurance show
            42% higher engagement and 58% more points redeemed on average.
          </Text>
        </Card>

        {/* Top Redemption Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Redemption Categories</Text>
        </View>

        <Card style={styles.redemptionCard}>
          {topRedemptions.map((item, index) => (
            <View key={item.category}>
              <View style={styles.redemptionRow}>
                <View style={styles.redemptionLeft}>
                  <View style={styles.redemptionRank}>
                    <Text style={styles.rankText}>{index + 1}</Text>
                  </View>
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={colors.mediumGray}
                  />
                  <Text style={styles.redemptionCategory}>{item.category}</Text>
                </View>
                <View style={styles.redemptionRight}>
                  <View style={styles.redemptionBarOuter}>
                    <View
                      style={[
                        styles.redemptionBarInner,
                        { width: `${item.percentage}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.redemptionPercent}>{item.percentage}%</Text>
                </View>
              </View>
              {index < topRedemptions.length - 1 && (
                <View style={styles.redemptionDivider} />
              )}
            </View>
          ))}
        </Card>

        {/* New vs Returning */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New vs Returning Members</Text>
        </View>

        <Card style={styles.newReturnCard}>
          <View style={styles.newReturnRow}>
            <View style={styles.newReturnCol}>
              <View
                style={[
                  styles.newReturnIconContainer,
                  { backgroundColor: colors.successLight },
                ]}
              >
                <Ionicons
                  name="person-add-outline"
                  size={24}
                  color={colors.success}
                />
              </View>
              <Text style={styles.newReturnValue}>89</Text>
              <Text style={styles.newReturnLabel}>New Members</Text>
              <Text style={styles.newReturnSub}>This Month</Text>
            </View>

            <View style={styles.newReturnDivider} />

            <View style={styles.newReturnCol}>
              <View
                style={[
                  styles.newReturnIconContainer,
                  { backgroundColor: colors.infoLight },
                ]}
              >
                <Ionicons
                  name="refresh-outline"
                  size={24}
                  color={colors.info}
                />
              </View>
              <Text style={styles.newReturnValue}>1,158</Text>
              <Text style={styles.newReturnLabel}>Returning Members</Text>
              <Text style={styles.newReturnSub}>Active Accounts</Text>
            </View>
          </View>

          <View style={styles.retentionRow}>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={colors.success}
            />
            <Text style={styles.retentionText}>
              92.8% member retention rate over the past 12 months
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  pageTitle: {
    ...typography.h1,
    color: colors.charcoal,
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    ...typography.body,
    color: colors.mediumGray,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.charcoal,
  },

  // Tier Distribution
  tierCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm + 4,
    paddingBottom: spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  tierHeaderText: {
    ...typography.captionBold,
    color: colors.darkGray,
  },

  // Cross-Company Engagement
  engagementCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  engagementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  engagementContent: {
    flex: 1,
  },
  engagementValue: {
    ...typography.h1,
    color: colors.charcoal,
  },
  engagementLabel: {
    ...typography.body,
    color: colors.mediumGray,
    lineHeight: 22,
  },
  engagementDivider: {
    height: 1,
    backgroundColor: colors.borderGray,
    marginVertical: spacing.md,
  },
  engagementDetails: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  engagementDetail: {
    flex: 1,
    alignItems: 'center',
  },
  engagementDetailDivider: {
    width: 1,
    backgroundColor: colors.borderGray,
  },
  detailValue: {
    ...typography.h2,
    color: colors.charcoal,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.mediumGray,
    marginTop: 2,
  },
  engagementNote: {
    ...typography.caption,
    color: colors.darkGray,
    lineHeight: 20,
    backgroundColor: colors.lightGray,
    padding: spacing.sm + 4,
    borderRadius: borderRadius.sm,
  },

  // Redemption Categories
  redemptionCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  redemptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 2,
  },
  redemptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  redemptionRank: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    ...typography.smallBold,
    color: colors.darkGray,
  },
  redemptionCategory: {
    ...typography.caption,
    color: colors.darkGray,
  },
  redemptionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    width: 120,
  },
  redemptionBarOuter: {
    flex: 1,
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  redemptionBarInner: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  redemptionPercent: {
    ...typography.captionBold,
    color: colors.charcoal,
    width: 36,
    textAlign: 'right',
  },
  redemptionDivider: {
    height: 1,
    backgroundColor: colors.borderGray,
  },

  // New vs Returning
  newReturnCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  newReturnRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  newReturnCol: {
    flex: 1,
    alignItems: 'center',
  },
  newReturnDivider: {
    width: 1,
    backgroundColor: colors.borderGray,
    marginHorizontal: spacing.md,
  },
  newReturnIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  newReturnValue: {
    ...typography.h1,
    color: colors.charcoal,
  },
  newReturnLabel: {
    ...typography.captionBold,
    color: colors.darkGray,
    marginTop: spacing.xs,
  },
  newReturnSub: {
    ...typography.small,
    color: colors.mediumGray,
    marginTop: 2,
  },
  retentionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  retentionText: {
    ...typography.caption,
    color: colors.darkGray,
    flex: 1,
  },
});
