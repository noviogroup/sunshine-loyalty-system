import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../src/theme';
import { Card, Badge, Button, TransactionItem, Input } from '../../src/components';
import { useDemoState } from '../../src/context/DemoStateContext';

type ActionModal = 'points' | 'note' | 'offer' | null;

export default function CustomerDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { customers, transactions, adjustCustomerPoints } = useDemoState();
  const [actionModal, setActionModal] = useState<ActionModal>(null);
  const [pointsValue, setPointsValue] = useState('250');
  const [reason, setReason] = useState('Customer service goodwill adjustment');
  const [note, setNote] = useState('Customer asked about combining Finance and Insurance rewards. Follow up after executive demo.');
  const [offerMessage, setOfferMessage] = useState('Invite customer to review available Sunshine Insurance premium credit offer.');
  const [successMessage, setSuccessMessage] = useState('');

  const customer = customers.find((item) => item.id === id) ?? customers[0];

  const customerTransactions = useMemo(
    () =>
      transactions
        .filter((t) => t.customerId === customer.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6),
    [customer.id, transactions]
  );

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

  const closeModal = () => setActionModal(null);

  const handleAdjustPoints = () => {
    const points = Number(pointsValue);
    if (!Number.isFinite(points) || points === 0) return;
    adjustCustomerPoints(customer.id, points, reason);
    setSuccessMessage(`${points > 0 ? '+' : ''}${points} points adjustment saved for ${customer.name}.`);
    closeModal();
  };

  const handleSaveNote = () => {
    if (!note.trim()) return;
    setSuccessMessage(`Internal note saved for ${customer.name}.`);
    closeModal();
  };

  const handleSendOffer = () => {
    if (!offerMessage.trim()) return;
    setSuccessMessage(`Demo offer queued for ${customer.name}.`);
    closeModal();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Button title="Back to Customers" onPress={() => router.push('/(admin)/customers')} variant="ghost" />

        {successMessage ? (
          <View style={styles.successBanner}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        ) : null}

        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: tierColor }]}> <Text style={styles.avatarText}>{initials}</Text> </View>
            <View style={styles.profileInfo}>
              <Text style={styles.customerName}>{customer.name}</Text>
              <Badge label={customer.tier} variant={customer.tier === 'Gold' ? 'warning' : customer.tier === 'Platinum' ? 'success' : 'default'} size="sm" />
            </View>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}><Ionicons name="mail-outline" size={18} color={colors.mediumGray} /><Text style={styles.detailText}>{customer.email}</Text></View>
            <View style={styles.detailRow}><Ionicons name="call-outline" size={18} color={colors.mediumGray} /><Text style={styles.detailText}>{customer.phone}</Text></View>
            <View style={styles.detailRow}><Ionicons name="calendar-outline" size={18} color={colors.mediumGray} /><Text style={styles.detailText}>Joined {customer.joinDate}</Text></View>
          </View>
        </Card>

        <Card style={styles.pointsCard}>
          <View style={styles.pointsIconRow}>
            <View style={styles.pointsIconContainer}><Ionicons name="star" size={24} color={colors.primary} /></View>
            <Text style={styles.pointsLabel}>Points Balance</Text>
          </View>
          <Text style={styles.pointsValue}>{customer.points.toLocaleString()}</Text>
          {customer.nextTier && <Text style={styles.nextTierText}>{customer.pointsToNextTier.toLocaleString()} points to {customer.nextTier}</Text>}
        </Card>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Linked Accounts</Text></View>
        {customer.linkedAccounts.map((account) => (
          <Card key={account.accountNumber} style={styles.linkedCard}>
            <View style={styles.linkedRow}>
              <View style={styles.linkedInfo}>
                <Text style={styles.linkedCompany}>{account.companyName}</Text>
                <Text style={styles.linkedAccount}>Account: {account.accountNumber}</Text>
                <Text style={styles.linkedDate}>Linked {account.linkedDate}</Text>
              </View>
              <Ionicons name="link" size={20} color={colors.mediumGray} />
            </View>
          </Card>
        ))}

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Recent Transactions</Text></View>
        <View style={styles.transactionsCard}>
          {customerTransactions.length > 0 ? (
            customerTransactions.map((txn, index) => (
              <View key={txn.id}>
                <TransactionItem type={txn.type === 'adjustment' ? 'earned' : txn.type} points={Math.abs(txn.points)} description={txn.description} companyName={txn.companyName} date={txn.date} status={txn.type === 'adjustment' ? 'earned' : txn.type} />
                {index < customerTransactions.length - 1 && <View style={styles.divider} />}
              </View>
            ))
          ) : (
            <View style={styles.emptyTransactions}><Text style={styles.emptyText}>No transactions found</Text></View>
          )}
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Actions</Text></View>
        <View style={styles.actionsContainer}>
          <Button title="Adjust Points" onPress={() => setActionModal('points')} variant="primary" fullWidth />
          <Button title="Add Note" onPress={() => setActionModal('note')} variant="outline" fullWidth />
          <Button title="Send Offer" onPress={() => setActionModal('offer')} variant="secondary" fullWidth />
        </View>
      </ScrollView>

      <Modal visible={!!actionModal} transparent animationType="fade" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            {actionModal === 'points' ? (
              <>
                <Text style={styles.modalTitle}>Adjust Points</Text>
                <Text style={styles.modalSubtitle}>Every adjustment is added to the demo activity ledger.</Text>
                <Input label="Points adjustment" value={pointsValue} onChangeText={setPointsValue} placeholder="Example: 250 or -100" keyboardType="numeric" leftIcon="star-outline" />
                <Input label="Reason" value={reason} onChangeText={setReason} placeholder="Required reason for audit trail" leftIcon="document-text-outline" />
                <Button title="Save Adjustment" onPress={handleAdjustPoints} fullWidth />
              </>
            ) : actionModal === 'note' ? (
              <>
                <Text style={styles.modalTitle}>Add Internal Note</Text>
                <Text style={styles.modalSubtitle}>Demo-only note for staff follow-up. Production should save this to an audit/activity table.</Text>
                <Input label="Note" value={note} onChangeText={setNote} placeholder="Enter internal note" leftIcon="document-text-outline" />
                <Button title="Save Note" onPress={handleSaveNote} fullWidth />
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Send Offer</Text>
                <Text style={styles.modalSubtitle}>Demo-only offer queue. Production should send through email, SMS, or in-app notification.</Text>
                <Input label="Offer message" value={offerMessage} onChangeText={setOfferMessage} placeholder="Offer message" leftIcon="gift-outline" />
                <Button title="Queue Offer" onPress={handleSendOffer} fullWidth />
              </>
            )}
            <View style={styles.modalGap} />
            <Button title="Cancel" onPress={closeModal} variant="outline" fullWidth />
          </Card>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  container: { flex: 1 },
  contentContainer: { padding: spacing.md, paddingBottom: spacing.xxl },
  successBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.successLight, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: 'rgba(16,185,129,0.25)' },
  successText: { ...typography.captionBold, color: colors.success, flex: 1 },
  profileCard: { padding: spacing.lg, marginBottom: spacing.md },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.lg },
  avatar: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  avatarText: { ...typography.h2, color: colors.white },
  profileInfo: { flex: 1, gap: spacing.sm },
  customerName: { ...typography.h2, color: colors.charcoal },
  detailsGrid: { gap: spacing.sm + 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  detailText: { ...typography.body, color: colors.darkGray },
  pointsCard: { padding: spacing.lg, marginBottom: spacing.lg, backgroundColor: colors.primaryLight, borderWidth: 1, borderColor: colors.primary },
  pointsIconRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  pointsIconContainer: { width: 40, height: 40, borderRadius: borderRadius.sm, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  pointsLabel: { ...typography.captionBold, color: colors.primaryDark },
  pointsValue: { ...typography.kpiValue, color: colors.charcoal, fontSize: 40, marginBottom: spacing.xs },
  nextTierText: { ...typography.caption, color: colors.primaryDark },
  sectionHeader: { marginBottom: spacing.sm + 4, marginTop: spacing.sm },
  sectionTitle: { ...typography.h3, color: colors.charcoal },
  linkedCard: { padding: spacing.md, marginBottom: spacing.sm },
  linkedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  linkedInfo: { flex: 1 },
  linkedCompany: { ...typography.bodyBold, color: colors.charcoal, marginBottom: 2 },
  linkedAccount: { ...typography.caption, color: colors.mediumGray, marginBottom: 1 },
  linkedDate: { ...typography.small, color: colors.mediumGray },
  transactionsCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, overflow: 'hidden', shadowColor: colors.charcoal, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2, marginBottom: spacing.md },
  divider: { height: 1, backgroundColor: colors.borderGray, marginHorizontal: spacing.md },
  emptyTransactions: { padding: spacing.lg, alignItems: 'center' },
  emptyText: { ...typography.caption, color: colors.mediumGray },
  actionsContainer: { gap: spacing.sm + 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: spacing.lg },
  modalCard: { padding: spacing.lg },
  modalTitle: { ...typography.h2, color: colors.charcoal, marginBottom: spacing.xs },
  modalSubtitle: { ...typography.caption, color: colors.mediumGray, marginBottom: spacing.md },
  modalGap: { height: spacing.sm },
});
