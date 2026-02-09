import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import HomeMainCards from '../components/HomeMainCards';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <HomeMainCards />
        {/* Diğer içerikler buraya eklenebilir */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16281e',
  },
  scrollContent: {
    paddingBottom: 40,
  },
}); 