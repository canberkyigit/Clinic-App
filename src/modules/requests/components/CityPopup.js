import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CityPopup({ visible, selectedCity, cityDoctors, onClose }) {
  if (!visible || !selectedCity) return null;
  const doctors = cityDoctors[selectedCity] || [];
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.title}>{selectedCity} - En Çok Randevu Alan Doktorlar</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={doctors}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.doctorCount}>{item.count} randevu</Text>
              </View>
            )}
            style={styles.list}
          />
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
  list: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  doctorName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  doctorCount: {
    color: '#6fff8a',
    fontSize: 15,
    fontWeight: 'bold',
  },
}); 