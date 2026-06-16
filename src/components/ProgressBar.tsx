import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius } from '../theme/spacing';

interface ProgressBarProps {
  current: number;
  max: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  color = colors.primary,
}) => {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  return (
    <View style={styles.track}>
      <View
        style={[
          styles.fill,
          {
            width: `${percentage}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});

export default ProgressBar;
