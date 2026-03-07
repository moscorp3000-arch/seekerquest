import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function PrivacyScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.lastUpdated}>Last updated: March 2026</Text>
          <Text style={styles.intro}>
            Seeker Quest is committed to protecting your privacy. This policy explains how we handle information when you use our app.
          </Text>
          {[
            { title: '1. Data we collect', text: 'We collect no personal data.\n\nSeeker Quest is a fully local app. All progress data is stored on your device via AsyncStorage and is never sent to a server.\n\nWe do not collect:\n• Your name, email address or contact details\n• Location data\n• Device IDs or advertising IDs\n• Usage analytics or behavioral data' },
            { title: '2. Blockchain & Wallet Data', text: 'When you connect your Solana wallet via the Seed Vault, we only read your public wallet address. We never have access to your private keys or seed phrase.\n\nAll blockchain transactions are initiated by you and signed exclusively in your Seed Vault.' },
            { title: '3. Local storage', text: 'The following data is stored locally only:\n\n• Learning progress (completed quests)\n• Streak counter\n\nThis data never leaves your device and can always be deleted by uninstalling the app.' },
            { title: '4. Third-party services', text: 'Seeker Quest works with:\n\n• Solana Blockchain — public blockchain network\n• Solana Mobile Wallet Adapter — for wallet connection\n\nThese services have their own privacy policies. Blockchain transactions are public and permanent.' },
            { title: '5. Contact', text: 'Questions about this privacy policy? Reach out via the Solana Mobile dApp Store listing or our official channels.' },
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