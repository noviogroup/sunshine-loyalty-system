import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';

type BrandMarkSize = 'sm' | 'md' | 'lg' | 'xl';

interface BrandMarkProps {
  size?: BrandMarkSize;
  showLabel?: boolean;
  inverse?: boolean;
  style?: StyleProp<ViewStyle>;
}

const sizeMap = {
  sm: { container: 34, icon: 19, radius: 17 },
  md: { container: 48, icon: 27, radius: 24 },
  lg: { container: 72, icon: 40, radius: 26 },
  xl: { container: 88, icon: 48, radius: 30 },
};

export default function BrandMark({ size = 'md', showLabel = false, inverse = false, style }: BrandMarkProps) {
  const sizing = sizeMap[size];

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.container,
          {
            width: sizing.container,
            height: sizing.container,
            borderRadius: sizing.radius,
            backgroundColor: inverse ? colors.white : colors.primary,
          },
        ]}
      >
        <View style={styles.innerGlow} />
        <MaterialCommunityIcons
          name="white-balance-sunny"
          size={sizing.icon}
          color={inverse ? colors.primary : colors.white}
        />
      </View>
      {showLabel ? (
        <View>
          <Text style={styles.label}>Sunshine Rewards</Text>
          <Text style={styles.subLabel}>Loyalty ecosystem demo</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 5,
    overflow: 'hidden',
  },
  innerGlow: {
    position: 'absolute',
    top: -18,
    right: -16,
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  label: {
    ...typography.h3,
    color: colors.charcoal,
  },
  subLabel: {
    ...typography.small,
    color: colors.mediumGray,
    marginTop: 1,
  },
});
