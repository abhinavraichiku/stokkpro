import { useState, useEffect } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { Dashboard } from "@/components/Dashboard";
import { StatsScreen } from "@/components/StatsScreen";
import { PracticeScreen } from "@/components/PracticeScreen";
import { TheoryScreen } from "@/components/lesson/TheoryScreen";
import { EnhancedQuizScreen } from "@/components/lesson/EnhancedQuizScreen";
import { ChallengeScreen } from "@/components/lesson/ChallengeScreen";
import { TradeResultScreen } from "@/components/lesson/TradeResultScreen";
import { 
  UserProgress, 
  loadProgress, 
  saveProgress, 
  getDefaultProgress 
} from "@/lib/storage";
import { lessons } from "@/lib/gameData";

type Screen = "welcome" | "dashboard" | "practice" | "stats" | "theory" | "quiz" | "challenge" | "result";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setProgress(saved);
      setScreen("dashboard");
    }
  }, []);

  const currentLesson = lessons.find(l => l.day === selectedDay) || lessons[0];

  const handleStart = (name: string) => {
    const newProgress = { ...getDefaultProgress(), name };
    setProgress(newProgress);
    saveProgress(newProgress);
    setScreen("dashboard");
  };

  const handleStartLesson = (day: number) => {
    setSelectedDay(day);
    setScreen("theory");
  };

  const handleTheoryComplete = () => {
    setScreen("quiz");
  };

  const handleQuizCorrect = () => {
    if (progress) {
      const updated = { ...progress, xp: progress.xp + 50 };
      setProgress(updated);
      saveProgress(updated);
    }
    setScreen("challenge");
  };

  const handleChallengeCorrect = () => {
    if (progress && currentLesson) {
      const updated = { 
        ...progress, 
        xp: progress.xp + 50,
        streak: progress.streak + 1
      };
      setProgress(updated);
      saveProgress(updated);
    }
    setScreen("result");
  };

  const handleTradeComplete = () => {
    if (progress && currentLesson) {
      const newAchievements = [...progress.achievements];
      
      // Badge achievements based on phase completion
      if (currentLesson.theory.unlock?.includes("BADGE")) {
        const badgeName = currentLesson.theory.unlock.replace("✅ BADGE: ", "").replace("✅ FINAL BADGE: ", "");
        if (!newAchievements.includes(badgeName)) {
          newAchievements.push(badgeName);
        }
      }

      // First profit achievement
      if (progress.trades.length === 0 && currentLesson.trade.profit > 0) {
        newAchievements.push("first_profit");
      }

      // Only add trade if it has actual profit (not practice trades)
      const isRealTrade = currentLesson.trade.profit !== 0;
      const newTrade = isRealTrade ? {
        day: currentLesson.day,
        stock: currentLesson.trade.stock,
        buyPrice: currentLesson.trade.buyPrice,
        sellPrice: currentLesson.trade.sellPrice,
        profit: currentLesson.trade.profit,
        date: new Date().toISOString()
      } : null;

      // Only advance currentDay if this was the current lesson
      const shouldAdvanceDay = selectedDay === progress.currentDay;

      const updated: UserProgress = {
        ...progress,
        currentDay: shouldAdvanceDay ? progress.currentDay + 1 : progress.currentDay,
        balance: progress.balance + currentLesson.trade.profit,
        xp: progress.xp + 50,
        trades: newTrade ? [...progress.trades, newTrade] : progress.trades,
        achievements: [...new Set(newAchievements)],
        lastPlayed: new Date().toISOString()
      };

      setProgress(updated);
      saveProgress(updated);
    }
    setScreen("dashboard");
  };

  if (!progress && screen === "welcome") {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (!progress) return null;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background">
      {screen === "dashboard" && (
        <Dashboard 
          progress={progress}
          onStartLesson={handleStartLesson}
          onViewStats={() => setScreen("stats")}
          onViewPractice={() => setScreen("practice")}
        />
      )}
      {screen === "practice" && (
        <PracticeScreen onBack={() => setScreen("dashboard")} />
      )}
      {screen === "stats" && (
        <StatsScreen 
          progress={progress}
          onBack={() => setScreen("dashboard")}
        />
      )}
      {screen === "theory" && currentLesson && (
        <TheoryScreen 
          lesson={currentLesson}
          onNext={handleTheoryComplete}
          onBack={() => setScreen("dashboard")}
        />
      )}
      {screen === "quiz" && currentLesson && (
        <EnhancedQuizScreen 
          lesson={currentLesson}
          currentDay={progress.currentDay}
          onCorrect={handleQuizCorrect}
          onBack={() => setScreen("dashboard")}
        />
      )}
      {screen === "challenge" && currentLesson && (
        <ChallengeScreen 
          lesson={currentLesson}
          onCorrect={handleChallengeCorrect}
          onBack={() => setScreen("dashboard")}
        />
      )}
      {screen === "result" && currentLesson && (
        <TradeResultScreen 
          lesson={currentLesson}
          progress={progress}
          onContinue={handleTradeComplete}
        />
      )}
    </div>
  );
};

export default Index;