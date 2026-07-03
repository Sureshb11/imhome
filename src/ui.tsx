import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, fonts } from './theme';
import { useResponsive } from './responsive';
import { SectionId, useScrollNav } from './ScrollContext';

/**
 * Full-width page section. Handles horizontal page padding, vertical rhythm,
 * background color, and (optionally) registering its scroll offset for nav.
 */
export function Section({
  id,
  bg,
  children,
  style,
  vPadding = 90,
}: {
  id?: SectionId;
  bg?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  vPadding?: number;
}) {
  const { pagePadding } = useResponsive();
  const { registerSection } = useScrollNav();

  const onLayout = (e: LayoutChangeEvent) => {
    if (id) registerSection(id, e.nativeEvent.layout.y);
  };

  return (
    <View
      onLayout={onLayout}
      style={[
        {
          backgroundColor: bg ?? colors.cream,
          paddingHorizontal: pagePadding,
          paddingVertical: vPadding,
          width: '100%',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function SectionHeader({
  label,
  title,
  sub,
  centered,
}: {
  label: string;
  title: string;
  sub?: string;
  centered?: boolean;
}) {
  return (
    <View style={[styles.header, centered && { alignItems: 'center' }]}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <Text style={[styles.title, centered && { textAlign: 'center' }]}>{title}</Text>
      {sub ? (
        <Text
          style={[
            styles.sub,
            centered && { textAlign: 'center', maxWidth: 560, alignSelf: 'center' },
          ]}
        >
          {sub}
        </Text>
      ) : null}
    </View>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  header: { marginBottom: 44, maxWidth: 900, width: '100%' },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 1.4,
    color: colors.teal,
    marginBottom: 12,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 40,
    color: colors.midnight,
    marginBottom: 16,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 27,
    color: colors.muted,
    maxWidth: 560,
  },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
  },
});

export const sharedText: Record<string, TextStyle> = {};
