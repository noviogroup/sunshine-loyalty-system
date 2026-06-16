import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

interface CompanyCardProps {
  name: string;
  description?: string;
  accentColor?: string;
  onPress?: () => void;
}

function getCompanyIcon(name: string): keyof typeof MaterialCommunityIcons.glyphMap {
  const lower = name.toLowerCase();
  if (lower.includes('finance')) return 'bank-outline';
  if (lower.includes('insurance')) return 'shield-check-outline';
  return 'domain';
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, description, accentColor = colors.primary, onPress }) => {
  const iconName = getCompanyIcon(name);

  const content = (
    <View style={styles.container}>
      <View style={[styles.accentStripe, { backgroundColor: accentColor }]} />
      <View style={styles.body}>
        <View style={[styles.avatar, { backgroundColor: `${accentColor}18` }]}>
          <MaterialCommunityIcons name={iconName} size={24} color={accentColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          {description ? <Text style={styles.description} numberOfLines={2}>{description}</Text> : null}
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color={colors.mediumGray} />
      </View>
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress} activeOpacity={0.76}>{content}</TouchableOpacity>;
  }

  return content;
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: borderRadius.xl, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGray, shadowColor: colors.charcoal, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 2 },
  accentStripe: { width: 5 },
  body: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.sm + 4 },
  avatar: { width: 48, height: 48, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center' },
  textContainer: { flex: 1 },
  name: { ...typography.bodyBold, color: colors.charcoal },
  description: { ...typography.caption, color: colors.mediumGray, marginTop: 2 },
});

export default CompanyCard;
