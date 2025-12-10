// localStorage management for StockMaster

export interface Trade {
  day: number;
  stock: string;
  buyPrice: number;
  sellPrice: number;
  profit: number;
  date: string;
}

export interface UserProgress {
  name: string;
  currentDay: number;
  balance: number;
  xp: number;
  trades: Trade[];
  achievements: string[];
  streak: number;
  lastPlayed: string;
}

const STORAGE_KEY = "stockmaster_progress";

export const getDefaultProgress = (): UserProgress => ({
  name: "",
  currentDay: 1,
  balance: 10000,
  xp: 0,
  trades: [],
  achievements: [],
  streak: 0,
  lastPlayed: new Date().toISOString()
});

export const saveProgress = (progress: UserProgress): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const loadProgress = (): UserProgress | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const resetProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const calculateStats = (progress: UserProgress) => {
  const totalProfit = progress.trades.reduce((sum, t) => sum + t.profit, 0);
  const accuracy = progress.trades.length > 0 
    ? Math.round((progress.trades.filter(t => t.profit > 0).length / progress.trades.length) * 100)
    : 0;
  const profitPercentage = ((progress.balance - 10000) / 10000 * 100).toFixed(2);
  
  return {
    totalProfit,
    accuracy,
    profitPercentage,
    tradesCount: progress.trades.length
  };
};
