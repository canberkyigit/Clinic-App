import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CityLeaderboard({ cityList, onCityPress, pressedCity }) {
  return (
    <View>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>En çok randevu alan klinikler</Text>
        <View style={styles.sectionBadge}><Text style={styles.sectionBadgeText}>{cityList.length}</Text></View>
      </View>
      <View style={styles.clinicListBox}>
        {cityList.map(city => (
          <TouchableOpacity
            key={city.name}
            style={[
              styles.clinicRow,
              pressedCity === city.name && styles.clinicRowPressed
            ]}
            onPress={() => onCityPress(city.name)}
            onPressIn={() => onCityPress(city.name, true)}
            onPressOut={() => onCityPress(null, false)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.clinicName,
              pressedCity === city.name && styles.clinicNamePressed
            ]}>{city.name}</Text>
            <Text style={[
              styles.clinicCount,
              pressedCity === city.name && styles.clinicCountPressed
            ]}>{city.count} randevu</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 8,
    gap: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '300',
  },
  sectionBadge: {
    backgroundColor: '#1a2b1e',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
  },
  sectionBadgeText: {
    color: '#6fff8a',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  clinicListBox: {
    backgroundColor: '#232a23e6',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  clinicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  clinicRowPressed: {
    backgroundColor: '#232a23',
    borderRadius: 12,
    marginHorizontal: -8,
    paddingHorizontal: 8,
  },
  clinicName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '300',
  },
  clinicNamePressed: {
    color: '#6fff8a',
  },
  clinicCount: {
    color: '#b0b0b0',
    fontSize: 15,
    fontFamily: 'System',
    fontWeight: '300',
  },
  clinicCountPressed: {
    color: '#6fff8a',
  },
}); 