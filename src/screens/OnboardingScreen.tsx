import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const STEPS = [
  {
    emoji: '📱',
    title: 'Welcome to SeekerQuest',
    desc: 'Your interactive guide for the Seeker phone. Learn everything about Web3 while performing real actions on Solana.',
    extra: null,
  },
  {
    emoji: '🗺️',
    title: '12 Interactive Quests',
    desc: 'From your first swap to advanced DeFi. Each quest teaches you a new skill on the Seeker.',
    extra: null,
  },
  {
    emoji: '⛓️',
    title: 'Two types of quests',
    desc: 'Some quests are informational — read and learn. Others require a real action on the Solana blockchain.',
    extra: [
      { icon: '📖', label: 'Informational', desc: 'Read, learn and answer questions. No transaction needed.' },
      { icon: '⛓️', label: 'Onchain', desc: 'Perform a real swap, stake or other action. Your Seed Vault confirms with your fingerprint.' },
    ],
  },
  {
    emoji: '🔐',
    title: 'Your Seed Vault protects you',
    desc: 'For every onchain action, the Seed Vault asks for your fingerprint. Nothing happens without your approval. You are always in control.',
    extra: null,
  },
];

export default function OnboardingScreen({ onFinish }: { onFinish: () => void }) {
  const [current, setCurrent] = useState(0);
  const isLast = current === STEPS.length - 1;
  const step = STEPS[current];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <TouchableOpacity style={styles.skipBtn} onPress={onFinish}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{step.emoji}</Text>
        </View>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.desc}>{step.desc}</Text>
        {step.extra && (
          <View style={styles.extraCards}>
            {step.extra.map((item, i) => (
              <View key={i} style={styles.extraCard}>
                <Text style={styles.extraIcon}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.extraLabel}>{item.label}</Text>
                  <Text style={styles.extraDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={styles.dotsRow}>
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
        ))}
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.nextBtn} onPress={() => isLast ? onFinish() : setCurrent(c => c + 1)}>
          <Text style={styles.nextBtnText}>{isLast ? 'Connect your Wallet →' : 'Next →'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808', alignItems: 'center', justifyContent: 'space-between' },
  orb1: { position: 'absolute', width: 280, height: 280, borderRadius: 140, backgroundColor: 'rgba(255,120,0,0.12)', top: -60, right: -60 },
  orb2: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,80,0,0.08)', bottom: 80, left: -60 },
  skipBtn: { alignSelf: 'flex-end', paddingHorizontal: 24, paddingTop: 16 },
  skipText: { fontSize: 14, color: 'rgba(255,255,255,0.3)' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  emojiWrap: { width: 100, height: 100, borderRadius: 30, backgroundColor: 'rgba(255,120,0,0.15)', borderWidth: 2, borderColor: 'rgba(255,120,0,0.3)', alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
  emoji: { fontSize: 48 },
  title: { fontSize: 26, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', marginBottom: 14 },
  desc: { fontSize: 15, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 24, marginBottom: 20 },
  extraCards: { width: '100%', gap: 10 },
  extraCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  extraIcon: { fontSize: 24, marginTop: 2 },
  extraLabel: { fontSize: 14, fontWeight: '800', color: '#FFFFFF', marginBottom: 3 },
  extraDesc: { fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 20 },
  dotsRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.15)' },
  dotActive: { width: 24, backgroundColor: '#FF7800' },
  bottomBar: { width: '100%', paddingHorizontal: 24, paddingBottom: 32 },
  nextBtn: { backgroundColor: '#FF7800', borderRadius: 16, paddingVertical: 18, alignItems: 'center' },
  nextBtnText: { fontSize: 17, fontWeight: '800', color: '#080808' },
});