import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, CompanyCard, Badge } from '../../src/components';
import { colors, spacing, borderRadius, typography } from '../../src/theme';
import { companies, rewards } from '../../src/data/demo';

export default function CompaniesScreen() {
  const getOffersCount = (companyId: string) =>
    rewards.filter((r) => r.companyId === companyId && r.isAvailable).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Participating Companies</Text>
        <Text style={styles.subtitle}>
          Earn and redeem points across the Sunshine Holdings family of companies
        </Text>

        <View style={styles.list}>
          {companies.map((company) => {
            const offersCount = getOffersCount(company.id);
            return (
              <Card key={company.id} padding="none">
                <View style={styles.companySection}>
                  {/* Accent bar */}
                  <View
                    style={[
                      styles.accentBar,
                      { backgroundColor: company.accentColor },
                    ]}
                  />

                  <View style={styles.companyBody}>
                    {/* Logo and name */}
                    <View style={styles.companyTop}>
                      <View
                        style={[
                          styles.logoCircle,
                          { backgroundColor: company.accentColor },
                        ]}
                      >
                        <Text style={styles.logoText}>
                          {company.name
                            .split(' ')
                            .map((w) => w[0])
                            .join('')}
                        </Text>
                      </View>
                      <View style={styles.companyInfo}>
                        <Text style={styles.companyName}>{company.name}</Text>
                        <Badge
                          label={company.isActive ? 'Active' : 'Inactive'}
                          variant={company.isActive ? 'success' : 'default'}
                          size="sm"
                        />
                      </View>
                    </View>

                    <Text style={styles.companyDescription}>
                      {company.description}
                    </Text>

                    {/* Stats row */}
                    <View style={styles.statsRow}>
                      <View style={styles.stat}>
                        <Ionicons
                          name="gift-outline"
                          size={16}
                          color={colors.primary}
                        />
                        <Text style={styles.statText}>
                          {offersCount} available{' '}
                          {offersCount === 1 ? 'offer' : 'offers'}
                        </Text>
                      </View>
                      <View style={styles.stat}>
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={16}
                          color={colors.success}
                        />
                        <Text style={styles.statText}>Linked</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            );
          })}

          {/* Future partner placeholder */}
          <Card padding="lg">
            <View style={styles.futurePartner}>
              <View style={styles.futureIconCircle}>
                <Ionicons
                  name="add-circle-outline"
                  size={32}
                  color={colors.mediumGray}
                />
              </View>
              <Text style={styles.futureTitle}>Future Sunshine Partner</Text>
              <Text style={styles.futureSubtitle}>
                More companies from the Sunshine Holdings group will be joining
                the loyalty programme soon. Stay tuned for additional ways to
                earn and redeem points.
              </Text>
            </View>
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
  header: {
    ...typography.h2,
    color: colors.charcoal,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.caption,
    color: colors.mediumGray,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  list: {
    gap: spacing.md,
  },
  companySection: {
    overflow: 'hidden',
    borderRadius: borderRadius.lg,
  },
  accentBar: {
    height: 4,
  },
  companyBody: {
    padding: spacing.md,
  },
  companyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
    marginBottom: spacing.sm + 4,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...typography.bodyBold,
    color: colors.white,
  },
  companyInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  companyName: {
    ...typography.h3,
    color: colors.charcoal,
  },
  companyDescription: {
    ...typography.caption,
    color: colors.darkGray,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingTop: spacing.sm + 4,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  statText: {
    ...typography.caption,
    color: colors.darkGray,
  },
  futurePartner: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  futureIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.borderGray,
  },
  futureTitle: {
    ...typography.bodyBold,
    color: colors.mediumGray,
    marginBottom: spacing.sm,
  },
  futureSubtitle: {
    ...typography.caption,
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: 20,
  },
});
