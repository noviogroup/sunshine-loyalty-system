import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../src/theme';

export default function CustomerLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mediumGray,
        tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.borderGray, height: 62, paddingTop: spacing.xs },
        tabBarLabelStyle: { ...typography.smallBold, marginBottom: spacing.xs },
        headerStyle: { backgroundColor: colors.white },
        headerTintColor: colors.charcoal,
        headerTitleStyle: typography.bodyBold,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-variant-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="offers" options={{ title: 'Offers', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="gift-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="card" options={{ title: 'Card', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="card-account-details-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="companies" options={{ title: 'Companies', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="domain" size={size} color={color} /> }} />
      <Tabs.Screen name="activity" options={{ title: 'Activity', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="history" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="redeem/[id]" options={{ href: null, title: 'Redeem Reward' }} />
    </Tabs>
  );
}
