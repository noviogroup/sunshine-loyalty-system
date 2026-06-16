import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../src/theme';
import { Input, Card, Badge } from '../../src/components';
import type { Customer, Tier } from '../../src/types';
import { useDemoState } from '../../src/context/DemoStateContext';

const tierVariant: Record<Tier, 'warning' | 'default' | 'info' | 'success'> = {
  Bronze: 'default',
  Silver: 'info',
  Gold: 'warning',
  Platinum: 'success',
};

function CustomerRow({ customer, onPress }: { customer: Customer; onPress: () => void }) {
  const initials = customer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const tierColor =
    customer.tier === 'Bronze'
      ? colors.tierBronze
      : customer.tier === 'Silver'
      ? colors.tierSilver
      : customer.tier === 'Gold'
      ? colors.tierGold
      : colors.tierPlatinum;

  return (
    <Card style={styles.customerCard} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={[styles.avatar, { backgroundColor: tierColor }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.customerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.customerName} numberOfLines={1}>{customer.name}</Text>
            <Badge label={customer.tier} variant={tierVariant[customer.tier]} size="sm" />
          </View>
          <Text style={styles.customerEmail} numberOfLines={1}>{customer.email}</Text>
          <View style={styles.pointsRow}>
            <Ionicons name="star" size={14} color={colors.primary} />
            <Text style={styles.pointsText}>{customer.points.toLocaleString()} points</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
      </View>
    </Card>
  );
}

export default function CustomersScreen() {
  const router = useRouter();
  const { customers } = useDemoState();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.toLowerCase().includes(query) ||
        c.tier.toLowerCase().includes(query)
    );
  }, [customers, searchQuery]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.searchContainer}>
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search customers by name, email, phone, or tier..."
          leftIcon="search"
        />
      </View>

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CustomerRow
            customer={item}
            onPress={() => router.push(`/(admin)/customer-detail?id=${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={48} color={colors.borderGray} />
            <Text style={styles.emptyText}>No customers found</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  searchContainer: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xs, backgroundColor: colors.lightGray },
  listContent: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  customerCard: { padding: spacing.md },
  cardContent: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { ...typography.captionBold, color: colors.white, fontSize: 15 },
  customerInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm, marginBottom: 2 },
  customerName: { ...typography.bodyBold, color: colors.charcoal, flex: 1 },
  customerEmail: { ...typography.caption, color: colors.mediumGray, marginBottom: spacing.xs },
  pointsRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  pointsText: { ...typography.captionBold, color: colors.primary },
  separator: { height: spacing.sm },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxl * 2, gap: spacing.sm + 4 },
  emptyText: { ...typography.body, color: colors.mediumGray },
});
