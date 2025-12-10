import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ChartData {
  time: string;
  price: number;
  note?: string;
}

interface AnimatedChartProps {
  data: ChartData[];
  showTrend?: boolean;
  animated?: boolean;
}

export const AnimatedChart = ({ data, showTrend = true, animated = true }: AnimatedChartProps) => {
  const [animatedData, setAnimatedData] = useState<ChartData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prices = data.map(d => d.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
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
    }, 400);

    return () => clearInterval(interval);
  }, [data, animated]);

  const getY = (price: number) => {
    return 100 - ((price - minPrice) / range) * 80 - 10;
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
    const y = getY(d.price);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="bg-card border-2 border-border rounded-xl p-4 shadow-sm">
      {/* Chart Header */}
      {showTrend && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">Price Action</span>
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
      <div className="relative h-32 mb-3">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-full"
        >
          {/* Grid lines */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2,2" />

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
              stroke={trend === "up" ? "hsl(var(--primary))" : trend === "down" ? "hsl(var(--destructive))" : "hsl(var(--muted-foreground))"}
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
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="hsl(var(--background))"
                  stroke={trend === "up" ? "hsl(var(--primary))" : trend === "down" ? "hsl(var(--destructive))" : "hsl(var(--muted-foreground))"}
                  strokeWidth="2"
                  className="animate-scale-in"
                />
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
        </svg>
      </div>

      {/* Data Labels */}
      <div className="flex justify-between text-xs gap-1 overflow-x-auto">
        {data.map((d, i) => (
          <div 
            key={i} 
            className={`text-center flex-1 min-w-0 transition-opacity duration-300 ${
              i < animatedData.length ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="font-bold truncate">₹{d.price.toLocaleString()}</div>
            <div className="text-muted-foreground truncate">{d.time}</div>
            {d.note && (
              <div className="text-accent-foreground text-[10px] truncate mt-0.5">
                {d.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
