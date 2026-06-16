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
import { Card, Badge, Button, TransactionItem } from '../../src/components';
import { demoCustomer, transactions } from '../../src/data/demo';

export default function CustomerDetailScreen() {
  const customer = demoCustomer;

  const customerTransactions = transactions
    .filter((t) => t.customerId === customer.id)
    .slice(0, 5);

  const tierColor =
    customer.tier === 'Bronze'
      ? colors.tierBronze
      : customer.tier === 'Silver'
      ? colors.tierSilver
      : customer.tier === 'Gold'
      ? colors.tierGold
      : colors.tierPlatinum;

  const initials = customer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Customer Info Section */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: tierColor }]}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.customerName}>{customer.name}</Text>
              <Badge
                label={customer.tier}
                variant={customer.tier === 'Gold' ? 'warning' : customer.tier === 'Platinum' ? 'success' : 'default'}
                size="sm"
              />
            </View>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}>
              <Ionicons name="mail-outline" size={18} color={colors.mediumGray} />
              <Text style={styles.detailText}>{customer.email}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={18} color={colors.mediumGray} />
              <Text style={styles.detailText}>{customer.phone}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={18} color={colors.mediumGray} />
              <Text style={styles.detailText}>Joined {customer.joinDate}</Text>
            </View>
          </View>
        </Card>

        {/* Points Balance Card */}
        <Card style={styles.pointsCard}>
          <View style={styles.pointsIconRow}>
            <View style={styles.pointsIconContainer}>
              <Ionicons name="star" size={24} color={colors.primary} />
            </View>
            <Text style={styles.pointsLabel}>Points Balance</Text>
          </View>
          <Text style={styles.pointsValue}>
            {customer.points.toLocaleString()}
          </Text>
          {customer.nextTier && (
            <Text style={styles.nextTierText}>
              {customer.pointsToNextTier.toLocaleString()} points to{' '}
              {customer.nextTier}
            </Text>
          )}
        </Card>

        {/* Linked Accounts Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Linked Accounts</Text>
        </View>

        {customer.linkedAccounts.map((account) => (
          <Card key={account.accountNumber} style={styles.linkedCard}>
            <View style={styles.linkedRow}>
              <View style={styles.linkedInfo}>
                <Text style={styles.linkedCompany}>{account.companyName}</Text>
                <Text style={styles.linkedAccount}>
                  Account: {account.accountNumber}
                </Text>
                <Text style={styles.linkedDate}>
                  Linked {account.linkedDate}
                </Text>
              </View>
              <Ionicons name="link" size={20} color={colors.mediumGray} />
            </View>
          </Card>
        ))}

        {/* Recent Transactions Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

        <View style={styles.transactionsCard}>
          {customerTransactions.length > 0 ? (
            customerTransactions.map((txn, index) => (
              <View key={txn.id}>
                <TransactionItem
                  type={txn.type as 'earned' | 'redeemed' | 'pending' | 'expired'}
                  points={Math.abs(txn.points)}
                  description={txn.description}
                  companyName={txn.companyName}
                  date={txn.date}
                  status={txn.status as 'earned' | 'redeemed' | 'pending' | 'expired'}
                />
                {index < customerTransactions.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyTransactions}>
              <Text style={styles.emptyText}>No transactions found</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Actions</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title="Adjust Points"
            onPress={() => {}}
            variant="primary"
            fullWidth
          />
          <Button
            title="Add Note"
            onPress={() => {}}
            variant="outline"
            fullWidth
          />
          <Button
            title="Send Offer"
            onPress={() => {}}
            variant="secondary"
            fullWidth
          />
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
  profileCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.h2,
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
    gap: spacing.sm,
  },
  customerName: {
    ...typography.h2,
    color: colors.charcoal,
  },
  detailsGrid: {
    gap: spacing.sm + 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
  },
  detailText: {
    ...typography.body,
    color: colors.darkGray,
  },
  pointsCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pointsIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  pointsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsLabel: {
    ...typography.captionBold,
    color: colors.primaryDark,
  },
  pointsValue: {
    ...typography.kpiValue,
    color: colors.charcoal,
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  nextTierText: {
    ...typography.caption,
    color: colors.primaryDark,
  },
  sectionHeader: {
    marginBottom: spacing.sm + 4,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.charcoal,
  },
  linkedCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  linkedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkedInfo: {
    flex: 1,
  },
  linkedCompany: {
    ...typography.bodyBold,
    color: colors.charcoal,
    marginBottom: 2,
  },
  linkedAccount: {
    ...typography.caption,
    color: colors.mediumGray,
    marginBottom: 1,
  },
  linkedDate: {
    ...typography.small,
    color: colors.mediumGray,
  },
  transactionsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGray,
    marginHorizontal: spacing.md,
  },
  emptyTransactions: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.mediumGray,
  },
  actionsContainer: {
    gap: spacing.sm + 4,
    marginBottom: spacing.lg,
  },
});
