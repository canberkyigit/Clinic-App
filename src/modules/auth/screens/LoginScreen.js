import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import logo from '../../../../assets/logo1.png';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../shared/services/firebase';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const db = getFirestore();

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [signupVisible, setSignupVisible] = useState(false);
  // Signup modal state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const resetSignupState = () => {
    setSignupEmail('');
    setSignupPassword('');
    setSignupError('');
    setSignupLoading(false);
    setSignupSuccess(false);
  };

  const handleLogin = async () => {
    setError('');
    if (!password) {
      setError('Lütfen şifre giriniz.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin && onLogin();
    } catch (err) {
      setError('E-posta veya şifre hatalı!');
    }
  };

  const handleSignup = async () => {
    setSignupError('');
    setSignupLoading(true);
    // E-posta regex kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      setSignupError('Lütfen geçerli bir e-posta giriniz.');
      setSignupLoading(false);
      return;
    }
    if (!signupPassword) {
      setSignupError('Lütfen şifre giriniz.');
      setSignupLoading(false);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      setSignupSuccess(true);
      setSignupLoading(false);
      setTimeout(() => {
        setSignupVisible(false);
        resetSignupState();
        setEmail('');
        setPassword('');
        setError('');
      }, 1000);
    } catch (err) {
      if (err?.code === 'auth/email-already-in-use') {
        setSignupError('Bu e-posta ile zaten bir hesap var.');
      } else if (err?.code === 'auth/weak-password') {
        setSignupError('Şifre en az 6 karakter olmalı.');
      } else {
        setSignupError('Kayıt başarısız: ' + (err?.message || ''));
      }
      setSignupLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image 
          source={logo} 
          style={styles.logoImg}
          onLoad={() => console.log('Login logo loaded successfully')}
          onError={(error) => console.log('Login logo loading error:', error)}
        />
        <Text style={styles.appTitle}>Clinic Manager</Text>
      </View>
      <View style={styles.formBox}>
        <Text style={styles.label}>E-posta</Text>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Şifre</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Şifre"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={22} color="#b0b0b0" />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn} onPress={() => {
          resetSignupState();
          setSignupVisible(true);
        }}>
          <Text style={styles.signupBtnText}>Üye Ol</Text>
        </TouchableOpacity>
      </View>
      {/* Signup Modal */}
      <Modal visible={signupVisible} animationType="slide" transparent onRequestClose={() => {
        resetSignupState();
        setSignupVisible(false);
      }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Üye Ol</Text>
            <Text style={styles.label}>E-posta</Text>
            <TextInput
              style={styles.input}
              placeholder="E-posta"
              placeholderTextColor="#888"
              value={signupEmail}
              onChangeText={setSignupEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.label}>Şifre</Text>
            <TextInput
              style={styles.input}
              placeholder="Şifre"
              placeholderTextColor="#888"
              value={signupPassword}
              onChangeText={setSignupPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            {signupError ? <Text style={styles.errorText}>{signupError}</Text> : null}
            <TouchableOpacity
              style={[styles.loginBtn, signupSuccess && { borderColor: '#00d46a', backgroundColor: '#00d46a' }]}
              onPress={handleSignup}
              disabled={signupLoading || signupSuccess}
            >
              <Text style={[styles.loginBtnText, signupSuccess && { color: '#fff', fontWeight: '700' }]}> 
                {signupSuccess ? 'Kayıt Başarılı!' : (signupLoading ? 'Kaydediliyor...' : 'Kayıt Ol')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupBtn} onPress={() => {
              resetSignupState();
              setSignupVisible(false);
            }}>
              <Text style={styles.signupBtnText}>Vazgeç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16281e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 38,
  },
  logoImg: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginBottom: 12,
  },
  appTitle: {
    color: '#6fff8a',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  formBox: {
    width: '100%',
    backgroundColor: '#232a23',
    borderRadius: 18,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
  },
  label: {
    color: '#b0b0b0',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 7,
    marginTop: 2,
  },
  input: {
    backgroundColor: '#181f1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1.2,
    borderColor: '#232a23',
    marginBottom: 18,
    width: '100%',
    alignSelf: 'stretch',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  eyeBtn: {
    marginLeft: 8,
    padding: 4,
  },
  loginBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#6fff8a',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
    alignSelf: 'stretch',
  },
  loginBtnText: {
    color: '#6fff8a',
    fontSize: 17,
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  signupBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#6fff8a',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
    width: '100%',
    alignSelf: 'stretch',
  },
  signupBtnText: {
    color: '#6fff8a',
    fontSize: 17,
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,16,12,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#232a23',
    borderRadius: 18,
    padding: 28,
    width: 340,
    maxWidth: '95%',
    alignItems: 'stretch',
  },
  modalTitle: {
    color: '#6fff8a',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
  },
}); 