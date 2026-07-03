import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { colors, fonts } from '../theme';
import { useResponsive } from '../responsive';
import { useScrollNav } from '../ScrollContext';

type Vital = { label: string; value: string; unit?: string };

const STATIC_VITALS: Vital[] = [
  { label: 'Blood Pressure', value: '118/76', unit: 'mmHg' },
  { label: 'Steps Today', value: '6,240', unit: '/ 8,000' },
  { label: 'Heart Rate Variability', value: '58', unit: 'ms' },
  { label: 'Respiration Rate', value: '16', unit: 'br/min' },
  { label: 'Posture', value: 'Upright' },
  { label: 'Sleep Monitoring', value: '6.4h', unit: ' Deep 1.8h' },
];

const rand = (min: number, max: number, decimals = 0) =>
  (Math.random() * (max - min) + min).toFixed(decimals);

export default function Hero() {
  const { isMobile } = useResponsive();
  const { scrollToSection } = useScrollNav();

  // Live-updating vitals — mirrors the original setInterval randomizer.
  const [hr, setHr] = useState('72');
  const [glucose, setGlucose] = useState('98');
  const [spo2, setSpo2] = useState('98.2');

  useEffect(() => {
    const t = setInterval(() => {
      setHr(rand(65, 82));
      setGlucose(rand(92, 108));
      setSpo2(rand(97.1, 99.5, 1));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <View style={[styles.hero, isMobile && styles.heroMobile]}>
      <View style={styles.heroText}>
        <View style={styles.eyebrow}>
          <View style={styles.pulseDot} />
          <Text style={styles.eyebrowText}>AI-Powered Remote Patient Monitoring</Text>
        </View>
        <Text style={[styles.h1, isMobile && { fontSize: 40, lineHeight: 46 }]}>
          Expert care,{'\n'}
          <Text style={styles.h1Em}>delivered</Text>
          {'\n'}to your home.
        </Text>
        <Text style={styles.heroSub}>
          Chronic illness doesn't stop at the clinic door. I'mHome.Care wraps
          hospital-grade biosensor monitoring around your daily life — and connects you
          to specialists who see the full picture before you even say hello.
        </Text>
        <View style={styles.actions}>
          <Pressable style={styles.btnPrimary} onPress={() => scrollToSection('services')}>
            <Text style={styles.btnPrimaryText}>▶  Explore Services</Text>
          </Pressable>
          <Pressable style={styles.btnGhost} onPress={() => scrollToSection('biosensors')}>
            <Text style={styles.btnGhostText}>📡  View Devices</Text>
          </Pressable>
        </View>
      </View>

      {!isMobile && (
        <View style={styles.heroVisual}>
          <View style={styles.vitalsCard}>
            <View style={styles.vitalsHeader}>
              <Text style={styles.vitalsTitle}>Live Vitals Dashboard</Text>
              <View style={styles.liveBadge}>
                <View style={styles.pulseDot} />
                <Text style={styles.liveBadgeText}>LIVE</Text>
              </View>
            </View>

            <VitalRow label="Heart Rate" value={hr} unit="bpm" />
            <VitalRow label="Blood Glucose" value={glucose} unit="mg/dL" />
            <VitalRow label="Blood Pressure" value="118/76" unit="mmHg" />
            <VitalRow label="SpO₂" value={spo2} unit="%" />
            {STATIC_VITALS.slice(1).map((v) => (
              <VitalRow key={v.label} label={v.label} value={v.value} unit={v.unit} />
            ))}

            <View style={styles.ecgLine}>
              <Text style={styles.ecgLabel}>ECG — Normal Sinus Rhythm</Text>
              <Svg width="100%" height={40} viewBox="0 0 280 40" preserveAspectRatio="none">
                <Polyline
                  points="0,20 20,20 30,5 40,35 50,20 70,20 80,5 90,35 100,20 120,20 130,5 140,35 150,20 170,20 180,5 190,35 200,20 220,20 230,5 240,35 250,20 280,20"
                  fill="none"
                  stroke={colors.teal}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

function VitalRow({ label, value, unit }: Vital) {
  return (
    <View style={styles.vitalRow}>
      <Text style={styles.vitalLabel}>{label}</Text>
      <View style={styles.vitalValueWrap}>
        <Text style={styles.vitalValue}>{value}</Text>
        {unit ? <Text style={styles.vitalUnit}>{unit}</Text> : null}
      </View>
      <View style={styles.vitalStatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 640,
    backgroundColor: '#EBF5FF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    paddingHorizontal: '5%',
    paddingTop: 120,
    paddingBottom: 80,
  },
  heroMobile: { flexDirection: 'column', minHeight: 0, paddingTop: 110, gap: 24 },
  heroText: { flex: 1, minWidth: 280 },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(13,148,136,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.25)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 100,
    marginBottom: 24,
  },
  eyebrowText: {
    fontSize: 12,
    fontFamily: fonts.bodySemiBold,
    color: colors.tealDark,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  pulseDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.teal },
  h1: {
    fontFamily: fonts.serif,
    fontSize: 60,
    lineHeight: 66,
    color: colors.midnight,
    marginBottom: 24,
  },
  h1Em: { color: colors.teal, fontFamily: fonts.serifItalic, fontStyle: 'italic' },
  heroSub: {
    fontSize: 17,
    lineHeight: 29,
    color: colors.muted,
    maxWidth: 480,
    marginBottom: 36,
    fontFamily: fonts.body,
  },
  actions: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  btnPrimary: {
    backgroundColor: colors.teal,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  btnPrimaryText: { color: colors.white, fontFamily: fonts.bodySemiBold, fontSize: 15 },
  btnGhost: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  btnGhostText: { color: colors.midnight, fontFamily: fonts.bodyMedium, fontSize: 15 },

  heroVisual: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  vitalsCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 28,
    width: 340,
    boxShadow: '0 20px 60px rgba(13,148,136,0.12), 0 4px 16px rgba(0,0,0,0.06)',
  },
  vitalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  vitalsTitle: { color: colors.midnight, fontFamily: fonts.bodySemiBold, fontSize: 14 },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(13,148,136,0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  liveBadgeText: {
    color: colors.teal,
    fontSize: 11,
    fontFamily: fonts.bodySemiBold,
    letterSpacing: 0.8,
  },
  vitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  vitalLabel: { flex: 1, fontSize: 12.5, color: colors.muted, fontFamily: fonts.body },
  vitalValueWrap: { flexDirection: 'row', alignItems: 'baseline' },
  vitalValue: {
    fontFamily: fonts.monoMedium,
    fontSize: 16,
    color: colors.tealDark,
  },
  vitalUnit: { fontSize: 11, color: colors.muted, marginLeft: 2, fontFamily: fonts.body },
  vitalStatus: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.green },
  ecgLine: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: colors.border },
  ecgLabel: { fontSize: 12, color: colors.muted, marginBottom: 8, fontFamily: fonts.body },
});
