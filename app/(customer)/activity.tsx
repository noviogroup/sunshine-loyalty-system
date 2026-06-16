import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, TransactionItem, FilterChip } from '../../src/components';
import { colors, spacing, typography } from '../../src/theme';
import { useDemoState } from '../../src/context/DemoStateContext';

const FILTERS = ['All', 'Earned', 'Redeemed', 'Pending'];

export default function ActivityScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { demoCustomer, transactions } = useDemoState();

  const customerTransactions = useMemo(() => {
    const filtered = transactions
      .filter((t) => t.customerId === demoCustomer.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    switch (activeFilter) {
      case 'Earned':
        return filtered.filter(
          (t) => t.type === 'earned' || t.type === 'adjustment'
        );
      case 'Redeemed':
        return filtered.filter((t) => t.type === 'redeemed');
      case 'Pending':
        return filtered.filter((t) => t.type === 'pending');
      default:
        return filtered;
    }
  }, [activeFilter, demoCustomer.id, transactions]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Activity History</Text>
        <Text style={styles.subtitle}>
          Track all your points earned, redeemed, and pending
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
          style={styles.filterScroll}
        >
          {FILTERS.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
        </ScrollView>

        {customerTransactions.length > 0 ? (
          <Card padding="none">
            {customerTransactions.map((txn, index) => (
              <View key={txn.id}>
                <TransactionItem
                  type={txn.type === 'adjustment' ? 'earned' : txn.type}
                  points={Math.abs(txn.points)}
                  description={txn.description}
                  companyName={txn.companyName}
                  date={txn.date}
                  status={txn.type === 'adjustment' ? 'earned' : txn.type}
                />
                {index < customerTransactions.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </Card>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No activity found</Text>
            <Text style={styles.emptySubtitle}>
              {activeFilter === 'All'
                ? 'Your transaction history will appear here.'
                : `No ${activeFilter.toLowerCase()} transactions to display.`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  header: { ...typography.h2, color: colors.charcoal, marginTop: spacing.md },
  subtitle: { ...typography.caption, color: colors.mediumGray, marginTop: spacing.xs, marginBottom: spacing.md },
  filterScroll: { marginBottom: spacing.md },
  filterRow: { flexDirection: 'row', gap: spacing.sm },
  divider: { height: 1, backgroundColor: colors.borderGray, marginHorizontal: spacing.md },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl },
  emptyTitle: { ...typography.bodyBold, color: colors.charcoal, marginBottom: spacing.xs },
  emptySubtitle: { ...typography.caption, color: colors.mediumGray, textAlign: 'center' },
});
