import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ShortcutsSection = ({ onCalendarPress, onPersonnelPress, onRequestsPress, onFinancePress }) => {
  const [isCalendarPressed, setIsCalendarPressed] = useState(false);
  const [isPersonnelPressed, setIsPersonnelPressed] = useState(false);
  const [isClinicsPressed, setIsClinicsPressed] = useState(false);
  const [isNotesPressed, setIsNotesPressed] = useState(false);

  return (
    <View style={styles.shortcutsRow}>
      <TouchableOpacity
        style={[
          styles.shortcutCard,
          isCalendarPressed && styles.shortcutCardPressed
        ]}
        onPressIn={() => setIsCalendarPressed(true)}
        onPressOut={() => setIsCalendarPressed(false)}
        onPress={onCalendarPress}
        activeOpacity={0.7}
      >
        <Feather name="calendar" size={26} color={isCalendarPressed ? "#6fff8a" : "#fff"} />
        <Text style={[
          styles.shortcutLabel,
          isCalendarPressed && styles.shortcutLabelPressed
        ]}>Takvim</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.shortcutCard, 
          isPersonnelPressed && styles.shortcutCardPressed
        ]} 
        activeOpacity={0.7}
        onPressIn={() => setIsPersonnelPressed(true)}
        onPressOut={() => {
          setIsPersonnelPressed(false);
          setTimeout(() => setIsPersonnelPressed(false), 200);
        }}
        onPress={onPersonnelPress}
      >
        <Feather name="users" size={26} color={isPersonnelPressed ? "#6fff8a" : "#fff"} />
        <Text style={[
          styles.shortcutLabel, 
          isPersonnelPressed && styles.shortcutLabelPressed
        ]} numberOfLines={1} ellipsizeMode="tail">Personeller</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.shortcutCard, 
          isClinicsPressed && styles.shortcutCardPressed
        ]} 
        activeOpacity={0.7}
        onPressIn={() => setIsClinicsPressed(true)}
        onPressOut={() => {
          setIsClinicsPressed(false);
          setTimeout(() => setIsClinicsPressed(false), 200);
        }}
        onPress={onFinancePress}
      >
        <FontAwesome5 name="dollar-sign" size={26} color={isClinicsPressed ? "#6fff8a" : "#fff"} />
        <Text style={[
          styles.shortcutLabel, 
          isClinicsPressed && styles.shortcutLabelPressed
        ]} numberOfLines={1} ellipsizeMode="tail">Finans</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.shortcutCard, 
          isNotesPressed && styles.shortcutCardPressed
        ]} 
        activeOpacity={0.7}
        onPressIn={() => setIsNotesPressed(true)}
        onPressOut={() => {
          setIsNotesPressed(false);
          setTimeout(() => setIsNotesPressed(false), 200);
        }}
        onPress={onRequestsPress}
      >
        <Feather name="file-text" size={26} color={isNotesPressed ? "#6fff8a" : "#fff"} />
        <Text style={[
          styles.shortcutLabel, 
          isNotesPressed && styles.shortcutLabelPressed
        ]} numberOfLines={1} ellipsizeMode="tail">Talepler</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shortcutsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  shortcutCard: {
    backgroundColor: '#181f1a',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: 90,
    minHeight: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  shortcutCardPressed: {
    backgroundColor: '#232a23',
    shadowColor: '#6fff8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  shortcutLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    fontFamily: 'System',
    fontWeight: '300',
    textAlign: 'center',
    width: '100%',
  },
  shortcutLabelPressed: {
    color: '#6fff8a',
  },
});

export default ShortcutsSection; 