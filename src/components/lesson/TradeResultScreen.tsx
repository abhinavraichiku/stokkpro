import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Sparkles } from "lucide-react";
import { Lesson } from "@/lib/gameData";
import { UserProgress } from "@/lib/storage";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface TradeResultScreenProps {
  lesson: Lesson;
  progress: UserProgress;
  onContinue: () => void;
}

export const TradeResultScreen = ({ lesson, progress, onContinue }: TradeResultScreenProps) => {
  const [showProfit, setShowProfit] = useState(false);
  
  const shares = Math.floor(10000 / lesson.trade.buyPrice * 100) / 100;
  const profit = lesson.trade.profit;
  const newBalance = progress.balance;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProfit(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-primary/10 to-background">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-8 pt-4">
        <Trophy className="w-10 h-10 text-secondary" />
        <h1 className="text-2xl font-bold">YOUR TRADE</h1>
      </div>

      {/* Trade Details */}
      <div className="flex-1 space-y-6">
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Stock</span>
            <span className="font-bold">{lesson.trade.stock}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Buy Price</span>
            <span className="font-bold">₹{lesson.trade.buyPrice.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Shares</span>
            <span className="font-bold">{shares}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Sell Price</span>
            <span className="font-bold text-primary">₹{lesson.trade.sellPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Profit Display */}
        <div className={`bg-primary/10 border-2 border-primary rounded-xl p-6 text-center transition-all duration-500 ${showProfit ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="text-4xl font-bold text-primary">+₹{profit}</span>
          </div>
          <p className="text-muted-foreground">Profit on this trade!</p>
        </div>

        {/* New Balance */}
        <div className="bg-secondary/30 border-2 border-secondary rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-secondary-foreground" />
            <span className="text-sm text-muted-foreground">New Balance</span>
          </div>
          <span className="text-3xl font-bold">₹{newBalance.toLocaleString()}</span>
        </div>

        {/* XP Earned */}
        <div className="flex justify-center">
          <div className="bg-accent/30 px-6 py-3 rounded-full">
            <span className="font-bold text-accent-foreground">+150 XP earned today!</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-6 space-y-3">
        <Button 
          onClick={onContinue}
          size="lg"
          className="w-full h-14 text-lg font-bold"
        >
          {lesson.day < 7 ? `CONTINUE TO DAY ${lesson.day + 1} →` : "SEE YOUR STATS →"}
        </Button>
      </div>
    </div>
  );
};
