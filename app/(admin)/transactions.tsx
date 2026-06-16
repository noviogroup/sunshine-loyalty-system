import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../src/theme';
import { FilterChip, Badge } from '../../src/components';
import { Ionicons } from '@expo/vector-icons';
import { transactions, customers } from '../../src/data/demo';

type FilterType = 'all' | 'completed' | 'pending' | 'reversed';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'pending', label: 'Pending' },
  { key: 'reversed', label: 'Reversed' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  completed: 'success',
  pending: 'warning',
  reversed: 'error',
  expired: 'error',
};

function getCustomerName(customerId: string): string {
  const customer = customers.find((c) => c.id === customerId);
  return customer ? customer.name : 'Unknown';
}

function getTypeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function TransactionsScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'all') return transactions;
    return transactions.filter((t) => t.status === activeFilter);
  }, [activeFilter]);

  const renderTransaction = ({ item }: { item: typeof transactions[0] }) => {
    const customerName = getCustomerName(item.customerId);
    const isPositive = item.points > 0;
    const pointsColor = isPositive ? colors.success : colors.info;
    const pointsPrefix = isPositive ? '+' : '';

    return (
      <View style={styles.row}>
        <View style={styles.dateColumn}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        <View style={styles.detailColumn}>
          <Text style={styles.customerText} numberOfLines={1}>
            {customerName}
          </Text>
          <Text style={styles.descriptionText} numberOfLines={1}>
            {item.description}
          </Text>
          <Text style={styles.companyText}>{item.companyName}</Text>
        </View>

        <View style={styles.typeColumn}>
          <Text style={styles.typeText}>{getTypeLabel(item.type)}</Text>
        </View>

        <View style={styles.pointsColumn}>
          <Text style={[styles.pointsText, { color: pointsColor }]}>
            {pointsPrefix}{item.points.toLocaleString()}
          </Text>
        </View>

        <View style={styles.statusColumn}>
          <Badge
            label={getTypeLabel(item.status)}
            variant={statusVariant[item.status] || 'default'}
            size="sm"
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <FilterChip
            key={filter.key}
            label={filter.label}
            isActive={activeFilter === filter.key}
            onPress={() => setActiveFilter(filter.key)}
          />
        ))}
      </View>

      <View style={styles.tableHeader}>
        <View style={styles.dateColumn}>
          <Text style={styles.headerText}>Date</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.headerText}>Customer / Details</Text>
        </View>
        <View style={styles.typeColumn}>
          <Text style={styles.headerText}>Type</Text>
        </View>
        <View style={styles.pointsColumn}>
          <Text style={styles.headerText}>Points</Text>
        </View>
        <View style={styles.statusColumn}>
          <Text style={styles.headerText}>Status</Text>
        </View>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.rowDivider} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={48} color={colors.borderGray} />
            <Text style={styles.emptyText}>No transactions match this filter</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    gap: spacing.sm,
    backgroundColor: colors.lightGray,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.charcoal,
    marginHorizontal: spacing.md,
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
  },
  headerText: {
    ...typography.smallBold,
    color: colors.white,
  },
  listContent: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderBottomLeftRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md,
    overflow: 'hidden',
    paddingBottom: spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.white,
  },
  rowDivider: {
    height: 1,
    backgroundColor: colors.borderGray,
    marginHorizontal: spacing.md,
  },
  dateColumn: {
    width: 80,
  },
  detailColumn: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  typeColumn: {
    width: 70,
  },
  pointsColumn: {
    width: 70,
    alignItems: 'flex-end',
  },
  statusColumn: {
    width: 90,
    alignItems: 'flex-end',
  },
  dateText: {
    ...typography.small,
    color: colors.darkGray,
  },
  customerText: {
    ...typography.captionBold,
    color: colors.charcoal,
  },
  descriptionText: {
    ...typography.small,
    color: colors.mediumGray,
    marginTop: 1,
  },
  companyText: {
    ...typography.small,
    color: colors.mediumGray,
    marginTop: 1,
  },
  typeText: {
    ...typography.small,
    color: colors.darkGray,
  },
  pointsText: {
    ...typography.captionBold,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
    gap: spacing.sm + 4,
  },
  emptyText: {
    ...typography.body,
    color: colors.mediumGray,
  },
});
