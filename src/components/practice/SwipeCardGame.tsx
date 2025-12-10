"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { swipeCardScenarios } from "@/lib/practiceData";
import { TrendingUp, TrendingDown, RotateCcw, Trophy, X, Check } from "lucide-react";

interface SwipeCardGameProps {
  onClose: () => void;
}

export function SwipeCardGame({ onClose }: SwipeCardGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResult, setShowResult] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledScenarios] = useState(() => 
    [...swipeCardScenarios].sort(() => Math.random() - 0.5)
  );

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const buyOpacity = useTransform(x, [0, 100], [0, 1]);
  const sellOpacity = useTransform(x, [-100, 0], [1, 0]);

  const currentScenario = shuffledScenarios[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    const userAction = direction === "right" ? "buy" : "sell";
    const isCorrect = userAction === currentScenario.action;

    if (isCorrect) {
      setScore(prev => prev + 10 + streak * 2);
      setStreak(prev => prev + 1);
      setShowResult("correct");
    } else {
      setStreak(0);
      setShowResult("wrong");
    }

    setTimeout(() => {
      setShowResult(null);
      if (currentIndex < shuffledScenarios.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameOver(true);
      }
    }, 800);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setShowResult(null);
  };

  if (gameOver) {
    const percentage = Math.round((score / (shuffledScenarios.length * 10)) * 100);
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 max-w-md w-full text-center border border-zinc-700"
        >
          <Trophy className="w-20 h-20 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Game Over!</h2>
          <p className="text-zinc-400 mb-6">You completed all scenarios</p>
          
          <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6">
            <p className="text-5xl font-bold text-emerald-400 mb-2">{score}</p>
            <p className="text-zinc-400">Total Points</p>
            <p className="text-lg text-zinc-300 mt-2">{percentage}% Accuracy</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              Play Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white font-semibold transition-colors"
            >
              Exit
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
          <X size={24} />
        </button>
        <div className="text-center">
          <p className="text-sm text-zinc-400">Card {currentIndex + 1}/{shuffledScenarios.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-zinc-500">Streak</p>
            <p className="text-lg font-bold text-orange-400">{streak}🔥</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">Score</p>
            <p className="text-lg font-bold text-emerald-400">{score}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-center">
          <motion.div style={{ opacity: sellOpacity }} className="text-red-500">
            <TrendingDown size={48} />
            <p className="font-bold mt-2">SELL</p>
          </motion.div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-center">
          <motion.div style={{ opacity: buyOpacity }} className="text-emerald-500">
            <TrendingUp size={48} />
            <p className="font-bold mt-2">BUY</p>
          </motion.div>
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`absolute inset-0 flex items-center justify-center z-20 ${
                showResult === "correct" ? "bg-emerald-500/20" : "bg-red-500/20"
              }`}
            >
              {showResult === "correct" ? (
                <Check className="w-32 h-32 text-emerald-400" />
              ) : (
                <X className="w-32 h-32 text-red-400" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x, rotate }}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: "grabbing" }}
          className="w-full max-w-sm cursor-grab"
        >
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl p-6 border border-zinc-700 shadow-2xl">
            <div className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                Trading Scenario
              </span>
            </div>
            
            <p className="text-xl text-white text-center leading-relaxed min-h-[120px] flex items-center justify-center">
              {currentScenario.scenario}
            </p>

            <div className="mt-6 pt-6 border-t border-zinc-700">
              <p className="text-center text-zinc-500 text-sm">
                Swipe left to SELL • Swipe right to BUY
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-6 mt-8">
          <button
            onClick={() => handleSwipe("left")}
            className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center hover:bg-red-500/30 transition-colors"
          >
            <TrendingDown className="text-red-500" size={28} />
          </button>
          <button
            onClick={() => handleSwipe("right")}
            className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center hover:bg-emerald-500/30 transition-colors"
          >
            <TrendingUp className="text-emerald-500" size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
