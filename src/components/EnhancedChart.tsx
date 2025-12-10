import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Target, AlertTriangle } from "lucide-react";

interface ChartData {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  note?: string;
  type?: 'support' | 'resistance' | 'entry' | 'exit';
}

interface EnhancedChartProps {
  data: ChartData[];
  showTrend?: boolean;
  animated?: boolean;
  chartType?: 'line' | 'candlestick';
  showSupportResistance?: boolean;
  supportLevel?: number;
  resistanceLevel?: number;
  indicators?: {
    rsi?: number;
    macd?: { value: number; signal: number };
  };
}

export const EnhancedChart = ({ 
  data, 
  showTrend = true, 
  animated = true,
  chartType = 'line',
  showSupportResistance = false,
  supportLevel,
  resistanceLevel,
  indicators
}: EnhancedChartProps) => {
  const [animatedData, setAnimatedData] = useState<ChartData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prices = data.map(d => d.price || d.close || 0);
  const allPrices = showSupportResistance 
    ? [...prices, supportLevel || 0, resistanceLevel || 0].filter(Boolean)
    : prices;
  const maxPrice = Math.max(...allPrices);
  const minPrice = Math.min(...allPrices);
  const range = maxPrice - minPrice || 1;

  useEffect(() => {
    if (!animated) {
      setAnimatedData(data);
      setCurrentIndex(data.length);
      return;
    }

    setAnimatedData([]);
    setCurrentIndex(0);

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < data.length) {
          setAnimatedData(data.slice(0, prev + 1));
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [data, animated]);

  const getY = (price: number) => {
    return 100 - ((price - minPrice) / range) * 70 - 15;
  };

  const trend = prices.length > 1 
    ? prices[prices.length - 1] > prices[0] 
      ? "up" 
      : prices[prices.length - 1] < prices[0] 
        ? "down" 
        : "flat"
    : "flat";

  const pathPoints = animatedData.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = getY(d.price || d.close || 0);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const trendColor = trend === "up" ? "hsl(var(--primary))" : trend === "down" ? "hsl(var(--destructive))" : "hsl(var(--muted-foreground))";

  return (
    <div className="bg-card border-2 border-border rounded-xl p-4 shadow-sm space-y-3">
      {/* Chart Header */}
      {showTrend && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {chartType === 'candlestick' ? 'Candlestick Chart' : 'Price Action'}
          </span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
            trend === "up" ? "bg-primary/20 text-primary" :
            trend === "down" ? "bg-destructive/20 text-destructive" :
            "bg-muted text-muted-foreground"
          }`}>
            {trend === "up" && <TrendingUp className="w-3 h-3" />}
            {trend === "down" && <TrendingDown className="w-3 h-3" />}
            {trend === "flat" && <Minus className="w-3 h-3" />}
            {trend.toUpperCase()}
          </div>
        </div>
      )}

      {/* Chart SVG */}
      <div className="relative h-40">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-full"
        >
          {/* Grid lines */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2,2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2,2" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2,2" />

          {/* Support Level */}
          {showSupportResistance && supportLevel && (
            <>
              <line 
                x1="0" 
                y1={getY(supportLevel)} 
                x2="100" 
                y2={getY(supportLevel)} 
                stroke="hsl(var(--primary))" 
                strokeWidth="1" 
                strokeDasharray="4,2"
                opacity="0.7"
              />
              <text 
                x="2" 
                y={getY(supportLevel) - 2} 
                fill="hsl(var(--primary))" 
                fontSize="4"
                fontWeight="bold"
              >
                Support
              </text>
            </>
          )}

          {/* Resistance Level */}
          {showSupportResistance && resistanceLevel && (
            <>
              <line 
                x1="0" 
                y1={getY(resistanceLevel)} 
                x2="100" 
                y2={getY(resistanceLevel)} 
                stroke="hsl(var(--destructive))" 
                strokeWidth="1" 
                strokeDasharray="4,2"
                opacity="0.7"
              />
              <text 
                x="2" 
                y={getY(resistanceLevel) - 2} 
                fill="hsl(var(--destructive))" 
                fontSize="4"
                fontWeight="bold"
              >
                Resistance
              </text>
            </>
          )}

          {/* Candlestick rendering */}
          {chartType === 'candlestick' && animatedData.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const open = d.open || d.price;
            const close = d.close || d.price;
            const high = d.high || Math.max(open, close);
            const low = d.low || Math.min(open, close);
            const isBullish = close >= open;
            const candleWidth = 6;
            const color = isBullish ? "hsl(var(--primary))" : "hsl(var(--destructive))";

            return (
              <g key={i} className="animate-scale-in">
                {/* Wick */}
                <line
                  x1={x}
                  y1={getY(high)}
                  x2={x}
                  y2={getY(low)}
                  stroke={color}
                  strokeWidth="0.5"
                />
                {/* Body */}
                <rect
                  x={x - candleWidth / 2}
                  y={getY(Math.max(open, close))}
                  width={candleWidth}
                  height={Math.abs(getY(open) - getY(close)) || 1}
                  fill={isBullish ? color : color}
                  stroke={color}
                  strokeWidth="0.5"
                  opacity={isBullish ? 0.3 : 1}
                />
              </g>
            );
          })}

          {/* Line chart rendering */}
          {chartType === 'line' && (
            <>
              {/* Area fill */}
              {animatedData.length > 0 && (
                <path
                  d={`${pathPoints} L ${((animatedData.length - 1) / (data.length - 1)) * 100} 100 L 0 100 Z`}
                  fill={trend === "up" ? "hsl(var(--primary) / 0.15)" : trend === "down" ? "hsl(var(--destructive) / 0.15)" : "hsl(var(--muted))"}
                  className="transition-all duration-300"
                />
              )}

              {/* Line */}
              {animatedData.length > 0 && (
                <path
                  d={pathPoints}
                  fill="none"
                  stroke={trendColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />
              )}

              {/* Data points */}
              {animatedData.map((d, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = getY(d.price);
                const isSpecial = d.type === 'entry' || d.type === 'exit' || d.type === 'support' || d.type === 'resistance';
                
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isSpecial ? 4 : 3}
                      fill="hsl(var(--background))"
                      stroke={
                        d.type === 'entry' ? "hsl(var(--primary))" :
                        d.type === 'exit' ? "hsl(var(--destructive))" :
                        d.type === 'support' ? "hsl(var(--primary))" :
                        d.type === 'resistance' ? "hsl(var(--destructive))" :
                        trendColor
                      }
                      strokeWidth="2"
                      className="animate-scale-in"
                    />
                    {isSpecial && (
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill="none"
                        stroke={
                          d.type === 'entry' ? "hsl(var(--primary))" :
                          "hsl(var(--destructive))"
                        }
                        strokeWidth="1"
                        className="animate-pulse"
                        opacity="0.5"
                      />
                    )}
                    {d.note && (
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="1"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
            </>
          )}
        </svg>
      </div>

      {/* Indicators */}
      {indicators && (
        <div className="flex gap-3 flex-wrap">
          {indicators.rsi !== undefined && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              indicators.rsi > 70 ? "bg-destructive/20 text-destructive" :
              indicators.rsi < 30 ? "bg-primary/20 text-primary" :
              "bg-muted text-muted-foreground"
            }`}>
              <Target className="w-3.5 h-3.5" />
              RSI: {indicators.rsi}
              {indicators.rsi > 70 && <span className="ml-1">Overbought</span>}
              {indicators.rsi < 30 && <span className="ml-1">Oversold</span>}
            </div>
          )}
          {indicators.macd && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              indicators.macd.value > indicators.macd.signal ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
            }`}>
              <TrendingUp className="w-3.5 h-3.5" />
              MACD: {indicators.macd.value > indicators.macd.signal ? "Bullish" : "Bearish"}
            </div>
          )}
        </div>
      )}

      {/* Data Labels */}
      <div className="flex justify-between text-xs gap-1 overflow-x-auto pt-1">
        {data.map((d, i) => (
          <div 
            key={i} 
            className={`text-center flex-1 min-w-0 transition-opacity duration-300 ${
              i < animatedData.length ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="font-bold truncate">₹{(d.price || d.close || 0).toLocaleString()}</div>
            <div className="text-muted-foreground truncate">{d.time}</div>
            {d.note && (
              <div className={`text-[10px] truncate mt-0.5 font-medium ${
                d.type === 'entry' ? 'text-primary' :
                d.type === 'exit' ? 'text-destructive' :
                'text-accent-foreground'
              }`}>
                {d.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
