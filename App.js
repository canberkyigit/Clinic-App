import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarScreen from './src/modules/calendar/screens/CalendarScreen';
import ClinicsScreen from './src/modules/clinics/screens/ClinicsScreen';
import CustomMenuBar from './src/shared/components/CustomMenuBar';
import DoctorLeaderboard from './src/modules/requests/components/DoctorLeaderboard';
import CityLeaderboard from './src/modules/requests/components/CityLeaderboard';
import CityPopup from './src/modules/requests/components/CityPopup';
import DoctorPopup from './src/modules/requests/components/DoctorPopup';
import ShortcutsSection from './src/modules/home/components/ShortcutsSection';
import HomeHeader from './src/modules/home/components/HomeHeader';
import StatsSection from './src/modules/home/components/StatsSection';
import { cityList, cityDoctors, doctorData } from './src/modules/finance/data/dashboardData';
import FinanceDashboard from './src/modules/finance/components/FinanceDashboard';
import PersonalScreen from './src/modules/personnel/screens/PersonalScreen';
import PersonalProfileScreen from './src/modules/personnel/screens/PersonalProfileScreen';
import RequestsScreen from './src/modules/requests/screens/RequestsScreen';
import FinanceScreen from './src/modules/finance/screens/FinanceScreen';
import LoginScreen from './src/modules/auth/screens/LoginScreen';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showFinanceValues, setShowFinanceValues] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showCityPopup, setShowCityPopup] = useState(false);
  const [pressedCity, setPressedCity] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorPopup, setShowDoctorPopup] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [selectedProfile, setSelectedProfile] = useState(null);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  const handleDoctorLongPress = (doctorName) => {
    setSelectedDoctor(doctorName);
    setShowDoctorPopup(true);
  };

  const handleCityPress = (cityName, isPressed) => {
    if (isPressed) setPressedCity(cityName);
    else setPressedCity(null);
    if (cityName && !isPressed) {
      setSelectedCity(cityName);
      setShowCityPopup(true);
    }
  };

  return (
    <LinearGradient colors={['#1a2b1e', '#16281e', '#0a0f0c']} style={styles.container} start={{x:0.5, y:0}} end={{x:0.5, y:1}}>
      {activeScreen === 'calendar' ? (
        <CalendarScreen onBack={() => setActiveScreen('dashboard')} />
      ) : activeScreen === 'personnel' ? (
        <PersonalScreen 
          onBack={() => setActiveScreen('dashboard')}
          onProfile={person => {
            setSelectedProfile(person);
            setActiveScreen('profile');
          }}
        />
      ) : activeScreen === 'profile' ? (
        <PersonalProfileScreen
          person={selectedProfile}
          onBack={() => setActiveScreen('personnel')}
        />
      ) : activeScreen === 'requests' ? (
        <RequestsScreen onBack={() => setActiveScreen('dashboard')} />
      ) : activeScreen === 'clinics' ? (
        <ClinicsScreen onBack={() => setActiveScreen('dashboard')} />
      ) : activeScreen === 'finance' ? (
        <FinanceScreen onBack={() => setActiveScreen('dashboard')} />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.pageContent}>
              <HomeHeader onLogout={() => setLoggedIn(false)} />
              <ShortcutsSection 
                onCalendarPress={() => setActiveScreen('calendar')} 
                onPersonnelPress={() => setActiveScreen('personnel')}
                onRequestsPress={() => setActiveScreen('requests')}
                onFinancePress={() => setActiveScreen('finance')}
              />
              <StatsSection />
              <CityLeaderboard
                cityList={cityList}
                onCityPress={handleCityPress}
                pressedCity={pressedCity}
              />
              <DoctorLeaderboard doctorData={doctorData} onDoctorLongPress={handleDoctorLongPress} />
              <FinanceDashboard showFinanceValues={showFinanceValues} setShowFinanceValues={setShowFinanceValues} />
            </View>
          </ScrollView>
          
          <CityPopup
            visible={showCityPopup}
            selectedCity={selectedCity}
            cityDoctors={cityDoctors}
            onClose={() => setShowCityPopup(false)}
          />
          
          <DoctorPopup
            visible={showDoctorPopup}
            selectedDoctor={selectedDoctor}
            doctorData={doctorData}
            onClose={() => setShowDoctorPopup(false)}
          />
          
          <CustomMenuBar
            onHome={() => setActiveScreen('dashboard')}
            onClinics={() => setActiveScreen('clinics')}
            onMoney={() => setActiveScreen('money')}
            onUser={() => setActiveScreen('user')}
            onSettings={() => setActiveScreen('settings')}
          />
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  pageContent: {
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 32,
  },
});
