import {create} from 'zustand';

interface AiTips {
  aiTips: string;
  setAiTips: (tips: string) => void;
}

export const useAiTips = create<AiTips>((set) => ({
  aiTips: '',
  setAiTips: (tips) => set({ aiTips: tips }),
}));
