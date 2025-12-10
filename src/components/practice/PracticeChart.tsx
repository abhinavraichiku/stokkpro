import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { CandleData, LineData } from '@/lib/practiceData';

interface PracticeChartProps {
  chartType: 'candlestick' | 'line';
  candleData?: CandleData[];
  lineData?: LineData[];
  height?: number;
}

const chartConfig: ChartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
};

export function PracticeChart({ chartType, candleData, lineData, height = 300 }: PracticeChartProps) {
  if (chartType === 'candlestick' && candleData) {
    const options: ApexOptions = {
      chart: {
        type: 'candlestick',
        height: height,
        toolbar: { show: false },
        background: 'transparent',
        animations: {
          enabled: true,
          speed: 800,
        },
        zoom: { enabled: false },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#22c55e',
            downward: '#ef4444',
          },
          wick: {
            useFillColor: true,
          },
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          show: false,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        tooltip: { enabled: true },
        labels: {
          style: {
            colors: 'hsl(var(--muted-foreground))',
            fontSize: '11px',
          },
          formatter: (value) => value.toFixed(1),
        },
      },
      grid: {
        borderColor: 'hsl(var(--border))',
        strokeDashArray: 3,
        padding: { left: 10, right: 10 },
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        custom: function({ seriesIndex, dataPointIndex, w }) {
          const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
          const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
          const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
          const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
          return (
            '<div class="px-3 py-2 bg-popover border border-border rounded-lg shadow-lg text-xs">' +
            '<div class="grid grid-cols-2 gap-x-3 gap-y-1">' +
            '<span class="text-muted-foreground">O:</span><span class="font-medium">' + o.toFixed(2) + '</span>' +
            '<span class="text-muted-foreground">H:</span><span class="font-medium text-green-500">' + h.toFixed(2) + '</span>' +
            '<span class="text-muted-foreground">L:</span><span class="font-medium text-red-500">' + l.toFixed(2) + '</span>' +
            '<span class="text-muted-foreground">C:</span><span class="font-medium">' + c.toFixed(2) + '</span>' +
            '</div></div>'
          );
        },
      },
    };

    const series = [{ data: candleData }];

    return (
      <div className="w-full bg-card/50 rounded-xl border border-border p-3">
        <ReactApexChart options={options} series={series} type="candlestick" height={height} />
      </div>
    );
  }

  if (chartType === 'line' && lineData) {
    const minPrice = Math.min(...lineData.map(d => d.price));
    const maxPrice = Math.max(...lineData.map(d => d.price));
    const priceChange = lineData.length > 1 
      ? lineData[lineData.length - 1].price - lineData[0].price 
      : 0;
    const lineColor = priceChange >= 0 ? "#22c55e" : "#ef4444";

    return (
      <div className="w-full bg-card/50 rounded-xl border border-border p-3">
        <ChartContainer config={chartConfig} className="w-full" style={{ height }}>
          <RechartsLineChart data={lineData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" hide />
            <YAxis 
              hide 
              domain={[minPrice - 2, maxPrice + 2]} 
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={lineColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: lineColor,
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </RechartsLineChart>
        </ChartContainer>
      </div>
    );
  }

  return null;
}
