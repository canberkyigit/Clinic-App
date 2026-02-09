import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function DoctorPopup({ visible, selectedDoctor, doctorData, onClose }) {
  if (!visible || !selectedDoctor) return null;
  const doctor = doctorData[selectedDoctor];
  if (!doctor) return null;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.title}>{selectedDoctor}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.avatarRow}>
            <Image source={{ uri: doctor.image }} style={styles.avatarImg} />
          </View>
          <View style={styles.doctorPopupDetails}>
            <View style={styles.doctorPopupRow}>
              <Feather name="briefcase" size={16} color="#6fff8a" />
              <Text style={styles.doctorPopupLabel}>Deneyim:</Text>
              <Text style={styles.doctorPopupValue}>{doctor.experience}</Text>
            </View>
            <View style={styles.doctorPopupRow}>
              <Feather name="book" size={16} color="#6fff8a" />
              <Text style={styles.doctorPopupLabel}>Eğitim:</Text>
              <Text style={styles.doctorPopupValue}>{doctor.education}</Text>
            </View>
            <View style={styles.doctorPopupRow}>
              <Feather name="globe" size={16} color="#6fff8a" />
              <Text style={styles.doctorPopupLabel}>Diller:</Text>
              <Text style={styles.doctorPopupValue}>{doctor.languages.join(', ')}</Text>
            </View>
            <View style={styles.doctorPopupRow}>
              <Feather name="phone" size={16} color="#6fff8a" />
              <Text style={styles.doctorPopupLabel}>Telefon:</Text>
              <Text style={styles.doctorPopupValue}>{doctor.phone}</Text>
            </View>
            <View style={styles.doctorPopupRow}>
              <Feather name="mail" size={16} color="#6fff8a" />
              <Text style={styles.doctorPopupLabel}>E-posta:</Text>
              <Text style={styles.doctorPopupValue}>{doctor.email}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,16,12,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#232a23',
    borderRadius: 18,
    width: 320,
    maxWidth: '90%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  closeBtn: {
    backgroundColor: '#181f1a',
    borderRadius: 12,
    padding: 4,
  },
  avatarRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#6fff8a',
  },
  doctorPopupDetails: {
    marginTop: 8,
  },
  doctorPopupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  doctorPopupLabel: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: '400',
    marginRight: 4,
  },
  doctorPopupValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
}); 