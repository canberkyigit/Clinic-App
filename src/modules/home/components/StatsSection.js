import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const StatsSection = () => {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <View style={styles.statCardHeader}>
          <Text style={styles.statTitle}>Aylık Randevu Sayısı</Text>
        </View>
        <View style={styles.statCardContent}>
          <View style={styles.statIconCircle}>
            <MaterialCommunityIcons name="calendar-month-outline" size={22} color="#6fff8a" />
          </View>
          <Text style={styles.statValue}>250+</Text>
        </View>
        <Text style={styles.statSubLabel}>+%25 artış</Text>
      </View>
      
      <View style={styles.statCard}>
        <View style={styles.statCardHeader}>
          <Text style={styles.statTitle}>Günlük Randevu Sayısı</Text>
        </View>
        <View style={styles.statCardContent}>
          <View style={styles.statIconCircle}>
            <Feather name="sun" size={22} color="#6fff8a" />
          </View>
          <Text style={styles.statValue}>35</Text>
        </View>
        <Text style={styles.statSubLabel}>son 31 gün</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 28,
    gap: 14,
  },
  statCard: {
    backgroundColor: '#181f1a',
    borderRadius: 18,
    padding: 18,
    flex: 1,
    minWidth: 140,
    marginRight: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '300',
  },
  statCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  statIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#232a23e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  statValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  statSubLabel: {
    color: '#6fff8a',
    fontSize: 13,
    fontFamily: 'System',
    fontWeight: '300',
  },
});

export default StatsSection; 