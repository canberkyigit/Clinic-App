import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import LeaveRequestModal from '../../personnel/components/LeaveRequestModal';
import SpecialRequestModal from '../../personnel/components/SpecialRequestModal';
import { leaveRequestsData, specialRequestsData } from '../data/requestsData';

export default function RequestsScreen({ onBack }) {
  const [selectedTab, setSelectedTab] = useState('leave'); // 'leave' veya 'special'
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showSpecialModal, setShowSpecialModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState(leaveRequestsData);
  const [specialRequests, setSpecialRequests] = useState(specialRequestsData);

  const handleLeaveRequestSave = (newRequest) => {
    setLeaveRequests(prev => [newRequest, ...prev]);
    setShowLeaveModal(false);
  };

  const handleSpecialRequestSave = (newRequest) => {
    setSpecialRequests(prev => [newRequest, ...prev]);
    setShowSpecialModal(false);
  };

  return (
    <LinearGradient colors={['#1a2b1e', '#16281e', '#0a0f0c']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={28} color="#6fff8a" />
        </TouchableOpacity>
        <Text style={styles.title}>Talepler</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'leave' && styles.tabButtonActive
          ]}
          onPress={() => setSelectedTab('leave')}
        >
          <Feather 
            name="calendar" 
            size={20} 
            color={selectedTab === 'leave' ? '#1a2b1e' : '#6fff8a'} 
          />
          <Text style={[
            styles.tabText,
            selectedTab === 'leave' && styles.tabTextActive
          ]}>İzin Talepleri</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'special' && styles.tabButtonActive
          ]}
          onPress={() => setSelectedTab('special')}
        >
          <Feather 
            name="file-text" 
            size={20} 
            color={selectedTab === 'special' ? '#1a2b1e' : '#6fff8a'} 
          />
          <Text style={[
            styles.tabText,
            selectedTab === 'special' && styles.tabTextActive
          ]}>Özel Talepler</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedTab === 'leave' ? (
          <LeaveRequestsTab 
            leaveRequests={leaveRequests}
            onAddRequest={() => setShowLeaveModal(true)}
          />
        ) : (
          <SpecialRequestsTab 
            specialRequests={specialRequests}
            onAddRequest={() => setShowSpecialModal(true)}
          />
        )}
      </ScrollView>

      <LeaveRequestModal
        visible={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        onSave={handleLeaveRequestSave}
      />

      <SpecialRequestModal
        visible={showSpecialModal}
        onClose={() => setShowSpecialModal(false)}
        onSave={handleSpecialRequestSave}
      />
    </LinearGradient>
  );
}

function LeaveRequestsTab({ leaveRequests, onAddRequest }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#6fff8a';
      case 'rejected': return '#ff4d4f';
      case 'pending': return '#ffb300';
      default: return '#b0b0b0';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Onaylandı';
      case 'rejected': return 'Reddedildi';
      case 'pending': return 'Beklemede';
      default: return 'Bilinmiyor';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr) || /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('tr-TR');
  };

  const getDaysBetween = (start, end) => {
    try {
      let startDate, endDate;
      if (/^\d{2}\.\d{2}\.\d{4}$/.test(start)) {
        const [g1, a1, y1] = start.split('.');
        startDate = new Date(`${y1}-${a1}-${g1}`);
      } else {
        startDate = new Date(start);
      }
      if (/^\d{2}\.\d{2}\.\d{4}$/.test(end)) {
        const [g2, a2, y2] = end.split('.');
        endDate = new Date(`${y2}-${a2}-${g2}`);
      } else {
        endDate = new Date(end);
      }
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';
      const diff = Math.abs(endDate - startDate);
      return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    } catch {
      return '';
    }
  };

  return (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>İzin Talepleri</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddRequest}>
          <Feather name="plus" size={20} color="#6fff8a" />
          <Text style={styles.addButtonText}>Yeni Talep</Text>
        </TouchableOpacity>
      </View>

      {leaveRequests.map((request) => (
        <View key={request.id} style={styles.requestCard}>
          <View style={styles.requestHeader}>
            <View style={styles.employeeInfo}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>
                  {request.employeeName.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.employeeDetails}>
                <Text style={styles.employeeName}>{request.employeeName}</Text>
                <Text style={styles.requestType}>{request.requestType}</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
              <Text style={styles.statusText}>{getStatusText(request.status)}</Text>
            </View>
          </View>

          <View style={styles.requestDetails}>
            <View style={styles.detailRow}>
              <Feather name="calendar" size={16} color="#6fff8a" />
              <Text style={styles.detailLabel}>Tarih:</Text>
              <Text style={styles.detailValue}>{formatDate(request.startDate)} - {formatDate(request.endDate)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Feather name="clock" size={16} color="#6fff8a" />
              <Text style={styles.detailLabel}>Süre:</Text>
              <Text style={styles.detailValue}>
                {getDaysBetween(request.startDate, request.endDate) ? getDaysBetween(request.startDate, request.endDate) + ' gün' : (request.days ? request.days + ' gün' : 'gün')}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Feather name="message-circle" size={16} color="#6fff8a" />
              <Text style={styles.detailLabel}>Sebep:</Text>
              <Text style={styles.detailValue}>{request.reason}</Text>
            </View>
            <View style={styles.detailRow}>
              <Feather name="clock" size={16} color="#6fff8a" />
              <Text style={styles.detailLabel}>Talep Tarihi:</Text>
              <Text style={styles.detailValue}>{request.submittedDate}</Text>
            </View>
          </View>

          {request.status === 'pending' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
                <Feather name="check" size={16} color="#1a2b1e" />
                <Text style={styles.approveButtonText}>Onayla</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
                <Feather name="x" size={16} color="#fff" />
                <Text style={styles.rejectButtonText}>Reddet</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function SpecialRequestsTab({ specialRequests, onAddRequest }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#6fff8a';
      case 'rejected': return '#ff4d4f';
      case 'pending': return '#ffb300';
      default: return '#b0b0b0';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Onaylandı';
      case 'rejected': return 'Reddedildi';
      case 'pending': return 'Beklemede';
      default: return 'Bilinmiyor';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#ffb300';
      case 'low': return '#6fff8a';
      default: return '#b0b0b0';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return 'Bilinmiyor';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr) || /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('tr-TR');
  };

  return (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Özel Talepler</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddRequest}>
          <Feather name="plus" size={20} color="#6fff8a" />
          <Text style={styles.addButtonText}>Yeni Talep</Text>
        </TouchableOpacity>
      </View>

      {specialRequests.map((request) => (
        <View key={request.id} style={styles.requestCard}>
          <View style={styles.requestHeader}>
            <View style={styles.employeeInfo}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>
                  {request.employeeName.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.employeeDetails}>
                <Text style={styles.employeeName}>{request.employeeName}</Text>
                <Text style={styles.requestType}>{request.requestCategory}</Text>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(request.priority) }] }>
                <Text style={styles.priorityText}>{getPriorityText(request.priority)}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }] }>
                <Text style={styles.statusText}>{getStatusText(request.status)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.requestDetails}>
            <Text style={styles.requestTitle}>{request.requestTitle}</Text>
            <Text style={styles.requestDescription}>{request.requestDetail}</Text>
            <View style={[styles.detailRow, {marginTop: 8}] }>
              <Feather name="clock" size={16} color="#6fff8a" />
              <Text style={[styles.detailLabel, {fontWeight:'bold'}]}>Talep Tarihi:</Text>
              <Text style={[styles.detailValue, {fontWeight:'bold'}]}>{request.submittedDate || '-'}</Text>
            </View>
          </View>
          {request.status === 'pending' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
                <Feather name="check" size={16} color="#1a2b1e" />
                <Text style={styles.approveButtonText}>Onayla</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
                <Feather name="x" size={16} color="#fff" />
                <Text style={styles.rejectButtonText}>Reddet</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
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
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232a23',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: '#6fff8a',
  },
  tabText: {
    color: '#6fff8a',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1a2b1e',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  tabContent: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232a23',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  addButtonText: {
    color: '#6fff8a',
    fontSize: 14,
    fontWeight: '500',
  },
  requestCard: {
    backgroundColor: '#232a23',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  employeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6fff8a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#1a2b1e',
    fontSize: 14,
    fontWeight: '600',
  },
  employeeDetails: {
    flex: 1,
  },
  employeeName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  requestType: {
    color: '#b0b0b0',
    fontSize: 14,
  },
  statusContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#1a2b1e',
    fontSize: 12,
    fontWeight: '500',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    color: '#1a2b1e',
    fontSize: 12,
    fontWeight: '500',
  },
  requestDetails: {
    gap: 8,
  },
  requestTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  requestDescription: {
    color: '#b0b0b0',
    fontSize: 14,
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    color: '#b0b0b0',
    fontSize: 14,
    minWidth: 80,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    gap: 6,
  },
  approveButton: {
    backgroundColor: '#6fff8a',
  },
  approveButtonText: {
    color: '#1a2b1e',
    fontSize: 14,
    fontWeight: '500',
  },
  rejectButton: {
    backgroundColor: '#ff4d4f',
  },
  rejectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
}); 