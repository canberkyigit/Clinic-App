import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function DoctorIncomeList({ doctors }) {
  // doctors: [{ name, income, bonus }]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doktor Bazlı Gelir</Text>
      <View style={styles.list}>
        {doctors.map((item, i) => (
          <View key={i} style={styles.row}>
            <Feather name="user" size={22} color="#6fff8a" style={styles.icon} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.income}>₺{item.income.toLocaleString('tr-TR')}</Text>
            {item.bonus && <Text style={styles.bonus}>+₺{item.bonus.toLocaleString('tr-TR')}</Text>}
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
  list: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
    gap: 8,
  },
  icon: {
    marginRight: 2,
  },
  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  income: {
    color: '#6fff8a',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 8,
  },
  bonus: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 