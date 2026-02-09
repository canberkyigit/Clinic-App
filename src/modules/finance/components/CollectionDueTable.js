import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CollectionDueTable({ dues, installments }) {
  // dues: [{ patient, amount, dueDate, status }]
  // installments: [{ patient, total, paid, remaining, nextDue }]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tahsilat Detayı & Vade Takibi</Text>
      <Text style={styles.subtitle}>Vadesi Yaklaşan / Günü Geçmiş Ödemeler</Text>
      <View style={styles.headerRow}>
        <Text style={[styles.header, {flex:1}]}>Hasta</Text>
        <Text style={[styles.header, {flex:1}]}>Tutar</Text>
        <Text style={[styles.header, {flex:1}]}>Vade</Text>
        <Text style={[styles.header, {width:32, textAlign:'center'}]}>Durum</Text>
      </View>
      <View style={styles.list}>
        {dues.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={[styles.cell, {flex:1}]}>{item.patient}</Text>
            <Text style={[styles.cell, {flex:1}]}>₺{item.amount.toLocaleString('tr-TR')}</Text>
            <Text style={[styles.cell, {flex:1}]}>{item.dueDate}</Text>
            <View style={{width:32, alignItems:'center'}}>
              {item.status === 'overdue' ? (
                <Feather name="alert-circle" size={20} color="#ff4d4f" />
              ) : (
                <Feather name="clock" size={20} color="#ffd700" />
              )}
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.subtitle}>Taksitli İşlemler</Text>
      <View style={styles.headerRow}>
        <Text style={[styles.header, {flex:1}]}>Hasta</Text>
        <Text style={[styles.header, {flex:1}]}>Toplam</Text>
        <Text style={[styles.header, {flex:1}]}>Kalan</Text>
        <Text style={[styles.header, {flex:1}]}>Son Vade</Text>
      </View>
      <View style={styles.list}>
        {installments.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={[styles.cell, {flex:1}]}>{item.patient}</Text>
            <Text style={[styles.cell, {flex:1}]}>₺{item.total.toLocaleString('tr-TR')}</Text>
            <Text style={[styles.cell, {flex:1}]}>₺{item.remaining.toLocaleString('tr-TR')}</Text>
            <Text style={[styles.cell, {flex:1}]}>{item.nextDue}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232a23',
    borderRadius: 18,
    marginHorizontal: 12,
    marginBottom: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 4,
  },
  subtitle: {
    color: '#b0b0b0',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 2,
    marginLeft: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  header: {
    color: '#b0b0b0',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  list: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  cell: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
}); 