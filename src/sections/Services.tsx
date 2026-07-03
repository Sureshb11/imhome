import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import { useResponsive } from '../responsive';
import { Section, SectionHeader } from '../ui';

type Badge = 'video' | 'monitor';
const SERVICES: { icon: string; title: string; text: string; badge: Badge; badgeText: string }[] = [
  { icon: '🩺', title: 'Diabetes Care', text: 'CGM integration, walking limits, HbA1c trends, dietary coaching', badge: 'monitor', badgeText: 'Monitoring + Video' },
  { icon: '❤️', title: 'Cardiac Monitoring', text: 'ECG patch, BP, SpO₂, arrhythmia alerts, cardiologist consults', badge: 'monitor', badgeText: 'Continuous Monitoring' },
  { icon: '🫁', title: 'Pulmonology', text: 'SpO₂ tracking, respiratory rate monitoring, COPD management', badge: 'monitor', badgeText: 'Monitoring + Video' },
  { icon: '🧴', title: 'Dermatology', text: 'Photo-based skin assessments, treatment plans, follow-ups', badge: 'video', badgeText: 'Video Consultation' },
  { icon: '🥗', title: 'Nutrition', text: 'Registered dietitians, meal plans, glucose-aware food coaching', badge: 'video', badgeText: 'Video Consultation' },
  { icon: '🧠', title: 'Mental Health', text: 'Psychologists, anxiety & depression support, HRV-based stress insights', badge: 'video', badgeText: 'Video Consultation' },
  { icon: '🦴', title: 'Orthopedics', text: 'Joint health, mobility tracking, recovery monitoring post-surgery', badge: 'monitor', badgeText: 'Monitoring + Video' },
];

export default function Services() {
  const { isMobile } = useResponsive();
  return (
    <Section id="services">
      <SectionHeader
        label="Our Specialties"
        title="Specialist care for every chronic condition"
        sub="Video consultations and continuous monitoring programs tailored to each specialty — not a generic telehealth visit."
      />
      <View style={styles.grid}>
        {SERVICES.map((s) => (
          <ServiceCard key={s.title} data={s} isMobile={isMobile} />
        ))}
      </View>
    </Section>
  );
}

function ServiceCard({ data, isMobile }: { data: (typeof SERVICES)[number]; isMobile: boolean }) {
  const [hover, setHover] = useState(false);
  const badgeStyle = data.badge === 'video' ? styles.badgeVideo : styles.badgeMonitor;
  const badgeText = data.badge === 'video' ? styles.badgeVideoText : styles.badgeMonitorText;
  return (
    <Pressable
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[
        styles.card,
        { flexBasis: isMobile ? '100%' : 180 },
        hover && styles.cardHover,
      ]}
    >
      <Text style={styles.icon}>{data.icon}</Text>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.text}>{data.text}</Text>
      <View style={[styles.badge, badgeStyle]}>
        <Text style={[styles.badgeTextBase, badgeText]}>{data.badgeText}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, width: '100%' },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 170,
  },
  cardHover: {
    borderColor: colors.teal,
    transform: [{ translateY: -3 }],
    boxShadow: '0 8px 30px rgba(13,148,136,0.12)',
  },
  icon: { fontSize: 40, marginBottom: 16 },
  title: { fontSize: 15, fontFamily: fonts.bodySemiBold, color: colors.midnight, marginBottom: 6, textAlign: 'center' },
  text: { fontSize: 12.5, color: colors.muted, textAlign: 'center', fontFamily: fonts.body, lineHeight: 18 },
  badge: { marginTop: 12, paddingVertical: 2, paddingHorizontal: 8, borderRadius: 4 },
  badgeTextBase: { fontSize: 11, fontFamily: fonts.bodySemiBold },
  badgeVideo: { backgroundColor: '#EFF6FF' },
  badgeVideoText: { color: '#2563EB' },
  badgeMonitor: { backgroundColor: '#F0FDF4' },
  badgeMonitorText: { color: '#16A34A' },
});
