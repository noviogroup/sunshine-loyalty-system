import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme';
import { typography } from '../../src/theme';
import { spacing, borderRadius } from '../../src/theme';

function ExecutiveHeader() {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.left}>
        <View style={headerStyles.logoCircle}>
          <Text style={headerStyles.logoText}>S</Text>
        </View>
        <View>
          <Text style={headerStyles.title}>Sunshine Rewards</Text>
          <Text style={headerStyles.subtitle}>Executive Dashboard</Text>
        </View>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.charcoal,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...typography.bodyBold,
    color: colors.white,
    fontSize: 18,
  },
  title: {
    ...typography.bodyBold,
    color: colors.white,
  },
  subtitle: {
    ...typography.small,
    color: colors.primary,
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

export default function ExecutiveLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <ExecutiveHeader />,
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
          title: 'Overview',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="companies"
        options={{
          title: 'Companies',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
