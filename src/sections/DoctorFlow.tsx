import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import { useResponsive } from '../responsive';
import { Section, SectionHeader } from '../ui';

const CARDS = [
  {
    icon: '📊',
    title: 'Pre-Consultation Data Report',
    text: "Your biosensor trends, anomaly log, sleep data, step counts, and medication adherence notes land in your doctor's hands 30 minutes before your scheduled video call.",
    highlight: 'No more "so how have you been feeling?" — your data shows them.',
  },
  {
    icon: '🚶',
    title: 'Doctor-Set Walking Limits',
    text: 'For diabetic patients, physicians can prescribe precise daily step targets. Our platform enforces these limits, sends reminders, and tracks compliance — reported back to the doctor in real time.',
    highlight: 'Daily step goal set by Dr. Sharma: 7,500 steps — 6,240 today ✓',
  },
  {
    icon: '🌙🏃',
    title: 'Sleep & Activity Patterns',
    text: 'Deep sleep stages, REM cycles, apnea events, walking cadence, exercise intensity, and inactivity periods are all shared with your doctor before consultations — giving a complete real-world picture of your lifestyle and recovery.',
    highlight: 'Last 7 nights: avg 6.4h sleep · 3-day sedentary streak detected — doctor alerted.',
  },
  {
    icon: '🔬',
    title: 'Lab Results Integration',
    text: "Upload your lab results directly. They're automatically appended to your pre-consultation report so your doctor can review HbA1c, lipids, and other markers alongside your biosensor data.",
    highlight: 'HbA1c 7.1% — shared with Dr. Anand before Tuesday\'s consult.',
  },
  {
    icon: '💬',
    title: 'Video Consultation',
    text: 'HD video visits from your home, office, or anywhere. No travel, no waiting rooms. Your doctor has the full clinical picture — every session is efficient, focused, and productive.',
    highlight: 'Next consult: Tuesday 10:00 AM with Dr. Priya Anand, Endocrinology',
  },
];

export default function DoctorFlow() {
  const { isMobile } = useResponsive();
  return (
    <Section id="doctors" bg={colors.white}>
      <SectionHeader
        label="Doctor Collaboration"
        title="Your doctor's new superpower"
        sub="We don't just connect you to a doctor — we arm your doctor with data they've never had before."
        centered
      />
      <View style={styles.grid}>
        {CARDS.map((c) => (
          <FlowCard key={c.title} card={c} isMobile={isMobile} />
        ))}
      </View>
    </Section>
  );
}

function FlowCard({ card, isMobile }: { card: (typeof CARDS)[number]; isMobile: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <Pressable
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[
        styles.card,
        { flexBasis: isMobile ? '100%' : 300 },
        hover && { borderColor: colors.teal },
      ]}
    >
      <Text style={styles.icon}>{card.icon}</Text>
      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.text}>{card.text}</Text>
      <View style={styles.highlight}>
        <Text style={styles.highlightText}>{card.highlight}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 28, width: '100%' },
  card: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 28,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 260,
  },
  icon: { fontSize: 30, marginBottom: 16 },
  title: { fontSize: 16, fontFamily: fonts.bodySemiBold, color: colors.midnight, marginBottom: 8 },
  text: { fontSize: 14, color: colors.muted, lineHeight: 24, fontFamily: fonts.body },
  highlight: {
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.tealLight,
    borderRadius: 7,
  },
  highlightText: { fontSize: 13, color: colors.tealDark, fontFamily: fonts.bodySemiBold, lineHeight: 19 },
});
