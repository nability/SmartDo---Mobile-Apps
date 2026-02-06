import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './src/config/firebase';

// Import Screens yang sudah dipisah
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BottomNav from './src/components/BottomNav';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State navigasi untuk Dashboard (Home/Profile)
  const [activeTab, setActiveTab] = useState('Home');
  
  // State navigasi untuk Auth (Welcome/Login/Register)
  const [authScreen, setAuthScreen] = useState<'WELCOME' | 'LOGIN' | 'REGISTER'>('WELCOME');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F2A93B" />
      </View>
    );
  }

  // --- LOGIKA NAVIGASI ---

  // 1. Jika User SUDAH LOGIN -> Tampilkan Dashboard (Home/Profile)
  if (user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FD' }}>
        <StatusBar barStyle="light-content" backgroundColor="#0A1E31" />
        <View style={{ flex: 1 }}>
          {activeTab === 'Home' ? <HomeScreen user={user} /> : <ProfileScreen user={user} />}
        </View>
        <BottomNav activeScreen={activeTab} setActiveScreen={setActiveTab} />
      </SafeAreaView>
    );
  }

  // 2. Jika User BELUM LOGIN -> Tampilkan Layar Auth Sesuai State
  if (authScreen === 'LOGIN') {
    return <LoginScreen onNavigate={setAuthScreen} />;
  }
  
  if (authScreen === 'REGISTER') {
    return <RegisterScreen onNavigate={setAuthScreen} />;
  }

  // Default: Tampilkan Welcome Screen
  return <WelcomeScreen onNavigate={setAuthScreen} />;
}