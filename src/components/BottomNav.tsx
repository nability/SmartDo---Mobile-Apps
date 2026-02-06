import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface BottomNavProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
}

export default function BottomNav({ activeScreen, setActiveScreen }: BottomNavProps) {
  return (
    <View style={styles.container}>
      {['Home', 'Profile'].map((screen) => (
        <TouchableOpacity key={screen} style={styles.item} onPress={() => setActiveScreen(screen)}>
          <Ionicons 
            name={screen === 'Home' ? 'home' : 'person'} 
            size={24} 
            color={activeScreen === screen ? COLORS.primary : COLORS.textLight} 
          />
          <Text style={{ fontSize: 10, color: activeScreen === screen ? COLORS.primary : COLORS.textLight }}>
            {screen}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', backgroundColor: 'white', paddingVertical: 10, 
    borderTopWidth: 1, borderColor: '#EEE' 
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});