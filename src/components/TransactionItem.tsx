import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Badge from './Badge';

type TransactionType = 'earned' | 'redeemed' | 'pending' | 'expired';

interface TransactionItemProps {
  type: TransactionType;
  points: number;
  description: string;
  companyName?: string;
  date: string;
  status?: TransactionType;
}

const typeConfig: Record<
  TransactionType,
  { prefix: string; color: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  earned: { prefix: '+', color: colors.success, icon: 'arrow-down-circle' },
  redeemed: { prefix: '-', color: colors.info, icon: 'arrow-up-circle' },
  pending: { prefix: '+', color: '#92400E', icon: 'time' },
  expired: { prefix: '-', color: colors.error, icon: 'close-circle' },
};

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  points,
  description,
  companyName,
  date,
  status,
}) => {
  const config = typeConfig[type];
  const displayStatus = status || type;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>
        <Ionicons name={config.icon} size={22} color={config.color} />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.textContent}>
            <Text style={styles.description} numberOfLines={1}>
              {description}
            </Text>
            {companyName ? (
              <Text style={styles.companyName}>{companyName}</Text>
            ) : null}
          </View>
          <Text style={[styles.points, { color: config.color }]}>
            {config.prefix}
            {points.toLocaleString()}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.date}>{date}</Text>
          <Badge
            label={displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
            variant={displayStatus}
            size="sm"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    gap: spacing.sm + 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  textContent: {
    flex: 1,
  },
  description: {
    ...typography.bodyBold,
    color: colors.charcoal,
  },
  companyName: {
    ...typography.caption,
    color: colors.mediumGray,
    marginTop: 1,
  },
  points: {
    ...typography.bodyBold,
    textAlign: 'right',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs + 2,
  },
  date: {
    ...typography.small,
    color: colors.mediumGray,
  },
});

export default TransactionItem;
