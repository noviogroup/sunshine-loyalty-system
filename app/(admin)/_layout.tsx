import { Slot, usePathname, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../src/theme';
import { BrandMark } from '../../src/components';

type NavItem = {
  label: string;
  route: '/(admin)' | '/(admin)/customers' | '/(admin)/campaigns' | '/(admin)/redemptions' | '/(admin)/transactions';
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  match: string;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', route: '/(admin)', icon: 'view-dashboard-outline', match: '/' },
  { label: 'Customers', route: '/(admin)/customers', icon: 'account-group-outline', match: 'customers' },
  { label: 'Campaigns', route: '/(admin)/campaigns', icon: 'bullhorn-outline', match: 'campaigns' },
  { label: 'Redemptions', route: '/(admin)/redemptions', icon: 'ticket-confirmation-outline', match: 'redemptions' },
  { label: 'Transactions', route: '/(admin)/transactions', icon: 'swap-horizontal-circle-outline', match: 'transactions' },
];

function isActive(pathname: string, item: NavItem) {
  if (item.label === 'Dashboard') {
    return pathname === '/' || pathname === '/admin' || pathname === '/(admin)';
  }
  return pathname.includes(item.match);
}

function AdminNav({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={compact ? styles.compactNav : styles.navList}>
      {navItems.map((item) => {
        const active = isActive(pathname, item);
        return (
          <TouchableOpacity
            key={item.label}
            style={[compact ? styles.compactNavItem : styles.navItem, active && styles.navItemActive]}
            activeOpacity={0.78}
            onPress={() => router.push(item.route)}
          >
            <MaterialCommunityIcons name={item.icon} size={20} color={active ? colors.primaryDark : colors.mediumGray} />
            <Text style={[styles.navText, active && styles.navTextActive]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Sidebar() {
  return (
    <View style={styles.sidebar}>
      <View style={styles.sidebarBrand}>
        <BrandMark size="md" />
        <View>
          <Text style={styles.brandTitle}>Sunshine</Text>
          <Text style={styles.brandSubtitle}>Rewards Admin</Text>
        </View>
      </View>

      <View style={styles.sidebarSection}>
        <Text style={styles.sectionLabel}>Main Menu</Text>
        <AdminNav />
      </View>

      <View style={styles.sidebarFooter}>
        <View style={styles.demoCard}>
          <MaterialCommunityIcons name="flask-outline" size={22} color={colors.primaryDark} />
          <Text style={styles.demoCardTitle}>Demo Mode</Text>
          <Text style={styles.demoCardText}>Seeded data only. No live customer records.</Text>
        </View>
      </View>
    </View>
  );
}

function TopBar({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.topBar}>
      <View>
        <Text style={styles.topBarTitle}>Operations Console</Text>
        <Text style={styles.topBarSubtitle}>Manage customers, rewards, campaigns, redemptions, and activity.</Text>
      </View>
      <View style={styles.topActions}>
        <View style={styles.searchPill}>
          <MaterialCommunityIcons name="magnify" size={18} color={colors.mediumGray} />
          <Text style={styles.searchText}>{compact ? 'Search' : 'Search customers, codes, or transactions'}</Text>
        </View>
        <View style={styles.profileBadge}>
          <MaterialCommunityIcons name="account-tie-outline" size={18} color={colors.charcoal} />
        </View>
      </View>
    </View>
  );
}

export default function AdminLayout() {
  const { width } = useWindowDimensions();
  const compact = width < 900;

  if (compact) {
    return (
      <View style={styles.compactShell}>
        <View style={styles.compactHeader}>
          <View style={styles.compactBrandRow}>
            <BrandMark size="sm" />
            <View>
              <Text style={styles.brandTitle}>Sunshine Rewards Admin</Text>
              <Text style={styles.brandSubtitle}>Demo console</Text>
            </View>
          </View>
          <AdminNav compact />
        </View>
        <TopBar compact />
        <View style={styles.compactContent}>
          <Slot />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.shell}>
      <Sidebar />
      <View style={styles.mainPanel}>
        <TopBar />
        <View style={styles.contentPanel}>
          <Slot />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, flexDirection: 'row', backgroundColor: '#EEF2F7' },
  sidebar: { width: 280, backgroundColor: colors.white, borderRightWidth: 1, borderRightColor: colors.borderGray, padding: spacing.lg, justifyContent: 'space-between' },
  sidebarBrand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, marginBottom: spacing.xl },
  brandTitle: { ...typography.h3, color: colors.charcoal },
  brandSubtitle: { ...typography.small, color: colors.mediumGray, marginTop: 1 },
  sidebarSection: { flex: 1 },
  sectionLabel: { ...typography.overline, color: colors.mediumGray, marginBottom: spacing.sm + 4 },
  navList: { gap: spacing.sm },
  navItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, paddingVertical: spacing.sm + 3, paddingHorizontal: spacing.sm + 4, borderRadius: borderRadius.lg },
  navItemActive: { backgroundColor: colors.primaryLight },
  navText: { ...typography.captionBold, color: colors.mediumGray },
  navTextActive: { color: colors.primaryDark },
  sidebarFooter: { marginTop: spacing.lg },
  demoCard: { backgroundColor: colors.primaryLight, borderRadius: borderRadius.xl, padding: spacing.md, borderWidth: 1, borderColor: '#FDE68A' },
  demoCardTitle: { ...typography.captionBold, color: colors.primaryDark, marginTop: spacing.sm },
  demoCardText: { ...typography.small, color: colors.darkGray, marginTop: 2, lineHeight: 17 },
  mainPanel: { flex: 1, minWidth: 0 },
  topBar: { minHeight: 84, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.borderGray, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.lg },
  topBarTitle: { ...typography.h2, color: colors.charcoal },
  topBarSubtitle: { ...typography.caption, color: colors.mediumGray, marginTop: 2 },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  searchPill: { height: 42, minWidth: 260, borderRadius: borderRadius.full, backgroundColor: colors.lightGray, borderWidth: 1, borderColor: colors.borderGray, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md },
  searchText: { ...typography.caption, color: colors.mediumGray },
  profileBadge: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FDE68A' },
  contentPanel: { flex: 1, padding: spacing.lg },
  compactShell: { flex: 1, backgroundColor: '#EEF2F7' },
  compactHeader: { backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.borderGray, paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm },
  compactBrandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, marginBottom: spacing.sm + 4 },
  compactNav: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  compactNavItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 2, paddingVertical: spacing.sm, paddingHorizontal: spacing.sm + 4, borderRadius: borderRadius.full },
  compactContent: { flex: 1, padding: spacing.sm },
});
