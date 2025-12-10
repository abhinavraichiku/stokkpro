import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle, XCircle, Brain, ArrowLeft, TrendingUp, TrendingDown, PieChart, BarChart3, Sparkles } from "lucide-react";
import { Lesson, lessons } from "@/lib/gameData";
import { cn } from "@/lib/utils";
import { playCorrectSound, playWrongSound, resumeAudioContext } from "@/lib/sounds";
import { getQuizzesForLesson, VisualQuiz, generateDefaultQuizzes } from "@/lib/lessonQuizzes";

interface EnhancedQuizScreenProps {
  lesson: Lesson;
  currentDay: number;
  onCorrect: () => void;
  onBack: () => void;
}

const PieChartVisual = ({ segments }: { segments: { label: string; value: number; color: string }[] }) => {
  const total = segments.reduce((acc, s) => acc + s.value, 0);
  let currentAngle = 0;

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-card/50 rounded-xl border border-border animate-fade-in">
      <svg viewBox="0 0 100 100" className="w-40 h-40">
        {segments.map((segment, i) => {
          const angle = (segment.value / total) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;
          
          const startRad = (startAngle - 90) * (Math.PI / 180);
          const endRad = (currentAngle - 90) * (Math.PI / 180);
          
          const x1 = 50 + 40 * Math.cos(startRad);
          const y1 = 50 + 40 * Math.sin(startRad);
          const x2 = 50 + 40 * Math.cos(endRad);
          const y2 = 50 + 40 * Math.sin(endRad);
          
          const largeArc = angle > 180 ? 1 : 0;
          
          return (
            <path
              key={i}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={segment.color}
              className="transition-all duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          );
        })}
        <circle cx="50" cy="50" r="20" fill="var(--background)" />
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        {segments.map((segment, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
            <span>{segment.label}: {segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BarChartVisual = ({ bars }: { bars: { label: string; value: number }[] }) => {
  const maxValue = Math.max(...bars.map(b => Math.abs(b.value)));
  
  return (
    <div className="p-4 bg-card/50 rounded-xl border border-border animate-fade-in">
      <div className="flex items-end justify-around gap-2 h-40">
        {bars.map((bar, i) => {
          const height = (Math.abs(bar.value) / maxValue) * 100;
          const isPositive = bar.value >= 0;
          
          return (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full flex flex-col items-center justify-end h-32">
                <span className="text-xs font-bold mb-1">{bar.value > 0 ? '+' : ''}{bar.value}</span>
                <div 
                  className={cn(
                    "w-full max-w-[40px] rounded-t-lg transition-all duration-700",
                    isPositive ? "bg-green-500" : "bg-red-500"
                  )}
                  style={{ 
                    height: `${height}%`,
                    animationDelay: `${i * 100}ms`
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ComparisonVisual = ({ items }: { items: { label: string; value: number }[] }) => {
  const maxValue = Math.max(...items.map(i => i.value));
  
  return (
    <div className="space-y-3 p-4 bg-card/50 rounded-xl border border-border animate-fade-in">
      {items.map((item, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{item.label}</span>
            <span className="text-primary font-bold">{item.value}</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
              style={{ 
                width: `${(item.value / maxValue) * 100}%`,
                animationDelay: `${i * 200}ms`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const ChartVisual = ({ points }: { points: number[] }) => {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  
  const pathPoints = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 100 - ((p - min) / range) * 80 - 10;
    return `${x},${y}`;
  });
  
  return (
    <div className="p-4 bg-card/50 rounded-xl border border-border animate-fade-in">
      <svg viewBox="0 0 100 100" className="w-full h-32">
        <polyline
          points={pathPoints.join(' ')}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        {points.map((p, i) => {
          const x = (i / (points.length - 1)) * 100;
          const y = 100 - ((p - min) / range) * 80 - 10;
          return (
            <circle key={i} cx={x} cy={y} r="3" fill="#10B981" />
          );
        })}
      </svg>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        {points.map((p, i) => (
          <span key={i}>₹{p}</span>
        ))}
      </div>
    </div>
  );
};

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">Easy</span>;
    case 'medium':
      return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">Medium</span>;
    case 'tricky':
      return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">Tricky</span>;
    default:
      return null;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'pie':
      return <PieChart className="w-4 h-4" />;
    case 'bar':
      return <BarChart3 className="w-4 h-4" />;
    case 'comparison':
      return <TrendingUp className="w-4 h-4" />;
    case 'tricky':
      return <Sparkles className="w-4 h-4" />;
    default:
      return <HelpCircle className="w-4 h-4" />;
  }
};

export const EnhancedQuizScreen = ({ lesson, currentDay, onCorrect, onBack }: EnhancedQuizScreenProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const quizQuestions = useMemo(() => {
    let questions = getQuizzesForLesson(lesson.day);
    
    if (questions.length === 0) {
      questions = generateDefaultQuizzes(lesson);
    }
    
    // Add some review questions from previous days
    const previousDays = [1, 2, 3, 4, 5, 11, 19, 39].filter(d => d < lesson.day);
    previousDays.forEach(day => {
      const prevQuizzes = getQuizzesForLesson(day);
      if (prevQuizzes.length > 0) {
        const randomQuiz = prevQuizzes[Math.floor(Math.random() * prevQuizzes.length)];
        questions.push({ ...randomQuiz, id: `review-${day}-${randomQuiz.id}` });
      }
    });
    
    // Shuffle and limit to 10-12 questions
    return questions.sort(() => Math.random() - 0.5).slice(0, Math.min(12, questions.length));
  }, [lesson.day]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selected === currentQuestion?.correctIndex;
  const isLastQuestion = currentQuestionIndex >= quizQuestions.length - 1;

  const handleSelect = (index: number) => {
    if (showResult) return;
    resumeAudioContext();
    setSelected(index);
    setShowResult(true);
    
    if (index === currentQuestion.correctIndex) {
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      playCorrectSound();
    } else {
      setStreak(0);
      playWrongSound();
    }
  };

  const handleContinue = () => {
    if (!isCorrect) {
      setSelected(null);
      setShowResult(false);
      return;
    }

    if (isLastQuestion) {
      onCorrect();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const renderVisual = () => {
    if (!currentQuestion?.visual) return null;
    
    const { type, data } = currentQuestion.visual;
    
    switch (type) {
      case 'pie':
        return <PieChartVisual segments={data.segments} />;
      case 'bar':
        return <BarChartVisual bars={data.bars} />;
      case 'comparison':
        return <ComparisonVisual items={data.items} />;
      case 'chart':
        return <ChartVisual points={data.points} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-secondary/20 to-background">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shrink-0">
            {getTypeIcon(currentQuestion?.type || 'text')}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground truncate">Day {lesson.day} Quiz</p>
            <h1 className="text-lg font-bold truncate">{lesson.theory.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5 shrink-0">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">
            {currentQuestionIndex + 1}/{quizQuestions.length}
          </span>
        </div>
      </div>

      {/* Streak indicator */}
      {streak >= 2 && (
        <div className="flex items-center justify-center gap-2 mb-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-bold text-yellow-400">{streak} Streak!</span>
        </div>
      )}

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mb-4">
        {quizQuestions.map((_, idx) => (
          <div 
            key={idx}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              idx < currentQuestionIndex ? "bg-primary" :
              idx === currentQuestionIndex ? "bg-primary scale-150" :
              "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Question type and difficulty */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {getDifficultyBadge(currentQuestion?.difficulty || 'easy')}
        {currentQuestion?.type === 'tricky' && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Tricky
          </span>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* Visual component */}
        {renderVisual()}

        {/* Question */}
        <div className="bg-card border-2 border-border rounded-xl p-5 shadow-sm">
          <p className="text-lg font-medium leading-relaxed">{currentQuestion?.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion?.options.map((option, index) => {
            const isThisCorrect = index === currentQuestion.correctIndex;
            const isSelected = selected === index;
            
            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 text-left rounded-xl border-2 transition-all",
                  "flex items-center justify-between gap-3",
                  !showResult && "hover:border-primary hover:bg-primary/5 active:scale-[0.98]",
                  showResult && isThisCorrect && "border-green-500 bg-green-500/10",
                  showResult && isSelected && !isThisCorrect && "border-red-500 bg-red-500/10",
                  !showResult && "border-border bg-card"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2",
                    showResult && isThisCorrect && "border-green-500 bg-green-500 text-white",
                    showResult && isSelected && !isThisCorrect && "border-red-500 bg-red-500 text-white",
                    !showResult && "border-muted-foreground/30"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
                {showResult && isThisCorrect && (
                  <CheckCircle className="w-6 h-6 text-green-500 animate-scale-in" />
                )}
                {showResult && isSelected && !isThisCorrect && (
                  <XCircle className="w-6 h-6 text-red-500 animate-scale-in" />
                )}
              </button>
            );
          })}
        </div>

        {/* Result */}
        {showResult && (
          <div className={cn(
            "p-4 rounded-xl border-2 animate-fade-in",
            isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"
          )}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-green-500">
                    Correct! +{streak > 1 ? 50 + (streak * 10) : 50} XP
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="font-bold text-red-500">Not quite! Try again.</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{currentQuestion?.explanation}</p>
          </div>
        )}
      </div>

      {/* Continue button */}
      {showResult && (
        <div className="pt-4">
          <Button 
            onClick={handleContinue}
            size="lg"
            className={cn(
              "w-full h-14 text-lg font-bold",
              isCorrect ? "bg-primary" : "bg-secondary"
            )}
          >
            {isCorrect 
              ? (isLastQuestion ? "COMPLETE QUIZ →" : "NEXT QUESTION →")
              : "TRY AGAIN"
            }
          </Button>
        </div>
      )}

      {/* Progress stats */}
      <div className="flex justify-center gap-6 pt-4 text-sm text-muted-foreground">
        <span>Correct: <strong className="text-green-500">{correctCount}</strong></span>
        <span>Remaining: <strong>{quizQuestions.length - currentQuestionIndex - 1}</strong></span>
      </div>
    </div>
  );
};
