import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Target, Award, Zap, Share2, CheckCircle } from "lucide-react";
import { UserProgress, calculateStats } from "@/lib/storage";
import { lessons, phases } from "@/lib/gameData";

interface StatsScreenProps {
  progress: UserProgress;
  onBack: () => void;
}

// Helper to get last day of phase from "1-4" format
const getLastDayOfPhase = (daysStr: string): number => {
  const parts = daysStr.split('-');
  return parseInt(parts[parts.length - 1], 10);
};

export const StatsScreen = ({ progress, onBack }: StatsScreenProps) => {
  const stats = calculateStats(progress);
  const completedDays = progress.currentDay - 1;

  const handleShare = () => {
    const text = `I made ₹${stats.totalProfit.toLocaleString()} in ${completedDays} days on StockMaster! ${stats.accuracy}% accuracy. Join me and learn trading!`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  // Get earned badges
  const earnedBadges = phases.filter(phase => {
    const lastDayOfPhase = getLastDayOfPhase(phase.days);
    return completedDays >= lastDayOfPhase;
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Your Stats</h1>
      </div>

      <div className="flex-1 space-y-6">
        {/* Main Stats */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-md">
          <p className="text-primary-foreground/80 mb-1">Total Profit</p>
          <p className="text-4xl font-bold mb-1">+₹{stats.totalProfit.toLocaleString()}</p>
          <p className="text-lg text-primary-foreground/80">+{stats.profitPercentage}% returns</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">₹{progress.balance.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Current Balance</p>
          </div>
          <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
            <Target className="w-8 h-8 text-secondary-foreground mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.accuracy}%</p>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </div>
          <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
            <Zap className="w-8 h-8 text-accent-foreground mx-auto mb-2" />
            <p className="text-2xl font-bold">{progress.xp}</p>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </div>
          <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{completedDays}/45</p>
            <p className="text-sm text-muted-foreground">Days Completed</p>
          </div>
        </div>

        {/* Badges Earned */}
        {earnedBadges.length > 0 && (
          <div>
            <h3 className="font-bold mb-3">Badges Earned</h3>
            <div className="grid grid-cols-2 gap-3">
              {earnedBadges.map((phase) => (
                <div 
                  key={phase.id}
                  className="bg-secondary/30 border border-secondary rounded-xl p-3 text-center"
                >
                  <span className="text-2xl">{phase.icon}</span>
                  <p className="font-medium text-sm mt-1">{phase.badge}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trade History */}
        <div>
          <h3 className="font-bold mb-3">Trade History</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {progress.trades.slice().reverse().map((trade, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Day {trade.day}: {trade.stock}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{trade.buyPrice} → ₹{trade.sellPrice}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-primary">+₹{trade.profit}</span>
              </div>
            ))}
            {progress.trades.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Complete your first lesson to see trades here!
              </p>
            )}
          </div>
        </div>

        {/* Skills Unlocked */}
        {completedDays > 0 && (
          <div>
            <h3 className="font-bold mb-3">Skills Unlocked</h3>
            <div className="flex flex-wrap gap-2">
              {lessons.slice(0, completedDays).map((lesson) => (
                <span 
                  key={lesson.day}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  ✓ {lesson.theory.keyTerm}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Button */}
      <div className="pt-6">
        <Button 
          onClick={handleShare}
          variant="secondary"
          className="w-full h-12 font-bold"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Your Results
        </Button>
      </div>
    </div>
  );
};
