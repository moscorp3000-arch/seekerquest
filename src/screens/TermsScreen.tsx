import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function TermsScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.lastUpdated}>Last updated: March 2026</Text>
          <Text style={styles.intro}>
            By using Seeker Quest you agree to these terms. Please read them carefully.
          </Text>
          {[
            { title: '1. Acceptance of terms', text: 'By downloading or using the app you agree to these terms of use. Do not use the app if you do not agree.' },
            { title: '2. Description of service', text: 'Seeker Quest is an educational app for learning about Solana, DeFi, and the Seeker ecosystem through interactive quests and gamification.\n\nThe app is free. Upon completing all quests, a small wallet verification transaction is requested (± 0.000001 SOL).' },
            { title: '3. Wallet Verification & On-chain Record', text: 'Upon completing all quests you will be asked to perform a small verification transaction.\n\nPurpose of this transaction:\n• Proof that you have an active Solana wallet\n• Creates an on-chain record of your completion\n• Your wallet address is stored as a verified participant\n\nThis transaction is voluntary but required for on-chain registration. Your wallet address is publicly visible on the Solana blockchain.' },
            { title: '4. Educational only', text: 'All content is for educational purposes only.\n\nNothing in this app is:\n• Financial advice\n• Investment advice\n• Trading recommendations\n• Legal advice\n\nCrypto investments carry significant risk. Always do your own research.' },
            { title: '5. Blockchain transactions', text: 'Seeker Quest facilitates on-chain transactions. By doing so:\n\n• Blockchain transactions are irreversible\n• You are responsible for every transaction you authorize\n• Transaction fees are non-refundable\n• We are not responsible for loss due to user error\n\nAll transactions require your confirmation via Seed Vault.' },
            { title: '6. Wallet security', text: 'You are responsible for securing your wallet.\n\n• Never share your seed phrase with anyone\n• We will never ask for your seed phrase or private keys\n• We cannot recover lost wallets or funds\n• Always verify transaction details before confirming' },
            { title: '7. Intellectual property', text: 'All content, design and code in Seeker Quest is owned by the developers unless otherwise indicated. You may not copy, modify or distribute the app without permission.' },
            { title: '8. Limitation of liability', text: 'To the extent permitted by law, we are not liable for indirect or consequential damages from using the app, including loss of funds or data.' },
          ].map((s, i) => (
            <View key={i} style={styles.section}>
              <Text style={styles.sectionTitle}>{s.title}</Text>
              <Text style={styles.sectionText}>{s.text}</Text>
            </View>
          ))}
          <View style={styles.footer}>
            <Text style={styles.footerText}>⚡ Seeker Quest — Built for Solana Mobile</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,120,0,0.2)' },
  backBtn: { marginRight: 16 },
  backText: { color: '#FF7800', fontSize: 15, fontWeight: '600' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  scroll: { flex: 1 },
  content: { padding: 20 },
  lastUpdated: { color: 'rgba(255,255,255,0.3)', fontSize: 12, marginBottom: 12 },
  intro: { color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 22, marginBottom: 20 },
  section: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 18, marginBottom: 12 },
  sectionTitle: { color: '#FF7800', fontSize: 15, fontWeight: '800', marginBottom: 10 },
  sectionText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 22 },
  footer: { alignItems: 'center', paddingVertical: 32 },
  footerText: { color: 'rgba(255,255,255,0.2)', fontSize: 12 },
});