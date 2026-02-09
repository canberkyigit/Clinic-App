import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ROLES = ['Doktor', 'Hemşire', 'Sekreter'];
const CLINICS = ['Ankara Merkez', 'İstanbul Şube', 'Kocaeli', 'İzmir'];
const STATUS = ['Aktif', 'İzinli', 'Pasif'];

export default function PersonelFormModal({ visible, onClose, onSave, initialForm, isEdit = false }) {
  const [form, setForm] = useState(initialForm || {});
  const [avatar, setAvatar] = useState(initialForm?.avatar || '');
  const [role, setRole] = useState(initialForm?.role || ROLES[0]);
  const [clinic, setClinic] = useState(initialForm?.clinic || CLINICS[0]);
  const [status, setStatus] = useState(initialForm?.status || STATUS[0]);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    if (initialForm) {
      setForm({
        ...initialForm,
        yearsOfExperience: initialForm.yearsOfExperience !== undefined && initialForm.yearsOfExperience !== null ? String(initialForm.yearsOfExperience) : '',
        age: initialForm.age !== undefined && initialForm.age !== null ? String(initialForm.age) : '',
        caseCount: initialForm.caseCount !== undefined && initialForm.caseCount !== null ? String(initialForm.caseCount) : '',
      });
    } else {
      setForm({});
    }
    setAvatar(initialForm?.avatar || '');
    setRole(initialForm?.role || ROLES[0]);
    setClinic(initialForm?.clinic || CLINICS[0]);
    setStatus(initialForm?.status || STATUS[0]);
  }, [initialForm, visible]);

  const handleSave = () => {
    if (onSave) onSave({ ...form, avatar, role, clinic, status });
  };

  const pickImage = async (fromCamera) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1,1], quality: 0.7 });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1,1], quality: 0.7 });
    }
    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setAvatar(result.assets[0].uri);
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{isEdit ? 'Personel Düzenle' : 'Personel Ekle'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={28} color="#6fff8a" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.avatarPickerRow}>
              <View style={styles.avatarPickerImgWrap}>
                <TouchableOpacity onPress={() => pickImage(false)}>
                  {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatarPickerImg} />
                  ) : (
                    <View style={[styles.avatarPickerImg, styles.avatarPickerPlaceholder]}>
                      <Feather name="user" size={56} color="#6fff8a" />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.inputLabel}>Ad Soyad</Text>
            <TextInput
              style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
              placeholder="Ad Soyad"
              placeholderTextColor="#888"
              value={form.name || ''}
              onChangeText={v => setForm(f => ({ ...f, name: v }))}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
            />
            <Text style={styles.inputLabel}>Rol</Text>
            <View style={styles.selectBox}>
              {ROLES.map(r => (
                <TouchableOpacity
                  key={r}
                  style={[styles.selectOption, role === r && styles.selectOptionSelected]}
                  onPress={() => setRole(r)}
                >
                  <Text style={[styles.selectOptionText, role === r && styles.selectOptionTextSelected]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.inputLabel}>Klinik</Text>
            <View style={styles.selectBox}>
              {CLINICS.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.selectOption, clinic === c && styles.selectOptionSelected]}
                  onPress={() => setClinic(c)}
                >
                  <Text style={[styles.selectOptionText, clinic === c && styles.selectOptionTextSelected]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.inputLabel}>Durum</Text>
            <View style={styles.selectBox}>
              {STATUS.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[styles.selectOption, status === s && styles.selectOptionSelected]}
                  onPress={() => setStatus(s)}
                >
                  <Text style={[styles.selectOptionText, status === s && styles.selectOptionTextSelected]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.inputLabel}>Nereden Mezun</Text>
            <TextInput
              style={[styles.input, focusedInput === 'graduation' && styles.inputFocused]}
              placeholder="Üniversite/Fakülte"
              placeholderTextColor="#888"
              value={form.graduation || ''}
              onChangeText={v => setForm(f => ({ ...f, graduation: v }))}
              onFocus={() => setFocusedInput('graduation')}
              onBlur={() => setFocusedInput(null)}
            />
            <View style={styles.inputGroupRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Çalışma Yılı</Text>
                <TextInput
                  style={[styles.input, focusedInput === 'yearsOfExperience' && styles.inputFocused]}
                  placeholder="Yıl"
                  placeholderTextColor="#888"
                  value={form.yearsOfExperience || ''}
                  onChangeText={v => setForm(f => ({ ...f, yearsOfExperience: v }))}
                  keyboardType="numeric"
                  onFocus={() => setFocusedInput('yearsOfExperience')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Yaş</Text>
                <TextInput
                  style={[styles.input, focusedInput === 'age' && styles.inputFocused]}
                  placeholder="Yaş"
                  placeholderTextColor="#888"
                  value={form.age || ''}
                  onChangeText={v => setForm(f => ({ ...f, age: v }))}
                  keyboardType="numeric"
                  onFocus={() => setFocusedInput('age')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>
            <View style={styles.inputGroupRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Unvan</Text>
                <TextInput
                  style={[styles.input, focusedInput === 'title' && styles.inputFocused]}
                  placeholder="Uzman, Doçent, ..."
                  placeholderTextColor="#888"
                  value={form.title || ''}
                  onChangeText={v => setForm(f => ({ ...f, title: v }))}
                  onFocus={() => setFocusedInput('title')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Toplam Vaka</Text>
                <TextInput
                  style={[styles.input, focusedInput === 'caseCount' && styles.inputFocused]}
                  placeholder="Vaka sayısı"
                  placeholderTextColor="#888"
                  value={form.caseCount || ''}
                  onChangeText={v => setForm(f => ({ ...f, caseCount: v }))}
                  keyboardType="numeric"
                  onFocus={() => setFocusedInput('caseCount')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>
            <Text style={styles.inputLabel}>Uzmanlık</Text>
            <TextInput
              style={[styles.input, focusedInput === 'specialty' && styles.inputFocused]}
              placeholder="Uzmanlık alanı"
              placeholderTextColor="#888"
              value={form.specialty || ''}
              onChangeText={v => setForm(f => ({ ...f, specialty: v }))}
              onFocus={() => setFocusedInput('specialty')}
              onBlur={() => setFocusedInput(null)}
            />
          </ScrollView>
          <View style={styles.modalButtonRow}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
              <Text style={styles.modalCancelButtonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalSaveButton} onPress={handleSave}>
              <Text style={styles.modalSaveButtonText}>{isEdit ? 'Kaydet' : 'Ekle'}</Text>
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
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    marginBottom: 8,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  closeButton: {
    backgroundColor: '#232a23',
    borderRadius: 14,
    padding: 6,
  },
  modalContent: {
    flex: 1,
    minHeight: 400,
    paddingBottom: 18,
    paddingTop: 8,
  },
  avatarPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    gap: 18,
  },
  avatarPickerImgWrap: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPickerImg: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 3,
    borderColor: '#6fff8a',
    backgroundColor: '#232a23',
  },
  avatarPickerPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232a23',
  },
  inputLabel: {
    color: '#b0b0b0',
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 7,
    fontFamily: 'System',
    marginTop: 2,
  },
  input: {
    backgroundColor: '#181f1a',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'System',
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
  selectBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  selectOption: {
    backgroundColor: '#23272b',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectOptionSelected: {
    backgroundColor: '#6fff8a',
    borderColor: '#6fff8a',
  },
  selectOptionText: {
    color: '#b0b0b0',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '400',
  },
  selectOptionTextSelected: {
    color: '#1a2b1e',
    fontWeight: '600',
  },
  inputGroupRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 14,
    marginBottom: 22,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 18,
    marginTop: 18,
    marginBottom: 2,
  },
  modalCancelButton: {
    backgroundColor: '#232a23',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  modalCancelButtonText: {
    color: '#b0b0b0',
    fontSize: 18,
    fontWeight: '600',
  },
  modalSaveButton: {
    backgroundColor: '#6fff8a',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  modalSaveButtonText: {
    color: '#1a2b1e',
    fontSize: 18,
    fontWeight: '700',
  },
}); 