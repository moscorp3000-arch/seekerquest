import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useAuthorization } from '../components/providers/AuthorizationProvider';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { authorizeSession } = useAuthorization();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = useCallback(async () => {
    setConnecting(true);
    try {
      await transact(async wallet => {
        await authorizeSession(wallet);
      });
    } catch (e) {
      console.log('Connect error:', e);
    } finally {
      setConnecting(false);
    }
  }, [authorizeSession]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Background orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Text style={styles.logoEmoji}>⚡</Text>
        </View>
        <Text style={styles.appName}>SeekerQuest</Text>
        <Text style={styles.tagline}>Master your Seeker. Earn onchain.</Text>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {[
          { icon: '🗺️', text: '12 interactieve quests' },
          { icon: '💎', text: 'Verdien NFT badges' },
          { icon: '🔄', text: 'Leer swappen & staken' },
          { icon: '🛡️', text: 'Seed Vault beveiligd' },
        ].map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <Text style={styles.featureText}>{f.text}</Text>
          </View>
        ))}
      </View>

      {/* Connect button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.connectBtn, connecting && styles.connectBtnDisabled]}
          onPress={handleConnect}
          disabled={connecting}>
          {connecting ? (
            <ActivityIndicator color="#0a0a0a" />
          ) : (
            <>
              <Text style={styles.connectBtnIcon}>🔐</Text>
              <Text style={styles.connectBtnText}>Verbind Seed Vault</Text>
            </>
          )}
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          Je private key verlaat nooit je Seeker
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  orb1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 120, 0, 0.15)',
    top: -80,
    right: -80,
  },
  orb2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 80, 0, 0.1)',
    bottom: 100,
    left: -60,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 120, 0, 0.2)',
    borderWidth: 2,
    borderColor: '#FF7800',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 40,
  },
  appName: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 8,
  },
  featuresContainer: {
    width: '80%',
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  featureIcon: {
    fontSize: 22,
  },
  featureText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  bottomContainer: {
    width: '85%',
    alignItems: 'center',
    gap: 12,
  },
  connectBtn: {
    width: '100%',
    backgroundColor: '#FF7800',
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  connectBtnDisabled: {
    opacity: 0.6,
  },
  connectBtnIcon: {
    fontSize: 20,
  },
  connectBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0a0a0a',
    letterSpacing: 0.5,
  },
  disclaimer: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
  },
});