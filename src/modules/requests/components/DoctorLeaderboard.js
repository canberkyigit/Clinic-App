import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function DoctorLeaderboard({ doctorData, onDoctorLongPress }) {
  return (
    <View>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>En çok randevu alan hekimler</Text>
      </View>
      <View style={styles.doctorListRow}>
        <TouchableOpacity
          style={styles.doctorCol}
          onLongPress={() => onDoctorLongPress('Dr. Ahmet')}
          activeOpacity={0.7}
        >
          <Image source={{ uri: doctorData['Dr. Ahmet'].image }} style={styles.doctorAvatar} />
          <Text style={styles.doctorName}>Dr. Ahmet</Text>
          <Text style={styles.doctorCount}>82 randevu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.doctorCol}
          onLongPress={() => onDoctorLongPress('Dr. Elif')}
          activeOpacity={0.7}
        >
          <Image source={{ uri: doctorData['Dr. Elif'].image }} style={styles.doctorAvatar} />
          <Text style={styles.doctorName}>Dr. Elif</Text>
          <Text style={styles.doctorCount}>74 randevu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.doctorCol}
          onLongPress={() => onDoctorLongPress('Dr. Can')}
          activeOpacity={0.7}
        >
          <Image source={{ uri: doctorData['Dr. Can'].image }} style={styles.doctorAvatar} />
          <Text style={styles.doctorName}>Dr. Can</Text>
          <Text style={styles.doctorCount}>69 randevu</Text>
        </TouchableOpacity>
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
  doctorListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
    marginBottom: 24,
    gap: 12,
  },
  doctorCol: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#6fff8a',
    marginBottom: 6,
  },
  doctorName: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'System',
    fontWeight: '500',
    marginBottom: 2,
    textAlign: 'center',
  },
  doctorCount: {
    color: '#b0b0b0',
    fontSize: 13,
    fontFamily: 'System',
    fontWeight: '300',
    textAlign: 'center',
  },
}); 