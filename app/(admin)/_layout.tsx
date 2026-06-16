import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../src/theme';
import { BrandMark } from '../../src/components';

function AdminHeader() {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.left}>
        <BrandMark size="sm" inverse />
        <View>
          <Text style={headerStyles.title}>Sunshine Rewards Admin</Text>
          <Text style={headerStyles.subtitle}>Operations console</Text>
        </View>
      </View>
      <View style={headerStyles.demoBadge}>
        <Text style={headerStyles.demoBadgeText}>Demo Mode</Text>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 4, backgroundColor: colors.charcoal },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, flex: 1 },
  title: { ...typography.bodyBold, color: colors.white },
  subtitle: { ...typography.small, color: 'rgba(255,255,255,0.68)', marginTop: 1 },
  demoBadge: { backgroundColor: colors.primaryLight, paddingHorizontal: spacing.sm + 4, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  demoBadgeText: { ...typography.smallBold, color: colors.primaryDark },
});

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <AdminHeader />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mediumGray,
        tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.borderGray, borderTopWidth: 1, paddingTop: spacing.xs, height: 62 },
        tabBarLabelStyle: { ...typography.smallBold, marginBottom: spacing.xs },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: 'Customers',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-group-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="campaigns"
        options={{
          title: 'Campaigns',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bullhorn-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="swap-horizontal-circle-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen name="customer-detail" options={{ href: null, title: 'Customer Detail' }} />
    </Tabs>
  );
}
