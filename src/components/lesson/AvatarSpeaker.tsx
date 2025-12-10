import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VolumeX, Pause, Play } from "lucide-react";

interface AvatarSpeakerProps {
  text: string;
  displayText?: string;
  onComplete?: () => void;
  autoPlay?: boolean;
}

const AVATAR_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/bb-1765407282711.gif?width=8000&height=8000&resize=contain";

const formatDisplayText = (text: string) => {
  let formatted = text;
  
  const topicMatch = text.match(/Today's Topic:\s*([^.]+)\./i);
  const keyConceptMatch = text.match(/Key concept:\s*(.+)/i);
  
  if (topicMatch && keyConceptMatch) {
    const topic = topicMatch[1].trim();
    const keyConcept = keyConceptMatch[1].trim();
    formatted = `<div class="space-y-4">
      <div class="text-lg font-bold text-foreground">Today's Topic: ${topic}</div>
      <div class="text-sm font-light text-muted-foreground/70">Key concept: ${keyConcept}</div>
    </div>`;
    return formatted;
  }
  
  formatted = text
    .replace(/["']([^"']+)["']/g, '<strong class="text-primary font-bold">$1</strong>')
    .replace(/\b(Support|Resistance|RSI|MACD|EMA|MA|Trend|Bullish|Bearish|Volume|Breakout|Pattern|Stop Loss|Target|Entry|Exit|Premium|Strike|Profit|Loss|Risk|Reward)\b/gi, 
      '<strong class="text-primary font-semibold">$&</strong>')
    .replace(/₹[\d,]+/g, '<span class="text-green-500 font-semibold">$&</span>')
    .replace(/\d+%/g, '<span class="text-secondary font-semibold">$&</span>');
  return formatted;
};

export const AvatarSpeaker = ({ text, displayText, onComplete, autoPlay = true }: AvatarSpeakerProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hasStartedRef = useRef(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const supported = 'speechSynthesis' in window;
    setIsSupported(supported);
    if (!supported) {
      console.warn("Speech synthesis not supported in this browser");
    }
  }, []);

  useEffect(() => {
    if (displayText && isSpeaking && !isPaused) {
      setIsTyping(true);
      let currentIndex = 0;
      const words = displayText.split(' ');
      
      typingRef.current = setInterval(() => {
        if (currentIndex < words.length) {
          setDisplayedText(words.slice(0, currentIndex + 1).join(' '));
          currentIndex++;
        } else {
          if (typingRef.current) clearInterval(typingRef.current);
          setIsTyping(false);
        }
      }, 150);

      return () => {
        if (typingRef.current) clearInterval(typingRef.current);
      };
    } else if (displayText && !isSpeaking) {
      setDisplayedText(displayText);
    }
  }, [displayText, isSpeaking, isPaused]);

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      onComplete?.();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Daniel') || v.name.includes('James'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
    
    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setDisplayedText("");
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (displayText) setDisplayedText(displayText);
      onComplete?.();
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (displayText) setDisplayedText(displayText);
      onComplete?.();
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => {
    if (autoPlay && !hasStartedRef.current && isSupported) {
      hasStartedRef.current = true;
      const timer = setTimeout(() => {
        speak();
      }, 500);
      return () => clearTimeout(timer);
    }
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [isSupported]);

  const handlePlayPause = () => {
    if (!isSupported) return;
    
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speak();
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    if (displayText) setDisplayedText(displayText);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="relative">
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-lg ${isSpeaking && !isPaused ? 'animate-pulse' : ''}`} 
          style={{ transform: 'scale(1.1)' }} 
        />
        
        <div className="relative w-28 h-28 rounded-xl bg-card flex items-center justify-center border border-border shadow-lg overflow-hidden">
          <img 
            src={AVATAR_URL} 
            alt="Avatar" 
            className="w-[120%] h-[120%] object-cover"
          />
        </div>
        
        {isSpeaking && !isPaused && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <span className="w-1.5 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
            <span className="w-1.5 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
            <span className="w-1.5 h-5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="w-1.5 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
          </div>
        )}
      </div>

      {displayText && (
        <div className="w-full bg-card/60 border border-border/50 rounded-2xl p-6 mt-4">
          <div 
            className="text-center leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatDisplayText(displayedText || displayText) }}
          />
          {isTyping && (
            <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse" />
          )}
        </div>
      )}

      <div className="flex flex-col items-center gap-4 mt-2">
        {!isSupported ? (
          <p className="text-sm font-medium text-muted-foreground">Voice not supported in this browser</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground/70">
              {isSpeaking && !isPaused ? "Speaking..." : isPaused ? "Paused" : "Tap to listen"}
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handlePlayPause}
                className="gap-2 px-6 rounded-full"
              >
                {isSpeaking && !isPaused ? (
                  <><Pause className="w-4 h-4" /> Pause</>
                ) : (
                  <><Play className="w-4 h-4" /> {isPaused ? 'Resume' : 'Play'}</>
                )}
              </Button>
              {isSpeaking && (
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={handleStop}
                  className="rounded-full"
                >
                  <VolumeX className="w-4 h-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};