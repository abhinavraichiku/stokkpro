import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface LineChartData {
  time: string | number;
  price: number;
}

interface StockLineChartProps {
  data?: LineChartData[];
  height?: number;
  showGrid?: boolean;
  color?: string;
  animated?: boolean;
}

// Default sample data
const generateDefaultData = (): LineChartData[] => {
  const basePrice = 440;
  return Array.from({ length: 30 }, (_, i) => ({
    time: i,
    price: basePrice + (Math.random() - 0.5) * 10 + Math.sin(i * 0.2) * 8,
  }));
};

const chartConfig: ChartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
};

export const StockLineChart = ({ 
  data, 
  height = 200, 
  showGrid = true,
  color = "#3b82f6",
  animated = true 
}: StockLineChartProps) => {
  const chartData = data || generateDefaultData();
  
  const minPrice = Math.min(...chartData.map(d => d.price));
  const maxPrice = Math.max(...chartData.map(d => d.price));
  const priceChange = chartData.length > 1 
    ? chartData[chartData.length - 1].price - chartData[0].price 
    : 0;
  const isPositive = priceChange >= 0;
  const lineColor = isPositive ? "#22c55e" : "#ef4444";

  return (
    <div className="w-full bg-card rounded-xl border border-border p-4">
      {/* Price Summary */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-2xl font-bold tabular-nums">
          ₹{chartData[chartData.length - 1]?.price.toFixed(2) || '0.00'}
        </span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
          isPositive 
            ? 'bg-green-500/20 text-green-500' 
            : 'bg-red-500/20 text-red-500'
        }`}>
          {isPositive ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)} ({((priceChange / chartData[0]?.price) * 100 || 0).toFixed(2)}%)
        </span>
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className={`w-full`} style={{ height }}>
        <RechartsLineChart data={chartData}>
          {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[minPrice - 2, maxPrice + 2]} />
          <ChartTooltip
            content={<ChartTooltipContent hideIndicator hideLabel />}
            cursor={{ stroke: lineColor, strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: lineColor,
              stroke: "#ffffff",
              strokeWidth: 2,
            }}
            isAnimationActive={animated}
            animationDuration={1500}
          />
        </RechartsLineChart>
      </ChartContainer>

      {/* Price Range */}
      <div className="flex justify-between mt-3 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">High:</span>
          <span className="font-medium text-green-500">{maxPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Low:</span>
          <span className="font-medium text-red-500">{minPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
