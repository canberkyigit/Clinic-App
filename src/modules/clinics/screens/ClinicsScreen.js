import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ClinicsScreen({ onBack }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'< Geri'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Klinikler Ekranı</Text>
      <Text style={styles.subtitle}>Buraya kliniklerle ilgili içerik gelecek.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16281e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 24,
    padding: 8,
    backgroundColor: '#232a23',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#6fff8a',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    color: '#b0b0b0',
    fontSize: 16,
    textAlign: 'center',
  },
}); 