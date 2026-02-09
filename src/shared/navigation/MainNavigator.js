import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../modules/home/screens/HomeScreen';
import MoneyScreen from '../../modules/money/screens/MoneyScreen';
import PersonalScreen from '../../modules/personnel/screens/PersonalScreen';
import SettingsScreen from '../../modules/settings/screens/SettingsScreen';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ 
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Clinics" component={ClinicsScreen} />
      <Tab.Screen name="Money" component={MoneyScreen} />
      <Tab.Screen name="Personal" component={PersonalScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
} 