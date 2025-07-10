import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDarkMode } from './_layout';

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();
  const { isDark } = useDarkMode();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Your Location</Text>
        {errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : location ? (
          <View style={styles.coordsBox}>
            <Ionicons name="location" size={40} color={isDark ? '#FFD600' : '#007AFF'} style={{ marginBottom: 10 }} />
            <Text style={[styles.coords, isDark && styles.coordsDark]}>Latitude: {location.latitude.toFixed(5)}</Text>
            <Text style={[styles.coords, isDark && styles.coordsDark]}>Longitude: {location.longitude.toFixed(5)}</Text>
            <View style={[styles.mapSim, isDark && styles.mapSimDark]}>
              <Ionicons name="map" size={24} color={isDark ? '#FFD600' : '#888'} />
              <Text style={{ color: isDark ? '#FFD600' : '#888', marginLeft: 6 }}>[Map Simulation]</Text>
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" color={isDark ? '#FFD600' : '#007AFF'} />
        )}
        <TouchableOpacity style={[styles.backBtn, isDark && styles.backBtnDark]} onPress={() => router.replace('/PetList')}>
          <Ionicons name="arrow-back" size={18} color={isDark ? '#FFD600' : '#007AFF'} style={{ marginRight: 6 }} />
          <Text style={[styles.backBtnText, isDark && styles.backBtnTextDark]}>Back to Pets</Text>
        </TouchableOpacity>
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
  error: { color: 'red', fontSize: 16, marginBottom: 24 },
  coordsBox: { alignItems: 'center', marginBottom: 24 },
  coords: { fontSize: 18, color: '#333' },
  coordsDark: { color: '#FFD600' },
  mapSim: { marginTop: 16, flexDirection: 'row', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#F5F5F5' },
  mapSimDark: { borderColor: '#FFD600', backgroundColor: '#23242A' },
  backBtn: { marginTop: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#E3F0FF', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 24 },
  backBtnDark: { backgroundColor: '#23242A' },
  backBtnText: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
  backBtnTextDark: { color: '#FFD600' },
}); 