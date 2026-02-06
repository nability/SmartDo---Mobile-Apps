import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut, User } from 'firebase/auth'; // Import User type
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { COLORS } from '../constants/colors';

interface ProfileScreenProps {
  user: User;
}

export default function ProfileScreen({ user }: ProfileScreenProps) {
  const [taskCount, setTaskCount] = useState<number>(0);

  useEffect(() => {
    const q = query(collection(db, "todos"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, snap => setTaskCount(snap.size));
    return unsubscribe;
  }, [user.uid]);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
        </Text>
      </View>
      <Text style={styles.email}>{user.email}</Text>
      
      <View style={styles.statCard}>
        <Text style={styles.statNum}>{taskCount}</Text>
        <Text style={styles.statLabel}>Total Tugas Dicatat</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => signOut(auth)}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.bg },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { fontSize: 40, color: 'white', fontWeight: 'bold' },
  email: { fontSize: 18, color: COLORS.text, marginBottom: 30 },
  statCard: { backgroundColor: COLORS.card, padding: 20, borderRadius: 10, alignItems: 'center', width: '80%', marginBottom: 30, elevation: 3 },
  statNum: { fontSize: 30, fontWeight: 'bold', color: COLORS.primary },
  statLabel: { color: COLORS.subText },
  logoutBtn: { flexDirection: 'row', backgroundColor: COLORS.danger, padding: 15, borderRadius: 10, width: '80%', justifyContent: 'center' }
});