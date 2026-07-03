import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import { useResponsive } from '../responsive';

const COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Services', links: ['Diabetes Care', 'Cardiac Monitoring', 'Pulmonology', 'Dermatology', 'Nutrition', 'Mental Health'] },
  { title: 'Devices', links: ['LifeSignals UbiqVue 2A', 'VitalPatch RTM', 'JCVital V5', 'Omron Complete BP7900', 'Biobeat BB-613WP'] },
  { title: 'Company', links: ['About Us', 'Our Team', 'Partners', 'Privacy Policy', 'Terms of Service', 'Contact'] },
];

const BADGES = ['HIPAA', 'FDA Partners', 'RPM Billing'];

export default function Footer() {
  const { isMobile, pagePadding } = useResponsive();
  return (
    <View style={[styles.footer, { paddingHorizontal: pagePadding }]}>
      <View style={[styles.grid, isMobile && { flexDirection: 'column', gap: 32 }]}>
        <View style={styles.brandCol}>
          <Text style={styles.logo}>
            I'm<Text style={{ color: colors.teal }}>Home</Text>.Care
          </Text>
          <Text style={styles.desc}>
            Hospital-grade remote patient monitoring and specialist video consultations —
            delivered to your home. Serving patients across New Jersey and New York.
          </Text>
          <View style={styles.badges}>
            {BADGES.map((b) => (
              <View key={b} style={styles.badge}>
                <Text style={styles.badgeText}>{b}</Text>
              </View>
            ))}
          </View>
        </View>

        {COLUMNS.map((col) => (
          <View key={col.title} style={styles.col}>
            <Text style={styles.colTitle}>{col.title}</Text>
            {col.links.map((l) => (
              <Text key={l} style={styles.link}>
                {l}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View style={[styles.bottom, isMobile && { flexDirection: 'column', gap: 8, alignItems: 'flex-start' }]}>
        <Text style={styles.bottomText}>© 2025 I'mHome.Care LLC — imhome.care — East Brunswick, NJ</Text>
        <Text style={styles.bottomText}>
          A division of I'mHome.Care LLC (Delaware) · Powered by NALAM Healthcare IT
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { backgroundColor: colors.footerBg, paddingTop: 64, paddingBottom: 40 },
  grid: { flexDirection: 'row', gap: 48, marginBottom: 48, flexWrap: 'wrap' },
  brandCol: { flexGrow: 2, flexBasis: 280, minWidth: 240 },
  col: { flexGrow: 1, flexBasis: 140, minWidth: 120 },
  logo: { fontFamily: fonts.serif, fontSize: 21, color: colors.white, marginBottom: 12 },
  desc: { fontSize: 13.5, lineHeight: 24, color: 'rgba(255,255,255,0.45)', fontFamily: fonts.body },
  badges: { flexDirection: 'row', gap: 8, marginTop: 16, flexWrap: 'wrap' },
  badge: {
    backgroundColor: 'rgba(13,148,136,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeText: { color: '#5EEAD4', fontSize: 10.5, fontFamily: fonts.bodySemiBold, letterSpacing: 0.5 },
  colTitle: { color: colors.white, fontSize: 14, fontFamily: fonts.bodySemiBold, marginBottom: 16 },
  link: { color: 'rgba(255,255,255,0.45)', fontSize: 13.5, marginBottom: 8, fontFamily: fonts.body },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  bottomText: { fontSize: 12.5, color: 'rgba(255,255,255,0.3)', fontFamily: fonts.body },
});
