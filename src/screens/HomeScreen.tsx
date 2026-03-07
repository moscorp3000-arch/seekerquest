import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';
import { useAuthorization } from '../components/providers/AuthorizationProvider';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { isQuestUnlocked } from '../progress';
import { getStreakState, StreakState } from '../../util/streak';
import StreakBanner from '../components/StreakBanner';

const QUESTS = [
  { id: 1, title: 'Welcome to Seeker', desc: 'Learn about Seed Vault & Genesis Token', icon: '👋', onchain: false },
  { id: 2, title: 'Your First Swap', desc: 'Swap SOL → USDC via the app', icon: '🔄', onchain: true },
  { id: 3, title: 'Exploring Tokens', desc: 'Swap to SKR and BONK', icon: '🪙', onchain: true },
  { id: 4, title: 'Learning to Stake', desc: 'Stake SOL via Seed Vault', icon: '💎', onchain: true },
  { id: 5, title: 'SKR Staking', desc: 'Stake SKR to Guardian', icon: '🛡️', onchain: true },
  { id: 6, title: 'Exploring the dApp Store', desc: 'Install 3 recommended apps', icon: '🏪', onchain: false },
  { id: 7, title: 'Activity Tracker', desc: 'Understand rings, levels & streaks', icon: '🏃', onchain: false },
  { id: 8, title: 'Daily Routine', desc: 'Set up your daily swap', icon: '📅', onchain: true },
  { id: 9, title: 'Security & Scams', desc: 'Recognize phishing & protect your wallet', icon: '🔒', onchain: false },
  { id: 10, title: 'Level Up Strategy', desc: 'Tips for Level 3, 4, 5', icon: '⬆️', onchain: false },
  { id: 11, title: 'DePIN & Earning', desc: 'Grass, Helium and more', icon: '🌿', onchain: false },
  { id: 12, title: 'Advanced DeFi', desc: 'Liquidity & lending basics', icon: '🏦', onchain: true },
];

export default function HomeScreen({
  onStartQuest,
  completedQuests,
  onDevReset,
  onPrivacy,
  onTerms,
  onLicenses,
}: {
  onStartQuest: (questId: number) => void;
  completedQuests: number[];
  onDevReset: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onLicenses: () => void;
}) {
  const { selectedAccount, deauthorizeSession } = useAuthorization();
  const [streakState, setStreakState] = useState<StreakState | null>(null);

  useEffect(() => {
    getStreakState().then(setStreakState);
  }, []);

  const shortAddress = selectedAccount
    ? `${selectedAccount.publicKey.toString().slice(0, 4)}...${selectedAccount.publicKey.toString().slice(-4)}`
    : '';

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect Wallet',
      'Are you sure you want to disconnect your wallet?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Disconnect', style: 'destructive', onPress: async () => {
          await transact(async wallet => { await deauthorizeSession(wallet); });
        }},
      ]
    );
  };

  const handleQuestPress = (questId: number) => {
    const unlocked = isQuestUnlocked(questId, completedQuests);
    if (!unlocked) {
      Alert.alert('🔒 Locked', `Complete Quest ${questId - 1} first to unlock this one.`, [{ text: 'OK' }]);
      return;
    }
    onStartQuest(questId);
  };

  const progressPct = (completedQuests.length / QUESTS.length) * 100;
  const nextQuest = QUESTS.find(q => !completedQuests.includes(q.id));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>SeekerQuest ⚡</Text>
          <TouchableOpacity onLongPress={onDevReset} delayLongPress={1500}>
            <Text style={styles.headerSub}>{shortAddress}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.disconnectBtn} onPress={handleDisconnect}>
          <Text style={styles.disconnectIcon}>🔓</Text>
          <Text style={styles.disconnectLabel}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>{completedQuests.length}/{QUESTS.length} quests completed</Text>
          {nextQuest && <Text style={styles.nextLabel}>Next: {nextQuest.icon} {nextQuest.title}</Text>}
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
      </View>

      {streakState && (
        <StreakBanner streak={streakState} accentColor="#FF7800" />
      )}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {QUESTS.map((quest) => {
          const unlocked = isQuestUnlocked(quest.id, completedQuests);
          const completed = completedQuests.includes(quest.id);
          return (
            <TouchableOpacity
              key={quest.id}
              style={[
                styles.questCard,
                unlocked && !completed && styles.questCardActive,
                completed && styles.questCardCompleted,
                !unlocked && styles.questCardLocked,
              ]}
              onPress={() => handleQuestPress(quest.id)}
              activeOpacity={unlocked ? 0.7 : 1}>
              <View style={[styles.questIcon, !unlocked && styles.questIconLocked]}>
                <Text style={[styles.questIconText, !unlocked && { opacity: 0.3 }]}>
                  {unlocked ? quest.icon : '🔒'}
                </Text>
              </View>
              <View style={styles.questInfo}>
                <View style={styles.questTitleRow}>
                  <Text style={[styles.questTitle, !unlocked && styles.questTitleLocked]}>
                    {quest.title}
                  </Text>
                  {quest.onchain && unlocked && (
                    <View style={styles.onchainBadge}>
                      <Text style={styles.onchainText}>⛓️ onchain</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.questDesc, !unlocked && { opacity: 0.3 }]}>
                  {unlocked ? quest.desc : `Complete Quest ${quest.id - 1} first`}
                </Text>
              </View>
              {completed && <Text style={styles.completedCheck}>✅</Text>}
              {unlocked && !completed && <Text style={styles.questArrow}>›</Text>}
            </TouchableOpacity>
          );
        })}

        {/* Footer links */}
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={onPrivacy}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.footerDivider}>·</Text>
          <TouchableOpacity onPress={onTerms}>
            <Text style={styles.footerLink}>Terms of Use</Text>
          </TouchableOpacity>
          <Text style={styles.footerDivider}>·</Text>
          <TouchableOpacity onPress={onLicenses}>
            <Text style={styles.footerLink}>Licenses</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerVersion}>Seeker Quest v1.0 — Built for Solana Mobile</Text>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  headerSub: { fontSize: 12, color: '#FF7800', marginTop: 2 },
  disconnectBtn: {
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10,
    backgroundColor: 'rgba(255,68,68,0.08)',
    borderWidth: 1, borderColor: 'rgba(255,68,68,0.2)', alignItems: 'center',
  },
  disconnectIcon: { fontSize: 14 },
  disconnectLabel: { fontSize: 9, color: 'rgba(255,100,100,0.8)', fontWeight: '600', marginTop: 1 },
  progressContainer: { paddingHorizontal: 20, paddingVertical: 14 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  progressLabel: { fontSize: 12, color: 'rgba(255,255,255,0.4)' },
  nextLabel: { fontSize: 11, color: '#FF7800', fontWeight: '600' },
  progressTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 999 },
  progressFill: { height: '100%', backgroundColor: '#FF7800', borderRadius: 999 },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  questCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16,
    padding: 16, marginBottom: 10, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)', gap: 14,
  },
  questCardActive: { borderColor: '#FF7800', backgroundColor: 'rgba(255,120,0,0.08)' },
  questCardCompleted: { borderColor: 'rgba(20,241,149,0.3)', backgroundColor: 'rgba(20,241,149,0.04)' },
  questCardLocked: { opacity: 0.45 },
  questIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  questIconLocked: { backgroundColor: 'rgba(255,255,255,0.03)' },
  questIconText: { fontSize: 24 },
  questInfo: { flex: 1, gap: 4 },
  questTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  questTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  questTitleLocked: { color: 'rgba(255,255,255,0.4)' },
  onchainBadge: { backgroundColor: 'rgba(255,120,0,0.2)', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  onchainText: { fontSize: 10, color: '#FF7800', fontWeight: '600' },
  questDesc: { fontSize: 13, color: 'rgba(255,255,255,0.4)' },
  completedCheck: { fontSize: 20 },
  questArrow: { fontSize: 24, color: 'rgba(255,255,255,0.2)' },
  footerLinks: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 8 },
  footerLink: { fontSize: 12, color: 'rgba(255,120,0,0.6)' },
  footerDivider: { fontSize: 12, color: 'rgba(255,255,255,0.2)' },
  footerVersion: { textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.15)', marginBottom: 8 },
});