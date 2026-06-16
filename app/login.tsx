import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Card, Input, BrandMark } from '../src/components';
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
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.brandBlock}>
          <BrandMark size="lg" />
          <Text style={styles.kicker}>Customer Access</Text>
          <Text style={styles.title}>Welcome to Sunshine Rewards</Text>
          <Text style={styles.subtitle}>Sign in to view your points, linked accounts, and available rewards.</Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons name="shield-account-outline" size={22} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Customer Sign In</Text>
              <Text style={styles.cardSubtitle}>Demo credentials are pre-filled.</Text>
            </View>
          </View>

          <Input label="Email or phone" value={email} onChangeText={setEmail} placeholder="Enter your email or phone" leftIcon="mail-outline" keyboardType="email-address" autoCapitalize="none" />
          <Input label="Password" value={password} onChangeText={setPassword} placeholder="Enter password" leftIcon="lock-closed-outline" secureTextEntry />

          <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button title="Sign In" onPress={handleLogin} fullWidth size="lg" />
        </Card>

        <View style={styles.accountLinkPreview}>
          <MaterialCommunityIcons name="link-variant" size={20} color={colors.primaryDark} />
          <Text style={styles.accountLinkText}>Demo account includes linked Sunshine Finance and Sunshine Insurance records.</Text>
        </View>

        <Button title="Back to Demo Menu" onPress={() => router.replace('/')} variant="ghost" fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  content: { flexGrow: 1, justifyContent: 'center', padding: spacing.lg },
  brandBlock: { alignItems: 'center', marginBottom: spacing.xl },
  kicker: { ...typography.overline, color: colors.primaryDark, marginTop: spacing.lg, marginBottom: spacing.sm },
  title: { ...typography.h1, color: colors.charcoal, textAlign: 'center', marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.mediumGray, textAlign: 'center', maxWidth: 360 },
  card: { padding: spacing.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.borderGray },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, marginBottom: spacing.lg },
  cardIcon: { width: 42, height: 42, borderRadius: borderRadius.md, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { ...typography.h3, color: colors.charcoal },
  cardSubtitle: { ...typography.small, color: colors.mediumGray, marginTop: 2 },
  forgotRow: { alignSelf: 'flex-end', marginTop: spacing.xs, marginBottom: spacing.md },
  forgotText: { ...typography.captionBold, color: colors.primary },
  accountLinkPreview: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, backgroundColor: colors.primaryLight, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: '#FDE68A' },
  accountLinkText: { ...typography.caption, color: colors.primaryDark, flex: 1, lineHeight: 20 },
});
