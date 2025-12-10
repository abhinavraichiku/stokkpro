import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface CandlestickData {
  x: Date | number;
  y: [number, number, number, number]; // [Open, High, Low, Close]
}

interface CandlestickChartProps {
  data?: CandlestickData[];
  height?: number;
  showToolbar?: boolean;
}

// Default sample data for teaching
const defaultData: CandlestickData[] = [
  { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
  { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
  { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
  { x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] },
  { x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
  { x: new Date(1538787600000), y: [6624.53, 6636.03, 6621.68, 6624.31] },
  { x: new Date(1538789400000), y: [6624.61, 6632.2, 6617, 6626.02] },
  { x: new Date(1538791200000), y: [6627, 6627.62, 6584.22, 6603.02] },
  { x: new Date(1538793000000), y: [6605, 6608.03, 6598.95, 6604.01] },
  { x: new Date(1538794800000), y: [6604.5, 6614.4, 6602.26, 6608.02] },
  { x: new Date(1538796600000), y: [6608.02, 6610.68, 6601.99, 6608.91] },
  { x: new Date(1538798400000), y: [6608.91, 6618.99, 6608.01, 6612] },
  { x: new Date(1538800200000), y: [6612, 6615.13, 6605.09, 6612] },
  { x: new Date(1538802000000), y: [6612, 6624.12, 6608.43, 6622.95] },
  { x: new Date(1538803800000), y: [6623.91, 6623.91, 6615, 6615.67] },
  { x: new Date(1538805600000), y: [6618.69, 6618.74, 6610, 6610.4] },
  { x: new Date(1538807400000), y: [6611, 6622.78, 6610.4, 6614.9] },
  { x: new Date(1538809200000), y: [6614.9, 6626.2, 6613.33, 6623.45] },
  { x: new Date(1538811000000), y: [6623.48, 6627, 6618.38, 6620.35] },
  { x: new Date(1538812800000), y: [6619.43, 6620.35, 6610.05, 6615.53] },
];

export const CandlestickChart = ({ data = defaultData, height = 280, showToolbar = false }: CandlestickChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: height,
      toolbar: { show: showToolbar },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 800,
      },
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
        style: {
          colors: 'hsl(var(--muted-foreground))',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: 'hsl(var(--muted-foreground))',
        },
        formatter: (value) => value.toFixed(2),
      },
    },
    grid: {
      borderColor: 'hsl(var(--border))',
      strokeDashArray: 3,
    },
    tooltip: {
      theme: 'dark',
      custom: function({ seriesIndex, dataPointIndex, w }) {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return (
          '<div class="px-3 py-2 bg-popover border border-border rounded-lg shadow-lg">' +
          '<div class="grid grid-cols-2 gap-2 text-sm">' +
          '<span class="text-muted-foreground">Open:</span><span class="font-medium">' + o.toFixed(2) + '</span>' +
          '<span class="text-muted-foreground">High:</span><span class="font-medium text-green-500">' + h.toFixed(2) + '</span>' +
          '<span class="text-muted-foreground">Low:</span><span class="font-medium text-red-500">' + l.toFixed(2) + '</span>' +
          '<span class="text-muted-foreground">Close:</span><span class="font-medium">' + c.toFixed(2) + '</span>' +
          '</div></div>'
        );
      },
    },
  };

  const series = [
    {
      data: data,
    },
  ];

  return (
    <div className="w-full bg-card rounded-xl border border-border p-4">
      <ReactApexChart options={options} series={series} type="candlestick" height={height} />
    </div>
  );
};
