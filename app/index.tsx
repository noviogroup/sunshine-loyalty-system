import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme';
import { typography } from '../src/theme';
import { spacing, borderRadius } from '../src/theme';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.title}>Sunshine Rewards</Text>
          <Text style={styles.tagline}>Rewards across the Sunshine family.</Text>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(customer)')}
          >
            <Text style={styles.primaryButtonText}>Customer App</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(admin)')}
          >
            <Text style={styles.secondaryButtonText}>Admin Portal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => router.push('/(executive)')}
          >
            <Text style={styles.outlineButtonText}>Executive Dashboard</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.demoNote}>Demo Application</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    ...typography.h1,
    color: colors.white,
    fontSize: 36,
  },
  title: {
    ...typography.h1,
    color: colors.charcoal,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.body,
    color: colors.mediumGray,
  },
  buttonSection: {
    width: '100%',
    maxWidth: 320,
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.white,
  },
  secondaryButton: {
    backgroundColor: colors.charcoal,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.white,
  },
  outlineButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.charcoal,
  },
  outlineButtonText: {
    ...typography.button,
    color: colors.charcoal,
  },
  demoNote: {
    ...typography.small,
    color: colors.mediumGray,
    marginTop: spacing.xxl,
  },
});
