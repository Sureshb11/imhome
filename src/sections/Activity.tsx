import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import { useResponsive } from '../responsive';
import { Section } from '../ui';

const CHECKS = [
  'Doctor prescribes walking targets — we track them daily',
  'Sleep stages shared with specialist before each consult',
  'Inactivity alerts prevent dangerous sedentary streaks',
  'Weekly trends emailed to patient and care team',
];

const STATS = [
  { icon: '🚶', value: '6,240', label: 'Steps Today', limit: 'Goal: 7,500 (Dr. Sharma)', pct: 83, fill: colors.teal },
  { icon: '🌙', value: '6.4h', label: 'Sleep Last Night', limit: 'Deep sleep: 1.8h — Good', pct: 72, fill: '#8B5CF6' },
  { icon: '🔥', value: '1,840', label: 'Calories Burned', limit: 'Active minutes: 42 min', pct: 68, fill: colors.amber },
  { icon: '💓', value: '58ms', label: 'HRV (Avg)', limit: 'Stress index: Low ✓', pct: 74, fill: '#10B981' },
];

export default function Activity() {
  const { isMobile } = useResponsive();
  return (
    <Section id="activity" bg={colors.warm}>
      <View style={[styles.layout, isMobile && { flexDirection: 'column', gap: 40 }]}>
        <View style={styles.col}>
          <Text style={styles.label}>ACTIVITY & SLEEP INTELLIGENCE</Text>
          <Text style={styles.title}>Your lifestyle, quantified for better care.</Text>
          <Text style={styles.sub}>
            For chronic illness patients, what you do between appointments matters as much
            as the appointment itself. I'mHome.Care turns every step, every sleep cycle, and
            every rest period into clinically actionable insight.
          </Text>
          <View style={styles.checks}>
            {CHECKS.map((c) => (
              <View key={c} style={styles.checkRow}>
                <View style={styles.checkMark}>
                  <Text style={styles.checkMarkText}>✓</Text>
                </View>
                <Text style={styles.checkText}>{c}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.col}>
          <View style={styles.statsGrid}>
            {STATS.map((s) => (
              <View key={s.label} style={styles.statCard}>
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
                <Text style={styles.statLimit}>{s.limit}</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${s.pct}%`, backgroundColor: s.fill }]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  layout: { flexDirection: 'row', gap: 56, alignItems: 'center', maxWidth: 1200, alignSelf: 'center', width: '100%' },
  col: { flex: 1, minWidth: 280 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 12, letterSpacing: 1.4, color: colors.teal, marginBottom: 12 },
  title: { fontFamily: fonts.serif, fontSize: 34, lineHeight: 40, color: colors.midnight, marginBottom: 16 },
  sub: { fontFamily: fonts.body, fontSize: 16, lineHeight: 27, color: colors.muted },
  checks: { marginTop: 24, gap: 14 },
  checkRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  checkMark: { backgroundColor: colors.tealLight, borderRadius: 6, paddingHorizontal: 9, paddingVertical: 5 },
  checkMarkText: { fontSize: 14, color: colors.tealDark },
  checkText: { fontSize: 14.5, color: colors.text, fontFamily: fonts.body, flex: 1 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 24,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexGrow: 1,
    flexBasis: '45%',
    minWidth: 150,
  },
  statIcon: { fontSize: 24, marginBottom: 8 },
  statValue: { fontFamily: fonts.mono, fontSize: 26, color: colors.midnight },
  statLabel: { fontSize: 12.5, color: colors.muted, marginTop: 2, fontFamily: fonts.body },
  statLimit: { fontSize: 11.5, color: colors.teal, fontFamily: fonts.bodySemiBold, marginTop: 6 },
  progressBar: { marginTop: 8, backgroundColor: colors.border, borderRadius: 4, height: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
});
