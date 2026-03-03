import {
  ConnectionProvider,
  RPC_ENDPOINT,
} from './src/components/providers/ConnectionProvider';
import { clusterApiUrl } from '@solana/web3.js';
import React from 'react';
import { AuthorizationProvider, useAuthorization } from './src/components/providers/AuthorizationProvider';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';

function AppContent() {
  const { selectedAccount } = useAuthorization();

  if (!selectedAccount) {
    return <WelcomeScreen />;
  }

  return <HomeScreen />;
}

export default function App() {
  return (
    <ConnectionProvider
      config={{ commitment: 'processed' }}
      endpoint={clusterApiUrl(RPC_ENDPOINT)}>
      <AuthorizationProvider>
        <AppContent />
      </AuthorizationProvider>
    </ConnectionProvider>
  );
}