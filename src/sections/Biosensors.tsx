import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform, Alert, ImageSourcePropType } from 'react-native';
import { colors, fonts } from '../theme';
import { useResponsive } from '../responsive';
import { Section, SectionHeader } from '../ui';

type Device = {
  brand: string;
  name: string;
  metrics: string[];
  fda: boolean;
  img: ImageSourcePropType;
};

const DEVICES: Device[] = [
  {
    brand: 'LifeSignals',
    name: 'UbiqVue 2A Biosensor Patch',
    metrics: ['ECG', 'Heart Rate', 'HRV', 'Resp. Rate', 'SpO₂', 'Posture', 'Temp'],
    fda: true,
    img: require('../../assets/devices/ubiqvue-2a.png'),
  },
  {
    brand: 'VitalConnect',
    name: 'VitalPatch RTM',
    metrics: ['ECG', 'Heart Rate', 'SpO₂', 'Posture', 'Activity', 'Skin Temp'],
    fda: true,
    img: require('../../assets/devices/vitalpatch-rtm.png'),
  },
  {
    brand: 'Jointcorp',
    name: 'JCVital V5',
    metrics: ['ECG', 'BP', 'SpO₂', 'HRV', 'Steps', 'Sleep', 'Glucose'],
    fda: false,
    img: require('../../assets/devices/jcvital-v5.png'),
  },
  {
    brand: 'Omron',
    name: 'Complete BP7900',
    metrics: ['Blood Pressure', 'EKG', 'Afib Detection', 'Bluetooth'],
    fda: true,
    img: require('../../assets/devices/omron-bp7900.png'),
  },
  {
    brand: 'Biobeat',
    name: 'BB-613WP Wrist Monitor',
    metrics: ['BP (cuffless)', 'SpO₂', 'HR', 'HRV', 'CO'],
    fda: true,
    img: require('../../assets/devices/biobeat-bb613wp.png'),
  },
];

export default function Biosensors() {
  const { isMobile } = useResponsive();
  return (
    <Section id="biosensors" bg={colors.warm}>
      <SectionHeader
        label="Biosensor Devices"
        title="Choose your continuous monitoring device"
        sub="We've partnered with the world's leading clinical-grade wearable manufacturers. Select the device that fits your condition and lifestyle — then we handle the rest."
        centered
      />
      <View style={styles.grid}>
        {DEVICES.map((d) => (
          <DeviceCard key={d.name} device={d} isMobile={isMobile} />
        ))}
      </View>
    </Section>
  );
}

function DeviceCard({ device, isMobile }: { device: Device; isMobile: boolean }) {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(false);

  const onSelect = () => {
    setSelected(true);
    const msg = `Great choice! You've selected the ${device.name}.\nOur team will contact you to ship the device and begin onboarding.`;
    if (Platform.OS === 'web') {
      setTimeout(() => window.alert(msg), 200);
    } else {
      setTimeout(() => Alert.alert('Device Selected', msg), 200);
    }
  };

  return (
    <Pressable
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[
        styles.card,
        { flexBasis: isMobile ? '100%' : 240 },
        hover && styles.cardHover,
      ]}
    >
      <View style={styles.imgWrap}>
        {device.fda && (
          <View style={styles.fda}>
            <Text style={styles.fdaText}>FDA Cleared</Text>
          </View>
        )}
        <Image
          source={device.img}
          resizeMode="contain"
          style={[styles.thumb, hover && { transform: [{ scale: 1.08 }] }]}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.brand}>{device.brand.toUpperCase()}</Text>
        <Text style={styles.name}>{device.name}</Text>
        <View style={styles.metrics}>
          {device.metrics.map((m) => (
            <View key={m} style={styles.metricTag}>
              <Text style={styles.metricText}>{m}</Text>
            </View>
          ))}
        </View>
        <Pressable
          onPress={onSelect}
          style={[styles.selectBtn, selected && styles.selectBtnActive]}
        >
          <Text style={[styles.selectText, selected && { color: colors.white }]}>
            {selected ? '✓ Selected' : 'Select This Device'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 24, width: '100%' },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    overflow: 'hidden',
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 230,
  },
  cardHover: {
    borderColor: colors.teal,
    transform: [{ translateY: -3 }],
    boxShadow: '0 12px 36px rgba(13,148,136,0.12)',
  },
  imgWrap: {
    height: 160,
    backgroundColor: colors.warm,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  thumb: { width: '80%', height: 130 },
  fda: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: 'rgba(16,185,129,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.25)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  fdaText: { fontSize: 10, color: '#059669', fontFamily: fonts.bodySemiBold, letterSpacing: 0.4 },
  body: { padding: 20 },
  brand: { fontSize: 11, color: colors.teal, fontFamily: fonts.bodySemiBold, letterSpacing: 0.6, marginBottom: 4 },
  name: { fontSize: 15, fontFamily: fonts.bodySemiBold, color: colors.midnight, marginBottom: 8 },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  metricTag: {
    backgroundColor: colors.tealLight,
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.18)',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 4,
  },
  metricText: { fontSize: 11, color: colors.tealDark, fontFamily: fonts.bodyMedium },
  selectBtn: {
    marginTop: 16,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 7,
    alignItems: 'center',
  },
  selectBtnActive: { backgroundColor: colors.teal, borderColor: colors.teal },
  selectText: { color: colors.teal, fontSize: 13, fontFamily: fonts.bodySemiBold },
});
