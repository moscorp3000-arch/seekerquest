import { ConnectionProvider } from './src/components/providers/ConnectionProvider';
import React, { useState, useEffect } from 'react';
import { AuthorizationProvider, useAuthorization } from './src/components/providers/AuthorizationProvider';
import OnboardingScreen from './src/screens/OnboardingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import QuestDetailScreen from './src/screens/QuestDetailScreen';
import CompletionScreen from './src/screens/CompletionScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';
import TermsScreen from './src/screens/TermsScreen';
import LicensesScreen from './src/screens/LicensesScreen';
import {
  getCompletedQuests, completeQuest, isOnboardingDone,
  setOnboardingDone, resetAllProgress,
} from './src/progress';
import { recordOpen, resetStreak } from './util/streak';
import { Alert } from 'react-native';

const MAINNET_RPC = 'https://api.mainnet-beta.solana.com';
const TOTAL_QUESTS = 12;

type Screen = 'onboarding' | 'welcome' | 'home' | 'quest' | 'completion' | 'privacy' | 'terms' | 'licenses';

function AppContent() {
  const { selectedAccount } = useAuthorization();
  const [screen, setScreen] = useState<Screen | null>(null);
  const [activeQuestId, setActiveQuestId] = useState(1);
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);

  useEffect(() => {
    const init = async () => {
      const [onboardingDone, completed] = await Promise.all([
        isOnboardingDone(), getCompletedQuests(),
      ]);
      setCompletedQuests(completed);
      setScreen(onboardingDone ? 'home' : 'onboarding');
      recordOpen();
    };
    init();
  }, []);

  useEffect(() => {
    if (screen !== null && screen !== 'onboarding' && !selectedAccount) {
      setScreen('welcome');
    }
  }, [selectedAccount]);

  const handleOnboardingDone = async () => {
    await setOnboardingDone();
    setScreen('welcome');
  };

  const handleQuestComplete = async () => {
    await completeQuest(activeQuestId);
    const updated = await getCompletedQuests();
    setCompletedQuests(updated);
    // Als alle quests voltooid → CompletionScreen
    if (updated.length >= TOTAL_QUESTS) {
      setScreen('completion');
    } else {
      setScreen('home');
    }
  };

  const handleDevReset = () => {
    Alert.alert('🔧 Dev Reset', 'Reset alle voortgang en onboarding?', [
      { text: 'Annuleer', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: async () => {
        await resetAllProgress();
        await resetStreak();
        setCompletedQuests([]);
        setScreen('onboarding');
      }},
    ]);
  };

  if (screen === null) return null;
  if (screen === 'onboarding') return <OnboardingScreen onFinish={handleOnboardingDone} />;
  if (screen === 'privacy') return <PrivacyScreen onBack={() => setScreen('home')} />;
  if (screen === 'terms') return <TermsScreen onBack={() => setScreen('home')} />;
  if (screen === 'licenses') return <LicensesScreen onBack={() => setScreen('home')} />;
  if (!selectedAccount) return <WelcomeScreen />;
  if (screen === 'completion') return <CompletionScreen onBack={() => setScreen('home')} />;
  if (screen === 'quest') return (
    <QuestDetailScreen
      questId={activeQuestId}
      onComplete={handleQuestComplete}
      onBack={() => setScreen('home')}
    />
  );

  return (
    <HomeScreen
      onStartQuest={(questId) => { setActiveQuestId(questId); setScreen('quest'); }}
      completedQuests={completedQuests}
      onDevReset={handleDevReset}
      onPrivacy={() => setScreen('privacy')}
      onTerms={() => setScreen('terms')}
      onLicenses={() => setScreen('licenses')}
    />
  );
}

export default function App() {
  return (
    <ConnectionProvider config={{ commitment: 'confirmed' }} endpoint={MAINNET_RPC}>
      <AuthorizationProvider>
        <AppContent />
      </AuthorizationProvider>
    </ConnectionProvider>
  );
}