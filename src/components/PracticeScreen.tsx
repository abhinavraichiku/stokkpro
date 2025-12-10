'use client';

import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Shuffle, ChevronRight, BarChart3, TrendingUp, Layers, Target, Gamepad2, Timer } from "lucide-react";
import { QuestionCard } from './practice/QuestionCard';
import { ResultsScreen } from './practice/ResultsScreen';
import { SwipeCardGame } from './practice/SwipeCardGame';
import { SpeedChallengeGame } from './practice/SpeedChallengeGame';
import { chartQuestions, ChartQuestion, getChartQuestionsByCategory, getChartQuestionsByDifficulty } from '@/lib/chartQuestions';
import { cn } from '@/lib/utils';

interface PracticeScreenProps {
  onBack: () => void;
}

type PracticeMode = 'menu' | 'category' | 'difficulty' | 'practice' | 'results';
type GameMode = 'swipe' | 'speed' | null;
type QuestionCount = 5 | 10 | 15 | 20;

type ChartCategory = 'Candlestick Patterns' | 'Chart Patterns' | 'Support & Resistance' | 'Trend Analysis';

const categoryIcons: Record<ChartCategory, typeof BarChart3> = {
  'Candlestick Patterns': BarChart3,
  'Chart Patterns': Layers,
  'Support & Resistance': Target,
  'Trend Analysis': TrendingUp,
};

const categoryDescriptions: Record<ChartCategory, string> = {
  'Candlestick Patterns': 'Hammer, Engulfing, Morning Star & more',
  'Chart Patterns': 'Head & Shoulders, Triangles, Flags',
  'Support & Resistance': 'Breakouts, Bounces, Key Levels',
  'Trend Analysis': 'Uptrend, Downtrend, Momentum',
};

export const PracticeScreen = ({ onBack }: PracticeScreenProps) => {
  const [mode, setMode] = useState<PracticeMode>('menu');
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [selectedCategory, setSelectedCategory] = useState<ChartCategory | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<ChartQuestion['difficulty'] | null>(null);
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);
  const [questions, setQuestions] = useState<ChartQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const allQuestions = useMemo(() => chartQuestions, []);

  const startPractice = (qs: ChartQuestion[]) => {
    const shuffled = [...qs].sort(() => Math.random() - 0.5).slice(0, questionCount);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setMode('practice');
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) setCorrectAnswers(prev => prev + 1);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setMode('results');
    }
  };

  const handleCategorySelect = (category: ChartCategory) => {
    setSelectedCategory(category);
    const qs = getChartQuestionsByCategory(category);
    startPractice(qs);
  };

  const handleDifficultySelect = (difficulty: ChartQuestion['difficulty']) => {
    setSelectedDifficulty(difficulty);
    const qs = getChartQuestionsByDifficulty(difficulty);
    startPractice(qs);
  };

  const handleRandomPractice = () => {
    startPractice(allQuestions);
  };

  const handleRestart = () => {
    if (selectedCategory) {
      const qs = getChartQuestionsByCategory(selectedCategory);
      startPractice(qs);
    } else if (selectedDifficulty) {
      const qs = getChartQuestionsByDifficulty(selectedDifficulty);
      startPractice(qs);
    } else {
      startPractice(allQuestions);
    }
  };

  const handleHome = () => {
    setMode('menu');
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setQuestions([]);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<ChartCategory, number> = {
      'Candlestick Patterns': 0,
      'Chart Patterns': 0,
      'Support & Resistance': 0,
      'Trend Analysis': 0,
    };
    const categories: ChartCategory[] = ['Candlestick Patterns', 'Chart Patterns', 'Support & Resistance', 'Trend Analysis'];
    categories.forEach(cat => {
      counts[cat] = getChartQuestionsByCategory(cat).length;
    });
    return counts;
  }, []);

  const difficultyCounts = useMemo(() => ({
    beginner: getChartQuestionsByDifficulty('beginner').length,
    intermediate: getChartQuestionsByDifficulty('intermediate').length,
    advanced: getChartQuestionsByDifficulty('advanced').length,
  }), []);

  if (mode === 'results') {
    return (
      <div className="min-h-screen bg-background">
        <ResultsScreen
          correct={correctAnswers}
          total={questions.length}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      </div>
    );
  }

  if (mode === 'practice' && questions.length > 0) {
    const currentQuestion = questions[currentIndex];
    const practiceQuestion = {
      id: currentQuestion.id,
      question: currentQuestion.description,
      title: currentQuestion.title,
      description: currentQuestion.description,
      chartType: currentQuestion.chartType,
      candleData: currentQuestion.candleData,
      lineData: currentQuestion.lineData,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      patternName: currentQuestion.patternName,
      category: currentQuestion.category,
      difficulty: currentQuestion.difficulty,
      options: [] as string[],
    };

    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <Button variant="ghost" size="icon" onClick={handleHome}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground font-medium">
            {correctAnswers}/{currentIndex} correct
          </span>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <QuestionCard
            key={currentQuestion.id}
            question={practiceQuestion}
            onAnswer={handleAnswer}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    );
  }

  if (mode === 'category') {
    const categories: ChartCategory[] = ['Candlestick Patterns', 'Chart Patterns', 'Support & Resistance', 'Trend Analysis'];
    
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="p-5 flex items-center gap-3 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => setMode('menu')}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Choose Category</h1>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-auto">
          {categories.map(category => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="w-full p-4 bg-card border border-border rounded-xl flex items-center gap-4 hover:border-primary/50 hover:bg-card/80 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{category}</h3>
                  <p className="text-xs text-muted-foreground">{categoryDescriptions[category]}</p>
                  <p className="text-xs text-muted-foreground mt-1">{categoryCounts[category]} questions</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (mode === 'difficulty') {
    const difficulties: { key: ChartQuestion['difficulty']; label: string; color: string; desc: string }[] = [
      { key: 'beginner', label: 'Beginner', color: 'bg-green-500', desc: 'Basic patterns & setups' },
      { key: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500', desc: 'Complex patterns & formations' },
      { key: 'advanced', label: 'Advanced', color: 'bg-red-500', desc: 'Expert-level analysis' },
    ];

    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="p-5 flex items-center gap-3 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => setMode('menu')}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Choose Difficulty</h1>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-auto">
          {difficulties.map(({ key, label, color, desc }) => (
            <button
              key={key}
              onClick={() => handleDifficultySelect(key)}
              className="w-full p-4 bg-card border border-border rounded-xl flex items-center gap-4 hover:border-primary/50 hover:bg-card/80 transition-all text-left"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", color + '/20')}>
                <div className={cn("w-4 h-4 rounded-full", color)} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{label}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <p className="text-xs text-muted-foreground mt-1">{difficultyCounts[key]} questions</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameMode === 'swipe') {
    return <SwipeCardGame onClose={() => setGameMode(null)} />;
  }

  if (gameMode === 'speed') {
    return <SpeedChallengeGame onClose={() => setGameMode(null)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-5 flex items-center gap-3 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold">Practice Mode</h1>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/30">
            <BarChart3 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Chart Pattern Practice</h2>
          <p className="text-muted-foreground text-sm">
            200 visual chart questions - BUY or SELL only
          </p>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Questions per session</label>
          <div className="grid grid-cols-4 gap-2">
            {([5, 10, 15, 20] as QuestionCount[]).map(count => (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={cn(
                  "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                  questionCount === count 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-card border border-border hover:border-primary/50"
                )}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleRandomPractice}
            className="w-full p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-xl flex items-center gap-4 hover:border-primary hover:from-primary/20 hover:to-secondary/20 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Shuffle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Random Mix</h3>
              <p className="text-sm text-muted-foreground">Practice all 200 chart patterns</p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>

          <button
            onClick={() => setMode('category')}
            className="w-full p-4 bg-card border border-border rounded-xl flex items-center gap-4 hover:border-primary/50 hover:bg-card/80 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Layers className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">By Category</h3>
              <p className="text-sm text-muted-foreground">Candlesticks, Chart Patterns, S/R, Trends</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setMode('difficulty')}
            className="w-full p-4 bg-card border border-border rounded-xl flex items-center gap-4 hover:border-primary/50 hover:bg-card/80 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">By Difficulty</h3>
              <p className="text-sm text-muted-foreground">Beginner, Intermediate, Advanced</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Mini Games</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setGameMode('swipe')}
              className="p-4 bg-gradient-to-br from-emerald-500/10 to-red-500/10 border border-emerald-500/30 rounded-xl hover:border-emerald-500/50 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500/20 to-red-500/20 flex items-center justify-center mb-3">
                <Gamepad2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-sm">Swipe Trading</h3>
              <p className="text-xs text-muted-foreground mt-1">Buy or Sell decisions</p>
            </button>

            <button
              onClick={() => setGameMode('speed')}
              className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl hover:border-orange-500/50 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center mb-3">
                <Timer className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="font-semibold text-sm">Speed Challenge</h3>
              <p className="text-xs text-muted-foreground mt-1">Beat the clock!</p>
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-card/50 border border-border rounded-xl">
          <h3 className="font-semibold mb-3 text-sm">Pattern Types</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Hammer, Engulfing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Morning/Evening Star</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-muted-foreground">Head & Shoulders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-muted-foreground">Double Top/Bottom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Triangles, Wedges</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Flags, Cup & Handle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};