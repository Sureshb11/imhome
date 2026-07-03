import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { colors, fonts } from '../theme';
import { Section } from '../ui';
import { useScrollNav } from '../ScrollContext';

const CARDS = [
  { icon: '🛡️', title: 'HIPAA Compliant', text: 'Your data, fully secured' },
  { icon: '📱', title: 'iOS & Android', text: 'App available now' },
  { icon: '💳', title: 'Insurance Accepted', text: 'RPM billing covered' },
  { icon: '🏥', title: 'Board-Certified MDs', text: 'Licensed in NJ & NY' },
  { icon: '🔔', title: '24/7 Monitoring', text: 'We never sleep' },
];

export default function CTA() {
  const { scrollToSection } = useScrollNav();

  const book = () => {
    const msg = "Thanks! Our team will reach out to schedule your free consultation.";
    if (Platform.OS === 'web') window.alert(msg);
    else Alert.alert('Booking Request', msg);
  };

  return (
    <Section id="cta" bg="#EBF5FF" style={styles.section} vPadding={100}>
      <Text style={styles.label}>START TODAY</Text>
      <Text style={styles.h2}>Ready to take charge of your health?</Text>
      <Text style={styles.p}>
        Join thousands of patients receiving expert chronic care — from the comfort of
        their homes, with the confidence of hospital-grade monitoring.
      </Text>
      <View style={styles.actions}>
        <Pressable style={styles.btnPrimary} onPress={book}>
          <Text style={styles.btnPrimaryText}>📅  Book a Free Consultation</Text>
        </Pressable>
        <Pressable style={styles.btnGhost} onPress={() => scrollToSection('biosensors')}>
          <Text style={styles.btnGhostText}>📡  Explore Devices</Text>
        </Pressable>
      </View>
      <View style={styles.cards}>
        {CARDS.map((c) => (
          <View key={c.title} style={styles.card}>
            <Text style={styles.cardIcon}>{c.icon}</Text>
            <Text style={styles.cardTitle}>{c.title}</Text>
            <Text style={styles.cardText}>{c.text}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  section: { alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 12, letterSpacing: 1.4, color: colors.teal, marginBottom: 12 },
  h2: { fontFamily: fonts.serif, fontSize: 44, color: colors.midnight, marginBottom: 16, textAlign: 'center', lineHeight: 50 },
  p: { color: colors.muted, fontSize: 17, maxWidth: 500, textAlign: 'center', marginBottom: 36, fontFamily: fonts.body, lineHeight: 27 },
  actions: { flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' },
  btnPrimary: { backgroundColor: colors.teal, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 8 },
  btnPrimaryText: { color: colors.white, fontFamily: fonts.bodySemiBold, fontSize: 16 },
  btnGhost: { borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.white, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 8 },
  btnGhostText: { color: colors.midnight, fontFamily: fonts.bodyMedium, fontSize: 16 },
  cards: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 48 },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 24,
    paddingHorizontal: 32,
    alignItems: 'center',
    minWidth: 160,
    boxShadow: '0 4px 20px rgba(13,148,136,0.08)',
  },
  cardIcon: { fontSize: 28, marginBottom: 8 },
  cardTitle: { color: colors.midnight, fontSize: 14.5, fontFamily: fonts.bodySemiBold, marginBottom: 2 },
  cardText: { color: colors.muted, fontSize: 12.5, fontFamily: fonts.body },
});
