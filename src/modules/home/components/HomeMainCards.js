import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';

export default function HomeMainCards() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.greeting}>Hi, Elmar</Text>
      <Text style={styles.subGreeting}>Good Evening!</Text>
      <View style={styles.dateRow}>
        <Feather name="calendar" size={18} color="#b0b0b0" />
        <Text style={styles.dateText}>Sat, 13 Aug</Text>
      </View>
      <View style={styles.featuresRow}>
        <FeatureCard icon={<Feather name="calendar" size={24} color="#fff" />} label="Takvim" />
        <FeatureCard icon={<MaterialIcons name="local-shipping" size={24} color="#fff" />} label="Create Ship" />
        <FeatureCard icon={<Ionicons name="list-circle-outline" size={24} color="#fff" />} label="My Orders" />
        <FeatureCard icon={<FontAwesome5 name="store" size={22} color="#fff" />} label="E-Commerce" />
      </View>
      <View style={styles.statsRow}>
        <StatCard
          icon={<Ionicons name="cube" size={28} color="#6fff8a" />}
          label="Total Shipments"
          value="250+"
          subLabel="+25% increase"
        />
        <StatCard
          icon={<Ionicons name="calendar" size={28} color="#6fff8a" />}
          label="Shipments"
          value="35"
          subLabel="last 31 days"
        />
      </View>
      {/* Diğer kartlar ve istatistikler buraya eklenebilir */}
    </View>
  );
}

function FeatureCard({ icon, label }) {
  return (
    <View style={styles.featureCard}>
      {icon}
      <Text style={styles.featureLabel}>{label}</Text>
    </View>
  );
}

function StatCard({ icon, label, value, subLabel }) {
  return (
    <View style={styles.statCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {icon}
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statSubLabel}>{subLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  greeting: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
  },
  subGreeting: {
    color: '#b0b0b0',
    fontSize: 22,
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 8,
  },
  dateText: {
    color: '#b0b0b0',
    fontSize: 16,
    marginLeft: 6,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  featureCard: {
    backgroundColor: '#1a2b1e',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    width: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  featureLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#181f1a',
    borderRadius: 18,
    padding: 18,
    flex: 1,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statValue: {
    color: '#6fff8a',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  statLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  statSubLabel: {
    color: '#6fff8a',
    fontSize: 12,
    marginTop: 2,
  },
}); 