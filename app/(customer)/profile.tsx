import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, Badge } from '../../src/components';
import { colors, spacing, typography } from '../../src/theme';
import { useDemoState } from '../../src/context/DemoStateContext';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
}

function SettingsItem({ icon, label, onPress, isDestructive = false }: SettingsItemProps) {
  return (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingsItemLeft}>
        <Ionicons name={icon} size={20} color={isDestructive ? colors.error : colors.darkGray} />
        <Text style={[styles.settingsItemLabel, isDestructive && { color: colors.error }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.mediumGray} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { demoCustomer, resetDemo } = useDemoState();
  const initials = demoCustomer.name.split(' ').map((name) => name[0]).join('');
  const placeholder = () => undefined;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}><Text style={styles.avatarText}>{initials}</Text></View>
          <Text style={styles.profileName}>{demoCustomer.name}</Text>
          <Badge label={`${demoCustomer.tier} Member`} variant="warning" />
          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Ionicons name="mail-outline" size={16} color={colors.mediumGray} />
              <Text style={styles.contactText}>{demoCustomer.email}</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name="call-outline" size={16} color={colors.mediumGray} />
              <Text style={styles.contactText}>{demoCustomer.phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Linked Accounts</Text>
          <Card padding="none">
            {demoCustomer.linkedAccounts.map((account, index) => (
              <View key={account.companyId}>
                <View style={styles.linkedAccount}>
                  <View style={styles.linkedAccountLeft}>
                    <Ionicons name="business-outline" size={20} color={colors.primary} />
                    <View>
                      <Text style={styles.linkedAccountName}>{account.companyName}</Text>
                      <Text style={styles.linkedAccountNumber}>{account.accountNumber}</Text>
                    </View>
                  </View>
                  <Badge label="Connected" variant="success" size="sm" />
                </View>
                {index < demoCustomer.linkedAccounts.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Card padding="none">
            <SettingsItem icon="notifications-outline" label="Notifications" onPress={placeholder} />
            <View style={styles.divider} />
            <SettingsItem icon="chatbubble-outline" label="Communication Preferences" onPress={placeholder} />
            <View style={styles.divider} />
            <SettingsItem icon="lock-closed-outline" label="Password" onPress={placeholder} />
            <View style={styles.divider} />
            <SettingsItem icon="document-text-outline" label="Terms & Privacy" onPress={placeholder} />
            <View style={styles.divider} />
            <SettingsItem icon="refresh-outline" label="Reset Demo Data" onPress={resetDemo} />
          </Card>
        </View>

        <Text style={styles.memberSince}>
          Member since {new Date(demoCustomer.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  scroll: { flex: 1 },
  content: { paddingBottom: spacing.xxl },
  profileHeader: { alignItems: 'center', paddingVertical: spacing.xl, paddingHorizontal: spacing.md, backgroundColor: colors.white, marginBottom: spacing.md },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm + 4 },
  avatarText: { fontSize: 28, fontWeight: '700', color: colors.white },
  profileName: { ...typography.h2, color: colors.charcoal, marginBottom: spacing.sm },
  contactInfo: { marginTop: spacing.md, gap: spacing.sm },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  contactText: { ...typography.caption, color: colors.darkGray },
  section: { paddingHorizontal: spacing.md, marginBottom: spacing.md },
  sectionTitle: { ...typography.h3, color: colors.charcoal, marginBottom: spacing.sm + 4 },
  linkedAccount: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md },
  linkedAccountLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  linkedAccountName: { ...typography.bodyBold, color: colors.charcoal },
  linkedAccountNumber: { ...typography.small, color: colors.mediumGray, marginTop: 2 },
  settingsItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm + 4, paddingHorizontal: spacing.md, minHeight: 50 },
  settingsItemLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  settingsItemLabel: { ...typography.body, color: colors.charcoal },
  divider: { height: 1, backgroundColor: colors.borderGray, marginHorizontal: spacing.md },
  memberSince: { ...typography.small, color: colors.mediumGray, textAlign: 'center', marginTop: spacing.md },
});
