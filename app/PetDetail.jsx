import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDarkMode } from './_layout';

export default function PetDetail() {
  const { id } = useLocalSearchParams();
  const [pet, setPet] = useState(null);
  const router = useRouter();
  const { isDark } = useDarkMode();

  useEffect(() => {
    import('../assets/pets.json').then(data => {
      const found = data.default.find(p => p.id === Number(id));
      setPet(found);
    });
  }, [id]);

  if (!pet) return null;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <TouchableOpacity style={[styles.backBtn, isDark && styles.backBtnDark]} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={isDark ? '#FFD600' : '#007AFF'} />
      </TouchableOpacity>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Image source={{ uri: pet.image }} style={styles.image} />
        <Text style={[styles.name, isDark && styles.nameDark]}>{pet.name}</Text>
        <View style={styles.typeRow}>
          <Ionicons name={pet.type === 'Dog' ? 'paw' : 'logo-octocat'} size={20} color="#FFB300" />
          <Text style={[styles.type, isDark && styles.typeDark]}>{pet.type} • {pet.age} years old</Text>
        </View>
        <Text style={[styles.desc, isDark && styles.descDark]}>{pet.description}</Text>
        <TouchableOpacity style={[styles.adoptBtn, isDark && styles.adoptBtnDark]} onPress={() => router.push({ pathname: '/Adopt', params: { id: pet.id } })}>
          <Ionicons name="heart" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.adoptBtnText}>Adopt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FB', alignItems: 'center', padding: 24 },
  containerDark: { backgroundColor: '#181A20' },
  backBtn: { position: 'absolute', top: 40, left: 20, zIndex: 2, backgroundColor: '#fff', borderRadius: 20, padding: 6, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 6 }, android: { elevation: 2 } }) },
  backBtnDark: { backgroundColor: '#23242A' },
  card: { marginTop: 60, width: '100%', backgroundColor: '#fff', borderRadius: 20, alignItems: 'center', padding: 24, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8 }, android: { elevation: 5 } }) },
  cardDark: { backgroundColor: '#23242A' },
  image: { width: 220, height: 180, borderRadius: 16, marginBottom: 18, backgroundColor: '#eee' },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#222' },
  nameDark: { color: '#fff' },
  typeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  type: { fontSize: 17, color: '#555', marginLeft: 8 },
  typeDark: { color: '#B0BEC5' },
  desc: { fontSize: 16, textAlign: 'center', marginBottom: 24, color: '#666' },
  descDark: { color: '#B0BEC5' },
  adoptBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF6B81', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 30, marginTop: 10 },
  adoptBtnDark: { backgroundColor: '#FF6B81' },
  adoptBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
}); 