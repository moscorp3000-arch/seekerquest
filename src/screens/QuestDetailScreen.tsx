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
    title: 'Welkom bij Seeker', icon: '👋', onchain: false,
    steps: [
      { icon: '📱', title: 'Wat is de Seeker?', desc: 'De Seeker is de eerste telefoon gebouwd voor Solana. Met een ingebouwde Seed Vault — een hardware beveiligingschip — zijn je crypto keys nooit blootgesteld aan het internet.' },
      { icon: '🔐', title: 'Jouw Seed Vault Wallet', desc: 'De Seed Vault is jouw primaire wallet op de Seeker. Hij slaat je private keys op in een beveiligde chip. Elke transactie vereist jouw vingerafdruk. Apps zoals Jupiter en Phantom kun je ook verbinden met je Seed Vault wallet.' },
      { icon: '🪙', title: 'Genesis Token', desc: 'Als vroege Seeker gebruiker heb je recht op het Genesis Token — een bewijs van jouw early adopter status op het Solana netwerk.' },
    ],
  },
  2: {
    title: 'Je Eerste Swap', icon: '🔄', onchain: true,
    steps: [
      { icon: '🔄', title: 'Wat is een swap?', desc: 'Een swap is het wisselen van één token voor een andere. Op Solana gaat dit in minder dan 1 seconde voor minder dan $0.001 aan kosten. Apps zoals Jupiter en Phantom bieden ook swap functies aan — maar in deze quest doen we het vanuit de Seed Vault.' },
      { icon: '🔐', title: 'Swap via Seed Vault', desc: 'Open de Seed Vault wallet op je Seeker. Ga naar Swap en wissel een kleine hoeveelheid SOL naar USDC. De Seed Vault vraagt om je vingerafdruk ter bevestiging.', action: 'Open Seed Vault → Swap → SOL naar USDC', tip: 'Je kunt dit ook via Jupiter of Phantom doen, maar zorg dat je Seed Vault wallet daar geselecteerd is.' },
    ],
  },
  3: {
    title: 'Tokens Ontdekken', icon: '🪙', onchain: true,
    steps: [
      { icon: '🪙', title: 'SPL Tokens op Solana', desc: 'Op Solana bestaan honderden tokens. Van stablecoins (USDC) tot meme tokens (BONK) tot ecosystem tokens (SKR). Apps zoals Jupiter en Phantom tonen al je tokens — maar je Seed Vault beheert ze allemaal.' },
      { icon: '📱', title: 'SKR & BONK via Seed Vault', desc: 'SKR is het Seeker ecosystem token voor Guardian staking. BONK is Solana\'s bekendste meme token. Swap vanuit je Seed Vault wallet naar SKR of BONK.', action: 'Open Seed Vault → Swap → SOL naar SKR of BONK', tip: 'Jupiter biedt ook deze swap aan. Verbind je Seed Vault wallet in Jupiter voor hetzelfde resultaat.' },
    ],
  },
  4: {
    title: 'Staking Leren', icon: '💎', onchain: true,
    steps: [
      { icon: '💎', title: 'Wat is staking?', desc: 'Staking betekent je SOL uitlenen aan een validator om het Solana netwerk te beveiligen. In ruil verdien je ~7% APY — automatisch, elke epoch (~2.5 dagen). Dit kan direct vanuit je Seed Vault.' },
      { icon: '🏦', title: 'Stake via Seed Vault', desc: 'Open de Seed Vault wallet op je Seeker. Ga naar Staking, kies een validator met lage commissie (0-10%) en hoge uptime, en delegeer je SOL. Je blijft altijd eigenaar.', action: 'Open Seed Vault → Staking → Kies validator → Stake SOL', tip: 'Let op: kies geen validator met meer dan 10% van de totale stake — dat schaadt de decentralisatie van Solana.' },
    ],
  },
  5: {
    title: 'SKR Staking', icon: '🛡️', onchain: true,
    steps: [
      { icon: '🛡️', title: 'Guardian Nodes', desc: 'Guardian nodes zijn de ruggengraat van het Seeker netwerk. Door SKR te staken steun je een Guardian node. Dit doe je vanuit de Seeker app op je telefoon.' },
      { icon: '⚡', title: 'Stake SKR via Seeker App', desc: 'Open de Seeker app op je telefoon. Ga naar Guardian staking en stake je SKR tokens naar een node naar keuze. De Seed Vault bevestigt de transactie met je vingerafdruk.', action: 'Open Seeker App → Guardian → Stake SKR', tip: 'Je hebt SKR nodig voor deze stap. Heb je nog geen SKR? Doe eerst Quest 3.' },
    ],
  },
  6: {
    title: 'dApp Store Verkennen', icon: '🏪', onchain: false,
    steps: [
      { icon: '🏪', title: 'Solana dApp Store', desc: 'De Seeker heeft een eigen dApp Store — speciaal voor Solana apps. Geen Google Play fees, geen censuur. Alle apps werken direct met je Seed Vault wallet.' },
      { icon: '📲', title: 'Installeer aanbevolen apps', desc: 'Aanbevolen apps: Jupiter (swaps), Phantom (wallet), Magic Eden (NFTs), Drift (trading). Installeer er minimaal 3. Je kunt ze allemaal verbinden met je Seed Vault wallet.', action: 'Open dApp Store → Installeer 3 apps', tip: 'Bij elke app kun je "Connect Wallet" kiezen en je Seed Vault selecteren.' },
    ],
  },
  7: {
    title: 'Activity Tracker', icon: '🏃', onchain: false,
    steps: [
      { icon: '⭕', title: 'Dagelijkse Ringen', desc: 'De Seeker heeft bewegingsringen — vergelijkbaar met Apple Watch. Sluit ze dagelijks om je streak te behouden en XP te verdienen in het Seeker ecosysteem.' },
      { icon: '⬆️', title: 'Levels & XP', desc: 'Elke actie op je Seeker geeft XP: swappen, staken, quests voltooien, apps gebruiken. Hogere levels geven toegang tot exclusieve features en grotere beloningen.' },
    ],
  },
  8: {
    title: 'Dagelijkse Routine', icon: '📅', onchain: true,
    steps: [
      { icon: '📅', title: 'DCA Strategie', desc: 'Dollar Cost Averaging (DCA) betekent regelmatig een vast bedrag investeren — ongeacht de prijs. Dit vermindert het risico van slechte timing en bouwt langzaam vermogen op.' },
      { icon: '🔄', title: 'Stel een routine in', desc: 'Jupiter heeft een recurring swap feature waarmee je automatisch elke dag of week een bedrag kunt swappen. Verbind je Seed Vault wallet in Jupiter en stel de automatische swap in.', action: 'Open Jupiter → Verbind Seed Vault → Stel recurring swap in', tip: 'Begin klein — €1-5 per dag is al genoeg om de gewoonte op te bouwen.' },
    ],
  },
  9: {
    title: 'Veiligheid & Scams', icon: '🔒', onchain: false,
    steps: [
      { icon: '🎣', title: 'Phishing & Wallet Drainers', desc: 'Phishing = nep websites die je seed phrase willen stelen. Wallet drainers = malicious contracten die al je tokens stelen met één handtekening. Controleer altijd de URL voor je connecteert.' },
      { icon: '🛡️', title: 'Seed Vault beschermt je', desc: 'De Seed Vault toont altijd exact wat een transactie doet voor je tekent. Blowfish security is ingebouwd en waarschuwt bij verdachte contracten. Bij twijfel — niet tekenen, nooit.' },
      { icon: '✅', title: 'Gouden regels', desc: '1. Deel nooit je seed phrase. 2. Teken nooit wat je niet begrijpt. 3. Controleer altijd het wallet adres. 4. Gebruik je Seed Vault als primaire wallet — niet een hot wallet.' },
    ],
  },
  10: {
    title: 'Level Up Strategie', icon: '⬆️', onchain: false,
    steps: [
      { icon: '⬆️', title: 'Level 3 bereiken', desc: 'Level 3 vereist: dagelijkse activity ringen sluiten, minimaal 1 swap per week vanuit je Seed Vault, en actieve deelname in het Seeker netwerk.' },
      { icon: '🏆', title: 'Jouw weekplan', desc: 'Maandag: DCA swap via Seed Vault. Woensdag: activity ringen checken. Vrijdag: staking rewards bekijken. Zondag: nieuwe apps in de dApp Store verkennen. Consistentie = hogere levels.' },
    ],
  },
  11: {
    title: 'DePIN & Verdienen', icon: '🌿', onchain: false,
    steps: [
      { icon: '🌿', title: 'Wat is DePIN?', desc: 'DePIN = Decentralized Physical Infrastructure Networks. Je verdient crypto door met je telefoon fysieke netwerken te ondersteunen. De Seeker is hier perfect voor.' },
      { icon: '📡', title: 'Grass & Helium', desc: 'Grass betaalt je voor het delen van ongebruikte internetbandbreedte. Helium bouwt een gedecentraliseerd 5G netwerk. Installeer beide apps via de dApp Store en verbind je Seed Vault wallet voor uitbetalingen.' },
    ],
  },
  12: {
    title: 'DeFi Gevorderd', icon: '🏦', onchain: true,
    steps: [
      { icon: '🏦', title: 'Liquidity & Lending', desc: 'Gevorderde DeFi: je kunt liquiditeit verschaffen aan pools (bijv. SOL/USDC op Orca) en rente verdienen op je tokens via Kamino. Alles via je Seed Vault wallet.' },
      { icon: '⚠️', title: 'Verken en begrijp de risico\'s', desc: 'Impermanent loss, liquidatie risico en smart contract bugs zijn reëel. Open Kamino of Orca via de dApp Store, verbind je Seed Vault wallet, en verken de interface. Start klein als je echt meedoet.', action: 'Open Kamino of Orca → Verbind Seed Vault → Verken', tip: 'Begrijp altijd wat je doet voor je grote bedragen inzet.' },
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
            Voer deze actie uit met je Seed Vault wallet op de Seeker.
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
            <Text style={styles.nextBtnText}>Volgende →</Text>
          </TouchableOpacity>
        ) : quest.onchain ? (
          <TouchableOpacity style={[styles.nextBtn, styles.manualBtn]} onPress={onComplete}>
            <Text style={[styles.nextBtnText, { color: '#FF7800' }]}>👆 Ik heb dit gedaan</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextBtn} onPress={onComplete}>
            <Text style={styles.nextBtnText}>✅ Quest Voltooien</Text>
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