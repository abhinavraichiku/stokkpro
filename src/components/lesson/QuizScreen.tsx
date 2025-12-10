import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { Lesson } from "@/lib/gameData";
import { cn } from "@/lib/utils";

interface QuizScreenProps {
  lesson: Lesson;
  onCorrect: () => void;
}

export const QuizScreen = ({ lesson, onCorrect }: QuizScreenProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const isCorrect = selected === lesson.quiz.correctIndex;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
  };

  const handleContinue = () => {
    if (isCorrect) {
      onCorrect();
    } else {
      setSelected(null);
      setShowResult(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-secondary/20 to-background">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-secondary-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Day {lesson.day}</p>
          <h1 className="text-xl font-bold">Quick Quiz</h1>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 space-y-6">
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
          <p className="text-lg font-medium">{lesson.quiz.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {lesson.quiz.options.map((option, index) => {
            const isThisCorrect = index === lesson.quiz.correctIndex;
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
                  <span className="font-bold text-primary">Correct! +50 XP</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="font-bold text-destructive">Not quite!</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{lesson.quiz.explanation}</p>
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
            {isCorrect ? "NEXT CHALLENGE →" : "TRY AGAIN"}
          </Button>
        </div>
      )}
    </div>
  );
};
