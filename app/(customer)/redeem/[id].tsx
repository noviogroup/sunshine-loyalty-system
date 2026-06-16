import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '../../../src/components';
import { colors, spacing, borderRadius, typography } from '../../../src/theme';
import { rewards } from '../../../src/data/demo';
import { useDemoState } from '../../../src/context/DemoStateContext';

export default function RedeemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { demoCustomer, redeemReward } = useDemoState();
  const [redeemed, setRedeemed] = useState(false);
  const [redemptionCode, setRedemptionCode] = useState('');
  const [successBalance, setSuccessBalance] = useState<number | null>(null);

  const reward = rewards.find((r) => r.id === id);

  if (!reward) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.mediumGray} />
          <Text style={styles.notFoundTitle}>Reward Not Found</Text>
          <Text style={styles.notFoundSubtitle}>This reward may no longer be available.</Text>
          <Button title="Go Back" onPress={() => router.back()} variant="outline" />
        </View>
      </SafeAreaView>
    );
  }

  const canAfford = demoCustomer.points >= reward.pointsCost;
  const previewBalance = Math.max(0, demoCustomer.points - reward.pointsCost);

  const handleRedeem = async () => {
    const code = await redeemReward(reward);
    setRedemptionCode(code);
    setSuccessBalance(previewBalance);
    setRedeemed(true);
  };

  if (redeemed) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.successContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark" size={48} color={colors.white} />
          </View>
          <Text style={styles.successTitle}>Reward Redeemed!</Text>
          <Text style={styles.successSubtitle}>Your points balance and activity history have been updated for the demo.</Text>

          <Card style={styles.codeCard}>
            <Text style={styles.codeLabel}>Redemption Code</Text>
            <Text style={styles.codeValue}>{redemptionCode}</Text>
            <Text style={styles.codeHint}>Show this code to a {reward.companyName} representative.</Text>
          </Card>

          <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Reward</Text><Text style={styles.summaryValue}>{reward.title}</Text></View>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Points Used</Text><Text style={styles.summaryValue}>{reward.pointsCost.toLocaleString()}</Text></View>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Updated Balance</Text><Text style={styles.summaryValue}>{(successBalance ?? previewBalance).toLocaleString()}</Text></View>
          </Card>

          <Button title="View Activity" onPress={() => router.push('/(customer)/activity')} fullWidth />
          <View style={styles.buttonGap} />
          <Button title="Go Home" onPress={() => router.push('/(customer)')} variant="outline" fullWidth />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.rewardHeader}>
          <View style={styles.pointsBadge}>
            <Ionicons name="diamond" size={16} color={colors.primary} />
            <Text style={styles.pointsBadgeText}>{reward.pointsCost.toLocaleString()} pts</Text>
          </View>
          <Text style={styles.rewardTitle}>{reward.title}</Text>
          <Text style={styles.rewardCompany}>{reward.companyName}</Text>
        </View>

        <Card style={styles.detailsCard}>
          <Text style={styles.detailsLabel}>Description</Text>
          <Text style={styles.detailsText}>{reward.description}</Text>
          <View style={styles.detailsDivider} />
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Category</Text><Text style={styles.detailValue}>{reward.category}</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Expires</Text><Text style={styles.detailValue}>{reward.expiryDate}</Text></View>
        </Card>

        <Card style={styles.balanceCard}>
          <View style={styles.balanceRow}><Text style={styles.balanceLabel}>Your Balance</Text><Text style={styles.balanceValue}>{demoCustomer.points.toLocaleString()} pts</Text></View>
          <View style={styles.balanceRow}><Text style={styles.balanceLabel}>Reward Cost</Text><Text style={[styles.balanceValue, { color: colors.error }]}>-{reward.pointsCost.toLocaleString()} pts</Text></View>
          <View style={styles.balanceDivider} />
          <View style={styles.balanceRow}><Text style={styles.balanceTotalLabel}>Remaining</Text><Text style={[styles.balanceTotalValue, { color: canAfford ? colors.success : colors.error }]}>{previewBalance.toLocaleString()} pts</Text></View>
        </Card>

        {!canAfford && (
          <View style={styles.insufficientBanner}>
            <Ionicons name="information-circle" size={18} color={colors.error} />
            <Text style={styles.insufficientText}>You need {(reward.pointsCost - demoCustomer.points).toLocaleString()} more points to redeem this reward.</Text>
          </View>
        )}

        <Button title={canAfford ? 'Redeem Reward' : 'Insufficient Points'} onPress={handleRedeem} disabled={!canAfford} fullWidth size="lg" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, gap: spacing.sm + 4 },
  notFoundTitle: { ...typography.h3, color: colors.charcoal },
  notFoundSubtitle: { ...typography.caption, color: colors.mediumGray, textAlign: 'center', marginBottom: spacing.md },
  rewardHeader: { alignItems: 'center', paddingVertical: spacing.xl },
  pointsBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryLight, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full, gap: spacing.xs + 2, marginBottom: spacing.md },
  pointsBadgeText: { ...typography.captionBold, color: colors.primaryDark },
  rewardTitle: { ...typography.h2, color: colors.charcoal, textAlign: 'center', marginBottom: spacing.xs },
  rewardCompany: { ...typography.caption, color: colors.mediumGray },
  detailsCard: { marginBottom: spacing.md },
  detailsLabel: { ...typography.captionBold, color: colors.mediumGray, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.sm },
  detailsText: { ...typography.body, color: colors.darkGray, lineHeight: 24 },
  detailsDivider: { height: 1, backgroundColor: colors.borderGray, marginVertical: spacing.md },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  detailLabel: { ...typography.caption, color: colors.mediumGray },
  detailValue: { ...typography.captionBold, color: colors.charcoal },
  balanceCard: { marginBottom: spacing.md },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  balanceLabel: { ...typography.body, color: colors.darkGray },
  balanceValue: { ...typography.bodyBold, color: colors.charcoal },
  balanceDivider: { height: 1, backgroundColor: colors.borderGray, marginVertical: spacing.sm },
  balanceTotalLabel: { ...typography.bodyBold, color: colors.charcoal },
  balanceTotalValue: { ...typography.h3 },
  insufficientBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.errorLight, padding: spacing.sm + 4, borderRadius: borderRadius.md, gap: spacing.sm, marginBottom: spacing.md },
  insufficientText: { ...typography.caption, color: colors.error, flex: 1 },
  successContainer: { flexGrow: 1, alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.xxl + spacing.lg, paddingBottom: spacing.xxl },
  successIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  successTitle: { ...typography.h2, color: colors.charcoal, marginBottom: spacing.sm },
  successSubtitle: { ...typography.body, color: colors.mediumGray, textAlign: 'center', marginBottom: spacing.xl, lineHeight: 24 },
  codeCard: { width: '100%', alignItems: 'center', marginBottom: spacing.md, borderWidth: 2, borderColor: colors.primary, borderStyle: 'dashed' },
  codeLabel: { ...typography.captionBold, color: colors.mediumGray, textTransform: 'uppercase', letterSpacing: 0.5 },
  codeValue: { ...typography.h2, color: colors.charcoal, marginVertical: spacing.sm },
  codeHint: { ...typography.caption, color: colors.mediumGray, textAlign: 'center' },
  summaryCard: { width: '100%', marginBottom: spacing.lg },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md, marginBottom: spacing.sm },
  summaryLabel: { ...typography.caption, color: colors.mediumGray },
  summaryValue: { ...typography.captionBold, color: colors.charcoal, flex: 1, textAlign: 'right' },
  buttonGap: { height: spacing.sm },
});
