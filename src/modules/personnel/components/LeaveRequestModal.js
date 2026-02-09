import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const leaveTypes = [
  'Yıllık İzin',
  'Mazeret İzni',
  'Raporlu',
  'Ücretsiz İzin',
  'Doğum İzni',
  'Babalık İzni',
  'Diğer',
];

export default function LeaveRequestModal({ visible, onClose, onSave }) {
  const [form, setForm] = useState({
    employeeName: '',
    requestType: leaveTypes[0],
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const todayStr = () => new Date().toLocaleDateString('tr-TR');

  const getDaysBetween = (start, end) => {
    try {
      const s = new Date(start);
      const e = new Date(end);
      if (!isNaN(s.getTime()) && !isNaN(e.getTime())) {
        return Math.floor((e - s) / (1000 * 60 * 60 * 24)) + 1;
      }
      return '';
    } catch {
      return '';
    }
  };

  const handleSave = () => {
    if (onSave) onSave({ ...form, id: Date.now(), status: 'pending', submittedDate: todayStr() });
    setForm({ employeeName: '', requestType: leaveTypes[0], startDate: '', endDate: '', reason: '' });
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Yeni İzin Talebi</Text>
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
              <Text style={styles.sectionTitle}>İzin Türü</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeContainer}>
                {leaveTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.typeChip, form.requestType === type && styles.typeChipSelected]}
                    onPress={() => setForm(f => ({ ...f, requestType: type }))}
                  >
                    <Text style={[styles.typeChipText, form.requestType === type && styles.typeChipTextSelected]}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Text style={[styles.sectionTitle, {marginTop: 18}]}>Tarih Aralığı</Text>
              <View style={{flexDirection:'row', gap:18, marginBottom:18}}>
                <View style={{flex:1}}>
                  <Text style={styles.dateLabel}>Başlangıç Tarihi</Text>
                  <View style={styles.dateSelectBtn}>
                    <Feather name="calendar" size={20} color="#6fff8a" style={{marginRight:8}} />
                    <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                      <Text style={styles.dateSelectText}>{form.startDate ? new Date(form.startDate).toLocaleDateString('tr-TR') : 'Tarih Seç'}</Text>
                    </TouchableOpacity>
                  </View>
                  {showStartPicker && (
                    <DateTimePicker
                      value={form.startDate ? new Date(form.startDate) : new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, date) => {
                        setShowStartPicker(false);
                        if (date) setForm(f => ({ ...f, startDate: date.toISOString().slice(0, 10) }));
                      }}
                      locale="tr-TR"
                    />
                  )}
                </View>
                <View style={{flex:1}}>
                  <Text style={styles.dateLabel}>Bitiş Tarihi</Text>
                  <View style={styles.dateSelectBtn}>
                    <Feather name="calendar" size={20} color="#6fff8a" style={{marginRight:8}} />
                    <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                      <Text style={styles.dateSelectText}>{form.endDate ? new Date(form.endDate).toLocaleDateString('tr-TR') : 'Tarih Seç'}</Text>
                    </TouchableOpacity>
                  </View>
                  {showEndPicker && (
                    <DateTimePicker
                      value={form.endDate ? new Date(form.endDate) : new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, date) => {
                        setShowEndPicker(false);
                        if (date) setForm(f => ({ ...f, endDate: date.toISOString().slice(0, 10) }));
                      }}
                      locale="tr-TR"
                    />
                  )}
                </View>
              </View>
              <View style={styles.dateRow}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateLabel}>Süre</Text>
                  <TextInput
                    style={[styles.input, { color: '#fff' }]}
                    value={getDaysBetween(form.startDate, form.endDate) ? getDaysBetween(form.startDate, form.endDate) + ' gün' : ''}
                    editable={false}
                  />
                </View>
              </View>
              <Text style={styles.sectionTitle}>İzin Sebebi</Text>
              <TextInput
                style={[styles.input, {backgroundColor:'#232a23', borderWidth:0, marginBottom:18}]}
                placeholder="İzin sebebini kısaca belirtin"
                placeholderTextColor="#888"
                value={form.reason}
                onChangeText={v => setForm(f => ({ ...f, reason: v }))}
                onFocus={() => setFocusedInput('reason')}
                onBlur={() => setFocusedInput(null)}
              />
              <Text style={styles.sectionTitle}>Detaylı Açıklama</Text>
              <TextInput
                style={[styles.input, {backgroundColor:'#232a23', borderWidth:0, minHeight:60}]}
                placeholder="İzin talebiniz hakkında detaylı bilgi verin..."
                placeholderTextColor="#888"
                value={form.detail || ''}
                onChangeText={v => setForm(f => ({ ...f, detail: v }))}
                multiline
                onFocus={() => setFocusedInput('detail')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </ScrollView>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:24}}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
              <Text style={styles.modalCancelButtonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalSaveButton, {flex:1, marginLeft:18, flexDirection:'row', alignItems:'center', justifyContent:'center'}]} onPress={handleSave}>
              <Feather name="send" size={20} color="#1a2b1e" style={{marginRight:8}} />
              <Text style={styles.modalSaveButtonText}>Talebi Gönder</Text>
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
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 8,
    marginBottom: 10,
  },
  typeChip: {
    backgroundColor: '#232a23',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 8,
  },
  typeChipSelected: {
    backgroundColor: '#6fff8a',
    borderColor: '#6fff8a',
  },
  typeChipText: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: '400',
  },
  typeChipTextSelected: {
    color: '#1a2b1e',
    fontWeight: '500',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateLabel: {
    color: '#b0b0b0',
    fontSize: 14,
    marginBottom: 6,
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
  dateSelectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181f1a',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 4,
  },
  dateSelectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 