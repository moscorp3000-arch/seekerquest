import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAuthorization } from '../components/providers/AuthorizationProvider';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

const QUESTS = [
  { id: 1, title: 'Welkom bij Seeker', desc: 'Leer over Seed Vault & Genesis Token', icon: '👋', onchain: false },
  { id: 2, title: 'Je Eerste Swap', desc: 'Swap SOL → USDC via de app', icon: '🔄', onchain: true },
  { id: 3, title: 'Tokens Ontdekken', desc: 'Swap naar SKR en BONK', icon: '🪙', onchain: true },
  { id: 4, title: 'Staking Leren', desc: 'Stake SOL via Seed Vault', icon: '💎', onchain: true },
  { id: 5, title: 'SKR Staking', desc: 'Stake SKR naar Guardian', icon: '🛡️', onchain: true },
  { id: 6, title: 'dApp Store Verkennen', desc: 'Installeer 3 aanbevolen apps', icon: '🏪', onchain: false },
  { id: 7, title: 'Activity Tracker', desc: 'Begrijp ringen, levels & streaks', icon: '🏃', onchain: false },
  { id: 8, title: 'Dagelijkse Routine', desc: 'Stel je dagelijkse swap in', icon: '📅', onchain: true },
  { id: 9, title: 'Veiligheid & Scams', desc: 'Herken phishing & bescherm je wallet', icon: '🔒', onchain: false },
  { id: 10, title: 'Level Up Strategie', desc: 'Tips voor Level 3, 4, 5', icon: '⬆️', onchain: false },
  { id: 11, title: 'DePIN & Verdienen', desc: 'Grass, Helium en meer', icon: '🌿', onchain: false },
  { id: 12, title: 'DeFi Gevorderd', desc: 'Liquidity & lending basics', icon: '🏦', onchain: true },
];

export default function HomeScreen() {
  const { selectedAccount, deauthorizeSession } = useAuthorization();

  const shortAddress = selectedAccount
    ? `${selectedAccount.publicKey.toString().slice(0, 4)}...${selectedAccount.publicKey.toString().slice(-4)}`
    : '';

  const handleDisconnect = async () => {
    await transact(async wallet => {
      await deauthorizeSession(wallet);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>SeekerQuest ⚡</Text>
          <Text style={styles.headerSub}>{shortAddress}</Text>
        </View>
        <TouchableOpacity style={styles.disconnectBtn} onPress={handleDisconnect}>
          <Text style={styles.disconnectText}>Disconnect</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Voortgang: 0/{QUESTS.length} quests</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '0%' }]} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {QUESTS.map((quest, index) => (
          <TouchableOpacity key={quest.id} style={[styles.questCard, index === 0 && styles.questCardActive]}>
            <View style={styles.questIcon}>
              <Text style={styles.questIconText}>{quest.icon}</Text>
            </View>
            <View style={styles.questInfo}>
              <View style={styles.questTitleRow}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                {quest.onchain && (
                  <View style={styles.onchainBadge}>
                    <Text style={styles.onchainText}>⛓️ onchain</Text>
                  </View>
                )}
              </View>
              <Text style={styles.questDesc}>{quest.desc}</Text>
            </View>
            <Text style={styles.questArrow}>›</Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  headerSub: { fontSize: 12, color: '#FF7800', marginTop: 2 },
  disconnectBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  disconnectText: { fontSize: 13, color: 'rgba(255,255,255,0.5)' },
  progressContainer: { paddingHorizontal: 20, paddingVertical: 14 },
  progressLabel: { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 8 },
  progressTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FF7800', borderRadius: 999 },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  questCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: 14,
  },
  questCardActive: { borderColor: '#FF7800', backgroundColor: 'rgba(255, 120, 0, 0.08)' },
  questIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questIconText: { fontSize: 24 },
  questInfo: { flex: 1, gap: 4 },
  questTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  questTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  onchainBadge: { backgroundColor: 'rgba(255, 120, 0, 0.2)', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  onchainText: { fontSize: 10, color: '#FF7800', fontWeight: '600' },
  questDesc: { fontSize: 13, color: 'rgba(255,255,255,0.4)' },
  questArrow: { fontSize: 24, color: 'rgba(255,255,255,0.2)' },
});