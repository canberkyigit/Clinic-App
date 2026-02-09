import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

export default function FinanceSummaryCards({ summary }) {
  // summary: { total, month, dailyAvg, collectionRate }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: '#232a23' }]}> 
        <FontAwesome5 name="coins" size={28} color="#6fff8a" style={styles.icon} />
        <Text style={styles.label}>Toplam Gelir</Text>
        <Text style={styles.value}>₺{summary.total.toLocaleString('tr-TR')}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: '#232a23' }]}> 
        <Feather name="calendar" size={28} color="#6fff8a" style={styles.icon} />
        <Text style={styles.label}>Bu Ayki Gelir</Text>
        <Text style={styles.value}>₺{summary.month.toLocaleString('tr-TR')}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: '#232a23' }]}> 
        <Feather name="bar-chart-2" size={28} color="#6fff8a" style={styles.icon} />
        <Text style={styles.label}>Günlük Ortalama</Text>
        <Text style={styles.value}>₺{summary.dailyAvg.toLocaleString('tr-TR')}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: '#232a23' }]}> 
        <Feather name="check-circle" size={28} color="#6fff8a" style={styles.icon} />
        <Text style={styles.label}>Tahsilat Oranı</Text>
        <Text style={styles.value}>{summary.collectionRate}%</Text>
      </View>
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
    width: 150,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 2,
  },
  value: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 