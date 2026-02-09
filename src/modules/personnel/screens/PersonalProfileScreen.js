import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PersonelFormModal from '../components/PersonelFormModal';

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

export default function PersonalProfileScreen({ person, onBack, allClinics = [], doctorList = [], onEdit }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [profile, setProfile] = useState(person);
  if (!profile) return null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={28} color="#6fff8a" />
        </TouchableOpacity>
        <Text style={styles.title}>Personel Profili</Text>
        <TouchableOpacity onPress={() => setShowEditModal(true)} style={{ width: 36, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Feather name="edit-2" size={24} color="#6fff8a" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileAvatarRow}>
        <Image source={{ uri: profile.avatar }} style={styles.profileAvatarImg} />
      </View>
      <Text style={styles.profileName}>{profile.name}</Text>
      <View style={styles.row}>
        <View style={[styles.roleBadge, { backgroundColor: roleColors[profile.role] || '#b0b0b0' }] }>
          <Text style={styles.roleBadgeText}>{profile.role}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[profile.status] || '#b0b0b0' }] }>
          <Text style={styles.statusBadgeText}>{profile.status}</Text>
        </View>
      </View>
      {profile.connectedTo && (
        <Text style={styles.connectedTo}>Bağlı: {profile.connectedTo}</Text>
      )}
      <Text style={{ color: '#7fffaf', fontSize: 16, marginTop: 8 }}>Klinik: {profile.clinic}</Text>
      <Text style={styles.profileLabel}>Durum</Text>
      <View style={styles.selectBox}>
        {['Aktif', 'İzinli', 'Pasif'].map(status => (
          <View
            key={status}
            style={[styles.selectOption, profile.status === status && styles.selectOptionSelected]}
          >
            <Text style={[styles.selectOptionText, profile.status === status && styles.selectOptionTextSelected]}>{status}</Text>
          </View>
        ))}
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.detailHeader}>Detaylı Bilgi</Text>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Mezuniyet: </Text><Text style={styles.detailValue}>{profile.graduation || '-'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Çalışma Yılı: </Text><Text style={styles.detailValue}>{profile.yearsOfExperience || '-'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Yaş: </Text><Text style={styles.detailValue}>{profile.age || '-'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Unvan: </Text><Text style={styles.detailValue}>{profile.title || '-'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Toplam Vaka: </Text><Text style={styles.detailValue}>{profile.caseCount || '-'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Uzmanlık: </Text><Text style={styles.detailValue}>{profile.specialty || '-'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Telefon: </Text><Text style={styles.detailValue}>{profile.phone || '-'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>E-posta: </Text><Text style={styles.detailValue}>{profile.email || '-'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Açıklama: </Text><Text style={styles.detailValue}>{profile.bio || '-'}</Text></View>
      </View>
      <PersonelFormModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={updated => {
          setProfile(updated);
          setShowEditModal(false);
          if (onEdit) onEdit(updated);
        }}
        initialForm={profile}
        allClinics={allClinics}
        doctorList={doctorList}
        isEdit
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181f1a',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  profileAvatarRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  profileAvatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#6fff8a',
    backgroundColor: '#232a23',
    marginBottom: 8,
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'System',
    marginBottom: 8,
    textAlign: 'center',
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
  profileLabel: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 18,
    marginBottom: 6,
    fontFamily: 'System',
    alignSelf: 'flex-start',
  },
  selectBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
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
  detailSection: {
    marginTop: 18,
    backgroundColor: '#232a23',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  detailHeader: {
    color: '#6fff8a',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'System',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'System',
    minWidth: 110,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'System',
    marginLeft: 12,
    flexShrink: 1,
    textAlign: 'left',
  },
}); 