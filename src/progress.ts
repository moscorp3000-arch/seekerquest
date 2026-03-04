import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_KEY = 'seekerquest_completed';
const ONBOARDING_KEY = 'seekerquest_onboarding_done';

export const getCompletedQuests = async (): Promise<number[]> => {
  try {
    const val = await AsyncStorage.getItem(COMPLETED_KEY);
    return val ? JSON.parse(val) : [];
  } catch { return []; }
};

export const completeQuest = async (questId: number): Promise<void> => {
  try {
    const completed = await getCompletedQuests();
    if (!completed.includes(questId)) {
      completed.push(questId);
      await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
    }
  } catch {}
};

export const isQuestUnlocked = (questId: number, completed: number[]): boolean => {
  if (questId === 1) return true;
  return completed.includes(questId - 1);
};

export const isOnboardingDone = async (): Promise<boolean> => {
  try {
    const val = await AsyncStorage.getItem(ONBOARDING_KEY);
    return val === 'true';
  } catch { return false; }
};

export const setOnboardingDone = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch {}
};

export const resetAllProgress = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([COMPLETED_KEY, ONBOARDING_KEY]);
  } catch {}
};