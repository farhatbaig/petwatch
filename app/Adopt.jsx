import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDarkMode } from './_layout';

export default function Adopt() {
  const { id } = useLocalSearchParams();
  const [pet, setPet] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [adopted, setAdopted] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const router = useRouter();
  const { isDark } = useDarkMode();

  useEffect(() => {
    import('../assets/pets.json').then(data => {
      const found = data.default.find(p => p.id === Number(id));
      setPet(found);
    });
  }, [id]);

  const handleAdopt = () => {
    setProcessing(true);
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setProcessing(false);
      setAdopted(true);
    });
  };

  if (!pet) return null;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Adopt {pet.name}</Text>
        {processing ? (
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={[styles.info, isDark && styles.infoDark]}>Processing Payment...</Text>
            <View style={[styles.progressBarBg, isDark && styles.progressBarBgDark]}>
              <Animated.View style={[styles.progressBar, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
            </View>
            <ActivityIndicator size="large" color={isDark ? "#FFD600" : "#007AFF"} style={{ marginTop: 16 }} />
          </View>
        ) : adopted ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.success, isDark && styles.successDark]}>🎉 Congratulations! You adopted {pet.name}!</Text>
            <Ionicons name="checkmark-circle" size={60} color="#4CD964" style={{ marginVertical: 16 }} />
            <TouchableOpacity style={[styles.backBtn, isDark && styles.backBtnDark]} onPress={() => router.replace('/PetList')}>
              <Text style={[styles.backBtnText, isDark && styles.backBtnTextDark]}>Back to Pets</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={[styles.info, isDark && styles.infoDark]}>Adoption fee: <Text style={{ color: isDark ? '#FFD600' : '#007AFF', fontWeight: 'bold' }}>$50</Text> (simulation)</Text>
            <TouchableOpacity style={[styles.adoptBtn, isDark && styles.adoptBtnDark]} onPress={handleAdopt}>
              <Ionicons name="card" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.adoptBtnText}>Pay & Adopt</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#F7F9FB' },
  containerDark: { backgroundColor: '#181A20' },
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 20, alignItems: 'center', padding: 28, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8 }, android: { elevation: 5 } }) },
  cardDark: { backgroundColor: '#23242A' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 18, color: '#222' },
  titleDark: { color: '#fff' },
  info: { fontSize: 18, marginBottom: 24, color: '#555', textAlign: 'center' },
  infoDark: { color: '#B0BEC5' },
  progressBarBg: { width: '100%', height: 12, backgroundColor: '#E3F0FF', borderRadius: 8, overflow: 'hidden', marginTop: 8 },
  progressBarBgDark: { backgroundColor: '#23242A' },
  progressBar: { height: 12, backgroundColor: '#007AFF', borderRadius: 8 },
  success: { fontSize: 20, color: '#4CD964', marginBottom: 8, textAlign: 'center', fontWeight: 'bold' },
  successDark: { color: '#4CD964' },
  adoptBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF6B81', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 30, marginTop: 10 },
  adoptBtnDark: { backgroundColor: '#FF6B81' },
  adoptBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  backBtn: { marginTop: 16, backgroundColor: '#E3F0FF', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 24 },
  backBtnDark: { backgroundColor: '#23242A' },
  backBtnText: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
  backBtnTextDark: { color: '#FFD600' },
}); 