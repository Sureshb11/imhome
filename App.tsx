import React, { useRef, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts as useDMSerif,
  DMSerifDisplay_400Regular,
  DMSerifDisplay_400Regular_Italic,
} from '@expo-google-fonts/dm-serif-display';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
} from '@expo-google-fonts/jetbrains-mono';

import { colors } from './src/theme';
import { ScrollProvider } from './src/ScrollContext';
import Nav from './src/components/Nav';
import Hero from './src/sections/Hero';
import HowItWorks from './src/sections/HowItWorks';
import Services from './src/sections/Services';
import Biosensors from './src/sections/Biosensors';
import Monitoring from './src/sections/Monitoring';
import DoctorFlow from './src/sections/DoctorFlow';
import Activity from './src/sections/Activity';
import CTA from './src/sections/CTA';
import Footer from './src/sections/Footer';

export default function App() {
  const [loaded] = useDMSerif({
    DMSerifDisplay_400Regular,
    DMSerifDisplay_400Regular_Italic,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
  });

  const scrollRef = useRef<ScrollView>(null);
  const scrollTo = useCallback((y: number) => {
    scrollRef.current?.scrollTo({ y, animated: true });
  }, []);

  if (!loaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.teal} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollProvider scrollTo={scrollTo}>
        <Nav />
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Hero />
          <HowItWorks />
          <Services />
          <Biosensors />
          <Monitoring />
          <DoctorFlow />
          <Activity />
          <CTA />
          <Footer />
        </ScrollView>
      </ScrollProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  scroll: { flex: 1 },
  content: { width: '100%' },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream },
});
