import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface Props {
  onNavigate: (screen: 'LOGIN' | 'REGISTER') => void;
}

export default function WelcomeScreen({ onNavigate }: Props) {
  return (
    <ImageBackground source={require('../../assets/bg-login.jpg')} style={styles.bgFull}>
      <View style={styles.overlay}>
        <View style={styles.logoArea}>
          <Image source={require('../../assets/logo.png')} style={styles.logoBig} resizeMode="contain"/>
          <Text style={styles.appTitle}>My Campus Task</Text>
          <Text style={styles.appTagline}>Catat tugas kuliah lebih mudah</Text>
        </View>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btnWhite} onPress={() => onNavigate('REGISTER')}>
            <Text style={styles.textDarkBold}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => onNavigate('LOGIN')}>
            <Text style={styles.textWhiteBold}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgFull: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 30, justifyContent: 'space-between' },
  logoArea: { marginTop: 100, alignItems: 'center' },
  logoBig: { width: 100, height: 100, marginBottom: 20 },
  appTitle: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  appTagline: { fontSize: 16, color: '#EEE', marginTop: 10 },
  btnArea: { marginBottom: 50 },
  btnWhite: { backgroundColor: 'white', padding: 16, borderRadius: 30, alignItems: 'center', marginBottom: 15 },
  btnPrimary: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 30, alignItems: 'center' },
  textDarkBold: { color: COLORS.textDark, fontWeight: 'bold', fontSize: 16 },
  textWhiteBold: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});