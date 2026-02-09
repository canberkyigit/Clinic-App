import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const icons = [
  { name: 'home', lib: Ionicons },
  { name: 'local-hospital', lib: MaterialIcons },
  { name: 'money-bill-wave', lib: FontAwesome5 },
  { name: 'person', lib: Ionicons },
  { name: 'settings', lib: Feather },
];

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <LinearGradient colors={["#1a2b1e", "#101510"]} style={styles.bar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const Icon = icons[index].lib;
        const iconName = icons[index].name;
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={isFocused ? styles.menuItemActive : styles.menuItem}
          >
            <Icon
              name={iconName}
              size={28}
              color={isFocused ? '#6fff8a' : '#fff'}
            />
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 30, 20, 0.97)',
    paddingVertical: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
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
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 20,
    padding: 8,
  },
  menuItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 8,
  },
}); 