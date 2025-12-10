"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { practiceQuestions } from "@/lib/practiceData";
import { Timer, Zap, Trophy, X, RotateCcw } from "lucide-react";

interface SpeedChallengeGameProps {
  onClose: () => void;
}

export function SpeedChallengeGame({ onClose }: SpeedChallengeGameProps) {
  const [questions] = useState(() => 
    [...practiceQuestions].sort(() => Math.random() - 0.5).slice(0, 20)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState<"ready" | "playing" | "ended">("ready");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (gameState !== "playing" || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState("ended");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (showFeedback || gameState !== "playing") return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const isCorrect = answerIndex === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 10);
      setScore(prev => prev + 10 + timeBonus);
      setCorrectCount(prev => prev + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameState("ended");
      }
    }, 500);
  }, [currentIndex, questions, showFeedback, gameState, timeLeft]);

  const startGame = () => {
    setGameState("playing");
    setTimeLeft(60);
    setScore(0);
    setCurrentIndex(0);
    setCorrectCount(0);
  };

  const resetGame = () => {
    setGameState("ready");
    setTimeLeft(60);
    setScore(0);
    setCurrentIndex(0);
    setCorrectCount(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (gameState === "ready") {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 max-w-md w-full text-center border border-zinc-700"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Speed Challenge</h2>
          <p className="text-zinc-400 mb-6">Answer as many questions as possible in 60 seconds!</p>
          
          <div className="bg-zinc-800/50 rounded-2xl p-4 mb-6 space-y-2">
            <p className="text-zinc-300"><span className="text-orange-400 font-semibold">+10</span> points per correct answer</p>
            <p className="text-zinc-300"><span className="text-blue-400 font-semibold">+Bonus</span> for faster answers</p>
            <p className="text-zinc-300"><span className="text-emerald-400 font-semibold">20</span> questions total</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-lg transition-all"
            >
              Start Challenge
            </button>
            <button onClick={onClose} className="px-4 py-4 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white">
              <X size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameState === "ended") {
    const accuracy = questions.length > 0 ? Math.round((correctCount / Math.min(currentIndex + 1, questions.length)) * 100) : 0;
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 max-w-md w-full text-center border border-zinc-700"
        >
          <Trophy className="w-20 h-20 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Time's Up!</h2>
          
          <div className="grid grid-cols-3 gap-3 my-6">
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <p className="text-3xl font-bold text-emerald-400">{score}</p>
              <p className="text-xs text-zinc-500">Score</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <p className="text-3xl font-bold text-blue-400">{correctCount}</p>
              <p className="text-xs text-zinc-500">Correct</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <p className="text-3xl font-bold text-orange-400">{accuracy}%</p>
              <p className="text-xs text-zinc-500">Accuracy</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              Try Again
            </button>
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white font-semibold">
              Exit
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
          <X size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Timer className={`w-5 h-5 ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-orange-400"}`} />
          <span className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-500" : "text-white"}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-400">{score}</p>
          <p className="text-xs text-zinc-500">Score</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>Question {currentIndex + 1}/{questions.length}</span>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-xs">{question.category}</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 60) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-2xl p-5 mb-4">
          <p className="text-lg text-white leading-relaxed">{question.question}</p>
        </div>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let buttonClass = "w-full p-4 rounded-xl text-left transition-all border ";
            if (showFeedback) {
              if (idx === question.correctAnswer) {
                buttonClass += "bg-emerald-500/20 border-emerald-500 text-emerald-400";
              } else if (idx === selectedAnswer) {
                buttonClass += "bg-red-500/20 border-red-500 text-red-400";
              } else {
                buttonClass += "bg-zinc-800/50 border-zinc-700 text-zinc-400";
              }
            } else {
              buttonClass += "bg-zinc-800/50 border-zinc-700 text-white hover:bg-zinc-700/50 hover:border-zinc-600";
            }

            return (
              <motion.button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showFeedback}
                className={buttonClass}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
