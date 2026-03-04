import {
  ConnectionProvider,
} from './src/components/providers/ConnectionProvider';
import React, { useState, useEffect } from 'react';
import { AuthorizationProvider, useAuthorization } from './src/components/providers/AuthorizationProvider';
import OnboardingScreen from './src/screens/OnboardingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import QuestDetailScreen from './src/screens/QuestDetailScreen';
import {
  getCompletedQuests,
  completeQuest,
  isOnboardingDone,
  setOnboardingDone,
  resetAllProgress,
} from './src/progress';
import { Alert } from 'react-native';

// Devnet voor stabiliteit — verificatie via "Toch voltooien" knop
const MAINNET_RPC = 'https://api.devnet.solana.com';

type Screen = 'onboarding' | 'welcome' | 'home' | 'quest';

function AppContent() {
  const { selectedAccount } = useAuthorization();
  const [screen, setScreen] = useState<Screen | null>(null);
  const [activeQuestId, setActiveQuestId] = useState(1);
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);

  useEffect(() => {
    const init = async () => {
      const [onboardingDone, completed] = await Promise.all([
        isOnboardingDone(),
        getCompletedQuests(),
      ]);
      setCompletedQuests(completed);
      setScreen(onboardingDone ? 'home' : 'onboarding');
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
    setScreen('home');
  };

  const handleDevReset = () => {
    Alert.alert(
      '🔧 Dev Reset',
      'Reset alle voortgang en onboarding?',
      [
        { text: 'Annuleer', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetAllProgress();
            setCompletedQuests([]);
            setScreen('onboarding');
          },
        },
      ]
    );
  };

  if (screen === null) return null;
  if (screen === 'onboarding') return <OnboardingScreen onFinish={handleOnboardingDone} />;
  if (!selectedAccount) return <WelcomeScreen />;

  if (screen === 'quest') {
    return (
      <QuestDetailScreen
        questId={activeQuestId}
        onComplete={handleQuestComplete}
        onBack={() => setScreen('home')}
      />
    );
  }

  return (
    <HomeScreen
      onStartQuest={(questId) => {
        setActiveQuestId(questId);
        setScreen('quest');
      }}
      completedQuests={completedQuests}
      onDevReset={handleDevReset}
    />
  );
}

export default function App() {
  return (
    <ConnectionProvider
      config={{ commitment: 'confirmed' }}
      endpoint={MAINNET_RPC}>
      <AuthorizationProvider>
        <AppContent />
      </AuthorizationProvider>
    </ConnectionProvider>
  );
}