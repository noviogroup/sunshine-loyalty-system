import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, Badge } from '../../src/components';
import { colors, spacing, borderRadius, typography } from '../../src/theme';
import { useDemoState } from '../../src/context/DemoStateContext';
import type { RedemptionStatus } from '../../src/types';

const filters: Array<'all' | RedemptionStatus> = ['all', 'issued', 'used', 'voided', 'expired'];

function statusVariant(status: RedemptionStatus) {
  if (status === 'used') return 'success';
  if (status === 'voided' || status === 'expired') return 'danger';
  return 'warning';
}

function statusLabel(status: 'all' | RedemptionStatus) {
  if (status === 'all') return 'All';
  if (status === 'voided') return 'Voided';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AdminRedemptionsScreen() {
  const { redemptions, updateRedemptionStatus } = useDemoState();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | RedemptionStatus>('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return redemptions.filter((item) => {
      const matchesStatus = filter === 'all' || item.status === filter;
      const matchesSearch = !q
        || item.code.toLowerCase().includes(q)
        || item.customerName.toLowerCase().includes(q)
        || item.rewardTitle.toLowerCase().includes(q)
        || item.companyName.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [redemptions, search, filter]);

  return (
    <SafeAreaView style={styles.safe} edges={[]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Redemption Verification</Text>
            <Text style={styles.pageSubtitle}>Search issued reward codes and confirm staff validation.</Text>
          </View>
          <View style={styles.metricPill}>
            <MaterialCommunityIcons name="ticket-confirmation-outline" size={18} color={colors.primaryDark} />
            <Text style={styles.metricPillText}>{redemptions.length} issued</Text>
          </View>
        </View>

        <Card style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <MaterialCommunityIcons name="shield-check-outline" size={22} color={colors.info} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoTitle}>Staff validation workflow</Text>
            <Text style={styles.infoText}>When a customer redeems a reward, a code is issued here. Staff can search the code, confirm the member and reward, then mark it used.</Text>
          </View>
        </Card>

        <View style={styles.searchRow}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.mediumGray} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search code, customer, company, or reward..."
            placeholderTextColor={colors.mediumGray}
            style={styles.searchInput}
            autoCapitalize="characters"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((item) => (
            <TouchableOpacity key={item} style={[styles.filterPill, filter === item && styles.filterPillActive]} onPress={() => setFilter(item)}>
              <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{statusLabel(item)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filtered.length === 0 ? (
          <Card style={styles.emptyCard}>
            <MaterialCommunityIcons name="ticket-outline" size={38} color={colors.mediumGray} />
            <Text style={styles.emptyTitle}>No redemption codes yet</Text>
            <Text style={styles.emptyText}>Redeem a reward from the customer app, then return here to verify the issued code.</Text>
          </Card>
        ) : (
          <View style={styles.list}>
            {filtered.map((item) => (
              <Card key={item.id} style={styles.redemptionCard}>
                <View style={styles.cardTop}>
                  <View style={styles.iconBox}>
                    <MaterialCommunityIcons name="ticket-percent-outline" size={22} color={colors.primaryDark} />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.customerName}>{item.customerName}</Text>
                    <Text style={styles.rewardName}>{item.rewardTitle}</Text>
                    <Text style={styles.metaText}>{item.companyName} • -{item.pointsUsed.toLocaleString()} pts</Text>
                  </View>
                  <Badge label={statusLabel(item.status)} variant={statusVariant(item.status) as any} size="sm" />
                </View>

                <View style={styles.codeBox}>
                  <Text style={styles.codeLabel}>Redemption Code</Text>
                  <Text style={styles.codeValue}>{item.code}</Text>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[styles.actionButton, item.status === 'used' && styles.actionButtonDisabled]}
                    disabled={item.status === 'used'}
                    onPress={() => updateRedemptionStatus(item.id, 'used')}
                  >
                    <MaterialCommunityIcons name="check-circle-outline" size={16} color={item.status === 'used' ? colors.mediumGray : colors.success} />
                    <Text style={[styles.actionText, item.status === 'used' && styles.actionTextDisabled]}>Mark Used</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, item.status === 'voided' && styles.actionButtonDisabled]}
                    disabled={item.status === 'voided'}
                    onPress={() => updateRedemptionStatus(item.id, 'voided', 'Voided in demo verification')}
                  >
                    <MaterialCommunityIcons name="cancel" size={16} color={item.status === 'voided' ? colors.mediumGray : colors.error} />
                    <Text style={[styles.actionText, item.status === 'voided' && styles.actionTextDisabled]}>Void</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  scroll: { flex: 1 },
  content: { paddingBottom: spacing.xxl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.lg },
  pageTitle: { ...typography.h1, color: colors.charcoal },
  pageSubtitle: { ...typography.caption, color: colors.mediumGray, marginTop: spacing.xs },
  metricPill: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryLight, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  metricPillText: { ...typography.captionBold, color: colors.primaryDark },
  infoCard: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.md, backgroundColor: colors.infoLight, borderColor: '#BFDBFE' },
  infoIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  infoTextWrap: { flex: 1 },
  infoTitle: { ...typography.bodyBold, color: colors.charcoal },
  infoText: { ...typography.caption, color: colors.darkGray, marginTop: 2, lineHeight: 20 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.borderGray, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, height: 50, marginBottom: spacing.md },
  searchInput: { ...typography.body, color: colors.charcoal, flex: 1 },
  filterRow: { gap: spacing.sm, paddingBottom: spacing.md },
  filterPill: { borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.borderGray, backgroundColor: colors.white, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  filterPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { ...typography.captionBold, color: colors.mediumGray },
  filterTextActive: { color: colors.white },
  emptyCard: { alignItems: 'center', padding: spacing.xl, gap: spacing.sm },
  emptyTitle: { ...typography.h3, color: colors.charcoal },
  emptyText: { ...typography.caption, color: colors.mediumGray, textAlign: 'center', maxWidth: 320 },
  list: { gap: spacing.md },
  redemptionCard: { gap: spacing.md },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1 },
  customerName: { ...typography.bodyBold, color: colors.charcoal },
  rewardName: { ...typography.captionBold, color: colors.primaryDark, marginTop: 2 },
  metaText: { ...typography.small, color: colors.mediumGray, marginTop: 2 },
  codeBox: { backgroundColor: colors.lightGray, borderRadius: borderRadius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.borderGray },
  codeLabel: { ...typography.overline, color: colors.mediumGray },
  codeValue: { ...typography.h2, color: colors.charcoal, marginTop: 2, letterSpacing: 1 },
  actionRow: { flexDirection: 'row', gap: spacing.sm },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, flex: 1, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.borderGray, backgroundColor: colors.white, paddingVertical: spacing.sm + 4 },
  actionButtonDisabled: { opacity: 0.55 },
  actionText: { ...typography.captionBold, color: colors.charcoal },
  actionTextDisabled: { color: colors.mediumGray },
});
