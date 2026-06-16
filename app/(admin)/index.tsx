import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../src/theme';
import { KPICard, Badge, TransactionItem, Card } from '../../src/components';
import { adminKPIs } from '../../src/data/demo';
import { useDemoState } from '../../src/context/DemoStateContext';

export default function AdminDashboard() {
  const router = useRouter();
  const { transactions, redemptions } = useDemoState();
  const latestTransactions = transactions.slice(0, 5);
  const issuedRedemptions = redemptions.filter((item) => item.status === 'issued');
  const usedRedemptions = redemptions.filter((item) => item.status === 'used');
  const latestRedemptions = redemptions.slice(0, 3);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Admin Dashboard</Text>
            <Text style={styles.pageSubtitle}>Monitor loyalty activity across Sunshine Finance and Sunshine Insurance.</Text>
          </View>
          <Badge label="Demo Mode" variant="warning" size="sm" />
        </View>

        <View style={styles.kpiGrid}>
          {adminKPIs.map((kpi, index) => (
            <View key={index} style={styles.kpiCell}>
              <KPICard label={kpi.label} value={kpi.value} change={kpi.change} changeLabel={kpi.changeLabel} icon={kpi.icon as any} />
            </View>
          ))}
        </View>

        <View style={styles.redemptionPanel}>
          <View style={styles.redemptionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Redemption Queue</Text>
              <Text style={styles.sectionSubtitle}>Codes issued from the customer app</Text>
            </View>
            <TouchableOpacity style={styles.verifyButton} onPress={() => router.push('/(admin)/redemptions')}>
              <Text style={styles.verifyButtonText}>Verify Codes</Text>
              <MaterialCommunityIcons name="arrow-right" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.redemptionStatsRow}>
            <View style={styles.redemptionStat}>
              <Text style={styles.redemptionValue}>{redemptions.length}</Text>
              <Text style={styles.redemptionLabel}>Total Codes</Text>
            </View>
            <View style={styles.redemptionDivider} />
            <View style={styles.redemptionStat}>
              <Text style={styles.redemptionValue}>{issuedRedemptions.length}</Text>
              <Text style={styles.redemptionLabel}>Awaiting Use</Text>
            </View>
            <View style={styles.redemptionDivider} />
            <View style={styles.redemptionStat}>
              <Text style={styles.redemptionValue}>{usedRedemptions.length}</Text>
              <Text style={styles.redemptionLabel}>Used</Text>
            </View>
          </View>

          {latestRedemptions.length === 0 ? (
            <View style={styles.emptyRedemptionBox}>
              <MaterialCommunityIcons name="ticket-outline" size={24} color={colors.mediumGray} />
              <Text style={styles.emptyRedemptionText}>No codes issued yet. Redeem a reward from the customer app to populate this queue.</Text>
            </View>
          ) : (
            <View style={styles.recentCodeList}>
              {latestRedemptions.map((item) => (
                <View key={item.id} style={styles.recentCodeRow}>
                  <View style={styles.recentCodeIcon}>
                    <MaterialCommunityIcons name="ticket-confirmation-outline" size={18} color={colors.primaryDark} />
                  </View>
                  <View style={styles.recentCodeTextWrap}>
                    <Text style={styles.recentCode}>{item.code}</Text>
                    <Text style={styles.recentCodeMeta}>{item.customerName} • {item.companyName}</Text>
                  </View>
                  <Badge label={item.status} variant={item.status === 'used' ? 'success' : item.status === 'issued' ? 'warning' : 'error'} size="sm" />
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.sectionSubtitle}>Latest 5 transactions</Text>
        </View>

        <Card padding="none" style={styles.activityCard}>
          {latestTransactions.map((txn, index) => (
            <View key={txn.id}>
              <TransactionItem
                type={txn.type === 'adjustment' ? 'earned' : txn.type}
                points={Math.abs(txn.points)}
                description={txn.description}
                companyName={txn.companyName}
                date={txn.date}
                status={txn.type === 'adjustment' ? 'earned' : txn.type}
              />
              {index < latestTransactions.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1 },
  contentContainer: { paddingBottom: spacing.xxl },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing.lg, gap: spacing.md },
  pageTitle: { ...typography.h1, color: colors.charcoal },
  pageSubtitle: { ...typography.caption, color: colors.mediumGray, marginTop: spacing.xs },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm + 4, marginBottom: spacing.lg },
  kpiCell: { width: '31%', flexGrow: 1, minWidth: 170 },
  redemptionPanel: { backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.borderGray, shadowColor: colors.charcoal, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 2, marginBottom: spacing.lg },
  redemptionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.md },
  verifyButton: { backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  verifyButtonText: { ...typography.captionBold, color: colors.white },
  redemptionStatsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.lightGray, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md },
  redemptionStat: { flex: 1, alignItems: 'center' },
  redemptionValue: { ...typography.h2, color: colors.charcoal },
  redemptionLabel: { ...typography.small, color: colors.mediumGray, marginTop: 2 },
  redemptionDivider: { width: 1, height: 42, backgroundColor: colors.borderGray },
  emptyRedemptionBox: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.lightGray, borderRadius: borderRadius.lg, padding: spacing.md },
  emptyRedemptionText: { ...typography.caption, color: colors.mediumGray, flex: 1 },
  recentCodeList: { gap: spacing.sm },
  recentCodeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.borderGray },
  recentCodeIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  recentCodeTextWrap: { flex: 1 },
  recentCode: { ...typography.captionBold, color: colors.charcoal, letterSpacing: 0.5 },
  recentCodeMeta: { ...typography.small, color: colors.mediumGray, marginTop: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: spacing.sm + 4 },
  sectionTitle: { ...typography.h3, color: colors.charcoal },
  sectionSubtitle: { ...typography.caption, color: colors.mediumGray },
  activityCard: { overflow: 'hidden' },
  divider: { height: 1, backgroundColor: colors.borderGray, marginHorizontal: spacing.md },
});
