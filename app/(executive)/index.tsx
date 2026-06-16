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
import { KPICard, Card } from '../../src/components';
import { executiveKPIs } from '../../src/data/demo';

const growthData = [
  { month: 'Feb', members: 760 },
  { month: 'Mar', members: 840 },
  { month: 'Apr', members: 925 },
  { month: 'May', members: 1075 },
  { month: 'Jun', members: 1247 },
];

function CompanyComparisonCards() {
  return (
    <View style={compStyles.container}>
      <Card style={compStyles.card}>
        <View style={[compStyles.accent, { backgroundColor: '#F59E0B' }]} />
        <View style={compStyles.cardBody}>
          <Text style={compStyles.companyName}>Sunshine Finance</Text>
          <View style={compStyles.metricsGrid}>
            <View style={compStyles.metric}><Text style={compStyles.metricValue}>834</Text><Text style={compStyles.metricLabel}>Members</Text></View>
            <View style={compStyles.metric}><Text style={compStyles.metricValue}>78,200</Text><Text style={compStyles.metricLabel}>Points Issued</Text></View>
            <View style={compStyles.metric}><Text style={compStyles.metricValue}>31,400</Text><Text style={compStyles.metricLabel}>Redeemed</Text></View>
            <View style={compStyles.metric}><Text style={compStyles.metricValue}>6</Text><Text style={compStyles.metricLabel}>Active Offers</Text></View>
          </View>
        </View>
      </Card>

      <Card style={compStyles.card}>
        <View style={[compStyles.accent, { backgroundColor: '#3B82F6' }]} />
        <View style={compStyles.cardBody}>
          <Text style={compStyles.companyName}>Sunshine Insurance</Text>
          <View style={compStyles.metricsGrid}>
            <View style={compStyles.metric}><Text style={compStyles.metricValue}>612</Text><Text style={compStyles.metricLabel}>Members</Text></View>
            <View style={compStyles.metric}><Text style={compStyles.metricValue}>47,200</Text><Text style={compStyles.metricLabel}>Points Issued</Text></View>
            <View style={compStyles.metric}><Text style={compStyles.metricValue}>15,800</Text><Text style={compStyles.metricLabel}>Redeemed</Text></View>
            <View style={compStyles.metric}><Text style={compStyles.metricValue}>4</Text><Text style={compStyles.metricLabel}>Active Offers</Text></View>
          </View>
        </View>
      </Card>
    </View>
  );
}

function GrowthChart() {
  const maxMembers = Math.max(...growthData.map((item) => item.members));

  return (
    <View style={styles.chartBox}>
      <View style={styles.chartHeader}>
        <View>
          <Text style={styles.chartTitle}>Member Growth</Text>
          <Text style={styles.chartSubtitle}>Demo data, Feb to Jun 2026</Text>
        </View>
        <Ionicons name="trending-up" size={22} color={colors.success} />
      </View>
      <View style={styles.barRow}>
        {growthData.map((item) => (
          <View key={item.month} style={styles.barItem}>
            <Text style={styles.barValue}>{item.members}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { height: `${Math.max(18, (item.members / maxMembers) * 100)}%` }]} />
            </View>
            <Text style={styles.barLabel}>{item.month}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const compStyles = StyleSheet.create({
  container: { gap: spacing.sm + 4 },
  card: { flexDirection: 'row', overflow: 'hidden', padding: 0 },
  accent: { width: 5 },
  cardBody: { flex: 1, padding: spacing.md },
  companyName: { ...typography.bodyBold, color: colors.charcoal, marginBottom: spacing.sm + 4 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  metric: { minWidth: 80 },
  metricValue: { ...typography.h3, color: colors.charcoal },
  metricLabel: { ...typography.small, color: colors.mediumGray, marginTop: 1 },
});

export default function ExecutiveOverview() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Executive Dashboard</Text>
        <Text style={styles.pageSubtitle}>Sunshine Loyalty Program Performance Overview</Text>

        <View style={styles.kpiGrid}>
          {executiveKPIs.map((kpi, index) => (
            <View key={index} style={styles.kpiCell}>
              <KPICard
                label={kpi.label}
                value={kpi.value}
                change={kpi.change}
                changeLabel={kpi.changeLabel}
                icon={kpi.icon as any}
              />
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Program Growth</Text>
        </View>

        <Card style={styles.growthCard}>
          <View style={styles.growthHeader}>
            <Ionicons name="trending-up" size={24} color={colors.success} />
            <Text style={styles.growthTitle}>Quarterly Summary</Text>
          </View>
          <Text style={styles.growthText}>
            The Sunshine Loyalty Program has shown strong growth this quarter with a 7.2% increase in total membership and a 15.1% rise in points redemption activity. The 37.6% redemption rate indicates healthy member engagement across Sunshine Finance and Sunshine Insurance.
          </Text>
          <View style={styles.growthStats}>
            <View style={styles.growthStat}><Text style={styles.growthStatValue}>+89</Text><Text style={styles.growthStatLabel}>New Members This Month</Text></View>
            <View style={styles.growthDivider} />
            <View style={styles.growthStat}><Text style={styles.growthStatValue}>71.5%</Text><Text style={styles.growthStatLabel}>Active Member Rate</Text></View>
            <View style={styles.growthDivider} />
            <View style={styles.growthStat}><Text style={styles.growthStatValue}>34%</Text><Text style={styles.growthStatLabel}>Cross-Company</Text></View>
          </View>
          <GrowthChart />
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Company Performance</Text>
        </View>

        <CompanyComparisonCards />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  container: { flex: 1 },
  contentContainer: { padding: spacing.lg, paddingBottom: spacing.xxl },
  pageTitle: { ...typography.h1, color: colors.charcoal, marginBottom: spacing.xs },
  pageSubtitle: { ...typography.body, color: colors.mediumGray, marginBottom: spacing.lg },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm + 4, marginBottom: spacing.lg },
  kpiCell: { width: '48%', flexGrow: 1, minWidth: 150 },
  sectionHeader: { marginBottom: spacing.md, marginTop: spacing.sm },
  sectionTitle: { ...typography.h3, color: colors.charcoal },
  growthCard: { padding: spacing.lg, marginBottom: spacing.lg },
  growthHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm + 4 },
  growthTitle: { ...typography.bodyBold, color: colors.charcoal },
  growthText: { ...typography.body, color: colors.darkGray, lineHeight: 24, marginBottom: spacing.md },
  growthStats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: spacing.md, backgroundColor: colors.lightGray, borderRadius: borderRadius.md, marginBottom: spacing.md },
  growthStat: { alignItems: 'center', flex: 1 },
  growthStatValue: { ...typography.h3, color: colors.charcoal, marginBottom: 2 },
  growthStatLabel: { ...typography.small, color: colors.mediumGray, textAlign: 'center' },
  growthDivider: { width: 1, height: 40, backgroundColor: colors.borderGray },
  chartBox: { borderWidth: 1, borderColor: colors.borderGray, borderRadius: borderRadius.md, padding: spacing.md, backgroundColor: colors.white },
  chartHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  chartTitle: { ...typography.captionBold, color: colors.charcoal },
  chartSubtitle: { ...typography.small, color: colors.mediumGray, marginTop: 2 },
  barRow: { height: 180, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  barItem: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  barValue: { ...typography.smallBold, color: colors.charcoal, marginBottom: spacing.xs },
  barTrack: { height: 120, width: 28, borderRadius: borderRadius.full, backgroundColor: colors.primaryLight, justifyContent: 'flex-end', overflow: 'hidden' },
  barFill: { width: '100%', backgroundColor: colors.primary, borderRadius: borderRadius.full },
  barLabel: { ...typography.small, color: colors.mediumGray, marginTop: spacing.xs },
});
