import { Stack } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const DarkModeContext = createContext({ isDark: false, toggle: () => {} });

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export default function RootLayout() {
  const [isDark, setIsDark] = useState(false);
  const toggle = () => setIsDark((d) => !d);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      <Stack
        initialRouteName="Home"
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity style={styles.toggleBtn} onPress={toggle}>
              <Ionicons name={isDark ? 'sunny' : 'moon'} size={22} color={isDark ? '#FFD600' : '#222'} />
              <Text style={[styles.toggleText, isDark && { color: '#FFD600' }]}>{isDark ? 'Light' : 'Dark'} Mode</Text>
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: isDark ? '#181A20' : '#fff' },
          headerTitleStyle: { color: isDark ? '#fff' : '#222' },
        }}
      >
        <Stack.Screen name="Home" options={{ title: 'Available Pets' }} />
        <Stack.Screen name="PetDetail" options={{ title: 'Pet Details' }} />
        <Stack.Screen name="Adopt" options={{ title: 'Adopt Pet' }} />
        <Stack.Screen name="Location" options={{ title: 'Your Location' }} />
      </Stack>
    </DarkModeContext.Provider>
  );
}

const styles = StyleSheet.create({
  toggleBtn: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 20, backgroundColor: '#F7F9FB', marginRight: 8 },
  toggleText: { marginLeft: 8, fontWeight: 'bold', color: '#222', fontSize: 15 },
});
