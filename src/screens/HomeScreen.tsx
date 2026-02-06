import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'; // Hapus orderBy dari import jika tidak dipakai, atau biarkan saja tidak error
import { User } from 'firebase/auth'; 
import { db } from '../config/firebase';
import { COLORS } from '../constants/colors';

interface HomeScreenProps { user: User; }
interface Todo { id: string; text: string; completed: boolean; createdAt?: any; }

export default function HomeScreen({ user }: HomeScreenProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  // Read Data
  useEffect(() => {
    // 1. Query HANYA Filter userId (Tanpa orderBy)
    // Ini agar tidak kena error "Index Required" di Firebase Dosen
    const q = query(
      collection(db, "todos"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Todo[];

      // 2. Sorting Manual di Sisi Aplikasi (Client Side Sorting)
      // Kita urutkan datanya di HP setelah data diambil dari server
      todosData.sort((a: any, b: any) => {
        // Handle jika formatnya Timestamp Firestore (seconds) atau Date String biasa
        const dateA = a.createdAt?.seconds ? a.createdAt.seconds : new Date(a.createdAt || 0).getTime();
        const dateB = b.createdAt?.seconds ? b.createdAt.seconds : new Date(b.createdAt || 0).getTime();
        
        return dateB - dateA; // Descending (Yang terbaru paling atas)
      });

      setTodos(todosData);
    });

    return unsubscribe;
  }, [user.uid]);

  // Create Data
  const handleAdd = async () => {
    if (!inputText.trim()) return;
    try {
      await addDoc(collection(db, "todos"), {
        text: inputText, 
        completed: false, 
        userId: user.uid, 
        createdAt: new Date()
      });
      setInputText('');
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // Update & Delete
  const handleToggle = async (id: string, status: boolean) => await updateDoc(doc(db, "todos", id), { completed: !status });
  const handleDelete = async (id: string) => await deleteDoc(doc(db, "todos", id));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.backgroundDark} />
      
      {/* Header Ala Dashboard */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, Mahasiswa!</Text>
          <Text style={styles.subGreeting}>{user.email}</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Text style={styles.profileInitial}>{user.email?.charAt(0).toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      {/* Konten List */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Tugas Saya ({todos.length})</Text>
        
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => handleToggle(item.id, item.completed)} style={[styles.checkBox, item.completed && styles.checkedBox]}>
                {item.completed && <Ionicons name="checkmark" size={16} color="white" />}
              </TouchableOpacity>
              
              <Text style={[styles.todoText, item.completed && styles.todoTextDone]}>
                {item.text}
              </Text>
              
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Input Floating di Bawah */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Tambah tugas baru..." 
          value={inputText} 
          onChangeText={setInputText} 
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundLight },
  header: { 
    backgroundColor: COLORS.backgroundDark, padding: 25, paddingTop: 50, 
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
  },
  greeting: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  subGreeting: { color: COLORS.textLight, fontSize: 12 },
  profileBtn: { 
    width: 45, height: 45, borderRadius: 25, backgroundColor: COLORS.primary, 
    justifyContent: 'center', alignItems: 'center' 
  },
  profileInitial: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 15 },
  
  card: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, 
    padding: 15, borderRadius: 15, marginBottom: 12, elevation: 2 
  },
  checkBox: { 
    width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: COLORS.primary, 
    marginRight: 15, justifyContent: 'center', alignItems: 'center' 
  },
  checkedBox: { backgroundColor: COLORS.primary },
  todoText: { flex: 1, fontSize: 16, color: COLORS.textDark },
  todoTextDone: { textDecorationLine: 'line-through', color: COLORS.textLight },

  inputContainer: { 
    position: 'absolute', bottom: 20, left: 20, right: 20, 
    flexDirection: 'row', backgroundColor: 'white', padding: 10, 
    borderRadius: 20, elevation: 5 
  },
  input: { flex: 1, paddingHorizontal: 15, fontSize: 16 },
  addBtn: { 
    width: 50, height: 50, borderRadius: 15, backgroundColor: COLORS.primary, 
    justifyContent: 'center', alignItems: 'center' 
  }
});