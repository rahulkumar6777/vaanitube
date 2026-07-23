import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppShell } from './src/components/AppShell';
import { AuthProvider } from './src/context/AuthContext';
import type { AppScreen } from './src/types';

function App() {
  const [screen, setScreen] = useState<AppScreen>('home');

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.root}>
          <AppShell screen={screen} onNavigate={setScreen} />
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default App;
