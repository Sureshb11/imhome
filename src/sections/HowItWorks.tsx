import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import { useResponsive } from '../responsive';
import { Section, SectionHeader } from '../ui';

const STEPS = [
  {
    num: '01',
    icon: '📦',
    title: 'Choose Your Device',
    text: 'Pick a biosensor that fits your condition — from ECG patches to cuffless BP monitors and continuous glucose wearables.',
  },
  {
    num: '02',
    icon: '📡',
    title: 'Wear & Stream',
    text: 'Your vitals stream securely to our HIPAA-compliant platform 24/7. No buttons, no manual logs — just wear and live your life.',
  },
  {
    num: '03',
    icon: '🤖',
    title: 'AI + Team Monitors',
    text: 'Our AI engine flags anomalies instantly. A clinical team reviews alerts and escalates when thresholds are crossed.',
  },
  {
    num: '04',
    icon: '🎥',
    title: 'Smart Consultation',
    text: 'Your doctor reviews your data report before the video call — so every minute of your consult is focused on treatment, not catch-up.',
  },
];

export default function HowItWorks() {
  const { isMobile } = useResponsive();
  return (
    <Section id="how" bg={colors.warm}>
      <SectionHeader label="How It Works" title="From sensor to specialist in four steps" centered />
      <View style={styles.grid}>
        {STEPS.map((s) => (
          <Step key={s.num} step={s} isMobile={isMobile} />
        ))}
      </View>
    </Section>
  );
}

function Step({ step, isMobile }: { step: (typeof STEPS)[number]; isMobile: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <Pressable
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[
        styles.step,
        { flexBasis: isMobile ? '100%' : 220 },
        hover && styles.stepHover,
      ]}
    >
      <Text style={styles.num}>{step.num}</Text>
      <Text style={styles.icon}>{step.icon}</Text>
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.text}>{step.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2, maxWidth: 1100, alignSelf: 'center', width: '100%' },
  step: {
    backgroundColor: colors.white,
    padding: 32,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 200,
  },
  stepHover: {
    transform: [{ translateY: -4 }],
    boxShadow: '0 16px 40px rgba(12,26,46,0.08)',
    zIndex: 1,
  },
  num: { fontFamily: fonts.serif, fontSize: 56, color: colors.teal, opacity: 0.35, marginBottom: 16, lineHeight: 56 },
  icon: { fontSize: 28, marginBottom: 12 },
  title: { fontSize: 16, fontFamily: fonts.bodySemiBold, color: colors.midnight, marginBottom: 8 },
  text: { fontSize: 14, color: colors.muted, lineHeight: 22, fontFamily: fonts.body },
});
