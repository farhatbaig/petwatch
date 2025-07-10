import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PetList({ isDark }) {
  const [pets, setPets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    import('../assets/pets.json').then(data => setPets(data.default));
  }, []);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.header, isDark && styles.headerDark]}>🐾 Find Your New Friend</Text>
      <TouchableOpacity style={[styles.locationBtn, isDark && styles.locationBtnDark]} onPress={() => router.push('/Location')}>
        <Ionicons name="location-outline" size={20} color={isDark ? '#4FC3F7' : '#007AFF'} />
        <Text style={[styles.locationBtnText, isDark && styles.locationBtnTextDark]}>Show My Location</Text>
      </TouchableOpacity>
      <FlatList
        data={pets}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, isDark && styles.cardDark]} onPress={() => router.push({ pathname: '/PetDetail', params: { id: item.id } })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={[styles.name, isDark && styles.nameDark]}>{item.name}</Text>
                <Ionicons name="paw" size={18} color="#FFB300" style={{ marginLeft: 8 }} />
              </View>
              <Text style={[styles.type, isDark && styles.typeDark]}>{item.type} • {item.age} years old</Text>
              <Text style={[styles.desc, isDark && styles.descDark]} numberOfLines={2}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F7F9FB' },
  containerDark: { backgroundColor: '#181A20' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: '#222', alignSelf: 'center' },
  headerDark: { color: '#fff' },
  locationBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', backgroundColor: '#E3F0FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginBottom: 16 },
  locationBtnDark: { backgroundColor: '#23242A' },
  locationBtnText: { color: '#007AFF', fontWeight: '600', marginLeft: 6, fontSize: 16 },
  locationBtnTextDark: { color: '#4FC3F7' },
  card: { flexDirection: 'row', marginVertical: 10, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 6 }, android: { elevation: 4 } }), alignItems: 'center', padding: 10 },
  cardDark: { backgroundColor: '#23242A' },
  image: { width: 90, height: 90, borderRadius: 12, marginRight: 14, backgroundColor: '#eee' },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#222' },
  nameDark: { color: '#fff' },
  type: { fontSize: 15, color: '#555', marginBottom: 2 },
  typeDark: { color: '#B0BEC5' },
  desc: { fontSize: 13, color: '#888' },
  descDark: { color: '#B0BEC5' },
}); 