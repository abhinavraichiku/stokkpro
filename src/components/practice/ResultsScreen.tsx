'use client';

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, RefreshCw, Home, TrendingUp, Star, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsScreenProps {
  correct: number;
  total: number;
  onRestart: () => void;
  onHome: () => void;
}

export function ResultsScreen({ correct, total, onRestart, onHome }: ResultsScreenProps) {
  const percentage = Math.round((correct / total) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { label: 'Expert Trader!', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/20' };
    if (percentage >= 70) return { label: 'Great Job!', icon: Award, color: 'text-green-500', bg: 'bg-green-500/20' };
    if (percentage >= 50) return { label: 'Good Effort', icon: Star, color: 'text-blue-500', bg: 'bg-blue-500/20' };
    return { label: 'Keep Practicing', icon: Target, color: 'text-orange-500', bg: 'bg-orange-500/20' };
  };

  const grade = getGrade();
  const GradeIcon = grade.icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
      <div className={cn("w-24 h-24 rounded-full flex items-center justify-center mb-6", grade.bg)}>
        <GradeIcon className={cn("w-12 h-12", grade.color)} />
      </div>

      <h1 className="text-3xl font-bold mb-2">{grade.label}</h1>
      <p className="text-muted-foreground mb-8">Practice session complete</p>

      <div className="w-full max-w-xs space-y-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-5xl font-bold mb-2">{percentage}%</div>
          <Progress value={percentage} className="h-3 mb-4" />
          <div className="flex justify-between text-sm">
            <span className="text-green-500 font-medium">{correct} Correct</span>
            <span className="text-red-500 font-medium">{total - correct} Wrong</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">Questions</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{correct}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-3">
        <Button 
          size="lg" 
          className="w-full h-12 font-bold"
          onClick={onRestart}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Practice Again
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="w-full h-12"
          onClick={onHome}
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>

      {percentage >= 70 && (
        <div className="mt-8 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl max-w-xs">
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            🔥 You're on fire! Keep up the great work and master more patterns!
          </p>
        </div>
      )}

      {percentage < 50 && (
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl max-w-xs">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            💡 Tip: Review the explanations carefully. Each pattern has unique characteristics to identify.
          </p>
        </div>
      )}
    </div>
  );
}
