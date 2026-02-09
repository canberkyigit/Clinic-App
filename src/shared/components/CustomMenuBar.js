import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomMenuBar({
  onHome,
  onClinics,
  onMoney,
  onUser,
  onSettings,
}) {
  const [isHomePressed, setIsHomePressed] = useState(false);
  const [isClinicsMenuPressed, setIsClinicsMenuPressed] = useState(false);
  const [isMoneyPressed, setIsMoneyPressed] = useState(false);
  const [isUserPressed, setIsUserPressed] = useState(false);
  const [isSettingsPressed, setIsSettingsPressed] = useState(false);

  return (
    <View style={styles.menuBar}>
      <TouchableOpacity
        style={styles.menuBarButton}
        onPress={onHome}
        onPressIn={() => setIsHomePressed(true)}
        onPressOut={() => setIsHomePressed(false)}
        activeOpacity={0.7}
      >
        <Feather name="home" size={28} color={isHomePressed ? '#6fff8a' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuBarButton}
        onPress={onClinics}
        onPressIn={() => setIsClinicsMenuPressed(true)}
        onPressOut={() => setIsClinicsMenuPressed(false)}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="hospital-box-outline" size={28} color={isClinicsMenuPressed ? '#6fff8a' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuBarButton}
        onPress={onMoney}
        onPressIn={() => setIsMoneyPressed(true)}
        onPressOut={() => setIsMoneyPressed(false)}
        activeOpacity={0.7}
      >
        <Feather name="dollar-sign" size={28} color={isMoneyPressed ? '#6fff8a' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuBarButton}
        onPress={onUser}
        onPressIn={() => setIsUserPressed(true)}
        onPressOut={() => setIsUserPressed(false)}
        activeOpacity={0.7}
      >
        <Feather name="user" size={28} color={isUserPressed ? '#6fff8a' : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuBarButton}
        onPress={onSettings}
        onPressIn={() => setIsSettingsPressed(true)}
        onPressOut={() => setIsSettingsPressed(false)}
        activeOpacity={0.7}
      >
        <Feather name="settings" size={28} color={isSettingsPressed ? '#6fff8a' : '#fff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 30, 20, 0.97)',
    paddingVertical: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
    zIndex: 100,
  },
  menuBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 20,
    padding: 8,
  },
}); 