import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle, XCircle, Brain, Shuffle, ArrowLeft } from "lucide-react";
import { Lesson, lessons } from "@/lib/gameData";
import { cn } from "@/lib/utils";
import { playCorrectSound, playWrongSound, resumeAudioContext } from "@/lib/sounds";

interface SmartQuizScreenProps {
  lesson: Lesson;
  currentDay: number;
  onCorrect: () => void;
  onBack: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  fromDay: number;
  isReview: boolean;
}

// Concept relationships for smart mixing
const conceptRelations: Record<string, string[]> = {
  "RSI": ["Support", "Resistance", "Overbought", "Oversold", "Momentum"],
  "MACD": ["Trend", "Momentum", "Signal", "Crossover"],
  "Support": ["Resistance", "Price Action", "Breakout"],
  "Resistance": ["Support", "Price Action", "Breakout"],
  "Volume": ["Price", "Breakout", "Confirmation"],
  "Trend": ["Moving Average", "MACD", "Momentum"],
  "Risk": ["Stop Loss", "Position Size", "Capital"],
  "P/E": ["EPS", "Value", "Growth"],
  "EPS": ["P/E", "Profit", "Growth"],
};

export const SmartQuizScreen = ({ lesson, currentDay, onCorrect, onBack }: SmartQuizScreenProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  // Generate mixed questions from current and previous days
  const quizQuestions = useMemo(() => {
    const questions: QuizQuestion[] = [];
    
    // Always include current day's question
    questions.push({
      question: lesson.quiz.question,
      options: lesson.quiz.options,
      correctIndex: lesson.quiz.correctIndex,
      explanation: lesson.quiz.explanation,
      fromDay: lesson.day,
      isReview: false
    });

    // Get previous lessons for review questions
    const previousLessons = lessons.filter(l => l.day < currentDay && l.day >= 1);
    
    if (previousLessons.length > 0) {
      // Add 1-2 review questions from previous days
      const shuffled = [...previousLessons].sort(() => Math.random() - 0.5);
      const reviewCount = Math.min(2, shuffled.length);
      
      for (let i = 0; i < reviewCount; i++) {
        const reviewLesson = shuffled[i];
        questions.push({
          question: reviewLesson.quiz.question,
          options: reviewLesson.quiz.options,
          correctIndex: reviewLesson.quiz.correctIndex,
          explanation: reviewLesson.quiz.explanation,
          fromDay: reviewLesson.day,
          isReview: true
        });
      }
    }

    // Shuffle the questions (but keep current day's question first 50% of the time)
    if (Math.random() > 0.5 && questions.length > 1) {
      return questions.sort(() => Math.random() - 0.5);
    }
    
    return questions;
  }, [lesson, currentDay]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selected === currentQuestion?.correctIndex;
  const isLastQuestion = currentQuestionIndex >= quizQuestions.length - 1;

  const handleSelect = (index: number) => {
    if (showResult) return;
    resumeAudioContext();
    setSelected(index);
    setShowResult(true);
    setTotalAnswered(prev => prev + 1);
    
    if (index === currentQuestion.correctIndex) {
      setCorrectCount(prev => prev + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const handleContinue = () => {
    if (!isCorrect) {
      // Wrong answer - retry same question
      setSelected(null);
      setShowResult(false);
      return;
    }

    if (isLastQuestion) {
      // All questions answered correctly
      onCorrect();
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-secondary/20 to-background">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shrink-0">
            {currentQuestion?.isReview ? (
              <Shuffle className="w-5 h-5 text-secondary-foreground" />
            ) : (
              <HelpCircle className="w-5 h-5 text-secondary-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground truncate">
              {currentQuestion?.isReview ? `Review from Day ${currentQuestion.fromDay}` : `Day ${lesson.day}`}
            </p>
            <h1 className="text-lg font-bold truncate">
              {currentQuestion?.isReview ? "Quick Review" : "Quiz"}
            </h1>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5 shrink-0">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">
            {currentQuestionIndex + 1}/{quizQuestions.length}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {quizQuestions.map((_, idx) => (
          <div 
            key={idx}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              idx < currentQuestionIndex ? "bg-primary" :
              idx === currentQuestionIndex ? "bg-primary scale-125" :
              "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Review badge */}
      {currentQuestion?.isReview && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-accent/20 text-accent-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
            <Shuffle className="w-3.5 h-3.5" />
            Connecting back to Day {currentQuestion.fromDay}
          </div>
        </div>
      )}

      {/* Question */}
      <div className="flex-1 space-y-6">
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
          <p className="text-lg font-medium">{currentQuestion?.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
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
                  "flex items-center justify-between",
                  !showResult && "hover:border-primary hover:bg-primary/5",
                  showResult && isThisCorrect && "border-primary bg-primary/10",
                  showResult && isSelected && !isThisCorrect && "border-destructive bg-destructive/10",
                  !showResult && "border-border bg-card"
                )}
              >
                <span className="font-medium">{option}</span>
                {showResult && isThisCorrect && (
                  <CheckCircle className="w-6 h-6 text-primary" />
                )}
                {showResult && isSelected && !isThisCorrect && (
                  <XCircle className="w-6 h-6 text-destructive" />
                )}
              </button>
            );
          })}
        </div>

        {/* Result */}
        {showResult && (
          <div className={cn(
            "p-4 rounded-xl border-2",
            isCorrect ? "bg-primary/10 border-primary" : "bg-destructive/10 border-destructive"
          )}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-bold text-primary">
                    {currentQuestion?.isReview ? "Great memory! +25 XP" : "Correct! +50 XP"}
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="font-bold text-destructive">Not quite!</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{currentQuestion?.explanation}</p>
          </div>
        )}
      </div>

      {/* Button */}
      {showResult && (
        <div className="pt-6">
          <Button 
            onClick={handleContinue}
            size="lg"
            className="w-full h-14 text-lg font-bold"
            variant={isCorrect ? "default" : "secondary"}
          >
            {isCorrect 
              ? (isLastQuestion ? "NEXT CHALLENGE →" : "NEXT QUESTION →")
              : "TRY AGAIN"
            }
          </Button>
        </div>
      )}
    </div>
  );
};
