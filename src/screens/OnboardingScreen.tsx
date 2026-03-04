import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const STEPS = [
  {
    emoji: '📱',
    title: 'Welkom bij SeekerQuest',
    desc: 'Jouw interactieve gids voor de Seeker telefoon. Leer alles over Web3 terwijl je echte acties uitvoert op Solana.',
  },
  {
    emoji: '🗺️',
    title: '12 Interactieve Quests',
    desc: 'Van je eerste swap tot geavanceerde DeFi. Elke quest leert je een nieuwe skill op de Seeker.',
  },
  {
    emoji: '⛓️',
    title: 'Onchain Acties',
    desc: 'Sommige quests vereisen echte transacties — swap, stake, of installeer apps. Je Seed Vault houdt alles veilig.',
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

      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={onFinish}>
        <Text style={styles.skipText}>Sla over</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{step.emoji}</Text>
        </View>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.desc}>{step.desc}</Text>
      </View>

      {/* Dots */}
      <View style={styles.dotsRow}>
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
        ))}
      </View>

      {/* Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => isLast ? onFinish() : setCurrent(c => c + 1)}>
          <Text style={styles.nextBtnText}>
            {isLast ? 'Verbind je Wallet →' : 'Volgende →'}
          </Text>
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
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emojiWrap: {
    width: 100, height: 100, borderRadius: 30,
    backgroundColor: 'rgba(255,120,0,0.15)',
    borderWidth: 2, borderColor: 'rgba(255,120,0,0.3)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 32,
  },
  emoji: { fontSize: 48 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  desc: { fontSize: 16, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 26 },
  dotsRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.15)' },
  dotActive: { width: 24, backgroundColor: '#FF7800' },
  bottomBar: { width: '100%', paddingHorizontal: 24, paddingBottom: 32 },
  nextBtn: { backgroundColor: '#FF7800', borderRadius: 16, paddingVertical: 18, alignItems: 'center' },
  nextBtnText: { fontSize: 17, fontWeight: '800', color: '#080808' },
});