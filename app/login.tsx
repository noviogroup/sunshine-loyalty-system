import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Input } from '../src/components';
import { colors, spacing, borderRadius, typography } from '../src/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('alicia.rolle@gmail.com');
  const [password, setPassword] = useState('sunshine-demo');

  const handleLogin = () => {
    router.replace('/(customer)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandBlock}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.title}>Welcome to Sunshine Rewards</Text>
          <Text style={styles.subtitle}>
            Sign in to view your points, linked accounts, and available rewards.
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Customer Sign In</Text>
          <Input
            label="Email or phone"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email or phone"
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            leftIcon="lock-closed-outline"
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button title="Sign In" onPress={handleLogin} fullWidth size="lg" />
        </Card>

        <View style={styles.accountLinkPreview}>
          <Ionicons name="link-outline" size={20} color={colors.primary} />
          <Text style={styles.accountLinkText}>
            Demo account includes linked Sunshine Finance and Sunshine Insurance records.
          </Text>
        </View>

        <Button
          title="Back to Demo Menu"
          onPress={() => router.replace('/')}
          variant="ghost"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    ...typography.h1,
    color: colors.white,
    fontSize: 34,
  },
  title: {
    ...typography.h1,
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.mediumGray,
    textAlign: 'center',
    maxWidth: 360,
  },
  card: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.charcoal,
    marginBottom: spacing.md,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  forgotText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  accountLinkPreview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  accountLinkText: {
    ...typography.caption,
    color: colors.primaryDark,
    flex: 1,
    lineHeight: 20,
  },
});
