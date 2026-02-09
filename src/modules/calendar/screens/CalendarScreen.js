import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { addDays, startOfWeek, endOfWeek, format, isSameDay, parseISO, tr } from 'date-fns';

export default function CalendarScreen({ onBack }) {
  const [selected, setSelected] = useState('');
  const [showAppointmentPopup, setShowAppointmentPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [markedDates, setMarkedDates] = useState({
    '2025-01-15': { marked: true, dotColor: '#6fff8a', textColor: '#fff' },
    '2025-01-20': { marked: true, dotColor: '#ff4d4f', textColor: '#fff' },
    '2025-01-25': { marked: true, dotColor: '#6fff8a', textColor: '#fff' },
    '2025-01-30': { marked: true, dotColor: '#ff4d4f', textColor: '#fff' },
  });

  // Doktor filtreleme
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  // Mevcut klinikler
  const clinics = [
    'Tüm Klinikler',
    'Ankara Merkez Klinik',
    'İstanbul Şube Klinik', 
    'İzmir Merkez Klinik',
    'Kocaeli Şube Klinik'
  ];

  // Örnek randevu verileri
  const appointmentsData = {
    '2025-01-15': [
      {
        id: 1,
        time: '09:00',
        timeEnd: '09:30',
        patientName: 'Ahmet Yılmaz',
        doctorName: 'Dr. Mehmet Kaya',
        specialty: 'Kardiyoloji',
        clinic: 'Ankara Merkez Klinik',
        status: 'completed',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        id: 2,
        time: '14:30',
        timeEnd: '15:00',
        patientName: 'Fatma Demir',
        doctorName: 'Dr. Ayşe Özkan',
        specialty: 'Dermatoloji',
        clinic: 'İstanbul Şube Klinik',
        status: 'completed',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    ],
    '2025-01-20': [
      {
        id: 3,
        time: '10:15',
        timeEnd: '10:45',
        patientName: 'Mehmet Çelik',
        doctorName: 'Dr. Ali Yıldız',
        specialty: 'Ortopedi',
        clinic: 'İzmir Merkez Klinik',
        status: 'pending',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
      }
    ],
    '2025-01-25': [
      {
        id: 4,
        time: '11:00',
        timeEnd: '11:30',
        patientName: 'Zeynep Kaya',
        doctorName: 'Dr. Fatma Demir',
        specialty: 'Göz Hastalıkları',
        clinic: 'Kocaeli Şube Klinik',
        status: 'completed',
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
      },
      {
        id: 5,
        time: '16:45',
        timeEnd: '17:15',
        patientName: 'Can Özkan',
        doctorName: 'Dr. Mustafa Yılmaz',
        specialty: 'Nöroloji',
        clinic: 'Ankara Merkez Klinik',
        status: 'completed',
        avatar: 'https://randomuser.me/api/portraits/men/89.jpg'
      }
    ],
    '2025-01-30': [
      {
        id: 6,
        time: '13:20',
        timeEnd: '13:50',
        patientName: 'Elif Yıldız',
        doctorName: 'Dr. Zeynep Kaya',
        specialty: 'Kadın Hastalıkları',
        clinic: 'İstanbul Şube Klinik',
        status: 'pending',
        avatar: 'https://randomuser.me/api/portraits/women/56.jpg'
      }
    ]
  };

  // Tüm doktorları çıkar (appointmentsData'dan unique doktorlar)
  const allDoctors = useMemo(() => {
    const doctorSet = new Set();
    Object.values(appointmentsData).flat().forEach(app => {
      doctorSet.add(app.doctorName);
    });
    return Array.from(doctorSet);
  }, [appointmentsData]);

  // Filtrelenmiş randevular (klinik ve doktor birlikte)
  const filteredAppointmentsData = useMemo(() => {
    if (!appointmentsData) return {};
    let filtered = appointmentsData;
    if (selectedClinic && selectedClinic !== 'Tüm Klinikler') {
      filtered = Object.fromEntries(
        Object.entries(filtered).map(([date, arr]) => [date, arr.filter(app => app.clinic === selectedClinic)])
      );
    }
    if (selectedDoctor && selectedDoctor !== 'Tüm Doktorlar') {
      filtered = Object.fromEntries(
        Object.entries(filtered).map(([date, arr]) => [date, arr.filter(app => app.doctorName === selectedDoctor)])
      );
    }
    // Boş günleri çıkar
    filtered = Object.fromEntries(Object.entries(filtered).filter(([date, arr]) => arr.length > 0));
    return filtered;
  }, [appointmentsData, selectedClinic, selectedDoctor]);

  // Filtrelenmiş işaretli tarihler
  const filteredMarkedDates = useMemo(() => {
    if (!markedDates) return {};
    if ((!selectedClinic || selectedClinic === 'Tüm Klinikler') && (!selectedDoctor || selectedDoctor === 'Tüm Doktorlar')) {
      return markedDates;
    }
    const filtered = {};
    Object.keys(markedDates).forEach(date => {
      if (filteredAppointmentsData[date]) {
        filtered[date] = markedDates[date];
      }
    });
    return filtered;
  }, [markedDates, selectedClinic, selectedDoctor, filteredAppointmentsData]);

  const onDayPress = (day) => {
    console.log('Tıklanan gün:', day.dateString); // Debug için
    setSelected(day.dateString);
    setSelectedDate(day.dateString);
    
    // Eğer o günde randevu varsa popup'ı aç
    if (filteredAppointmentsData[day.dateString]) {
      console.log('Randevu bulundu, popup açılıyor'); // Debug için
      setShowAppointmentPopup(true);
    } else {
      console.log('Bu günde randevu yok'); // Debug için
    }
  };

  return (
    <LinearGradient colors={['#1a2b1e', '#16281e', '#0a0f0c']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={28} color="#6fff8a" />
        </TouchableOpacity>
        <Text style={styles.title}>Takvim</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={onDayPress}
            initialDate={selected || '2025-01-15'}
            markedDates={{
              ...filteredMarkedDates,
              [selected]: {
                ...(filteredMarkedDates[selected] || {}),
                selected: true,
                selectedColor: '#6fff8a',
                selectedTextColor: '#1a2b1e',
              }
            }}
            theme={{
              backgroundColor: '#181f1a',
              calendarBackground: '#181f1a',
              textSectionTitleColor: '#fff',
              selectedDayBackgroundColor: '#6fff8a',
              selectedDayTextColor: '#1a2b1e',
              todayTextColor: '#6fff8a',
              dayTextColor: '#fff',
              textDisabledColor: '#666',
              dotColor: '#6fff8a',
              selectedDotColor: '#1a2b1e',
              arrowColor: '#6fff8a',
              monthTextColor: '#fff',
              indicatorColor: '#6fff8a',
              textDayFontFamily: 'System',
              textMonthFontFamily: 'System',
              textDayHeaderFontFamily: 'System',
              textDayFontWeight: '300',
              textMonthFontWeight: '500',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
            style={styles.calendar}
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Feather name="calendar" size={20} color="#6fff8a" />
              <Text style={styles.statTitle}>Bu Ay</Text>
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Randevu</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Feather name="check-circle" size={20} color="#6fff8a" />
              <Text style={styles.statTitle}>Tamamlanan</Text>
            </View>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Randevu</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Feather name="clock" size={20} color="#ff4d4f" />
              <Text style={styles.statTitle}>Bekleyen</Text>
            </View>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Randevu</Text>
          </View>
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Klinik Filtrele</Text>
          
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#6fff8a" />
            <TextInput
              style={styles.searchInput}
              placeholder="Klinik ara..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.clinicScrollView}
            contentContainerStyle={styles.clinicScrollContent}
          >
            {clinics
              .filter(clinic => 
                clinic.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((clinic, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.clinicChip,
                    selectedClinic === clinic && styles.clinicChipSelected
                  ]}
                  onPress={() => setSelectedClinic(clinic)}
                >
                  <Text style={[
                    styles.clinicChipText,
                    selectedClinic === clinic && styles.clinicChipTextSelected
                  ]}>
                    {clinic}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Doktora Göre Filtrele</Text>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#6fff8a" />
            <TextInput
              style={styles.searchInput}
              placeholder="Doktor ara..."
              placeholderTextColor="#666"
              value={doctorSearchQuery}
              onChangeText={setDoctorSearchQuery}
            />
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.doctorScrollView}
            contentContainerStyle={styles.doctorScrollContent}
          >
            {['Tüm Doktorlar', ...allDoctors.filter(d => d.toLowerCase().includes(doctorSearchQuery.toLowerCase()))].map((doctor, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.doctorChip,
                  selectedDoctor === doctor && styles.doctorChipSelected
                ]}
                onPress={() => setSelectedDoctor(doctor)}
              >
                <Text style={[
                  styles.doctorChipText,
                  selectedDoctor === doctor && styles.doctorChipTextSelected
                ]}>
                  {doctor}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Randevu Popup */}
      {showAppointmentPopup && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>
                {selectedDate} Randevuları
              </Text>
              <TouchableOpacity 
                onPress={() => setShowAppointmentPopup(false)}
                style={styles.popupCloseButton}
              >
                <Feather name="x" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.popupContent} showsVerticalScrollIndicator={false}>
              {filteredAppointmentsData[selectedDate]?.map((appointment, index) => (
                <View key={appointment.id} style={styles.appointmentCard}>
                  <View style={styles.appointmentHeader}>
                    <View style={styles.timeContainer}>
                      <Feather name="clock" size={16} color="#6fff8a" />
                      <Text style={styles.appointmentTime}>{appointment.time} - {appointment.timeEnd}</Text>
                    </View>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: appointment.status === 'completed' ? '#6fff8a' : '#ff4d4f' }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: appointment.status === 'completed' ? '#1a2b1e' : '#fff' }
                      ]}>
                        {appointment.status === 'completed' ? 'Tamamlandı' : 'Bekliyor'}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.appointmentInfo}>
                    <Image source={{ uri: appointment.avatar }} style={styles.patientAvatar} />
                    <View style={styles.patientInfo}>
                      <Text style={styles.patientName}>{appointment.patientName}</Text>
                      <Text style={styles.doctorInfo}>{appointment.doctorName}</Text>
                      <Text style={styles.specialtyInfo}>{appointment.specialty}</Text>
                      <Text style={styles.clinicInfo}>{appointment.clinic}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
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
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  calendarContainer: {
    backgroundColor: '#181f1a',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  calendar: {
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#181f1a',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  statTitle: {
    color: '#b0b0b0',
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '300',
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginBottom: 4,
  },
  statLabel: {
    color: '#6fff8a',
    fontSize: 11,
    fontFamily: 'System',
    fontWeight: '300',
  },
  filterContainer: {
    backgroundColor: '#181f1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  filterTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'System',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232a23',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '300',
  },
  clinicScrollView: {
    marginBottom: 8,
  },
  clinicScrollContent: {
    gap: 8,
  },
  clinicChip: {
    backgroundColor: '#232a23',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  clinicChipSelected: {
    backgroundColor: '#6fff8a',
    borderColor: '#6fff8a',
  },
  clinicChipText: {
    color: '#b0b0b0',
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
  },
  clinicChipTextSelected: {
    color: '#1a2b1e',
    fontWeight: '500',
  },
  doctorScrollView: {
    marginBottom: 8,
  },
  doctorScrollContent: {
    gap: 8,
  },
  doctorChip: {
    backgroundColor: '#232a23',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  doctorChipSelected: {
    backgroundColor: '#6fff8a',
    borderColor: '#6fff8a',
  },
  doctorChipText: {
    color: '#b0b0b0',
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
  },
  doctorChipTextSelected: {
    color: '#1a2b1e',
    fontWeight: '500',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popupContainer: {
    backgroundColor: '#1a2b1e',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  popupTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '500',
  },
  popupCloseButton: {
    backgroundColor: '#232a23',
    borderRadius: 12,
    padding: 4,
  },
  popupContent: {
    maxHeight: 400,
  },
  appointmentCard: {
    backgroundColor: '#181f1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appointmentTime: {
    color: '#6fff8a',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '500',
  },
  appointmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#6fff8a',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '500',
    marginBottom: 4,
  },
  doctorInfo: {
    color: '#6fff8a',
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    marginBottom: 2,
  },
  specialtyInfo: {
    color: '#b0b0b0',
    fontSize: 13,
    fontFamily: 'System',
    fontWeight: '300',
    marginBottom: 2,
  },
  clinicInfo: {
    color: '#6fff8a',
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '400',
    fontStyle: 'italic',
  },
}); 