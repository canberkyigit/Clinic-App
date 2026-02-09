import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import PersonelFormModal from '../components/PersonelFormModal';
import initialPersonnel from '../data/personnelData';

const roleColors = {
  Doktor: '#6fff8a',
  Hemşire: '#ffb300',
  Sekreter: '#4fc3f7',
};
const statusColors = {
  Aktif: '#6fff8a',
  İzinli: '#ffb300',
  Pasif: '#ff4d4f',
};
const roles = ['Tümü', 'Doktor', 'Hemşire', 'Sekreter'];

// Klinikleri çıkar
const allClinics = ['Tüm Klinikler', ...Array.from(new Set(initialPersonnel.map(p => p.clinic)))];

export default function PersonalScreen({ onBack, onProfile }) {
  const [personnel, setPersonnel] = useState(initialPersonnel);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('Tümü');
  const [selectedClinic, setSelectedClinic] = useState('Tüm Klinikler');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    avatar: '',
    name: '',
    role: 'Doktor',
    clinic: allClinics[1] || '',
    connectedTo: '',
    status: 'Aktif',
    graduation: '',
    yearsOfExperience: '',
    age: '',
    title: '',
    caseCount: '',
    specialty: '',
    phone: '',
    email: '',
    bio: '',
  });

  const filteredPersonnel = useMemo(() => {
    return personnel.filter(p =>
      (selectedRole === 'Tümü' || p.role === selectedRole) &&
      (selectedClinic === 'Tüm Klinikler' || p.clinic === selectedClinic) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, selectedRole, selectedClinic, personnel]);

  // Doktorlar (bağlı için)
  const doctorList = useMemo(() => personnel.filter(p => p.role === 'Doktor'), [personnel]);

  return (
    <LinearGradient colors={['#1a2b1e', '#16281e', '#0a0f0c']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={28} color="#6fff8a" />
        </TouchableOpacity>
        <Text style={styles.title}>Personeller</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Feather name="user-plus" size={24} color="#6fff8a" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#6fff8a" />
        <TextInput
          style={styles.searchInput}
          placeholder="Personel ara..."
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={{marginLeft: 24, marginBottom: 4}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.roleScrollContent, {flexGrow: 0}]}
        >
          {roles.map(role => (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleChip,
                selectedRole === role && styles.roleChipSelected
              ]}
              onPress={() => setSelectedRole(role)}
            >
              <Text style={[
                styles.roleChipText,
                selectedRole === role && styles.roleChipTextSelected
              ]}>{role}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Klinik filtre chip bar */}
      <View style={{marginLeft: 24, marginBottom: 4}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.roleScrollContent, {flexGrow: 0}]}
        >
          {allClinics.map(clinic => (
            <TouchableOpacity
              key={clinic}
              style={[
                styles.roleChip,
                selectedClinic === clinic && styles.roleChipSelected
              ]}
              onPress={() => setSelectedClinic(clinic)}
            >
              <Text style={[
                styles.roleChipText,
                selectedClinic === clinic && styles.roleChipTextSelected
              ]}>{clinic}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredPersonnel.map(person => (
          <TouchableOpacity key={person.id} style={styles.card} onPress={() => onProfile(person)} activeOpacity={0.85}>
            <Image source={{ uri: person.avatar }} style={styles.avatar} />
            <View style={styles.infoBox}>
              <Text style={styles.name}>{person.name}</Text>
              <View style={styles.row}>
                <View style={[styles.roleBadge, { backgroundColor: roleColors[person.role] || '#b0b0b0' }] }>
                  <Text style={styles.roleBadgeText}>{person.role}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColors[person.status] || '#b0b0b0' }] }>
                  <Text style={styles.statusBadgeText}>{person.status}</Text>
                </View>
              </View>
              {person.connectedTo && (
                <Text style={styles.connectedTo}>Bağlı: {person.connectedTo}</Text>
              )}
              <Text style={styles.clinic}>Klinik: {person.clinic}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {filteredPersonnel.length === 0 && (
          <Text style={styles.noResult}>Sonuç bulunamadı.</Text>
        )}
      </ScrollView>
      <PersonelFormModal
        visible={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setForm({
            avatar: '',
            name: '',
            role: 'Doktor',
            clinic: allClinics[1] || '',
            connectedTo: '',
            status: 'Aktif',
            graduation: '',
            yearsOfExperience: '',
            age: '',
            title: '',
            caseCount: '',
            specialty: '',
            phone: '',
            email: '',
            bio: '',
          });
        }}
        onSave={newPerson => {
          setPersonnel(prev => [
            ...prev,
            {
              ...newPerson,
              id: Date.now(),
              connectedTo: newPerson.role === 'Doktor' ? undefined : newPerson.connectedTo,
            },
          ]);
          setShowAddModal(false);
          setForm({
            avatar: '',
            name: '',
            role: 'Doktor',
            clinic: allClinics[1] || '',
            connectedTo: '',
            status: 'Aktif',
            graduation: '',
            yearsOfExperience: '',
            age: '',
            title: '',
            caseCount: '',
            specialty: '',
            phone: '',
            email: '',
            bio: '',
          });
        }}
        initialForm={form}
        allClinics={allClinics}
        doctorList={doctorList}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(106, 255, 138, 0.1)',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'System',
  },
  addButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(106, 255, 138, 0.1)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232a23',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 8,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '300',
  },
  roleScrollView: {
    marginLeft: 24,
    marginBottom: 4,
  },
  roleScrollContent: {
    gap: 4,
    paddingRight: 24,
    alignItems: 'center',
  },
  roleChip: {
    backgroundColor: '#232a23',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 2,
    marginRight: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    alignSelf: 'flex-start',
  },
  roleChipSelected: {
    backgroundColor: '#6fff8a',
    borderColor: '#6fff8a',
    borderRadius: 14,
  },
  roleChipText: {
    color: '#b0b0b0',
    fontSize: 13,
    fontFamily: 'System',
    fontWeight: '400',
  },
  roleChipTextSelected: {
    color: '#1a2b1e',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 24,
    marginTop: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181f1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 0,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#6fff8a',
    marginRight: 16,
  },
  infoBox: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'System',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  roleBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
  },
  roleBadgeText: {
    color: '#1a2b1e',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'System',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'System',
  },
  connectedTo: {
    color: '#ffb300',
    fontSize: 13,
    fontFamily: 'System',
    fontWeight: '400',
    marginBottom: 2,
  },
  clinic: {
    color: '#6fff8a',
    fontSize: 13,
    fontFamily: 'System',
    fontWeight: '400',
  },
  noResult: {
    color: '#b0b0b0',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#181f1a',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    minHeight: 350,
    alignItems: 'stretch',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'System',
  },
  modalCloseButton: {
    backgroundColor: '#232a23',
    borderRadius: 12,
    padding: 4,
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 6,
    fontFamily: 'System',
  },
  input: {
    backgroundColor: '#232a23',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
    borderWidth: 1,
    borderColor: '#232a23',
  },
  selectBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectOption: {
    backgroundColor: '#232a23',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectOptionSelected: {
    backgroundColor: '#6fff8a',
    borderColor: '#6fff8a',
  },
  selectOptionText: {
    color: '#b0b0b0',
    fontSize: 15,
    fontFamily: 'System',
    fontWeight: '400',
  },
  selectOptionTextSelected: {
    color: '#1a2b1e',
    fontWeight: '500',
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
  avatarPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 18,
    gap: 16,
  },
  avatarPickerImgWrap: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPickerImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#6fff8a',
    backgroundColor: '#232a23',
  },
  avatarPickerPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232a23',
  },
  avatarPickerBtn: {
    backgroundColor: '#232a23',
    borderRadius: 16,
    padding: 10,
    marginLeft: 8,
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  inputGroupRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 18,
  },
}); 