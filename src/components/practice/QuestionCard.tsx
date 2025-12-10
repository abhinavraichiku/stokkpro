'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PracticeChart } from './PracticeChart';
import { TrendingUp, TrendingDown, CheckCircle2, XCircle, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CandleData {
  x: Date;
  y: [number, number, number, number];
}

interface LineData {
  time: string;
  price: number;
}

interface QuestionData {
  id: number;
  question?: string;
  title?: string;
  description?: string;
  chartType?: 'candlestick' | 'line';
  candleData?: CandleData[];
  lineData?: LineData[];
  correctAnswer: number | 'buy' | 'sell';
  explanation: string;
  patternName?: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  options: string[];
}

interface QuestionCardProps {
  question: QuestionData;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-yellow-500/20 text-yellow-400',
  advanced: 'bg-red-500/20 text-red-400',
};

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | 'buy' | 'sell' | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isChartQuestion = question.chartType && (question.candleData || question.lineData);

  const handleAnswer = (answer: 'buy' | 'sell') => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNext = () => {
    onAnswer(selectedAnswer === question.correctAnswer);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {questionNumber}/{totalQuestions}
          </Badge>
          <Badge variant="secondary" className={cn("text-xs", difficultyColors[question.difficulty])}>
            {question.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {question.category}
          </Badge>
        </div>
      </div>

      {isChartQuestion && (
        <>
          <div className="mb-3">
            <h2 className="text-lg font-bold mb-1">{question.title}</h2>
            <p className="text-sm text-muted-foreground">{question.description}</p>
          </div>

          <div className="flex-1 min-h-0 mb-4">
            <PracticeChart
              chartType={question.chartType!}
              candleData={question.candleData}
              lineData={question.lineData}
              height={240}
            />
          </div>
        </>
      )}

      {!showResult ? (
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            variant="outline"
            className="h-16 text-lg font-bold border-2 border-green-500/30 bg-green-500/5 hover:bg-green-500/20 hover:border-green-500 text-green-500 transition-all"
            onClick={() => handleAnswer('buy')}
          >
            <TrendingUp className="w-6 h-6 mr-2" />
            BUY
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 text-lg font-bold border-2 border-red-500/30 bg-red-500/5 hover:bg-red-500/20 hover:border-red-500 text-red-500 transition-all"
            onClick={() => handleAnswer('sell')}
          >
            <TrendingDown className="w-6 h-6 mr-2" />
            SELL
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className={cn(
            "p-4 rounded-xl border-2 transition-all",
            isCorrect 
              ? "bg-green-500/10 border-green-500/50" 
              : "bg-red-500/10 border-red-500/50"
          )}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="font-bold text-green-500">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-500" />
                  <span className="font-bold text-red-500">
                    Incorrect - Answer: {String(question.correctAnswer).toUpperCase()}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                {question.patternName && (
                  <p className="text-xs font-semibold text-yellow-500 mb-1">Pattern: {question.patternName}</p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full h-12 font-bold"
            onClick={handleNext}
          >
            Next Question
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}