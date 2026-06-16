import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme';
import { typography } from '../../src/theme';
import { spacing, borderRadius } from '../../src/theme';

function AdminHeader() {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.left}>
        <View style={headerStyles.logoCircle}>
          <Text style={headerStyles.logoText}>S</Text>
        </View>
        <Text style={headerStyles.title}>Sunshine Rewards Admin</Text>
      </View>
      <View style={headerStyles.demoBadge}>
        <Text style={headerStyles.demoBadgeText}>Demo Mode</Text>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.charcoal,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...typography.bodyBold,
    color: colors.white,
    fontSize: 16,
  },
  title: {
    ...typography.bodyBold,
    color: colors.white,
  },
  demoBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  demoBadgeText: {
    ...typography.smallBold,
    color: colors.primaryDark,
  },
});

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <AdminHeader />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mediumGray,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.borderGray,
          borderTopWidth: 1,
          paddingTop: spacing.xs,
          height: 60,
        },
        tabBarLabelStyle: {
          ...typography.small,
          fontWeight: '600',
          marginBottom: spacing.xs,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: 'Customers',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="campaigns"
        options={{
          title: 'Campaigns',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="megaphone" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="customer-detail"
        options={{
          href: null,
          title: 'Customer Detail',
        }}
      />
    </Tabs>
  );
}
