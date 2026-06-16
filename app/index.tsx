import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../src/theme';
import { BrandMark } from '../src/components';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundOrbOne} />
      <View style={styles.backgroundOrbTwo} />
      <View style={styles.content}>
        <View style={styles.brandSection}>
          <BrandMark size="xl" />
          <Text style={styles.kicker}>Sunshine Holdings Loyalty</Text>
          <Text style={styles.title}>Sunshine Rewards</Text>
          <Text style={styles.tagline}>One premium rewards experience across the Sunshine family.</Text>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/login')}>
            <MaterialCommunityIcons name="cellphone-check" size={20} color={colors.white} />
            <Text style={styles.primaryButtonText}>Start Customer Demo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(admin)')}>
            <MaterialCommunityIcons name="view-dashboard-outline" size={20} color={colors.white} />
            <Text style={styles.secondaryButtonText}>Admin Portal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineButton} onPress={() => router.push('/(executive)')}>
            <MaterialCommunityIcons name="chart-timeline-variant" size={20} color={colors.charcoal} />
            <Text style={styles.outlineButtonText}>Executive Dashboard</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.demoNote}>Presentation Demo</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, overflow: 'hidden' },
  backgroundOrbOne: { position: 'absolute', top: -110, right: -90, width: 240, height: 240, borderRadius: 120, backgroundColor: colors.primaryLight },
  backgroundOrbTwo: { position: 'absolute', bottom: -120, left: -100, width: 260, height: 260, borderRadius: 130, backgroundColor: '#FFF7ED' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.xl },
  brandSection: { alignItems: 'center', marginBottom: spacing.xxl },
  kicker: { ...typography.overline, color: colors.primaryDark, marginTop: spacing.lg, marginBottom: spacing.sm },
  title: { ...typography.display, color: colors.charcoal, marginBottom: spacing.sm, textAlign: 'center' },
  tagline: { ...typography.body, color: colors.mediumGray, textAlign: 'center', maxWidth: 320 },
  buttonSection: { width: '100%', maxWidth: 340, gap: spacing.md },
  primaryButton: { backgroundColor: colors.primary, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm, shadowColor: colors.primaryDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.24, shadowRadius: 14, elevation: 5 },
  primaryButtonText: { ...typography.button, color: colors.white },
  secondaryButton: { backgroundColor: colors.charcoal, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm },
  secondaryButtonText: { ...typography.button, color: colors.white },
  outlineButton: { backgroundColor: colors.white, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm, borderWidth: 1.5, borderColor: colors.borderGray },
  outlineButtonText: { ...typography.button, color: colors.charcoal },
  demoNote: { ...typography.smallBold, color: colors.mediumGray, marginTop: spacing.xxl },
});
