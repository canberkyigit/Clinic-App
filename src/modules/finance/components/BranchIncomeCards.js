import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BranchIncomeCards({ branches }) {
  // branches: [{ name, income, trend }]
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.content}>
      {branches.map((b, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="hospital-building" size={28} color="#6fff8a" style={styles.icon} />
            <Text style={styles.name}>{b.name}</Text>
          </View>
          <Text style={styles.income}>₺{b.income.toLocaleString('tr-TR')}</Text>
          <View style={styles.trendRow}>
            <Text style={[styles.trend, {color: b.trend >= 0 ? '#6fff8a' : '#ff4d4f'}]}>
              {b.trend >= 0 ? '🔼' : '🔽'} %{Math.abs(b.trend)}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 8,
    marginBottom: 18,
    marginHorizontal: 0,
  },
  content: {
    paddingHorizontal: 12,
    gap: 12,
  },
  card: {
    width: 140,
    borderRadius: 16,
    backgroundColor: '#232a23',
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  icon: {
    marginRight: 2,
  },
  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  income: {
    color: '#6fff8a',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trend: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 