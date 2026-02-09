import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import FinanceSummaryCards from '../components/FinanceSummaryCards';
import FinanceLineChart from '../components/FinanceLineChart';
import BranchIncomeCards from '../components/BranchIncomeCards';
import DoctorIncomeList from '../components/DoctorIncomeList';
import RecentPaymentsTable from '../components/RecentPaymentsTable';
import ExpensePieChart from '../components/ExpensePieChart';
import CollectionDueTable from '../components/CollectionDueTable';

const summary = {
  total: 120000,
  month: 18500,
  dailyAvg: 620,
  collectionRate: 92,
};
const branches = [
  { name: 'İstanbul', income: 45000, trend: 12 },
  { name: 'Ankara', income: 38000, trend: -5 },
  { name: 'İzmir', income: 22000, trend: 8 },
  { name: 'Bursa', income: 15000, trend: 2 },
];
const doctors = [
  { name: 'Dr. Ahmet', income: 18000, bonus: 1200 },
  { name: 'Dr. Elif', income: 14500, bonus: 900 },
  { name: 'Dr. Can', income: 11200 },
  { name: 'Dr. Zeynep', income: 9800 },
];
const payments = [
  { patient: 'Ayşe K.', procedure: 'Botox', amount: 2500, status: 'paid' },
  { patient: 'Mehmet T.', procedure: 'PRP', amount: 1800, status: 'paid' },
  { patient: 'Fatma Y.', procedure: 'Dolgu', amount: 3200, status: 'unpaid' },
  { patient: 'Ali V.', procedure: 'Cilt Bakımı', amount: 900, status: 'paid' },
  { patient: 'Zeynep S.', procedure: 'Lazer', amount: 2100, status: 'paid' },
];
const expenses = [
  { label: 'Personel Maaşları', amount: 7200 },
  { label: 'Kira', amount: 2500 },
  { label: 'Malzeme Alımı', amount: 1200 },
  { label: 'Elektrik/Su', amount: 600 },
  { label: 'Reklam', amount: 900 },
  { label: 'Diğer', amount: 400 },
];
const dues = [
  { patient: 'Fatma Y.', amount: 3200, dueDate: '2024-06-10', status: 'overdue' },
  { patient: 'Ali V.', amount: 900, dueDate: '2024-06-15', status: 'due' },
];
const installments = [
  { patient: 'Zeynep S.', total: 4200, paid: 2100, remaining: 2100, nextDue: '2024-06-20' },
  { patient: 'Mehmet T.', total: 3600, paid: 1800, remaining: 1800, nextDue: '2024-06-25' },
];

export default function FinanceScreen({ onBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {onBack && (
          <TouchableOpacity onPress={onBack} activeOpacity={0.75} style={styles.backButtonWrap}>
            <Feather name="arrow-left" size={28} color="#6fff8a" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Finans</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <FinanceSummaryCards summary={summary} />
        <FinanceLineChart />
        <BranchIncomeCards branches={branches} />
        <DoctorIncomeList doctors={doctors} />
        <RecentPaymentsTable payments={payments} />
        <ExpensePieChart expenses={expenses} />
        <CollectionDueTable dues={dues} installments={installments} />
        {/* Diğer bölümler (gelir dağılımı, export) sonraki adımda eklenecek */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16281e',
    paddingTop: 54,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  backButtonWrap: {
    backgroundColor: '#232a23',
    borderRadius: 14,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.2,
    fontFamily: 'System',
  },
  scrollContent: {
    paddingBottom: 32,
  },
}); 