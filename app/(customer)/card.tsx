import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandMark, Card, DemoQr } from '../../src/components';
import { colors, spacing, borderRadius, typography } from '../../src/theme';
import { useDemoState } from '../../src/context/DemoStateContext';

export default function MemberCardScreen() {
  const { demoCustomer } = useDemoState();
  const memberId = `SHL-${demoCustomer.id.toUpperCase()}-${demoCustomer.joinDate.slice(0, 4)}`;
  const linkedNames = demoCustomer.linkedAccounts.map((account) => account.companyName);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.header}>My Rewards Card</Text>
        <Text style={styles.subtitle}>Show this card when redeeming rewards at participating Sunshine companies.</Text>

        <View style={styles.cardWrap}>
          <View style={styles.memberCard}>
            <View style={styles.orbTop} />
            <View style={styles.orbBottom} />
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardKicker}>SUNSHINE REWARDS</Text>
                <Text style={styles.cardTitle}>Member Card</Text>
              </View>
              <BrandMark size="sm" inverse />
            </View>

            <View style={styles.qrArea}>
              <DemoQr value={memberId} size={168} />
              <Text style={styles.scanHint}>Scan or enter member ID</Text>
            </View>

            <View style={styles.memberInfoRow}>
              <View>
                <Text style={styles.infoLabel}>MEMBER</Text>
                <Text style={styles.infoValue}>{demoCustomer.name}</Text>
              </View>
              <View style={styles.rightInfo}>
                <Text style={styles.infoLabel}>ID</Text>
                <Text style={styles.infoValue}>{memberId}</Text>
              </View>
            </View>
          </View>
        </View>

        <Card style={styles.pointsCard}>
          <View style={styles.pointsItem}>
            <Text style={styles.pointsValue}>{demoCustomer.points.toLocaleString()}</Text>
            <Text style={styles.pointsLabel}>Available Points</Text>
          </View>
          <View style={styles.pointsDivider} />
          <View style={styles.pointsItem}>
            <Text style={styles.pointsValue}>{demoCustomer.tier}</Text>
            <Text style={styles.pointsLabel}>Current Tier</Text>
          </View>
        </Card>

        <Card style={styles.linkedCard}>
          <Text style={styles.sectionTitle}>Linked Companies</Text>
          {linkedNames.map((name) => (
            <View key={name} style={styles.linkRow}>
              <View style={styles.linkIcon}>
                <MaterialCommunityIcons name={name.includes('Insurance') ? 'shield-check-outline' : 'bank-outline'} size={18} color={colors.primaryDark} />
              </View>
              <Text style={styles.linkText}>{name}</Text>
              <MaterialCommunityIcons name="check-circle" size={18} color={colors.success} />
            </View>
          ))}
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  content: { flex: 1, padding: spacing.lg },
  header: { ...typography.h2, color: colors.charcoal, marginTop: spacing.sm },
  subtitle: { ...typography.caption, color: colors.mediumGray, marginTop: spacing.xs, marginBottom: spacing.lg, maxWidth: 360 },
  cardWrap: { shadowColor: colors.primaryDark, shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.22, shadowRadius: 24, elevation: 10, marginBottom: spacing.lg },
  memberCard: { backgroundColor: colors.primary, borderRadius: borderRadius.xl, padding: spacing.lg, minHeight: 420, overflow: 'hidden' },
  orbTop: { position: 'absolute', top: -80, right: -80, width: 210, height: 210, borderRadius: 105, backgroundColor: 'rgba(255,255,255,0.12)' },
  orbBottom: { position: 'absolute', bottom: -70, left: -80, width: 190, height: 190, borderRadius: 95, backgroundColor: 'rgba(255,255,255,0.08)' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },
  cardKicker: { ...typography.overline, color: 'rgba(255,255,255,0.7)' },
  cardTitle: { ...typography.h2, color: colors.white, marginTop: 2 },
  qrArea: { alignItems: 'center', marginVertical: spacing.md },
  scanHint: { ...typography.captionBold, color: 'rgba(255,255,255,0.76)', marginTop: spacing.sm, letterSpacing: 0.3 },
  memberInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', gap: spacing.md },
  infoLabel: { ...typography.overline, color: 'rgba(255,255,255,0.62)' },
  infoValue: { ...typography.bodyBold, color: colors.white, marginTop: 2 },
  rightInfo: { alignItems: 'flex-end' },
  pointsCard: { flexDirection: 'row', marginBottom: spacing.md },
  pointsItem: { flex: 1, alignItems: 'center' },
  pointsValue: { ...typography.h2, color: colors.primaryDark },
  pointsLabel: { ...typography.small, color: colors.mediumGray, marginTop: 2 },
  pointsDivider: { width: 1, backgroundColor: colors.borderGray, marginVertical: spacing.xs },
  linkedCard: { gap: spacing.sm },
  sectionTitle: { ...typography.h3, color: colors.charcoal, marginBottom: spacing.xs },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  linkIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  linkText: { ...typography.bodyMedium, color: colors.charcoal, flex: 1 },
});
