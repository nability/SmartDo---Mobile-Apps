import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { COLORS } from '../constants/colors';

interface Props {
  onNavigate: (screen: 'WELCOME' | 'LOGIN') => void;
}

export default function RegisterScreen({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Sukses", "Akun berhasil dibuat!");
      // Tidak perlu navigasi manual, App.tsx otomatis mendeteksi user login
    } catch (error: any) {
      Alert.alert("Gagal Daftar", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundDark }}>
      <ImageBackground source={require('../../assets/bg-login.jpg')} style={styles.headerBg}>
        <TouchableOpacity style={styles.backBtn} onPress={() => onNavigate('WELCOME')}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/logo.png')} style={styles.logoSmall} resizeMode="contain"/>
      </ImageBackground>

      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Create new account to start</Text>

          <View style={styles.inputItem}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textLight} />
            <TextInput 
              style={styles.input} 
              placeholder="Email Mahasiswa" 
              value={email} onChangeText={setEmail} 
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputItem}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} />
            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              value={password} onChangeText={setPassword} 
              secureTextEntry={!showPass} 
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Ionicons name={showPass ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnPrimaryFull} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.textWhiteBold}>REGISTER</Text>}
          </TouchableOpacity>

          <View style={styles.switchLine}>
            <Text style={{color: COLORS.textLight}}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => onNavigate('LOGIN')}>
              <Text style={styles.textLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// Gunakan styles yang sama persis dengan LoginScreen di atas agar konsisten
const styles = StyleSheet.create({
  headerBg: { height: 250, padding: 20, alignItems: 'center', justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 50, left: 20 },
  logoSmall: { width: 60, height: 60, marginTop: -20 },
  formContainer: { flex: 1, backgroundColor: COLORS.card, marginTop: -40, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30 },
  title: { fontSize: 26, fontWeight: 'bold', color: COLORS.textDark, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginBottom: 30 },
  inputItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.inputBg, padding: 15, borderRadius: 15, marginBottom: 15 },
  input: { flex: 1, marginLeft: 10, color: COLORS.textDark },
  btnPrimaryFull: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 10, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  textWhiteBold: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  switchLine: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  textLink: { color: COLORS.primary, fontWeight: 'bold' }
});