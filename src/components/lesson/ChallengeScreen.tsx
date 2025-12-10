import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, XCircle, TrendingUp, TrendingDown, ArrowLeft } from "lucide-react";
import { Lesson } from "@/lib/gameData";
import { cn } from "@/lib/utils";
import { playCorrectSound, playWrongSound, resumeAudioContext } from "@/lib/sounds";

interface ChallengeScreenProps {
  lesson: Lesson;
  onCorrect: () => void;
  onBack: () => void;
}

export const ChallengeScreen = ({ lesson, onCorrect, onBack }: ChallengeScreenProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const isCorrect = selected === lesson.challenge.correctIndex;

  const handleSelect = (index: number) => {
    if (showResult) return;
    resumeAudioContext();
    setSelected(index);
    setShowResult(true);
    
    if (index === lesson.challenge.correctIndex) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
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
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-accent/10 to-background">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shrink-0">
          <Target className="w-5 h-5 text-accent-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Day {lesson.day}</p>
          <h1 className="text-lg font-bold truncate">{lesson.challenge.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-5">
        {/* Scenario */}
        <div className="bg-card border-2 border-border rounded-xl p-4 shadow-sm">
          <p className="text-sm text-muted-foreground mb-3">{lesson.challenge.scenario}</p>
          
          {/* Price Data */}
          <div className="space-y-2">
            {lesson.challenge.priceData.map((item, index) => {
              const prevPrice = index > 0 ? lesson.challenge.priceData[index - 1].price : item.price;
              const isUp = item.price > prevPrice;
              const isDown = item.price < prevPrice;
              
              return (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    "bg-muted/50"
                  )}
                >
                  <span className="font-medium">{item.time}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-bold",
                      isUp && "text-primary",
                      isDown && "text-destructive"
                    )}>
                      ₹{item.price.toLocaleString()}
                    </span>
                    {isUp && <TrendingUp className="w-4 h-4 text-primary" />}
                    {isDown && <TrendingDown className="w-4 h-4 text-destructive" />}
                  </div>
                  {item.note && (
                    <span className="text-xs text-muted-foreground">({item.note})</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Question */}
        <p className="font-bold text-lg text-center">{lesson.challenge.question}</p>

        {/* Options */}
        <div className="space-y-3">
          {lesson.challenge.options.map((option, index) => {
            const isThisCorrect = index === lesson.challenge.correctIndex;
            const isSelected = selected === index;
            
            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 text-left rounded-xl border-2 transition-all",
                  "flex items-center justify-between",
                  !showResult && "hover:border-accent hover:bg-accent/10",
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
                  <span className="font-bold text-primary">You spotted it! +50 XP</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="font-bold text-destructive">Not quite!</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{lesson.challenge.explanation}</p>
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
            {isCorrect ? "EXECUTE TRADE →" : "TRY AGAIN"}
          </Button>
        </div>
      )}
    </div>
  );
};
