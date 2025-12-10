import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-primary/5 to-background">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-md">
            <TrendingUp className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to StockMaster!
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn trading like a game
          </p>
        </div>

        {/* Money Gift */}
        <div className="bg-secondary/50 border-2 border-secondary rounded-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-secondary-foreground" />
            <span className="text-2xl font-bold text-secondary-foreground">₹10,000</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Virtual money to start trading
          </p>
        </div>

        {/* Name Input */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="What's your name? (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center text-lg h-14 border-2"
          />
          
          <Button 
            onClick={() => onStart(name)}
            size="lg"
            className="w-full h-14 text-xl font-bold shadow-md hover:shadow-lg transition-all"
          >
            START NOW →
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          No login. No email. Just learn & earn.
        </p>
      </div>
    </div>
  );
};
