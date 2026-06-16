import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../src/theme';
import { KPICard, Badge, TransactionItem } from '../../src/components';
import { adminKPIs, transactions } from '../../src/data/demo';

export default function AdminDashboard() {
  const latestTransactions = transactions.slice(0, 5);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Admin Dashboard</Text>
          <Badge label="Demo Mode" variant="warning" size="sm" />
        </View>

        <View style={styles.kpiGrid}>
          {adminKPIs.map((kpi, index) => (
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
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.sectionSubtitle}>Latest 5 transactions</Text>
        </View>

        <View style={styles.activityCard}>
          {latestTransactions.map((txn, index) => (
            <View key={txn.id}>
              <TransactionItem
                type={txn.type as 'earned' | 'redeemed' | 'pending' | 'expired'}
                points={Math.abs(txn.points)}
                description={txn.description}
                companyName={txn.companyName}
                date={txn.date}
                status={txn.status as 'earned' | 'redeemed' | 'pending' | 'expired'}
              />
              {index < latestTransactions.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
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
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm + 4,
    marginBottom: spacing.lg,
  },
  kpiCell: {
    width: '48%',
    flexGrow: 1,
    minWidth: 150,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.sm + 4,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.charcoal,
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.mediumGray,
  },
  activityCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGray,
    marginHorizontal: spacing.md,
  },
});
