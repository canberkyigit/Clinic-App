import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function RecentPaymentsTable({ payments }) {
  // payments: [{ patient, procedure, amount, status }]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>En Son Tahsil Edilen İşlemler</Text>
      <View style={styles.headerRow}>
        <Text style={[styles.header, {flex:1}]}>Hasta</Text>
        <Text style={[styles.header, {flex:1.5}]}>İşlem</Text>
        <Text style={[styles.header, {flex:1, textAlign:'right'}]}>Tutar</Text>
        <Text style={[styles.header, {width:32, textAlign:'center'}]}>Durum</Text>
      </View>
      <View style={styles.list}>
        {payments.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={[styles.cell, {flex:1}]}>{item.patient}</Text>
            <Text style={[styles.cell, {flex:1.5}]}>{item.procedure}</Text>
            <Text style={[styles.cell, {flex:1, textAlign:'right'}]}>₺{item.amount.toLocaleString('tr-TR')}</Text>
            <View style={{width:32, alignItems:'center'}}>
              {item.status === 'paid' ? (
                <Feather name="check-circle" size={20} color="#6fff8a" />
              ) : (
                <Feather name="x-circle" size={20} color="#ff4d4f" />
              )}
            </View>
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