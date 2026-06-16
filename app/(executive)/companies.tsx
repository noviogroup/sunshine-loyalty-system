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

interface MetricRow {
  label: string;
  financeValue: string;
  insuranceValue: string;
}

const comparisonMetrics: MetricRow[] = [
  { label: 'Members Linked', financeValue: '834', insuranceValue: '612' },
  { label: 'Total Transactions', financeValue: '2,340', insuranceValue: '1,680' },
  { label: 'Points Issued', financeValue: '78,200', insuranceValue: '47,200' },
  { label: 'Points Redeemed', financeValue: '31,400', insuranceValue: '15,800' },
  { label: 'Active Offers', financeValue: '6', insuranceValue: '4' },
  { label: 'Engagement Rate', financeValue: '74.2%', insuranceValue: '68.5%' },
];

function CompanyDetailCard({
  name,
  accentColor,
  members,
  transactions,
  pointsIssued,
  pointsRedeemed,
  activeOffers,
  engagementRate,
}: {
  name: string;
  accentColor: string;
  members: string;
  transactions: string;
  pointsIssued: string;
  pointsRedeemed: string;
  activeOffers: string;
  engagementRate: string;
}) {
  const initial = name.charAt(0);

  return (
    <Card style={detailStyles.card}>
      <View style={detailStyles.header}>
        <View style={[detailStyles.avatar, { backgroundColor: accentColor }]}>
          <Text style={detailStyles.avatarText}>{initial}</Text>
        </View>
        <Text style={detailStyles.companyName}>{name}</Text>
      </View>

      <View style={detailStyles.metricsContainer}>
        <View style={detailStyles.metricRow}>
          <View style={detailStyles.metricIconRow}>
            <Ionicons name="people-outline" size={16} color={colors.mediumGray} />
            <Text style={detailStyles.metricLabel}>Members Linked</Text>
          </View>
          <Text style={detailStyles.metricValue}>{members}</Text>
        </View>

        <View style={detailStyles.divider} />

        <View style={detailStyles.metricRow}>
          <View style={detailStyles.metricIconRow}>
            <Ionicons name="swap-horizontal-outline" size={16} color={colors.mediumGray} />
            <Text style={detailStyles.metricLabel}>Transactions</Text>
          </View>
          <Text style={detailStyles.metricValue}>{transactions}</Text>
        </View>

        <View style={detailStyles.divider} />

        <View style={detailStyles.metricRow}>
          <View style={detailStyles.metricIconRow}>
            <Ionicons name="star-outline" size={16} color={colors.mediumGray} />
            <Text style={detailStyles.metricLabel}>Points Issued</Text>
          </View>
          <Text style={detailStyles.metricValue}>{pointsIssued}</Text>
        </View>

        <View style={detailStyles.divider} />

        <View style={detailStyles.metricRow}>
          <View style={detailStyles.metricIconRow}>
            <Ionicons name="gift-outline" size={16} color={colors.mediumGray} />
            <Text style={detailStyles.metricLabel}>Points Redeemed</Text>
          </View>
          <Text style={detailStyles.metricValue}>{pointsRedeemed}</Text>
        </View>

        <View style={detailStyles.divider} />

        <View style={detailStyles.metricRow}>
          <View style={detailStyles.metricIconRow}>
            <Ionicons name="megaphone-outline" size={16} color={colors.mediumGray} />
            <Text style={detailStyles.metricLabel}>Active Offers</Text>
          </View>
          <Text style={detailStyles.metricValue}>{activeOffers}</Text>
        </View>

        <View style={detailStyles.divider} />

        <View style={detailStyles.metricRow}>
          <View style={detailStyles.metricIconRow}>
            <Ionicons name="pulse-outline" size={16} color={colors.mediumGray} />
            <Text style={detailStyles.metricLabel}>Engagement Rate</Text>
          </View>
          <Text style={[detailStyles.metricValue, { color: colors.success }]}>
            {engagementRate}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const detailStyles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.h3,
    color: colors.white,
  },
  companyName: {
    ...typography.h3,
    color: colors.charcoal,
  },
  metricsContainer: {
    padding: spacing.md,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
  },
  metricIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metricLabel: {
    ...typography.body,
    color: colors.darkGray,
  },
  metricValue: {
    ...typography.bodyBold,
    color: colors.charcoal,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGray,
  },
});

export default function CompaniesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Company Performance</Text>
        <Text style={styles.pageSubtitle}>
          Side-by-side comparison of participating companies
        </Text>

        {/* Comparison Table */}
        <Card style={styles.comparisonCard}>
          <View style={styles.compTableHeader}>
            <View style={styles.compLabelCol}>
              <Text style={styles.compHeaderText}>Metric</Text>
            </View>
            <View style={styles.compValueCol}>
              <View style={[styles.compDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.compHeaderText}>Finance</Text>
            </View>
            <View style={styles.compValueCol}>
              <View style={[styles.compDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={styles.compHeaderText}>Insurance</Text>
            </View>
          </View>

          {comparisonMetrics.map((metric, index) => (
            <View key={metric.label}>
              <View style={styles.compRow}>
                <View style={styles.compLabelCol}>
                  <Text style={styles.compLabel}>{metric.label}</Text>
                </View>
                <View style={styles.compValueCol}>
                  <Text style={styles.compValue}>{metric.financeValue}</Text>
                </View>
                <View style={styles.compValueCol}>
                  <Text style={styles.compValue}>{metric.insuranceValue}</Text>
                </View>
              </View>
              {index < comparisonMetrics.length - 1 && (
                <View style={styles.compDivider} />
              )}
            </View>
          ))}
        </Card>

        {/* Detailed Cards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
        </View>

        <CompanyDetailCard
          name="Sunshine Finance"
          accentColor="#F59E0B"
          members="834"
          transactions="2,340"
          pointsIssued="78,200"
          pointsRedeemed="31,400"
          activeOffers="6"
          engagementRate="74.2%"
        />

        <CompanyDetailCard
          name="Sunshine Insurance"
          accentColor="#3B82F6"
          members="612"
          transactions="1,680"
          pointsIssued="47,200"
          pointsRedeemed="15,800"
          activeOffers="4"
          engagementRate="68.5%"
        />
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
  comparisonCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  compTableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.charcoal,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
  },
  compHeaderText: {
    ...typography.captionBold,
    color: colors.white,
  },
  compDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  compLabelCol: {
    flex: 1.2,
  },
  compValueCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  compRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.white,
  },
  compLabel: {
    ...typography.caption,
    color: colors.darkGray,
  },
  compValue: {
    ...typography.captionBold,
    color: colors.charcoal,
    textAlign: 'center',
  },
  compDivider: {
    height: 1,
    backgroundColor: colors.borderGray,
    marginHorizontal: spacing.md,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.charcoal,
  },
});
