import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { RewardCard, FilterChip } from '../../src/components';
import { colors, spacing, typography } from '../../src/theme';
import { rewards } from '../../src/data/demo';

const FILTERS = ['All', 'Finance', 'Insurance', 'Expiring Soon', 'Available Now'];

export default function OffersScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRewards = useMemo(() => {
    switch (activeFilter) {
      case 'Finance':
        return rewards.filter(
          (r) => r.companyName === 'Sunshine Finance'
        );
      case 'Insurance':
        return rewards.filter(
          (r) => r.companyName === 'Sunshine Insurance'
        );
      case 'Expiring Soon': {
        const now = new Date();
        const thirtyDays = new Date();
        thirtyDays.setDate(now.getDate() + 30);
        return rewards.filter((r) => {
          const expiry = new Date(r.expiryDate);
          return expiry <= thirtyDays && expiry >= now;
        });
      }
      case 'Available Now':
        return rewards.filter((r) => r.isAvailable);
      default:
        return rewards;
    }
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Rewards & Offers</Text>
        <Text style={styles.subtitle}>
          Redeem your points for exclusive rewards from Sunshine companies
        </Text>

        {/* Filter Chips */}
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

        {/* Rewards List */}
        <View style={styles.rewardsList}>
          {filteredRewards.length > 0 ? (
            filteredRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                title={reward.title}
                description={reward.description}
                pointsCost={reward.pointsCost}
                companyName={reward.companyName}
                expiryDate={reward.expiryDate}
                isAvailable={reward.isAvailable}
                onPress={() =>
                  reward.isAvailable &&
                  router.push(`/(customer)/redeem/${reward.id}`)
                }
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No rewards found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your filters to see more rewards.
              </Text>
            </View>
          )}
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
    paddingBottom: spacing.xxl,
  },
  header: {
    ...typography.h2,
    color: colors.charcoal,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.caption,
    color: colors.mediumGray,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  filterScroll: {
    marginBottom: spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  rewardsList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm + 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    ...typography.bodyBold,
    color: colors.charcoal,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    ...typography.caption,
    color: colors.mediumGray,
    textAlign: 'center',
  },
});
