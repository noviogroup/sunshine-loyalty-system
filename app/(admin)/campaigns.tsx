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
import { Card, Badge, Button } from '../../src/components';
import { campaigns } from '../../src/data/demo';
import type { Campaign } from '../../src/types';

const statusVariant: Record<Campaign['status'], 'success' | 'warning' | 'info' | 'error'> = {
  active: 'success',
  draft: 'info',
  paused: 'warning',
  expired: 'error',
};

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card style={styles.campaignCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.campaignName} numberOfLines={1}>
            {campaign.name}
          </Text>
          <Badge
            label={campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            variant={statusVariant[campaign.status]}
            size="sm"
          />
        </View>
        <Text style={styles.companyName}>{campaign.companyName}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {campaign.description}
      </Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={14} color={colors.mediumGray} />
          <Text style={styles.metaText}>
            {campaign.startDate} - {campaign.endDate}
          </Text>
        </View>
        {campaign.pointsRequired > 0 && (
          <View style={styles.metaItem}>
            <Ionicons name="star-outline" size={14} color={colors.mediumGray} />
            <Text style={styles.metaText}>
              {campaign.pointsRequired.toLocaleString()} pts required
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footerRow}>
        <View style={styles.metaItem}>
          <Ionicons name="people-outline" size={14} color={colors.mediumGray} />
          <Text style={styles.metaText}>{campaign.eligibility}</Text>
        </View>
        <Text style={styles.rewardType}>{campaign.rewardType}</Text>
      </View>
    </Card>
  );
}

export default function CampaignsScreen() {
  const activeCampaigns = campaigns.filter((c) => c.status === 'active');
  const otherCampaigns = campaigns.filter((c) => c.status !== 'active');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Campaigns</Text>
          <Button
            title="Create Campaign"
            onPress={() => {}}
            variant="primary"
            size="sm"
          />
        </View>

        {activeCampaigns.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>
              Active ({activeCampaigns.length})
            </Text>
            {activeCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </>
        )}

        {otherCampaigns.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>
              Draft / Expired ({otherCampaigns.length})
            </Text>
            {otherCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </>
        )}
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
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  pageTitle: {
    ...typography.h2,
    color: colors.charcoal,
  },
  sectionLabel: {
    ...typography.captionBold,
    color: colors.mediumGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm + 4,
    marginTop: spacing.sm,
  },
  campaignCard: {
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
  },
  cardHeader: {
    marginBottom: spacing.sm,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  campaignName: {
    ...typography.bodyBold,
    color: colors.charcoal,
    flex: 1,
  },
  companyName: {
    ...typography.caption,
    color: colors.mediumGray,
  },
  description: {
    ...typography.caption,
    color: colors.darkGray,
    marginBottom: spacing.sm + 4,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    ...typography.small,
    color: colors.mediumGray,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  rewardType: {
    ...typography.smallBold,
    color: colors.primary,
  },
});
