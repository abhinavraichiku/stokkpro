import { Button } from "@/components/ui/button";
import { TrendingUp, Zap, Play, BarChart3, Lock, CheckCircle2, ChevronRight, BookOpen, Target, Trophy, Flame, Brain, TrendingDown } from "lucide-react";
import { UserProgress, calculateStats } from "@/lib/storage";
import { lessons, phases, getPhaseForDay, getDaysInPhase } from "@/lib/gameData";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DashboardProps {
  progress: UserProgress;
  onStartLesson: (day: number) => void;
  onViewStats: () => void;
  onViewPractice: () => void;
}

const getTopicStrengths = (currentDay: number) => {
  const topics = [
    { name: "Basics", days: [1, 2, 3, 4, 5], icon: "📚" },
    { name: "Charts", days: [6, 7, 8, 9, 10], icon: "📊" },
    { name: "Patterns", days: [11, 12, 13, 14, 15], icon: "🔮" },
    { name: "Support/Resistance", days: [16, 17, 18, 19, 20], icon: "🎯" },
    { name: "Candlesticks", days: [21, 22, 23, 24, 25], icon: "🕯️" },
    { name: "Indicators", days: [26, 27, 28, 29, 30], icon: "📈" },
  ];

  const completed = topics.filter(t => t.days.every(d => d < currentDay));
  const inProgress = topics.find(t => t.days.some(d => d >= currentDay) && t.days.some(d => d < currentDay));
  const upcoming = topics.filter(t => t.days.every(d => d >= currentDay));

  return { completed, inProgress, upcoming };
};

export const Dashboard = ({ progress, onStartLesson, onViewStats, onViewPractice }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const stats = calculateStats(progress);
  const currentPhase = getPhaseForDay(progress.currentDay);
  const completedDays = progress.currentDay - 1;
  const totalDays = 45;
  const { completed: strongTopics, inProgress: currentTopic, upcoming: focusTopics } = getTopicStrengths(progress.currentDay);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold">{progress.name || "Trader"}</h1>
          </div>
          <div className="flex items-center gap-2 bg-accent/30 px-4 py-2 rounded-full">
            <Zap className="w-5 h-5 text-accent-foreground" />
            <span className="font-bold">{progress.xp} XP</span>
          </div>
        </div>

        {/* Analytics Card - Replaces Balance Card */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-6 mb-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5" />
            <p className="text-primary-foreground/90 font-medium">Your Learning Analytics</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.accuracy}%</p>
              <p className="text-primary-foreground/70 text-xs mt-1">Accuracy</p>
            </div>
            <div className="text-center border-x border-primary-foreground/20">
              <p className="text-3xl font-bold">{completedDays}</p>
              <p className="text-primary-foreground/70 text-xs mt-1">Lessons Done</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{progress.streak}</p>
              <p className="text-primary-foreground/70 text-xs mt-1">Day Streak</p>
            </div>
          </div>

          {/* Strong Topics */}
          {strongTopics.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <p className="text-sm text-primary-foreground/80">Strong in</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {strongTopics.slice(0, 3).map(topic => (
                  <span key={topic.name} className="bg-green-500/30 text-green-100 px-3 py-1 rounded-full text-xs font-medium">
                    {topic.icon} {topic.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Focus Topics */}
          {(currentTopic || focusTopics.length > 0) && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-yellow-300" />
                <p className="text-sm text-primary-foreground/80">Focus on</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentTopic && (
                  <span className="bg-yellow-500/30 text-yellow-100 px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                    {currentTopic.icon} {currentTopic.name} (In Progress)
                  </span>
                )}
                {focusTopics.slice(0, 2).map(topic => (
                  <span key={topic.name} className="bg-white/10 text-primary-foreground/70 px-3 py-1 rounded-full text-xs font-medium">
                    {topic.icon} {topic.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats Row - Replaces 45-Day Progress */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold">{progress.achievements.length}</p>
            <p className="text-xs text-muted-foreground">Badges</p>
          </div>
          <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">{progress.streak}</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
          <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold">{Math.round(completedDays / totalDays * 100)}%</p>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('learn')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all",
              activeTab === 'learn' 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}
          >
            <BookOpen className="w-5 h-5" />
            Learn
          </button>
          <button
            onClick={() => {
              setActiveTab('practice');
              onViewPractice();
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all",
              activeTab === 'practice' 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}
          >
            <Target className="w-5 h-5" />
            Practice
          </button>
        </div>
      </div>

      {/* Phase Navigator - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <h2 className="font-bold mb-4 text-sm text-muted-foreground uppercase tracking-wide">Roadmap</h2>
        
        <div className="space-y-4">
          {phases.map((phase) => {
            const phaseDays = getDaysInPhase(phase.id);
            const completedInPhase = phaseDays.filter(d => d < progress.currentDay).length;
            const isCurrentPhase = phase.id === currentPhase.id;
            const isCompleted = completedInPhase === phaseDays.length;
            const isLocked = phaseDays[0] > progress.currentDay;

            return (
              <div 
                key={phase.id}
                className={`border-2 rounded-xl overflow-hidden transition-all ${
                  isCurrentPhase ? 'border-primary bg-primary/5' : 
                  isCompleted ? 'border-primary/50 bg-primary/5' :
                  'border-border bg-card'
                }`}
              >
                {/* Phase Header */}
                <div className="p-4 flex items-center gap-4">
                  <div className={`text-3xl ${isLocked ? 'opacity-40' : ''}`}>{phase.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold truncate ${isLocked ? 'text-muted-foreground' : ''}`}>
                        {phase.name}
                      </h3>
                      {isCompleted && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{phase.tagline} • Days {phase.days}</p>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {completedInPhase}/{phaseDays.length}
                  </div>
                </div>

                {/* Phase Days - Show for current and completed phases */}
                {(isCurrentPhase || isCompleted) && (
                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-4 gap-3">
                      {phaseDays.map((day) => {
                        const lesson = lessons.find(l => l.day === day);
                        const isDayCompleted = day < progress.currentDay;
                        const isCurrent = day === progress.currentDay;
                        const isDayLocked = day > progress.currentDay;

                        return (
                          <button
                            key={day}
                            onClick={() => !isDayLocked && onStartLesson(day)}
                            disabled={isDayLocked}
                            className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 transition-all ${
                              isDayCompleted ? 'bg-primary text-primary-foreground' :
                              isCurrent ? 'bg-secondary text-secondary-foreground border-2 border-secondary-foreground animate-pulse' :
                              'bg-muted text-muted-foreground'
                            }`}
                          >
                            {isDayLocked ? (
                              <Lock className="w-5 h-5" />
                            ) : isDayCompleted ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <span className="text-xl">{lesson?.emoji}</span>
                            )}
                            <span className="text-xs font-bold mt-1">D{day}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Locked Phase Message */}
                {isLocked && (
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                      <Lock className="w-4 h-4" />
                      <span>Complete previous phases to unlock</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Current Day CTA */}
        {progress.currentDay <= totalDays && activeTab === 'learn' && (
          <div className="mt-6 bg-secondary/30 border-2 border-secondary rounded-2xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">
                {lessons.find(l => l.day === progress.currentDay)?.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Next up</p>
                <h3 className="font-bold text-lg">
                  Day {progress.currentDay}: {lessons.find(l => l.day === progress.currentDay)?.title}
                </h3>
              </div>
            </div>
            <Button 
              onClick={() => onStartLesson(progress.currentDay)} 
              className="w-full h-14 font-bold text-lg"
            >
              <Play className="w-6 h-6 mr-2" />
              START DAY {progress.currentDay}
            </Button>
          </div>
        )}

        {/* Completion Message */}
        {progress.currentDay > totalDays && (
          <div className="mt-6 bg-primary/10 border-2 border-primary rounded-2xl p-6 text-center">
            <div className="text-5xl mb-3">🏆</div>
            <h2 className="text-2xl font-bold mb-3">Journey Complete!</h2>
            <p className="text-muted-foreground">
              You've mastered the 60-day trading roadmap. You're now in the top 10% of traders!
            </p>
          </div>
        )}

        {/* Recent Trades */}
        {progress.trades.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">Recent Trades</h3>
              <button onClick={onViewStats} className="text-sm text-primary font-medium flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {progress.trades.slice(-3).reverse().map((trade, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{trade.stock}</p>
                      <p className="text-sm text-muted-foreground">Day {trade.day}</p>
                    </div>
                  </div>
                  <span className="font-bold text-primary">+₹{trade.profit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Button */}
        <Button 
          variant="secondary" 
          onClick={onViewStats}
          className="w-full h-14 font-bold text-lg mt-6"
        >
          <BarChart3 className="w-6 h-6 mr-2" />
          View Full Stats
        </Button>
      </div>
    </div>
  );
};