import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView,
} from 'react-native';

const QUEST_CONTENT: Record<number, {
  title: string;
  icon: string;
  color: string;
  onchain: boolean;
  steps: { icon: string; title: string; desc: string; action?: string }[];
}> = {
  1: {
    title: 'Welkom bij Seeker',
    icon: '👋',
    color: '#FF7800',
    onchain: false,
    steps: [
      { icon: '📱', title: 'Wat is de Seeker?', desc: 'De Seeker is de eerste telefoon gebouwd voor Solana. Met een ingebouwde Seed Vault — een hardware beveiligingschip — zijn je crypto keys nooit blootgesteld aan het internet.' },
      { icon: '🔐', title: 'Seed Vault', desc: 'De Seed Vault slaat je private keys op in een beveiligde enclave. Elke transactie vereist jouw biometrische goedkeuring. Niet jij = geen transactie.' },
      { icon: '🪙', title: 'Genesis Token', desc: 'Als vroege Seeker gebruiker heb je recht op het Genesis Token — een bewijs van jouw early adopter status op het Solana netwerk.' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je weet nu wat de Seeker uniek maakt. Klaar voor je eerste echte actie op Solana?' },
    ],
  },
  2: {
    title: 'Je Eerste Swap',
    icon: '🔄',
    color: '#FF7800',
    onchain: true,
    steps: [
      { icon: '🔄', title: 'Wat is een swap?', desc: 'Een swap is het wisselen van één token voor een andere. Op Solana gaat dit in minder dan 1 seconde voor minder dan $0.001.' },
      { icon: '🪐', title: 'Jupiter Aggregator', desc: 'Jupiter zoekt automatisch de beste prijs over alle DEXs op Solana. Jij krijgt altijd de beste deal zonder zelf te zoeken.' },
      { icon: '⚡', title: 'SOL → USDC', desc: 'Open Jupiter in de dApp Store op je Seeker. Swap een kleine hoeveelheid SOL naar USDC. Je Seed Vault vraagt om je vingerafdruk ter bevestiging.', action: 'Voer de swap uit in Jupiter' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je hebt je eerste on-chain swap gedaan! USDC staat nu in je wallet.' },
    ],
  },
  3: {
    title: 'Tokens Ontdekken',
    icon: '🪙',
    color: '#FF7800',
    onchain: true,
    steps: [
      { icon: '🪙', title: 'SPL Tokens', desc: 'Op Solana bestaan honderden tokens. Van stablecoins (USDC) tot meme tokens (BONK) tot ecosystem tokens (SKR).' },
      { icon: '📱', title: 'SKR Token', desc: 'SKR is het Seeker ecosystem token. Je gebruikt het voor Guardian node staking en toegang tot premium features op je Seeker.' },
      { icon: '🐕', title: 'BONK Token', desc: 'BONK is Solana\'s meest bekende meme token. Het wordt gebruikt als tip token in veel Solana apps en games.', action: 'Swap naar SKR of BONK via Jupiter' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je hebt nieuwe tokens ontdekt en begrijpt het Solana token ecosysteem.' },
    ],
  },
  4: {
    title: 'Staking Leren',
    icon: '💎',
    color: '#FF7800',
    onchain: true,
    steps: [
      { icon: '💎', title: 'Wat is staking?', desc: 'Staking betekent je SOL uitlenen aan een validator om het netwerk te beveiligen. In ruil verdien je ~7% APY — automatisch, elke 2-3 dagen.' },
      { icon: '⚖️', title: 'Kies een validator', desc: 'Let op lage commissie (0-10%) en hoge uptime (99%+). Vermijd validators met meer dan 10% van de totale stake — dat schaadt decentralisatie.' },
      { icon: '🏦', title: 'Stake je SOL', desc: 'Open de Staking sectie in je Seed Vault wallet. Kies een validator en delegeer je SOL. Je blijft eigenaar — je kunt altijd unstaken.', action: 'Stake SOL via Seed Vault' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je SOL werkt nu voor jou. Elke epoch (~2.5 dagen) ontvang je automatisch beloningen.' },
    ],
  },
  5: {
    title: 'SKR Staking',
    icon: '🛡️',
    color: '#FF7800',
    onchain: true,
    steps: [
      { icon: '🛡️', title: 'Guardian Nodes', desc: 'Guardian nodes zijn de ruggengraat van het Seeker netwerk. Door SKR te staken steun je een Guardian node en verdien je beloningen.' },
      { icon: '📊', title: 'SKR Rewards', desc: 'SKR stakers ontvangen een deel van de netwerk fees. Hoe meer SKR je staakt, hoe groter je aandeel in de beloningen.' },
      { icon: '⚡', title: 'Stake SKR', desc: 'Open de Seeker app en navigeer naar Guardian staking. Stake je SKR tokens naar een Guardian node naar keuze.', action: 'Stake SKR naar een Guardian node' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je bent nu een actieve deelnemer in het Seeker netwerk ecosysteem!' },
    ],
  },
  6: {
    title: 'dApp Store Verkennen',
    icon: '🏪',
    color: '#FF7800',
    onchain: false,
    steps: [
      { icon: '🏪', title: 'Solana dApp Store', desc: 'De Seeker heeft een eigen dApp Store — speciaal voor Solana apps. Geen Google Play fees, geen censuur, directe wallet integratie.' },
      { icon: '⭐', title: 'Aanbevolen Apps', desc: 'Jupiter (swaps), Phantom (wallet), Magic Eden (NFTs), Tensor (trading), Drift (perps) en meer. Allemaal gebouwd voor Solana Mobile.' },
      { icon: '📲', title: 'Installeer 3 apps', desc: 'Open de dApp Store op je Seeker en installeer minimaal 3 apps die jou interesseren. Verken wat er beschikbaar is.', action: 'Installeer 3 apps uit de dApp Store' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je kent nu het Solana dApp ecosysteem op de Seeker.' },
    ],
  },
  7: {
    title: 'Activity Tracker',
    icon: '🏃',
    color: '#FF7800',
    onchain: false,
    steps: [
      { icon: '🏃', title: 'Seeker Activity', desc: 'De Seeker heeft een ingebouwde activity tracker. Je ringen, levels en streaks laten zien hoe actief je bent in het Seeker ecosysteem.' },
      { icon: '⭕', title: 'Ringen', desc: 'Net als Apple Watch heeft de Seeker bewegingsringen. Sluit ze dagelijks om je streak te behouden en XP te verdienen.' },
      { icon: '⬆️', title: 'Levels & XP', desc: 'Elke actie — swap, stake, quest — geeft XP. Hogere levels geven toegang tot exclusieve features en grotere beloningen.' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je begrijpt nu het Seeker beloningssysteem. Houd je rings dagelijks bij!' },
    ],
  },
  8: {
    title: 'Dagelijkse Routine',
    icon: '📅',
    color: '#FF7800',
    onchain: true,
    steps: [
      { icon: '📅', title: 'DCA Strategie', desc: 'Dollar Cost Averaging (DCA) betekent elke dag een vast bedrag investeren. Dit vermindert het risico van slechte timing.' },
      { icon: '🔄', title: 'Dagelijkse Swap', desc: 'Stel een dagelijkse routine in: elke ochtend een kleine swap. Jupiter heeft een recurring swap feature speciaal hiervoor.' },
      { icon: '⚡', title: 'Stel je routine in', desc: 'Open Jupiter op je Seeker en stel een dagelijkse of wekelijkse automatische swap in. Begin klein — €1-5 per dag.', action: 'Stel een recurring swap in via Jupiter' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je hebt een duurzame crypto routine ingesteld. Consistentie wint van timing.' },
    ],
  },
  9: {
    title: 'Veiligheid & Scams',
    icon: '🔒',
    color: '#FF7800',
    onchain: false,
    steps: [
      { icon: '🎣', title: 'Phishing Aanvallen', desc: 'Phishing = nep websites of berichten die je seed phrase of wallet access willen stelen. Altijd URL\'s controleren voor je connecteert.' },
      { icon: '💸', title: 'Wallet Drainers', desc: 'Een wallet drainer is een malicious smart contract dat al je tokens steelt met één handtekening. Nooit tekenen wat je niet begrijpt.' },
      { icon: '🛡️', title: 'Seeker Bescherming', desc: 'De Seeker toont altijd wat een transactie doet voor je tekent. Blowfish security is ingebouwd. Bij twijfel — niet tekenen.' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je weet nu hoe je jezelf beschermt in Web3. Veiligheid eerst, altijd.' },
    ],
  },
  10: {
    title: 'Level Up Strategie',
    icon: '⬆️',
    color: '#FF7800',
    onchain: false,
    steps: [
      { icon: '⬆️', title: 'Level 3 bereiken', desc: 'Level 3 vereist: dagelijkse activity ringen sluiten, minimaal 1 swap per week, en deelname aan het Seeker netwerk.' },
      { icon: '💎', title: 'Level 4 & 5', desc: 'Hogere levels vereisen Guardian staking, meer on-chain activiteit en community deelname. De beloningen groeien exponentieel.' },
      { icon: '🏆', title: 'Jouw strategie', desc: 'Plan je week: maandag DCA swap, woensdag rings controleren, vrijdag staking rewards checken. Consistentie = hogere levels.' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je hebt een concrete strategie om hoger te levelen op de Seeker.' },
    ],
  },
  11: {
    title: 'DePIN & Verdienen',
    icon: '🌿',
    color: '#FF7800',
    onchain: false,
    steps: [
      { icon: '🌿', title: 'Wat is DePIN?', desc: 'DePIN = Decentralized Physical Infrastructure Networks. Je verdient crypto door fysieke netwerken te ondersteunen met je apparaat.' },
      { icon: '🌱', title: 'Grass Network', desc: 'Grass betaalt je voor het delen van je ongebruikte internet bandbreedte. Installeer de app op je Seeker en verdien passief.' },
      { icon: '📡', title: 'Helium & meer', desc: 'Helium bouwt een gedecentraliseerd 5G netwerk. Andere DePIN projecten belonen je voor WiFi, GPS data, en meer.' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je Seeker kan nu passief inkomen genereren via DePIN netwerken.' },
    ],
  },
  12: {
    title: 'DeFi Gevorderd',
    icon: '🏦',
    color: '#FF7800',
    onchain: true,
    steps: [
      { icon: '🏦', title: 'Liquidity Pools', desc: 'Door liquiditeit te verschaffen aan een pool (bijv. SOL/USDC op Orca) verdien je een deel van alle swap fees — 24/7.' },
      { icon: '💸', title: 'Lending op Kamino', desc: 'Deposit SOL of USDC in Kamino en verdien rente. Of leen tegen je crypto als onderpand zonder te verkopen.' },
      { icon: '⚠️', title: 'Risico\'s begrijpen', desc: 'Impermanent loss, liquidatie risico, en smart contract bugs zijn reëel. Start klein. Begrijp wat je doet voor je grote bedragen inzet.', action: 'Verken Kamino of Orca op de Seeker' },
      { icon: '✅', title: 'Quest voltooid!', desc: 'Je begrijpt geavanceerde DeFi. Je bent klaar voor het volledige Solana ecosysteem!' },
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
  const [current, setCurrent] = useState(1); // skip eerste intro stap
  const isLast = current === quest.steps.length - 1;
  const step = quest.steps[current];
  const progress = ((current + 1) / quest.steps.length) * 100;

  const handleBack = () => {
    if (current === 0) onBack();
    else setCurrent(c => c - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.stepCount}>{current + 1}/{quest.steps.length}</Text>
      </View>

      {/* Quest label */}
      <View style={styles.questLabel}>
        <Text style={styles.questLabelText}>{quest.icon} {quest.title}</Text>
        {quest.onchain && (
          <View style={styles.onchainBadge}>
            <Text style={styles.onchainText}>⛓️ onchain</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info card */}
        <View style={styles.infoCard}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>{step.icon}</Text>
          </View>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDesc}>{step.desc}</Text>

          {/* Action required */}
          {step.action && (
            <View style={styles.actionBox}>
              <Text style={styles.actionIcon}>👆</Text>
              <Text style={styles.actionText}>{step.action}</Text>
            </View>
          )}
        </View>

        {/* Dots */}
        <View style={styles.dotsRow}>
          {quest.steps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === current && { backgroundColor: '#FF7800', width: 20 },
                i < current && { backgroundColor: 'rgba(255,120,0,0.4)' },
              ]}
            />
          ))}
        </View>

        {/* Complete preview on last step */}
        {isLast && (
          <View style={styles.completePreview}>
            <Text style={styles.completePreviewIcon}>🎯</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.completePreviewTitle}>Quest voltooid!</Text>
              <Text style={styles.completePreviewDesc}>
                Volgende quest wordt ontgrendeld.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => {
            if (isLast) onComplete();
            else setCurrent(c => c + 1);
          }}>
          <Text style={styles.nextBtnText}>
            {isLast ? '✅ Quest Voltooien' : 'Volgende →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  topBar: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 20, paddingVertical: 14,
  },
  backBtn: { padding: 4 },
  backBtnText: { fontSize: 22, color: 'rgba(255,255,255,0.5)' },
  progressTrack: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999 },
  progressFill: { height: '100%', backgroundColor: '#FF7800', borderRadius: 999 },
  stepCount: { fontSize: 12, color: 'rgba(255,255,255,0.3)', minWidth: 30, textAlign: 'right' },
  questLabel: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, marginBottom: 20,
  },
  questLabelText: { fontSize: 14, fontWeight: '800', color: '#FF7800' },
  onchainBadge: { backgroundColor: 'rgba(255,120,0,0.2)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  onchainText: { fontSize: 10, color: '#FF7800', fontWeight: '600' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' },
  infoCard: {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24, padding: 28,
    borderWidth: 1, borderColor: 'rgba(255,120,0,0.15)',
    alignItems: 'center', gap: 16, minHeight: 300, justifyContent: 'center',
  },
  iconWrap: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,120,0,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  icon: { fontSize: 40 },
  stepTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF', textAlign: 'center' },
  stepDesc: { fontSize: 16, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 26 },
  actionBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,120,0,0.1)', borderRadius: 12,
    padding: 14, width: '100%',
    borderWidth: 1, borderColor: 'rgba(255,120,0,0.3)',
    marginTop: 8,
  },
  actionIcon: { fontSize: 20 },
  actionText: { fontSize: 14, color: '#FF7800', fontWeight: '600', flex: 1 },
  dotsRow: { flexDirection: 'row', gap: 6, marginTop: 24, marginBottom: 16, alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.15)' },
  completePreview: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    width: '100%', backgroundColor: 'rgba(255,120,0,0.08)',
    borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255,120,0,0.2)',
    marginTop: 8,
  },
  completePreviewIcon: { fontSize: 28 },
  completePreviewTitle: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  completePreviewDesc: { fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 },
  bottomBar: {
    paddingHorizontal: 20, paddingVertical: 16,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
  },
  nextBtn: { backgroundColor: '#FF7800', borderRadius: 16, paddingVertical: 18, alignItems: 'center' },
  nextBtnText: { fontSize: 17, fontWeight: '800', color: '#080808' },
});