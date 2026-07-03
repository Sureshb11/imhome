import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import { useResponsive } from '../responsive';
import { Section } from '../ui';

const FEATURES = [
  { icon: '⚡', title: 'Real-Time Anomaly Detection', text: 'AI flags abnormal ECG rhythms, BP spikes, glucose crashes, and SpO₂ drops within seconds of occurrence — not hours later.' },
  { icon: '🔔', title: 'Multi-Layer Alert Routing', text: 'Alerts escalate from app notification → clinical team call → emergency services, based on severity and your pre-set preferences.' },
  { icon: '👥', title: 'Dedicated Care Team', text: 'Registered nurses and care coordinators review your data every shift. AI is the first responder; our human team is always the final word.' },
  { icon: '📋', title: 'Pre-Consultation Report', text: 'A structured PDF report — trending vitals, sleep data, activity patterns, anomalies — is sent to your doctor 30 minutes before every consult.' },
];

const MINI_STATS = [
  { label: 'Patients Active', value: '47', unit: ' live' },
  { label: 'Alerts Today', value: '3', unit: ' flagged' },
  { label: 'Avg Response', value: '38', unit: 'sec' },
  { label: 'Consults Today', value: '12', unit: ' done' },
];

const AVATARS = [
  { label: 'RN', bg: colors.teal },
  { label: 'AI', bg: '#0F766E' },
  { label: 'MD', bg: '#1D4ED8' },
  { label: '+4', bg: '#7C3AED' },
];

export default function Monitoring() {
  const { isMobile } = useResponsive();
  return (
    <Section id="monitoring" bg={colors.warm}>
      <View style={[styles.layout, isMobile && { flexDirection: 'column', gap: 40 }]}>
        <View style={styles.col}>
          <Text style={styles.label}>AI + HUMAN INTELLIGENCE</Text>
          <Text style={styles.title}>We never stop watching your vitals.</Text>
          <Text style={styles.sub}>
            An always-on AI engine processes your biosensor stream. Our clinical team acts
            on every alert. You stay safe — without lifting a finger.
          </Text>
          <View style={styles.features}>
            {FEATURES.map((f) => (
              <View key={f.title} style={styles.mfItem}>
                <View style={styles.mfIcon}>
                  <Text style={{ fontSize: 20 }}>{f.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.mfTitle}>{f.title}</Text>
                  <Text style={styles.mfText}>{f.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.col}>
          <View style={styles.dashboard}>
            <View style={styles.dashHeader}>
              <Text style={styles.dashTitle}>Clinical Alert Center</Text>
              <View style={styles.dashLive}>
                <View style={styles.pulseDot} />
                <Text style={styles.dashLiveText}>Active</Text>
              </View>
            </View>

            <View style={styles.alertBox}>
              <Text style={styles.alertLabel}>⚠️ ADVISORY ALERT — 2:14 PM</Text>
              <Text style={styles.alertText}>
                Patient #A-2247: BP 148/92 — above set threshold. Clinical team notified.
                Video check-in scheduled.
              </Text>
            </View>
            <View style={styles.clearBox}>
              <Text style={styles.clearLabel}>✓ ALL CLEAR — 1:58 PM</Text>
              <Text style={styles.alertText}>
                Patient #A-2241: ECG rhythm normalized. No action required.
              </Text>
            </View>

            <View style={styles.miniGrid}>
              {MINI_STATS.map((s) => (
                <View key={s.label} style={styles.vmgItem}>
                  <Text style={styles.vmgLabel}>{s.label}</Text>
                  <Text style={styles.vmgValue}>
                    {s.value}
                    <Text style={styles.vmgUnit}>{s.unit}</Text>
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.teamRow}>
              <View style={styles.avatars}>
                {AVATARS.map((a, i) => (
                  <View
                    key={a.label}
                    style={[styles.avatar, { backgroundColor: a.bg, marginLeft: i === 0 ? 0 : -8 }]}
                  >
                    <Text style={styles.avatarText}>{a.label}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.teamLabel}>8 care team members on shift now</Text>
            </View>
          </View>
        </View>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  layout: { flexDirection: 'row', gap: 64, alignItems: 'center', maxWidth: 1200, alignSelf: 'center', width: '100%' },
  col: { flex: 1, minWidth: 280 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 12, letterSpacing: 1.4, color: colors.teal, marginBottom: 12 },
  title: { fontFamily: fonts.serif, fontSize: 34, lineHeight: 40, color: colors.midnight, marginBottom: 16 },
  sub: { fontFamily: fonts.body, fontSize: 16, lineHeight: 27, color: colors.muted },
  features: { marginTop: 32, gap: 24 },
  mfItem: { flexDirection: 'row', gap: 20, alignItems: 'flex-start' },
  mfIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mfTitle: { fontSize: 15, fontFamily: fonts.bodySemiBold, color: colors.midnight, marginBottom: 4 },
  mfText: { fontSize: 13.5, color: colors.muted, lineHeight: 22, fontFamily: fonts.body },

  dashboard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 28,
    borderWidth: 1.5,
    borderColor: colors.border,
    boxShadow: '0 8px 40px rgba(13,148,136,0.1), 0 2px 8px rgba(0,0,0,0.05)',
  },
  dashHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  dashTitle: { color: colors.midnight, fontFamily: fonts.bodySemiBold, fontSize: 15 },
  dashLive: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dashLiveText: { fontSize: 12, color: '#059669', fontFamily: fonts.bodySemiBold },
  pulseDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.teal },
  alertBox: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.3)',
    borderLeftWidth: 3,
    borderLeftColor: colors.amber,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  alertLabel: { fontSize: 11, color: '#B45309', fontFamily: fonts.bodySemiBold, letterSpacing: 0.6 },
  alertText: { fontSize: 13, color: colors.text, marginTop: 2, fontFamily: fonts.body, lineHeight: 19 },
  clearBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.2)',
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  clearLabel: { fontSize: 11, color: '#059669', fontFamily: fonts.bodySemiBold, letterSpacing: 0.6 },
  miniGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 4 },
  vmgItem: {
    backgroundColor: colors.warm,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexGrow: 1,
    flexBasis: '45%',
  },
  vmgLabel: { fontSize: 11, color: colors.muted, marginBottom: 4, fontFamily: fonts.body },
  vmgValue: { fontFamily: fonts.mono, fontSize: 18, color: colors.tealDark },
  vmgUnit: { fontSize: 11, color: colors.muted, fontFamily: fonts.body },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  avatars: { flexDirection: 'row' },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.white },
  teamLabel: { fontSize: 13, color: colors.muted, marginLeft: 8, fontFamily: fonts.body },
});
