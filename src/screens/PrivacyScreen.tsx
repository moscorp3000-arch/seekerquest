import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function PrivacyScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Terug</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.lastUpdated}>Laatst bijgewerkt: maart 2026</Text>
          <Text style={styles.intro}>
            Seeker Quest is toegewijd aan het beschermen van je privacy. Dit beleid legt uit hoe we omgaan met informatie wanneer je onze app gebruikt.
          </Text>
          {[
            { title: '1. Gegevens die we verzamelen', text: 'We verzamelen geen persoonlijke gegevens.\n\nSeeker Quest is een volledig lokale app. Alle voortgangsdata wordt opgeslagen op je apparaat via AsyncStorage en wordt nooit naar een server verstuurd.\n\nWe verzamelen niet:\n• Je naam, e-mailadres of contactgegevens\n• Locatiedata\n• Apparaat-ID\'s of advertentie-ID\'s\n• Gebruiksanalytics of gedragsdata' },
            { title: '2. Blockchain & Wallet Data', text: 'Wanneer je je Solana wallet verbindt via de Seed Vault, lezen we alleen je publieke wallet adres. We hebben nooit toegang tot je private keys of seed phrase.\n\nAlle blockchain transacties worden door jou geïnitieerd en uitsluitend ondertekend in je Seed Vault.' },
            { title: '3. Lokale opslag', text: 'De volgende data wordt alleen lokaal opgeslagen:\n\n• Leervoortgang (voltooide quests)\n• Streak teller\n\nDeze data verlaat je apparaat nooit en kan altijd worden verwijderd door de app te verwijderen.' },
            { title: '4. Diensten van derden', text: 'Seeker Quest werkt samen met:\n\n• Solana Blockchain — publiek blockchain netwerk\n• Solana Mobile Wallet Adapter — voor wallet verbinding\n\nDeze diensten hebben hun eigen privacybeleid. Blockchain transacties zijn publiek en permanent.' },
            { title: '5. Contact', text: 'Vragen over dit privacybeleid? Neem contact op via de Solana Mobile dApp Store listing of onze officiële kanalen.' },
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