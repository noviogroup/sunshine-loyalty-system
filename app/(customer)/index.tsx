import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, CompanyCard, TransactionItem, ProgressBar, Badge } from '../../src/components';
import { colors, spacing, borderRadius, typography } from '../../src/theme';
import { companies } from '../../src/data/demo';
import { useDemoState } from '../../src/context/DemoStateContext';

const QUICK_ACTIONS = [
  { icon: 'diamond-outline' as const, label: 'Earn', route: '/(customer)/companies' },
  { icon: 'gift-outline' as const, label: 'Redeem', route: '/(customer)/offers' },
  { icon: 'pricetag-outline' as const, label: 'Offers', route: '/(customer)/offers' },
  { icon: 'time-outline' as const, label: 'Activity', route: '/(customer)/activity' },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const router = useRouter();
  const { demoCustomer, transactions } = useDemoState();
  const firstName = demoCustomer.name.split(' ')[0];

  const customerTransactions = transactions
    .filter((t) => t.customerId === demoCustomer.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const tierMax = demoCustomer.points + demoCustomer.pointsToNextTier;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          {getGreeting()}, {firstName}
        </Text>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.balanceLabel}>Points Balance</Text>
              <Text style={styles.balanceValue}>
                {demoCustomer.points.toLocaleString()}
              </Text>
            </View>
            <Badge label={`${demoCustomer.tier} Tier`} variant="warning" />
          </View>

          {demoCustomer.nextTier && (
            <View style={styles.progressSection}>
              <ProgressBar
                current={demoCustomer.points}
                max={tierMax}
                color={colors.white}
              />
              <Text style={styles.progressText}>
                {demoCustomer.pointsToNextTier.toLocaleString()} points to{' '}
                {demoCustomer.nextTier}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.quickActionItem}
              onPress={() => router.push(action.route as any)}
              activeOpacity={0.7}
            >
              <View style={styles.quickActionCircle}>
                <Ionicons name={action.icon} size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Participating Companies</Text>
            <TouchableOpacity
              onPress={() => router.push('/(customer)/companies')}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.companyList}>
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                name={company.name}
                description={company.description}
                accentColor={company.accentColor}
                onPress={() => router.push('/(customer)/companies')}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity
              onPress={() => router.push('/(customer)/activity')}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  greeting: {
    ...typography.h2,
    color: colors.charcoal,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  balanceLabel: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xs,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 42,
  },
  progressSection: {
    marginTop: spacing.md,
  },
  progressText: {
    ...typography.small,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  quickActionItem: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  quickActionCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    ...typography.smallBold,
    color: colors.charcoal,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm + 4,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.charcoal,
  },
  seeAll: {
    ...typography.captionBold,
    color: colors.primary,
  },
  companyList: {
    gap: spacing.sm + 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGray,
    marginHorizontal: spacing.md,
  },
});
