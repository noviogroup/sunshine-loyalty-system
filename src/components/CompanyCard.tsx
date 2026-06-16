import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

interface CompanyCardProps {
  name: string;
  description?: string;
  accentColor?: string;
  onPress?: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  description,
  accentColor = colors.primary,
  onPress,
}) => {
  const firstLetter = name.charAt(0).toUpperCase();

  const content = (
    <View style={styles.container}>
      <View style={[styles.accentStripe, { backgroundColor: accentColor }]} />
      <View style={styles.body}>
        <View style={[styles.avatar, { backgroundColor: accentColor }]}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          {description ? (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  accentStripe: {
    width: 4,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm + 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.h3,
    color: colors.white,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    ...typography.bodyBold,
    color: colors.charcoal,
  },
  description: {
    ...typography.caption,
    color: colors.mediumGray,
    marginTop: 2,
  },
});

export default CompanyCard;
