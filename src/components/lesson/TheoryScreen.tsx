import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Unlock, CheckCircle2, AlertTriangle, Calculator, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import { Lesson, getPhaseForDay } from "@/lib/gameData";
import { EnhancedChart } from "@/components/EnhancedChart";
import { AvatarSpeaker } from "./AvatarSpeaker";
import { cn } from "@/lib/utils";
import { StockLineChart } from "@/components/charts/LineChart";

const CandlestickChart = lazy(() => import("@/components/charts/CandlestickChart").then(m => ({ default: m.CandlestickChart })));
interface TheoryScreenProps {
  lesson: Lesson;
  onNext: () => void;
  onBack: () => void;
}

interface TheoryCard {
  type: 'avatar' | 'points' | 'visual' | 'keyterm';
  content: any;
}

export const TheoryScreen = ({ lesson, onNext, onBack }: TheoryScreenProps) => {
  const phase = getPhaseForDay(lesson.day);
  const [currentCard, setCurrentCard] = useState(0);
  const [hasListened, setHasListened] = useState(false);

  // Generate speech text - conversational intro that's different from the points
  const speechText = `Hey! Today we're learning about ${lesson.theory.title.toLowerCase()}. This is super important for your trading journey. Let me break it down for you simply. The key thing to remember is ${lesson.theory.keyTerm}, which means ${lesson.theory.keyTermDef}. Ready? Let's dive in!`;
  
  // Display text shown below avatar while speaking
  const displayText = `Today's Topic: ${lesson.theory.title}. Key concept: ${lesson.theory.keyTerm} - ${lesson.theory.keyTermDef}`;

  // Build theory cards
  const cards: TheoryCard[] = [
    { type: 'avatar', content: { speechText, displayText } },
    { type: 'points', content: lesson.theory.points },
  ];
  
  if (lesson.theory.visual) {
    cards.push({ type: 'visual', content: lesson.theory.visual });
  }
  
  cards.push({ type: 'keyterm', content: { term: lesson.theory.keyTerm, def: lesson.theory.keyTermDef, unlock: lesson.theory.unlock } });

  const totalCards = cards.length;
  const isLastCard = currentCard === totalCards - 1;

  const renderVisual = (visual: { type: string; data: any }) => {
    const { type, data } = visual;
    
    if (type === 'lineChart') {
      return <StockLineChart />;
    }
    
    if (type === 'candlestick') {
      return (
        <Suspense fallback={<div className="h-72 bg-muted rounded-xl animate-pulse" />}>
          <CandlestickChart />
        </Suspense>
      );
    }
    
    if (type === 'chart') {
      const chartData = data.prices?.map((price: number, i: number) => ({
        time: `Point ${i + 1}`,
        price,
      })) || [];
      return <EnhancedChart data={chartData} chartType={data.chartType || 'line'} showSupportResistance={data.showLevels} supportLevel={data.support} resistanceLevel={data.resistance} indicators={data.indicators} />;
    }
    
    if (type === 'comparison') {
      return (
        <div className="space-y-4">
          {data.items?.map((item: any, i: number) => (
            <div key={i} className="bg-card border-2 border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-lg">{item.label}</span>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                  item.color === 'primary' ? 'bg-primary/20 text-primary' :
                  item.color === 'destructive' ? 'bg-destructive/20 text-destructive' :
                  'bg-warning/20 text-warning-foreground'
                }`}>
                  {item.value}%
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    item.color === 'primary' ? 'bg-primary' :
                    item.color === 'destructive' ? 'bg-destructive' :
                    'bg-warning'
                  }`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      );
    }
    
    if (type === 'formula') {
      return (
        <div className="bg-accent/20 border-2 border-accent rounded-2xl p-6 text-center">
          <Calculator className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
          <p className="font-mono font-bold text-2xl mb-3">{data.formula}</p>
          <p className="text-muted-foreground">{data.example}</p>
        </div>
      );
    }
    
    if (type === 'warning') {
      return (
        <div className="bg-destructive/10 border-2 border-destructive rounded-2xl p-6 flex items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-destructive flex-shrink-0" />
          <p className="font-medium text-lg text-destructive">{data.message}</p>
        </div>
      );
    }
    
    return null;
  };

  const renderCard = (card: TheoryCard, index: number) => {
    switch (card.type) {
      case 'avatar':
        return (
          <div className="animate-fade-in">
            <AvatarSpeaker 
              text={card.content.speechText}
              displayText={card.content.displayText}
              onComplete={() => setHasListened(true)}
              autoPlay={index === 0}
            />
          </div>
        );
      
      case 'points':
        return (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-center mb-4">Key Points</h3>
            {card.content.map((point: string, i: number) => (
              <div 
                key={i} 
                className="flex items-start gap-4 bg-card border-2 border-border rounded-2xl p-5 shadow-sm animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-base font-medium leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        );
      
      case 'visual':
        return (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold text-center mb-4">Visual Explanation</h3>
            {renderVisual(card.content)}
          </div>
        );
      
      case 'keyterm':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-secondary/30 border-2 border-secondary rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-6 h-6 text-secondary-foreground" />
                <span className="font-bold text-secondary-foreground">Key Term</span>
              </div>
              <p className="text-2xl font-bold mb-2">{card.content.term}</p>
              <p className="text-muted-foreground">{card.content.def}</p>
            </div>
            
            {card.content.unlock && (
              <div className="flex items-center gap-3 text-primary bg-primary/10 rounded-xl p-4">
                <Unlock className="w-5 h-5" />
                <span className="font-medium">{card.content.unlock}</span>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-5 bg-gradient-to-b from-info/10 to-background">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="text-3xl">{lesson.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium px-2 py-0.5 bg-primary/20 text-primary rounded-full">
              {phase.icon} Phase {phase.id}
            </span>
            <span className="text-xs text-muted-foreground">Day {lesson.day}</span>
          </div>
          <h1 className="text-base font-bold leading-tight truncate">{lesson.theory.title}</h1>
        </div>
      </div>

      {/* Card Progress */}
      <div className="flex justify-center gap-2 mb-6">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentCard(idx)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              idx === currentCard ? "bg-primary scale-125" : 
              idx < currentCard ? "bg-primary/50" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Card Content */}
      <div className="flex-1 overflow-y-auto">
        {renderCard(cards[currentCard], currentCard)}
      </div>

      {/* Navigation */}
      <div className="pt-6 flex gap-3">
        {currentCard > 0 && (
          <Button 
            onClick={() => setCurrentCard(prev => prev - 1)}
            size="lg"
            variant="outline"
            className="flex-1 h-14"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        )}
        
        <Button 
          onClick={() => {
            if (isLastCard) {
              onNext();
            } else {
              setCurrentCard(prev => prev + 1);
            }
          }}
          size="lg"
          className="flex-1 h-14 text-lg font-bold"
        >
          {isLastCard ? "GOT IT! TEST ME →" : (
            <>Next <ChevronRight className="w-5 h-5 ml-2" /></>
          )}
        </Button>
      </div>
    </div>
  );
};
