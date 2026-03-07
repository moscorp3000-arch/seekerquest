import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView,
} from 'react-native';

const QUEST_CONTENT: Record<number, {
  title: string;
  icon: string;
  onchain: boolean;
  steps: { icon: string; title: string; desc: string; action?: string; tip?: string }[];
}> = {
  1: {
    title: 'Welcome to Seeker', icon: '👋', onchain: false,
    steps: [
      { icon: '📱', title: 'What is the Seeker?', desc: 'The Seeker is the first phone built for Solana. With a built-in Seed Vault — a hardware security chip — your crypto keys are never exposed to the internet.' },
      { icon: '🔐', title: 'Your Seed Vault Wallet', desc: 'The Seed Vault is your primary wallet on the Seeker. It stores your private keys in a secure chip. Every transaction requires your fingerprint. Apps like Jupiter and Phantom can also be connected to your Seed Vault wallet.' },
      { icon: '🪙', title: 'Genesis Token', desc: 'As an early Seeker user, you are eligible for the Genesis Token — proof of your early adopter status on the Solana network.' },
    ],
  },
  2: {
    title: 'Your First Swap', icon: '🔄', onchain: true,
    steps: [
      { icon: '🔄', title: 'What is a swap?', desc: 'A swap is exchanging one token for another. On Solana this happens in under 1 second for less than $0.001 in fees. Apps like Jupiter and Phantom offer swap functions too — but in this quest we do it from the Seed Vault.' },
      { icon: '🔐', title: 'Swap via Seed Vault', desc: 'Open the Seed Vault wallet on your Seeker. Go to Swap and exchange a small amount of SOL to USDC. The Seed Vault will ask for your fingerprint to confirm.', action: 'Open Seed Vault → Swap → SOL to USDC', tip: 'You can also do this via Jupiter or Phantom, but make sure your Seed Vault wallet is selected there.' },
    ],
  },
  3: {
    title: 'Exploring Tokens', icon: '🪙', onchain: true,
    steps: [
      { icon: '🪙', title: 'SPL Tokens on Solana', desc: 'Hundreds of tokens exist on Solana. From stablecoins (USDC) to meme tokens (BONK) to ecosystem tokens (SKR). Apps like Jupiter and Phantom show all your tokens — but your Seed Vault manages them all.' },
      { icon: '📱', title: 'SKR & BONK via Seed Vault', desc: 'SKR is the Seeker ecosystem token used for Guardian staking. BONK is Solana\'s most well-known meme token. Swap from your Seed Vault wallet to SKR or BONK.', action: 'Open Seed Vault → Swap → SOL to SKR or BONK', tip: 'Jupiter also offers this swap. Connect your Seed Vault wallet in Jupiter for the same result.' },
    ],
  },
  4: {
    title: 'Learning to Stake', icon: '💎', onchain: true,
    steps: [
      { icon: '💎', title: 'What is staking?', desc: 'Staking means lending your SOL to a validator to help secure the Solana network. In return you earn ~7% APY — automatically, every epoch (~2.5 days). This can be done directly from your Seed Vault.' },
      { icon: '🏦', title: 'Stake via Seed Vault', desc: 'Open the Seed Vault wallet on your Seeker. Go to Staking, choose a validator with low commission (0-10%) and high uptime, and delegate your SOL. You always remain the owner.', action: 'Open Seed Vault → Staking → Choose validator → Stake SOL', tip: 'Avoid validators with more than 10% of total stake — this harms Solana\'s decentralization.' },
    ],
  },
  5: {
    title: 'SKR Staking', icon: '🛡️', onchain: true,
    steps: [
      { icon: '🛡️', title: 'Guardian Nodes', desc: 'Guardian nodes are the backbone of the Seeker network. By staking SKR you support a Guardian node. This is done from the Seeker app on your phone.' },
      { icon: '⚡', title: 'Stake SKR via Seeker App', desc: 'Open the Seeker app on your phone. Go to Guardian staking and stake your SKR tokens to a node of your choice. The Seed Vault confirms the transaction with your fingerprint.', action: 'Open Seeker App → Guardian → Stake SKR', tip: 'You need SKR for this step. Don\'t have SKR yet? Complete Quest 3 first.' },
    ],
  },
  6: {
    title: 'Exploring the dApp Store', icon: '🏪', onchain: false,
    steps: [
      { icon: '🏪', title: 'Solana dApp Store', desc: 'The Seeker has its own dApp Store — built exclusively for Solana apps. No Google Play fees, no censorship. All apps work directly with your Seed Vault wallet.' },
      { icon: '📲', title: 'Install recommended apps', desc: 'Recommended apps: Jupiter (swaps), Phantom (wallet), Magic Eden (NFTs), Drift (trading). Install at least 3. You can connect all of them to your Seed Vault wallet.', action: 'Open dApp Store → Install 3 apps', tip: 'In each app you can choose "Connect Wallet" and select your Seed Vault.' },
    ],
  },
  7: {
    title: 'Activity Tracker', icon: '🏃', onchain: false,
    steps: [
      { icon: '⭕', title: 'Daily Rings', desc: 'The Seeker has activity rings — similar to Apple Watch. Close them daily to maintain your streak and earn XP in the Seeker ecosystem.' },
      { icon: '⬆️', title: 'Levels & XP', desc: 'Every action on your Seeker earns XP: swapping, staking, completing quests, using apps. Higher levels unlock exclusive features and bigger rewards.' },
    ],
  },
  8: {
    title: 'Daily Routine', icon: '📅', onchain: true,
    steps: [
      { icon: '📅', title: 'DCA Strategy', desc: 'Dollar Cost Averaging (DCA) means regularly investing a fixed amount — regardless of price. This reduces the risk of bad timing and slowly builds wealth.' },
      { icon: '🔄', title: 'Set up a routine', desc: 'Jupiter has a recurring swap feature that lets you automatically swap an amount every day or week. Connect your Seed Vault wallet in Jupiter and set up the automatic swap.', action: 'Open Jupiter → Connect Seed Vault → Set recurring swap', tip: 'Start small — $1-5 per day is enough to build the habit.' },
    ],
  },
  9: {
    title: 'Security & Scams', icon: '🔒', onchain: false,
    steps: [
      { icon: '🎣', title: 'Phishing & Wallet Drainers', desc: 'Phishing = fake websites trying to steal your seed phrase. Wallet drainers = malicious contracts that steal all your tokens with one signature. Always check the URL before connecting.' },
      { icon: '🛡️', title: 'Seed Vault protects you', desc: 'The Seed Vault always shows exactly what a transaction does before you sign. Blowfish security is built-in and warns you about suspicious contracts. When in doubt — don\'t sign, ever.' },
      { icon: '✅', title: 'Golden rules', desc: '1. Never share your seed phrase. 2. Never sign what you don\'t understand. 3. Always verify the wallet address. 4. Use your Seed Vault as your primary wallet — not a hot wallet.' },
    ],
  },
  10: {
    title: 'Level Up Strategy', icon: '⬆️', onchain: false,
    steps: [
      { icon: '⬆️', title: 'Reaching Level 3', desc: 'Level 3 requires: closing daily activity rings, at least 1 swap per week from your Seed Vault, and active participation in the Seeker network.' },
      { icon: '🏆', title: 'Your weekly plan', desc: 'Monday: DCA swap via Seed Vault. Wednesday: check activity rings. Friday: review staking rewards. Sunday: explore new apps in the dApp Store. Consistency = higher levels.' },
    ],
  },
  11: {
    title: 'DePIN & Earning', icon: '🌿', onchain: false,
    steps: [
      { icon: '🌿', title: 'What is DePIN?', desc: 'DePIN = Decentralized Physical Infrastructure Networks. You earn crypto by using your phone to support physical networks. The Seeker is perfect for this.' },
      { icon: '📡', title: 'Grass & Helium', desc: 'Grass pays you for sharing unused internet bandwidth. Helium builds a decentralized 5G network. Install both apps via the dApp Store and connect your Seed Vault wallet for payouts.' },
    ],
  },
  12: {
    title: 'Advanced DeFi', icon: '🏦', onchain: true,
    steps: [
      { icon: '🏦', title: 'Liquidity & Lending', desc: 'Advanced DeFi: you can provide liquidity to pools (e.g. SOL/USDC on Orca) and earn interest on your tokens via Kamino. All via your Seed Vault wallet.' },
      { icon: '⚠️', title: 'Explore and understand the risks', desc: 'Impermanent loss, liquidation risk, and smart contract bugs are real. Open Kamino or Orca via the dApp Store, connect your Seed Vault wallet, and explore the interface. Start small if you actually participate.', action: 'Open Kamino or Orca → Connect Seed Vault → Explore', tip: 'Always understand what you\'re doing before committing large amounts.' },
    ],
  },
};

export default function QuestDetailScreen({
  questId,
  onComplete,
  onBack,
}: {
  questId: number;
  onComplete: () => void;
  onBack: () => void;
}) {
  const quest = QUEST_CONTENT[questId];
  const [current, setCurrent] = useState(0);

  const isLast = current === quest.steps.length - 1;
  const step = quest.steps[current];
  const progress = ((current + 1) / quest.steps.length) * 100;

  const handleBack = () => {
    if (current === 0) onBack();
    else setCurrent(c => c - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.stepCount}>{current + 1}/{quest.steps.length}</Text>
      </View>

      <View style={styles.questLabel}>
        <Text style={styles.questLabelText}>{quest.icon} {quest.title}</Text>
        {quest.onchain && (
          <View style={styles.onchainBadge}>
            <Text style={styles.onchainText}>⛓️ onchain</Text>
          </View>
        )}
      </View>

      {quest.onchain && (
        <View style={styles.onchainBanner}>
          <Text style={styles.onchainBannerIcon}>🔐</Text>
          <Text style={styles.onchainBannerText}>
            Complete this action with your Seed Vault wallet on the Seeker.
          </Text>
        </View>
      )}

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>{step.icon}</Text>
          </View>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDesc}>{step.desc}</Text>
          {step.action && (
            <View style={styles.actionBox}>
              <Text style={styles.actionIcon}>👆</Text>
              <Text style={styles.actionText}>{step.action}</Text>
            </View>
          )}
          {step.tip && (
            <View style={styles.tipBox}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipText}>{step.tip}</Text>
            </View>
          )}
        </View>

        <View style={styles.dotsRow}>
          {quest.steps.map((_, i) => (
            <View key={i} style={[
              styles.dot,
              i === current && { backgroundColor: '#FF7800', width: 20 },
              i < current && { backgroundColor: 'rgba(255,120,0,0.4)' },
            ]} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {!isLast ? (
          <TouchableOpacity style={styles.nextBtn} onPress={() => setCurrent(c => c + 1)}>
            <Text style={styles.nextBtnText}>Next →</Text>
          </TouchableOpacity>
        ) : quest.onchain ? (
          <TouchableOpacity style={[styles.nextBtn, styles.manualBtn]} onPress={onComplete}>
            <Text style={[styles.nextBtnText, { color: '#FF7800' }]}>👆 I've done this</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextBtn} onPress={onComplete}>
            <Text style={styles.nextBtnText}>✅ Complete Quest</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14 },
  backBtn: { padding: 4 },
  backBtnText: { fontSize: 22, color: 'rgba(255,255,255,0.5)' },
  progressTrack: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999 },
  progressFill: { height: '100%', backgroundColor: '#FF7800', borderRadius: 999 },
  stepCount: { fontSize: 12, color: 'rgba(255,255,255,0.3)', minWidth: 30, textAlign: 'right' },
  questLabel: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 },
  questLabelText: { fontSize: 14, fontWeight: '800', color: '#FF7800' },
  onchainBadge: { backgroundColor: 'rgba(255,120,0,0.2)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  onchainText: { fontSize: 10, color: '#FF7800', fontWeight: '600' },
  onchainBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: 20, marginBottom: 14,
    backgroundColor: 'rgba(255,120,0,0.08)', borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: 'rgba(255,120,0,0.25)',
  },
  onchainBannerIcon: { fontSize: 20 },
  onchainBannerText: { fontSize: 13, color: 'rgba(255,255,255,0.6)', flex: 1, lineHeight: 20 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' },
  infoCard: {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 24,
    borderWidth: 1, borderColor: 'rgba(255,120,0,0.15)', alignItems: 'center', gap: 14, minHeight: 260, justifyContent: 'center',
  },
  iconWrap: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,120,0,0.12)', alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 36 },
  stepTitle: { fontSize: 20, fontWeight: '900', color: '#FFFFFF', textAlign: 'center' },
  stepDesc: { fontSize: 15, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 24 },
  actionBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,120,0,0.1)', borderRadius: 12, padding: 14, width: '100%',
    borderWidth: 1, borderColor: 'rgba(255,120,0,0.3)',
  },
  actionIcon: { fontSize: 18 },
  actionText: { fontSize: 14, color: '#FF7800', fontWeight: '700', flex: 1, lineHeight: 20 },
  tipBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 12, width: '100%',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  tipIcon: { fontSize: 14 },
  tipText: { fontSize: 12, color: 'rgba(255,255,255,0.4)', flex: 1, lineHeight: 18, fontStyle: 'italic' },
  dotsRow: { flexDirection: 'row', gap: 6, marginTop: 20, marginBottom: 14, alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.15)' },
  bottomBar: { paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  nextBtn: { backgroundColor: '#FF7800', borderRadius: 16, paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
  manualBtn: { backgroundColor: 'rgba(255,120,0,0.1)', borderWidth: 1, borderColor: '#FF7800' },
  nextBtnText: { fontSize: 17, fontWeight: '800', color: '#080808' },
});