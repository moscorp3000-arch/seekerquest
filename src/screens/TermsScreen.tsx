import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function TermsScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Terug</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gebruiksvoorwaarden</Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.lastUpdated}>Laatst bijgewerkt: maart 2026</Text>
          <Text style={styles.intro}>
            Door Seeker Quest te gebruiken ga je akkoord met deze voorwaarden. Lees ze zorgvuldig door.
          </Text>
          {[
            { title: '1. Acceptatie van voorwaarden', text: 'Door de app te downloaden of gebruiken ga je akkoord met deze gebruiksvoorwaarden. Gebruik de app niet als je hier niet mee akkoord gaat.' },
            { title: '2. Beschrijving van de dienst', text: 'Seeker Quest is een educatieve app voor het leren over Solana, DeFi, en het Seeker ecosysteem via interactieve quests en gamificatie.\n\nDe app is gratis. Optionele on-chain interacties kunnen minimale SOL voor transactiekosten vereisen.' },
            { title: '3. Alleen educatief', text: 'Alle content is uitsluitend voor educatieve doeleinden.\n\nNiets in deze app is:\n• Financieel advies\n• Beleggingsadvies\n• Handelsaanbevelingen\n• Juridisch advies\n\nCrypto-investeringen dragen aanzienlijk risico. Doe altijd eigen onderzoek.' },
            { title: '4. Blockchain transacties', text: 'Seeker Quest kan optionele on-chain transacties faciliteren. Hierbij:\n\n• Zijn blockchain transacties onomkeerbaar\n• Ben jij verantwoordelijk voor elke transactie die je autoriseert\n• Zijn transactiekosten niet restitueerbaar\n• Zijn wij niet verantwoordelijk voor verlies door gebruikersfouten\n\nAlle transacties vereisen jouw bevestiging via Seed Vault.' },
            { title: '5. Wallet veiligheid', text: 'Jij bent verantwoordelijk voor de beveiliging van je wallet.\n\n• Deel je seed phrase nooit met iemand\n• Wij vragen nooit om je seed phrase of private keys\n• Wij kunnen verloren wallets of fondsen niet herstellen\n• Controleer altijd transactiedetails voor je bevestigt' },
            { title: '6. Intellectueel eigendom', text: 'Alle content, design en code in Seeker Quest is eigendom van de ontwikkelaars, tenzij anders aangegeven. Je mag de app niet kopiëren, aanpassen of distribueren zonder toestemming.' },
            { title: '7. Beperking van aansprakelijkheid', text: 'Voor zover wettelijk toegestaan zijn wij niet aansprakelijk voor indirecte of gevolgschade door het gebruik van de app, inclusief verlies van fondsen of data.' },
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