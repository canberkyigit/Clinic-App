import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

export default function FinanceDashboard({ showFinanceValues, setShowFinanceValues }) {
  return (
    <View style={styles.financeDashboard}>
      <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={120} height={120} viewBox="0 0 120 120">
          <G rotation="-90" origin="60,60">
            {/* Gelir (yeşil) */}
            <Circle
              cx="60" cy="60" r="48"
              stroke="#6fff8a"
              strokeWidth="16"
              strokeDasharray={`${(2 * Math.PI * 48) * 0.45}, ${(2 * Math.PI * 48)}`}
              strokeDashoffset={0}
              fill="none"
            />
            {/* Gider (kırmızı) */}
            <Circle
              cx="60" cy="60" r="48"
              stroke="#ff4d4f"
              strokeWidth="16"
              strokeDasharray={`${(2 * Math.PI * 48) * 0.35}, ${(2 * Math.PI * 48)}`}
              strokeDashoffset={`-${(2 * Math.PI * 48) * 0.45}`}
              fill="none"
            />
            {/* Total (beyaz) */}
            <Circle
              cx="60" cy="60" r="48"
              stroke="#fff"
              strokeWidth="16"
              strokeDasharray={`${(2 * Math.PI * 48) * 0.20}, ${(2 * Math.PI * 48)}`}
              strokeDashoffset={`-${(2 * Math.PI * 48) * 0.80}`}
              fill="none"
            />
          </G>
        </Svg>
        <TouchableOpacity
          style={styles.financeEyeBtn}
          onPress={() => setShowFinanceValues(v => !v)}
          activeOpacity={0.7}
        >
          <Feather name={showFinanceValues ? 'eye' : 'eye-off'} size={32} color="#b0b0b0" />
        </TouchableOpacity>
      </View>
      <View style={styles.financeLabelsRow}>
        <View style={styles.financeLabelCol}>
          <View style={[styles.financeDot, {backgroundColor: '#6fff8a'}]} />
          <Text style={styles.financeLabel}>Gelir</Text>
          <Text style={styles.financeValue}>{showFinanceValues ? '₺12.500' : '****'}</Text>
        </View>
        <View style={styles.financeLabelCol}>
          <View style={[styles.financeDot, {backgroundColor: '#ff4d4f'}]} />
          <Text style={styles.financeLabel}>Gider</Text>
          <Text style={styles.financeValueRed}>{showFinanceValues ? '₺7.200' : '****'}</Text>
        </View>
        <View style={styles.financeLabelCol}>
          <View style={[styles.financeDot, {backgroundColor: '#fff'}]} />
          <Text style={styles.financeLabel}>Total</Text>
          <Text style={styles.financeValue}>{showFinanceValues ? '₺5.300' : '****'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  financeDashboard: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  financeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    gap: 24,
  },
  financeLabelCol: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  financeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  financeLabel: {
    color: '#b0b0b0',
    fontSize: 13,
    fontFamily: 'System',
    fontWeight: '300',
    marginBottom: 2,
  },
  financeValue: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  financeValueRed: {
    color: '#ff4d4f',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  financeEyeBtn: {
    position: 'absolute',
    left: 44,
    top: 44,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(20,30,20,0.7)',
    borderRadius: 16,
  },
}); 