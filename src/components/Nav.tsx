import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import { useResponsive } from '../responsive';
import { SectionId, useScrollNav } from '../ScrollContext';

const LINKS: { label: string; id: SectionId }[] = [
  { label: 'Services', id: 'services' },
  { label: 'Devices', id: 'biosensors' },
  { label: 'AI Monitoring', id: 'monitoring' },
  { label: 'Doctors', id: 'doctors' },
  { label: 'Activity', id: 'activity' },
];

export const NAV_HEIGHT = 68;

export default function Nav() {
  const { isMobile, pagePadding } = useResponsive();
  const { scrollToSection } = useScrollNav();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: SectionId) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    // position:'fixed' is a react-native-web extension so the bar stays pinned.
    <View style={[styles.nav, { paddingHorizontal: pagePadding }] as any}>
      <View style={styles.bar}>
        <Pressable style={styles.logo} onPress={() => scrollToSection('how')}>
          <Image
            source={require('../../assets/imhome-logo.png')}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>
            I'm<Text style={{ color: colors.teal }}>Home</Text>
            <Text style={{ color: colors.muted, fontFamily: fonts.bodyLight }}>.</Text>
            <Text style={{ color: colors.midnight }}>Care</Text>
          </Text>
        </Pressable>

        {!isMobile && (
          <View style={styles.links}>
            {LINKS.map((l) => (
              <NavLink key={l.id} label={l.label} onPress={() => go(l.id)} />
            ))}
          </View>
        )}

        <View style={styles.right}>
          <Pressable style={styles.cta} onPress={() => scrollToSection('cta')}>
            <Text style={styles.ctaText}>Get Started</Text>
          </Pressable>
          {isMobile && (
            <Pressable
              style={styles.hamburger}
              onPress={() => setMenuOpen((v) => !v)}
              accessibilityLabel="Toggle menu"
            >
              <Text style={styles.hamburgerIcon}>{menuOpen ? '✕' : '☰'}</Text>
            </Pressable>
          )}
        </View>
      </View>

      {isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          {LINKS.map((l) => (
            <Pressable key={l.id} style={styles.mobileLink} onPress={() => go(l.id)}>
              <Text style={styles.mobileLinkText}>{l.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

function NavLink({ label, onPress }: { label: string; onPress: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
    >
      <Text style={[styles.linkText, hover && { color: colors.teal }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    // @ts-expect-error web-only
    backdropFilter: 'blur(12px)',
  },
  bar: {
    height: NAV_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoImg: { width: 42, height: 42 },
  logoText: { fontFamily: fonts.serif, fontSize: 23, color: colors.midnight },
  links: { flexDirection: 'row', gap: 32, alignItems: 'center' },
  linkText: { color: colors.muted, fontSize: 14, fontFamily: fonts.bodyMedium },
  right: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  cta: {
    backgroundColor: colors.teal,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  ctaText: { color: colors.white, fontSize: 14, fontFamily: fonts.bodySemiBold },
  hamburger: { padding: 4 },
  hamburgerIcon: { fontSize: 22, color: colors.midnight },
  mobileMenu: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  mobileLink: { paddingVertical: 12 },
  mobileLinkText: { fontSize: 16, fontFamily: fonts.bodyMedium, color: colors.midnight },
});
