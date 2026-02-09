import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import logo from '../../../../assets/logo1.png';

const HomeHeader = ({ onLogout, navigation }) => {
  const todayStr = format(new Date(), 'EEE, dd MMM', { locale: tr });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  return (
    <>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.topLeftLogo} onPress={() => navigation && navigation.navigate('Home')} activeOpacity={0.7}>
          <Image 
            source={logo} 
            style={styles.logoImg}
            onLoad={() => console.log('Logo loaded successfully')}
            onError={(error) => console.log('Logo loading error:', error)}
          />
        </TouchableOpacity>
        <View style={styles.topRightBar}>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.avatarBg}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                style={styles.avatar}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="bell" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setDropdownOpen(v => !v)}>
            <Feather name="more-horizontal" size={18} color="#fff" />
          </TouchableOpacity>
          {dropdownOpen && (
            <View style={styles.dropdownMenu} ref={dropdownRef}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => { setDropdownOpen(false); onLogout && onLogout(); }}>
                <Feather name="log-out" size={18} color="#ff4d4f" style={{ marginRight: 8 }} />
                <Text style={styles.dropdownItemText}>Çıkış Yap</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.greetingRow}>
        <View style={styles.greetingBoxFixed}>
          <Text style={styles.greeting}>Merhaba, Canberk</Text>
          <Text style={styles.subGreeting}>İyi günler!</Text>
        </View>
        <View style={styles.greetingDateBox}>
          <Feather name="calendar" size={20} color="#b0b0b0" style={{ marginRight: 8 }} />
          <Text style={styles.greetingDateText}>{todayStr}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topLeftLogo: {
    position: 'relative',
    top: 0,
    left: 0,
  },
  topRightBar: {
    position: 'relative',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatarBg: {
    backgroundColor: '#232a23e6',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#6fff8a',
    marginRight: 4,
  },
  iconButton: {
    backgroundColor: '#232a23e6',
    borderRadius: 16,
    padding: 6,
    marginLeft: 2,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '100%',
  },
  greetingBoxFixed: {
    marginTop: 0,
    width: 'auto',
  },
  greetingDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232a23e6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 120,
  },
  greetingDateText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'System',
    fontWeight: '300',
  },
  greeting: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '300',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  subGreeting: {
    color: '#b0b0b0',
    fontSize: 18,
    marginTop: 2,
    fontWeight: '300',
    fontFamily: 'System',
  },
  logoImg: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 44,
    right: 0,
    backgroundColor: '#232a23',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 0,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    zIndex: 100,
    borderWidth: 1,
    borderColor: '#333',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  dropdownItemText: {
    color: '#ff4d4f',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeHeader; 