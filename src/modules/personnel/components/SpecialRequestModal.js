import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function SpecialRequestModal({ visible, onClose, onSave }) {
  const [form, setForm] = useState({
    employeeName: '',
    requestTitle: '',
    requestDetail: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);

  const todayStr = () => new Date().toLocaleDateString('tr-TR');

  const handleSave = () => {
    if (onSave) onSave({ ...form, id: Date.now(), status: 'pending', submittedDate: todayStr() });
    setForm({ employeeName: '', requestTitle: '', requestDetail: '' });
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Yeni Özel Talep</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Personel Adı</Text>
              <TextInput
                style={[styles.input, focusedInput === 'employeeName' && styles.inputFocused]}
                placeholder="Ad Soyad"
                placeholderTextColor="#888"
                value={form.employeeName}
                onChangeText={v => setForm(f => ({ ...f, employeeName: v }))}
                onFocus={() => setFocusedInput('employeeName')}
                onBlur={() => setFocusedInput(null)}
              />
              <Text style={styles.sectionTitle}>Talep Başlığı</Text>
              <TextInput
                style={[styles.input, focusedInput === 'requestTitle' && styles.inputFocused]}
                placeholder="Talep başlığı"
                placeholderTextColor="#888"
                value={form.requestTitle}
                onChangeText={v => setForm(f => ({ ...f, requestTitle: v }))}
                onFocus={() => setFocusedInput('requestTitle')}
                onBlur={() => setFocusedInput(null)}
              />
              <Text style={styles.sectionTitle}>Açıklama</Text>
              <TextInput
                style={[styles.input, { minHeight: 60 }, focusedInput === 'requestDetail' && styles.inputFocused]}
                placeholder="Açıklama (isteğe bağlı)"
                placeholderTextColor="#888"
                value={form.requestDetail}
                onChangeText={v => setForm(f => ({ ...f, requestDetail: v }))}
                multiline
                onFocus={() => setFocusedInput('requestDetail')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </ScrollView>
          <View style={styles.modalButtonRow}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
              <Text style={styles.modalCancelButtonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalSaveButton} onPress={handleSave}>
              <Text style={styles.modalSaveButtonText}>Talep Oluştur</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,16,12,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  modalContainer: {
    backgroundColor: '#232a23',
    borderRadius: 22,
    width: 440,
    maxWidth: '99%',
    minHeight: 720,
    maxHeight: 1100,
    paddingVertical: 56,
    paddingHorizontal: 32,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 28,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#232a23',
    borderRadius: 12,
    padding: 4,
  },
  modalContent: {
    flex: 1,
    minHeight: 200,
    paddingBottom: 12,
  },
  formSection: {
    paddingHorizontal: 10,
    marginBottom: 22,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#181f1a',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: '#fff',
    fontSize: 18,
    borderWidth: 1.5,
    borderColor: '#333',
    marginBottom: 14,
  },
  inputFocused: {
    borderColor: '#6fff8a',
    shadowColor: '#6fff8a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  modalCancelButton: {
    backgroundColor: '#232a23',
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  modalCancelButtonText: {
    color: '#b0b0b0',
    fontSize: 16,
    fontWeight: '500',
  },
  modalSaveButton: {
    backgroundColor: '#6fff8a',
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  modalSaveButtonText: {
    color: '#1a2b1e',
    fontSize: 16,
    fontWeight: '600',
  },
}); 