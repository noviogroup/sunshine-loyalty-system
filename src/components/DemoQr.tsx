import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface DemoQrProps {
  value: string;
  size?: number;
}

function hashValue(value: string) {
  return value.split('').reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), 0);
}

export default function DemoQr({ value, size = 168 }: DemoQrProps) {
  const cells = 13;
  const cellSize = size / cells;
  const seed = hashValue(value);

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      {Array.from({ length: cells * cells }).map((_, index) => {
        const row = Math.floor(index / cells);
        const col = index % cells;
        const isFinder = (row < 4 && col < 4) || (row < 4 && col > cells - 5) || (row > cells - 5 && col < 4);
        const active = isFinder || ((row * 17 + col * 31 + seed) % 5 < 2);
        return (
          <View
            key={index}
            style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: active ? colors.charcoal : colors.white,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.white,
    borderWidth: 8,
    borderColor: colors.white,
    borderRadius: 14,
    overflow: 'hidden',
  },
});
