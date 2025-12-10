export interface CandleData {
  x: Date;
  y: [number, number, number, number]; // [open, high, low, close]
}

export interface LineData {
  time: string;
  price: number;
}

export interface PracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | 'buy' | 'sell';
  explanation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  // Chart-related fields for visual questions
  title?: string;
  description?: string;
  chartType?: 'candlestick' | 'line';
  candleData?: CandleData[];
  lineData?: LineData[];
  patternName?: string;
}

export type PatternCategory = 
  | 'support_resistance' 
  | 'candlestick_patterns' 
  | 'chart_patterns' 
  | 'trend_analysis' 
  | 'reversal_patterns' 
  | 'continuation_patterns';

export const categoryLabels: Record<PatternCategory, string> = {
  support_resistance: 'Support & Resistance',
  candlestick_patterns: 'Candlestick Patterns',
  chart_patterns: 'Chart Patterns',
  trend_analysis: 'Trend Analysis',
  reversal_patterns: 'Reversal Patterns',
  continuation_patterns: 'Continuation Patterns',
};

export type Answer = 0 | 1 | 2 | 3 | 'buy' | 'sell';

export const difficultyColors: Record<PracticeQuestion['difficulty'], string> = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-yellow-500/20 text-yellow-400',
  advanced: 'bg-red-500/20 text-red-400',
};

const categoryMapping: Record<string, PatternCategory> = {
  'RSI': 'trend_analysis',
  'MACD': 'trend_analysis',
  'Bollinger Bands': 'trend_analysis',
  'Candlesticks': 'candlestick_patterns',
  'Chart Patterns': 'chart_patterns',
  'Support & Resistance': 'support_resistance',
  'Moving Averages': 'trend_analysis',
  'Volume': 'trend_analysis',
  'Fibonacci': 'support_resistance',
  'Risk Management': 'continuation_patterns',
  'Psychology': 'reversal_patterns',
};

// Chart Pattern Generation Helpers
const generateBullishHammer = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 100;
  
  // Downtrend
  for (let i = 0; i < 8; i++) {
    const change = -1 - Math.random() * 2;
    const open = price;
    const close = price + change;
    const high = open + Math.random() * 0.5;
    const low = close - Math.random() * 1;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, high, low, close]
    });
    price = close;
  }
  
  // Hammer candle
  const hammerOpen = price;
  const hammerClose = hammerOpen + 0.5;
  const hammerHigh = hammerClose + 0.2;
  const hammerLow = hammerOpen - 4;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [hammerOpen, hammerHigh, hammerLow, hammerClose]
  });
  
  return data;
};

const generateBearishEngulfing = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 80;
  
  // Uptrend
  for (let i = 0; i < 7; i++) {
    const change = 1 + Math.random() * 2;
    const open = price;
    const close = price + change;
    const high = close + Math.random() * 0.5;
    const low = open - Math.random() * 0.5;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, high, low, close]
    });
    price = close;
  }
  
  // Small bullish candle
  const smallOpen = price;
  const smallClose = price + 1;
  data.push({
    x: new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    y: [smallOpen, smallClose + 0.3, smallOpen - 0.2, smallClose]
  });
  
  // Large bearish engulfing
  const engulfOpen = smallClose + 0.5;
  const engulfClose = smallOpen - 1.5;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [engulfOpen, engulfOpen + 0.3, engulfClose - 0.2, engulfClose]
  });
  
  return data;
};

const generateBullishEngulfing = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 100;
  
  // Downtrend
  for (let i = 0; i < 7; i++) {
    const change = -1 - Math.random() * 2;
    const open = price;
    const close = price + change;
    const high = open + Math.random() * 0.5;
    const low = close - Math.random() * 0.5;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, high, low, close]
    });
    price = close;
  }
  
  // Small bearish candle
  const smallOpen = price;
  const smallClose = price - 1;
  data.push({
    x: new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    y: [smallOpen, smallOpen + 0.2, smallClose - 0.3, smallClose]
  });
  
  // Large bullish engulfing
  const engulfOpen = smallClose - 0.5;
  const engulfClose = smallOpen + 1.5;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [engulfOpen, engulfClose + 0.2, engulfOpen - 0.3, engulfClose]
  });
  
  return data;
};

const generateShootingStar = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 80;
  
  // Uptrend
  for (let i = 0; i < 8; i++) {
    const change = 1 + Math.random() * 2;
    const open = price;
    const close = price + change;
    const high = close + Math.random() * 0.5;
    const low = open - Math.random() * 0.5;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, high, low, close]
    });
    price = close;
  }
  
  // Shooting star
  const starOpen = price;
  const starClose = starOpen - 0.5;
  const starHigh = starOpen + 4;
  const starLow = starClose - 0.2;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [starOpen, starHigh, starLow, starClose]
  });
  
  return data;
};

const generateDoji = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 90;
  
  // Mixed movement
  for (let i = 0; i < 8; i++) {
    const change = (Math.random() - 0.5) * 3;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 1;
    const low = Math.min(open, close) - Math.random() * 1;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, high, low, close]
    });
    price = close;
  }
  
  // Doji candle
  const dojiOpen = price;
  const dojiClose = dojiOpen + 0.1;
  const dojiHigh = dojiOpen + 2;
  const dojiLow = dojiOpen - 2;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [dojiOpen, dojiHigh, dojiLow, dojiClose]
  });
  
  return data;
};

const generateDoubleBottom = (): LineData[] => {
  const data: LineData[] = [];
  const points = [100, 95, 90, 85, 82, 85, 88, 90, 86, 82, 85, 90, 94, 98, 102];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateDoubleTop = (): LineData[] => {
  const data: LineData[] = [];
  const points = [80, 85, 90, 95, 98, 95, 92, 90, 94, 98, 95, 90, 86, 82, 78];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateUptrend = (): LineData[] => {
  const data: LineData[] = [];
  let price = 80;
  for (let i = 0; i < 15; i++) {
    price += 1 + Math.random() * 1.5;
    data.push({ time: `Day ${i + 1}`, price: parseFloat(price.toFixed(2)) });
  }
  return data;
};

const generateDowntrend = (): LineData[] => {
  const data: LineData[] = [];
  let price = 100;
  for (let i = 0; i < 15; i++) {
    price -= 1 + Math.random() * 1.5;
    data.push({ time: `Day ${i + 1}`, price: parseFloat(price.toFixed(2)) });
  }
  return data;
};

const generateHeadAndShoulders = (): LineData[] => {
  const data: LineData[] = [];
  const points = [70, 75, 80, 85, 82, 78, 82, 88, 94, 88, 82, 78, 82, 86, 82, 78, 74, 70, 66];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateAscendingTriangle = (): LineData[] => {
  const data: LineData[] = [];
  const points = [80, 88, 85, 90, 87, 90, 88, 90, 89, 90, 90, 92, 95, 98, 102];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateDescendingTriangle = (): LineData[] => {
  const data: LineData[] = [];
  const points = [100, 92, 95, 90, 93, 90, 92, 90, 91, 90, 90, 88, 85, 82, 78];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateBullFlag = (): LineData[] => {
  const data: LineData[] = [];
  const points = [70, 75, 82, 90, 95, 93, 91, 90, 89, 88, 87, 88, 90, 94, 100];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateMorningStar = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 100;
  
  // Downtrend
  for (let i = 0; i < 6; i++) {
    const change = -1.5 - Math.random() * 1.5;
    const open = price;
    const close = price + change;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, open + 0.3, close - 0.3, close]
    });
    price = close;
  }
  
  // Large bearish
  const bear1Open = price;
  const bear1Close = price - 3;
  data.push({
    x: new Date(baseDate.getTime() + 6 * 24 * 60 * 60 * 1000),
    y: [bear1Open, bear1Open + 0.2, bear1Close - 0.2, bear1Close]
  });
  
  // Small body (star)
  const starOpen = bear1Close - 0.5;
  const starClose = starOpen + 0.3;
  data.push({
    x: new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    y: [starOpen, starClose + 0.5, starOpen - 0.5, starClose]
  });
  
  // Large bullish
  const bull1Open = starClose + 0.3;
  const bull1Close = bear1Open;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [bull1Open, bull1Close + 0.2, bull1Open - 0.2, bull1Close]
  });
  
  return data;
};

const generateEveningStar = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 80;
  
  // Uptrend
  for (let i = 0; i < 6; i++) {
    const change = 1.5 + Math.random() * 1.5;
    const open = price;
    const close = price + change;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, close + 0.3, open - 0.3, close]
    });
    price = close;
  }
  
  // Large bullish
  const bull1Open = price;
  const bull1Close = price + 3;
  data.push({
    x: new Date(baseDate.getTime() + 6 * 24 * 60 * 60 * 1000),
    y: [bull1Open, bull1Close + 0.2, bull1Open - 0.2, bull1Close]
  });
  
  // Small body (star)
  const starOpen = bull1Close + 0.5;
  const starClose = starOpen - 0.3;
  data.push({
    x: new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    y: [starOpen, starOpen + 0.5, starClose - 0.5, starClose]
  });
  
  // Large bearish
  const bear1Open = starClose - 0.3;
  const bear1Close = bull1Open;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [bear1Open, bear1Open + 0.2, bear1Close - 0.2, bear1Close]
  });
  
  return data;
};

const generateThreeWhiteSoldiers = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 100;
  
  // Downtrend
  for (let i = 0; i < 6; i++) {
    const change = -1.5 - Math.random();
    const open = price;
    const close = price + change;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, open + 0.3, close - 0.3, close]
    });
    price = close;
  }
  
  // Three white soldiers
  for (let i = 0; i < 3; i++) {
    const open = price;
    const close = price + 2.5;
    data.push({
      x: new Date(baseDate.getTime() + (6 + i) * 24 * 60 * 60 * 1000),
      y: [open, close + 0.2, open - 0.2, close]
    });
    price = close;
  }
  
  return data;
};

const generateThreeBlackCrows = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 80;
  
  // Uptrend
  for (let i = 0; i < 6; i++) {
    const change = 1.5 + Math.random();
    const open = price;
    const close = price + change;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, close + 0.3, open - 0.3, close]
    });
    price = close;
  }
  
  // Three black crows
  for (let i = 0; i < 3; i++) {
    const open = price;
    const close = price - 2.5;
    data.push({
      x: new Date(baseDate.getTime() + (6 + i) * 24 * 60 * 60 * 1000),
      y: [open, open + 0.2, close - 0.2, close]
    });
    price = close;
  }
  
  return data;
};

const generateSupportBounce = (): LineData[] => {
  const data: LineData[] = [];
  const points = [95, 92, 88, 85, 82, 80, 80, 82, 85, 88, 92, 95, 98, 100, 102];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateResistanceReject = (): LineData[] => {
  const data: LineData[] = [];
  const points = [85, 88, 92, 95, 98, 100, 100, 98, 95, 92, 88, 85, 82, 80, 78];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateCupAndHandle = (): LineData[] => {
  const data: LineData[] = [];
  const points = [100, 95, 90, 86, 84, 85, 88, 92, 96, 99, 97, 98, 100, 103, 108];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateBearFlag = (): LineData[] => {
  const data: LineData[] = [];
  const points = [100, 95, 88, 80, 75, 77, 79, 80, 81, 82, 81, 80, 76, 72, 68];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateTripleBottom = (): LineData[] => {
  const data: LineData[] = [];
  const points = [100, 95, 90, 85, 80, 84, 88, 84, 80, 84, 88, 84, 80, 85, 92, 98, 105];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateInverseHeadAndShoulders = (): LineData[] => {
  const data: LineData[] = [];
  const points = [100, 95, 90, 85, 88, 92, 88, 82, 76, 82, 88, 92, 88, 84, 88, 92, 96, 100, 104];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateWedgeFallingBullish = (): LineData[] => {
  const data: LineData[] = [];
  const points = [100, 97, 95, 92, 90, 89, 87, 86, 85, 84, 85, 88, 92, 97, 103];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateWedgeRisingBearish = (): LineData[] => {
  const data: LineData[] = [];
  const points = [80, 83, 85, 88, 90, 91, 93, 94, 95, 96, 95, 92, 88, 83, 77];
  points.forEach((price, i) => {
    data.push({ time: `Day ${i + 1}`, price });
  });
  return data;
};

const generateHangingMan = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 80;
  
  // Uptrend
  for (let i = 0; i < 8; i++) {
    const change = 1.5 + Math.random() * 1.5;
    const open = price;
    const close = price + change;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, close + 0.3, open - 0.3, close]
    });
    price = close;
  }
  
  // Hanging man
  const hangOpen = price;
  const hangClose = hangOpen - 0.3;
  const hangHigh = hangOpen + 0.2;
  const hangLow = hangOpen - 4;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [hangOpen, hangHigh, hangLow, hangClose]
  });
  
  return data;
};

const generatePiercingPattern = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 100;
  
  // Downtrend
  for (let i = 0; i < 7; i++) {
    const change = -1.5 - Math.random();
    const open = price;
    const close = price + change;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, open + 0.3, close - 0.3, close]
    });
    price = close;
  }
  
  // Large bearish
  const bear1Open = price;
  const bear1Close = price - 3;
  data.push({
    x: new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    y: [bear1Open, bear1Open + 0.2, bear1Close - 0.2, bear1Close]
  });
  
  // Piercing bullish (opens below, closes above midpoint)
  const bullOpen = bear1Close - 0.5;
  const bullClose = (bear1Open + bear1Close) / 2 + 1;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [bullOpen, bullClose + 0.2, bullOpen - 0.2, bullClose]
  });
  
  return data;
};

const generateDarkCloudCover = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 80;
  
  // Uptrend
  for (let i = 0; i < 7; i++) {
    const change = 1.5 + Math.random();
    const open = price;
    const close = price + change;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, close + 0.3, open - 0.3, close]
    });
    price = close;
  }
  
  // Large bullish
  const bull1Open = price;
  const bull1Close = price + 3;
  data.push({
    x: new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    y: [bull1Open, bull1Close + 0.2, bull1Open - 0.2, bull1Close]
  });
  
  // Dark cloud (opens above, closes below midpoint)
  const bearOpen = bull1Close + 0.5;
  const bearClose = (bull1Open + bull1Close) / 2 - 1;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [bearOpen, bearOpen + 0.2, bearClose - 0.2, bearClose]
  });
  
  return data;
};

const generateMarubozu = (): CandleData[] => {
  const baseDate = new Date('2024-01-01');
  const data: CandleData[] = [];
  let price = 85;
  
  // Mixed candles
  for (let i = 0; i < 8; i++) {
    const change = (Math.random() - 0.5) * 2;
    const open = price;
    const close = price + change;
    data.push({
      x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: [open, Math.max(open, close) + 0.3, Math.min(open, close) - 0.3, close]
    });
    price = close;
  }
  
  // Bullish marubozu (no wicks)
  const maruOpen = price;
  const maruClose = price + 4;
  data.push({
    x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
    y: [maruOpen, maruClose, maruOpen, maruClose]
  });
  
  return data;
};

// Visual Chart Practice Questions
export const chartPracticeQuestions: PracticeQuestion[] = [
  {
    id: 1001,
    title: "Hammer Candlestick",
    question: "What signal does this candlestick pattern give?",
    description: "Identify the reversal pattern at the bottom of the downtrend",
    chartType: 'candlestick',
    candleData: generateBullishHammer(),
    correctAnswer: 'buy',
    explanation: "A hammer at the bottom of a downtrend signals potential bullish reversal. The long lower shadow shows buyers stepped in and pushed price up from the lows.",
    patternName: "Hammer (Bullish Reversal)",
    category: "Candlesticks",
    difficulty: "beginner",
    options: []
  },
  {
    id: 1002,
    title: "Bearish Engulfing",
    question: "What is the likely next move?",
    description: "A large red candle has engulfed the previous green candle at the top",
    chartType: 'candlestick',
    candleData: generateBearishEngulfing(),
    correctAnswer: 'sell',
    explanation: "Bearish engulfing at the top of an uptrend is a strong reversal signal. Sellers have overwhelmed buyers, indicating a potential trend change.",
    patternName: "Bearish Engulfing",
    category: "Candlesticks",
    difficulty: "beginner",
    options: []
  },
  {
    id: 1003,
    title: "Bullish Engulfing",
    question: "What action should you consider?",
    description: "A large green candle has engulfed the previous red candle at the bottom",
    chartType: 'candlestick',
    candleData: generateBullishEngulfing(),
    correctAnswer: 'buy',
    explanation: "Bullish engulfing at the bottom of a downtrend signals strong buying pressure. This is a powerful reversal pattern indicating potential upside.",
    patternName: "Bullish Engulfing",
    category: "Candlesticks",
    difficulty: "beginner",
    options: []
  },
  {
    id: 1004,
    title: "Shooting Star",
    question: "Based on this pattern, what's your decision?",
    description: "Notice the candle with long upper shadow at the top of uptrend",
    chartType: 'candlestick',
    candleData: generateShootingStar(),
    correctAnswer: 'sell',
    explanation: "A shooting star at the top of an uptrend signals bearish reversal. The long upper shadow shows sellers pushed price down from highs - bearish signal.",
    patternName: "Shooting Star (Bearish Reversal)",
    category: "Candlesticks",
    difficulty: "beginner",
    options: []
  },
  {
    id: 1005,
    title: "Double Bottom Pattern",
    question: "What does this chart pattern signal?",
    description: "Price tested the same support level twice and bounced",
    chartType: 'line',
    lineData: generateDoubleBottom(),
    correctAnswer: 'buy',
    explanation: "A double bottom is a bullish reversal pattern. Two tests of the same support level followed by a bounce indicates strong buying interest.",
    patternName: "Double Bottom (W Pattern)",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1006,
    title: "Double Top Pattern",
    question: "What action does this pattern suggest?",
    description: "Price tested the same resistance level twice and rejected",
    chartType: 'line',
    lineData: generateDoubleTop(),
    correctAnswer: 'sell',
    explanation: "A double top is a bearish reversal pattern. Two failed attempts to break resistance indicates sellers are in control.",
    patternName: "Double Top (M Pattern)",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1007,
    title: "Strong Uptrend",
    question: "What's the trend direction? Should you buy or sell?",
    description: "Analyze the price movement pattern",
    chartType: 'line',
    lineData: generateUptrend(),
    correctAnswer: 'buy',
    explanation: "A strong uptrend with higher highs and higher lows. The trend is your friend - buy on pullbacks in an uptrend.",
    patternName: "Uptrend",
    category: "Trend Analysis",
    difficulty: "beginner",
    options: []
  },
  {
    id: 1008,
    title: "Strong Downtrend",
    question: "Based on the trend, what's your decision?",
    description: "Observe the consistent price direction",
    chartType: 'line',
    lineData: generateDowntrend(),
    correctAnswer: 'sell',
    explanation: "A strong downtrend with lower highs and lower lows. Sell or short on rallies in a downtrend - don't fight the trend.",
    patternName: "Downtrend",
    category: "Trend Analysis",
    difficulty: "beginner",
    options: []
  },
  {
    id: 1009,
    title: "Head and Shoulders",
    question: "What does this classic pattern indicate?",
    description: "Notice the three peaks with the middle being highest",
    chartType: 'line',
    lineData: generateHeadAndShoulders(),
    correctAnswer: 'sell',
    explanation: "Head and Shoulders is a bearish reversal pattern. The neckline break confirms the pattern - expect further downside.",
    patternName: "Head and Shoulders",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1010,
    title: "Ascending Triangle",
    question: "How should you trade this formation?",
    description: "Flat resistance with rising support trendline",
    chartType: 'line',
    lineData: generateAscendingTriangle(),
    correctAnswer: 'buy',
    explanation: "Ascending triangle is typically bullish. Higher lows pushing against flat resistance shows buyers are aggressive - expect upside breakout.",
    patternName: "Ascending Triangle",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1011,
    title: "Descending Triangle",
    question: "What's the likely breakout direction?",
    description: "Flat support with falling resistance trendline",
    chartType: 'line',
    lineData: generateDescendingTriangle(),
    correctAnswer: 'sell',
    explanation: "Descending triangle is typically bearish. Lower highs pushing against flat support shows sellers are aggressive - expect downside breakdown.",
    patternName: "Descending Triangle",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1012,
    title: "Bull Flag Pattern",
    question: "After this consolidation, what's next?",
    description: "Strong move up followed by a slight pullback",
    chartType: 'line',
    lineData: generateBullFlag(),
    correctAnswer: 'buy',
    explanation: "Bull flag is a continuation pattern. The pullback is just a pause - expect the uptrend to continue after the flag breakout.",
    patternName: "Bull Flag",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1013,
    title: "Morning Star",
    question: "What does this 3-candle pattern signal?",
    description: "Large red, small body, then large green at bottom",
    chartType: 'candlestick',
    candleData: generateMorningStar(),
    correctAnswer: 'buy',
    explanation: "Morning star is a powerful bullish reversal. The small candle shows indecision, and the following bullish candle confirms buyers have taken control.",
    patternName: "Morning Star",
    category: "Candlesticks",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1014,
    title: "Evening Star",
    question: "Based on this pattern, what's your trade?",
    description: "Large green, small body, then large red at top",
    chartType: 'candlestick',
    candleData: generateEveningStar(),
    correctAnswer: 'sell',
    explanation: "Evening star is a powerful bearish reversal. The small candle shows hesitation at the top, and the bearish candle confirms sellers are in control.",
    patternName: "Evening Star",
    category: "Candlesticks",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1015,
    title: "Three White Soldiers",
    question: "What momentum does this show?",
    description: "Three consecutive strong bullish candles after downtrend",
    chartType: 'candlestick',
    candleData: generateThreeWhiteSoldiers(),
    correctAnswer: 'buy',
    explanation: "Three white soldiers is a strong bullish pattern. Three consecutive large green candles show sustained buying pressure and momentum shift.",
    patternName: "Three White Soldiers",
    category: "Candlesticks",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1016,
    title: "Three Black Crows",
    question: "What does this pattern tell you?",
    description: "Three consecutive strong bearish candles after uptrend",
    chartType: 'candlestick',
    candleData: generateThreeBlackCrows(),
    correctAnswer: 'sell',
    explanation: "Three black crows is a strong bearish pattern. Three consecutive large red candles show sustained selling pressure and momentum shift.",
    patternName: "Three Black Crows",
    category: "Candlesticks",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1017,
    title: "Support Bounce",
    question: "Price is bouncing off support - your action?",
    description: "Price has reached a key support level and is turning up",
    chartType: 'line',
    lineData: generateSupportBounce(),
    correctAnswer: 'buy',
    explanation: "Buying at support with confirmation of a bounce is a high-probability trade. Support levels are where buyers step in.",
    patternName: "Support Bounce",
    category: "Support & Resistance",
    difficulty: "beginner",
    options: []
  },
  {
    id: 1018,
    title: "Resistance Rejection",
    question: "Price rejected at resistance - what now?",
    description: "Price has reached a key resistance level and is turning down",
    chartType: 'line',
    lineData: generateResistanceReject(),
    correctAnswer: 'sell',
    explanation: "Selling at resistance when price shows rejection is a high-probability trade. Resistance levels are where sellers step in.",
    patternName: "Resistance Rejection",
    category: "Support & Resistance",
    difficulty: "beginner",
    options: []
  },
  {
    id: 1019,
    title: "Doji Indecision",
    question: "A doji has formed after a trend - what does it mean?",
    description: "Small body candle with equal shadows showing market indecision",
    chartType: 'candlestick',
    candleData: generateDoji(),
    correctAnswer: 'sell',
    explanation: "A doji after a trend signals indecision and potential reversal. Wait for confirmation, but lean towards the reversal direction.",
    patternName: "Doji",
    category: "Candlesticks",
    difficulty: "beginner",
    options: []
  },
  {
    id: 1020,
    title: "Inverted Hammer",
    question: "What does this candle at the bottom suggest?",
    description: "Small body at bottom with long upper shadow in downtrend",
    chartType: 'candlestick',
    candleData: (() => {
      const baseDate = new Date('2024-01-01');
      const data: CandleData[] = [];
      let price = 100;
      for (let i = 0; i < 8; i++) {
        const change = -1.5 - Math.random();
        const open = price;
        const close = price + change;
        data.push({
          x: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
          y: [open, open + 0.3, close - 0.3, close]
        });
        price = close;
      }
      const invOpen = price;
      const invClose = invOpen + 0.3;
      data.push({
        x: new Date(baseDate.getTime() + 8 * 24 * 60 * 60 * 1000),
        y: [invOpen, invOpen + 4, invOpen - 0.2, invClose]
      });
      return data;
    })(),
    correctAnswer: 'buy',
    explanation: "Inverted hammer at the bottom of a downtrend can signal bullish reversal. The long upper shadow shows buyers attempting to push price higher.",
    patternName: "Inverted Hammer",
    category: "Candlesticks",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1021,
    title: "Cup and Handle",
    question: "What does this rounded bottom with handle suggest?",
    description: "U-shaped recovery with small pullback before breakout",
    chartType: 'line',
    lineData: generateCupAndHandle(),
    correctAnswer: 'buy',
    explanation: "Cup and handle is a bullish continuation pattern. The cup shows accumulation, and the handle is a final shakeout before the move higher.",
    patternName: "Cup and Handle",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1022,
    title: "Bear Flag",
    question: "After this consolidation in a downtrend, what's likely?",
    description: "Strong drop followed by a small upward consolidation",
    chartType: 'line',
    lineData: generateBearFlag(),
    correctAnswer: 'sell',
    explanation: "Bear flag is a bearish continuation pattern. The consolidation is just a pause before the downtrend continues.",
    patternName: "Bear Flag",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1023,
    title: "Triple Bottom",
    question: "Three tests of support - what's the signal?",
    description: "Price tested the same support level three times",
    chartType: 'line',
    lineData: generateTripleBottom(),
    correctAnswer: 'buy',
    explanation: "Triple bottom is a stronger bullish reversal than double bottom. Three failed attempts to break support shows strong buying interest.",
    patternName: "Triple Bottom",
    category: "Chart Patterns",
    difficulty: "advanced",
    options: []
  },
  {
    id: 1024,
    title: "Inverse Head and Shoulders",
    question: "What does this bottoming pattern indicate?",
    description: "Three troughs with the middle being the lowest",
    chartType: 'line',
    lineData: generateInverseHeadAndShoulders(),
    correctAnswer: 'buy',
    explanation: "Inverse head and shoulders is a bullish reversal pattern. Breaking the neckline confirms the pattern for significant upside.",
    patternName: "Inverse Head and Shoulders",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1025,
    title: "Falling Wedge Breakout",
    question: "This converging pattern broke upward - your action?",
    description: "Both trendlines sloping down, converging",
    chartType: 'line',
    lineData: generateWedgeFallingBullish(),
    correctAnswer: 'buy',
    explanation: "Falling wedge typically breaks to the upside. Both lines sloping down but converging shows selling is exhausting.",
    patternName: "Falling Wedge (Bullish)",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1026,
    title: "Rising Wedge Breakdown",
    question: "This converging pattern is likely to break which way?",
    description: "Both trendlines sloping up but converging",
    chartType: 'line',
    lineData: generateWedgeRisingBearish(),
    correctAnswer: 'sell',
    explanation: "Rising wedge typically breaks to the downside. Converging lines with rising prices shows buying is weakening.",
    patternName: "Rising Wedge (Bearish)",
    category: "Chart Patterns",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1027,
    title: "Hanging Man",
    question: "This hammer-like candle at the top means?",
    description: "Long lower shadow at the top of an uptrend",
    chartType: 'candlestick',
    candleData: generateHangingMan(),
    correctAnswer: 'sell',
    explanation: "Hanging man at the top of uptrend is bearish. Despite buyers pushing up from lows, the fact it appeared at top signals potential reversal.",
    patternName: "Hanging Man",
    category: "Candlesticks",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1028,
    title: "Piercing Pattern",
    question: "This two-candle pattern at bottom signals?",
    description: "Bearish candle followed by bullish closing above midpoint",
    chartType: 'candlestick',
    candleData: generatePiercingPattern(),
    correctAnswer: 'buy',
    explanation: "Piercing pattern is bullish reversal. The bullish candle opening below but closing above midpoint of prior bearish candle shows strong buying.",
    patternName: "Piercing Pattern",
    category: "Candlesticks",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1029,
    title: "Dark Cloud Cover",
    question: "This two-candle pattern at top indicates?",
    description: "Bullish candle followed by bearish closing below midpoint",
    chartType: 'candlestick',
    candleData: generateDarkCloudCover(),
    correctAnswer: 'sell',
    explanation: "Dark cloud cover is bearish reversal. The bearish candle opening above but closing below midpoint of prior bullish candle shows strong selling.",
    patternName: "Dark Cloud Cover",
    category: "Candlesticks",
    difficulty: "intermediate",
    options: []
  },
  {
    id: 1030,
    title: "Bullish Marubozu",
    question: "This full-body candle with no wicks shows?",
    description: "Strong bullish candle with no upper or lower shadows",
    chartType: 'candlestick',
    candleData: generateMarubozu(),
    correctAnswer: 'buy',
    explanation: "Marubozu with no wicks shows complete dominance by buyers. Opening at low and closing at high indicates very strong bullish momentum.",
    patternName: "Bullish Marubozu",
    category: "Candlesticks",
    difficulty: "beginner",
    options: []
  }
];

export const practiceQuestions: PracticeQuestion[] = [
  // RSI (1-15)
  { id: 1, question: "RSI reading of 75 indicates:", options: ["Oversold", "Overbought", "Neutral", "Bullish divergence"], correctAnswer: 1, explanation: "RSI above 70 is overbought territory.", category: "RSI", difficulty: "beginner" },
  { id: 2, question: "RSI below 30 suggests:", options: ["Buy signal potential", "Strong uptrend", "Overbought", "Bearish trend"], correctAnswer: 0, explanation: "RSI below 30 indicates oversold, potential reversal up.", category: "RSI", difficulty: "beginner" },
  { id: 3, question: "RSI divergence occurs when:", options: ["Price and RSI move together", "Price makes new high but RSI doesn't", "RSI stays at 50", "Volume increases"], correctAnswer: 1, explanation: "Divergence signals weakening momentum.", category: "RSI", difficulty: "intermediate" },
  { id: 4, question: "Best RSI setting for day trading:", options: ["14", "7", "21", "50"], correctAnswer: 1, explanation: "Shorter periods like 7 are more responsive for day trading.", category: "RSI", difficulty: "intermediate" },
  { id: 5, question: "RSI at 50 means:", options: ["Overbought", "Oversold", "Neutral momentum", "Buy signal"], correctAnswer: 2, explanation: "RSI at 50 indicates balanced buying/selling pressure.", category: "RSI", difficulty: "beginner" },
  { id: 6, question: "Bullish RSI divergence shows:", options: ["Price low, RSI higher low", "Price high, RSI lower", "Both making highs", "Both making lows"], correctAnswer: 0, explanation: "Price makes lower low but RSI makes higher low = bullish.", category: "RSI", difficulty: "advanced" },
  { id: 7, question: "RSI failure swing is:", options: ["RSI breaking its own support/resistance", "RSI staying flat", "RSI at extreme", "RSI crossing 50"], correctAnswer: 0, explanation: "Failure swings are RSI pattern breakouts.", category: "RSI", difficulty: "advanced" },
  { id: 8, question: "RSI range in sideways market:", options: ["0-100", "30-70", "40-60", "20-80"], correctAnswer: 2, explanation: "In ranging markets, RSI often oscillates 40-60.", category: "RSI", difficulty: "intermediate" },
  { id: 9, question: "RSI crossing above 30 from below signals:", options: ["Sell", "Potential buy", "Hold", "Short"], correctAnswer: 1, explanation: "Crossing up from oversold is a buy signal.", category: "RSI", difficulty: "beginner" },
  { id: 10, question: "Hidden bullish divergence:", options: ["Higher low price, lower low RSI", "Lower low price, higher low RSI", "Higher high price, lower high RSI", "Lower high price, higher high RSI"], correctAnswer: 0, explanation: "Hidden divergence confirms trend continuation.", category: "RSI", difficulty: "advanced" },
  { id: 11, question: "RSI period of 14 means:", options: ["14 days average", "14 candles lookback", "14% change", "14 trades"], correctAnswer: 1, explanation: "RSI calculates over last 14 periods/candles.", category: "RSI", difficulty: "beginner" },
  { id: 12, question: "RSI in strong uptrend often stays:", options: ["Below 30", "Between 40-80", "At 50", "Below 50"], correctAnswer: 1, explanation: "Strong trends keep RSI elevated.", category: "RSI", difficulty: "intermediate" },
  { id: 13, question: "Bearish RSI divergence indicates:", options: ["Uptrend weakening", "Downtrend weakening", "Strong buying", "Continuation"], correctAnswer: 0, explanation: "Price makes higher high, RSI doesn't = weakness.", category: "RSI", difficulty: "intermediate" },
  { id: 14, question: "RSI centerline crossover strategy uses:", options: ["70/30 levels", "50 level", "80/20 levels", "60/40 levels"], correctAnswer: 1, explanation: "Crossing 50 indicates momentum shift.", category: "RSI", difficulty: "intermediate" },
  { id: 15, question: "RSI can stay overbought during:", options: ["Sideways market", "Strong downtrend", "Strong uptrend", "Low volume"], correctAnswer: 2, explanation: "In strong trends, RSI can stay extreme for long.", category: "RSI", difficulty: "advanced" },

  // MACD (16-30)
  { id: 16, question: "MACD line crossing above signal line is:", options: ["Bearish", "Bullish", "Neutral", "Exit signal"], correctAnswer: 1, explanation: "MACD crossing above signal = bullish crossover.", category: "MACD", difficulty: "beginner" },
  { id: 17, question: "MACD histogram shows:", options: ["Volume", "Price", "Difference between MACD and signal", "RSI"], correctAnswer: 2, explanation: "Histogram = MACD line minus signal line.", category: "MACD", difficulty: "beginner" },
  { id: 18, question: "MACD zero line crossover indicates:", options: ["Trend change", "Overbought", "Oversold", "Consolidation"], correctAnswer: 0, explanation: "Crossing zero shows momentum shift.", category: "MACD", difficulty: "intermediate" },
  { id: 19, question: "Standard MACD settings are:", options: ["12, 26, 9", "9, 21, 5", "14, 28, 7", "10, 20, 5"], correctAnswer: 0, explanation: "12, 26, 9 are the default MACD parameters.", category: "MACD", difficulty: "beginner" },
  { id: 20, question: "MACD divergence signals:", options: ["Trend continuation", "Potential reversal", "High volume", "Support level"], correctAnswer: 1, explanation: "Divergence between price and MACD warns of reversal.", category: "MACD", difficulty: "intermediate" },
  { id: 21, question: "MACD is a:", options: ["Leading indicator", "Lagging indicator", "Volume indicator", "Volatility indicator"], correctAnswer: 1, explanation: "MACD uses moving averages, making it lagging.", category: "MACD", difficulty: "beginner" },
  { id: 22, question: "Shrinking MACD histogram suggests:", options: ["Increasing momentum", "Decreasing momentum", "High volatility", "Volume spike"], correctAnswer: 1, explanation: "Shrinking bars show momentum is fading.", category: "MACD", difficulty: "intermediate" },
  { id: 23, question: "MACD signal line is:", options: ["12 EMA of MACD", "9 EMA of MACD", "26 EMA of price", "SMA of MACD"], correctAnswer: 1, explanation: "Signal line is 9-period EMA of MACD line.", category: "MACD", difficulty: "intermediate" },
  { id: 24, question: "MACD best used for:", options: ["Ranging markets only", "Trending markets", "News trading", "Scalping only"], correctAnswer: 1, explanation: "MACD works best in trending conditions.", category: "MACD", difficulty: "intermediate" },
  { id: 25, question: "Bullish MACD divergence:", options: ["Price lower low, MACD higher low", "Price higher high, MACD lower", "Both lower", "Both higher"], correctAnswer: 0, explanation: "Price falls but MACD rises = bullish divergence.", category: "MACD", difficulty: "advanced" },
  { id: 26, question: "MACD line is calculated as:", options: ["12 EMA - 26 EMA", "26 EMA - 12 EMA", "12 SMA - 26 SMA", "RSI - 50"], correctAnswer: 0, explanation: "MACD = 12 period EMA minus 26 period EMA.", category: "MACD", difficulty: "intermediate" },
  { id: 27, question: "MACD histogram turning positive means:", options: ["MACD below signal", "MACD above signal", "Zero crossover", "Bearish signal"], correctAnswer: 1, explanation: "Positive histogram = MACD above signal line.", category: "MACD", difficulty: "beginner" },
  { id: 28, question: "Fast MACD settings for scalping:", options: ["12, 26, 9", "5, 13, 4", "20, 40, 10", "8, 17, 9"], correctAnswer: 1, explanation: "Shorter periods react faster for scalping.", category: "MACD", difficulty: "advanced" },
  { id: 29, question: "MACD works poorly in:", options: ["Uptrends", "Downtrends", "Sideways markets", "Volatile markets"], correctAnswer: 2, explanation: "MACD gives false signals in ranging markets.", category: "MACD", difficulty: "intermediate" },
  { id: 30, question: "MACD and RSI together provide:", options: ["Confirmation signals", "Same information", "Conflicting data", "Volume data"], correctAnswer: 0, explanation: "Using both provides signal confirmation.", category: "MACD", difficulty: "intermediate" },

  // Bollinger Bands (31-45)
  { id: 31, question: "Bollinger Bands consist of:", options: ["2 lines", "3 lines", "4 lines", "1 line"], correctAnswer: 1, explanation: "Upper band, middle SMA, lower band.", category: "Bollinger Bands", difficulty: "beginner" },
  { id: 32, question: "Price touching upper Bollinger Band suggests:", options: ["Oversold", "Overbought/strong trend", "Buy signal", "Support"], correctAnswer: 1, explanation: "Upper band touch can mean overbought or strong uptrend.", category: "Bollinger Bands", difficulty: "beginner" },
  { id: 33, question: "Bollinger Band squeeze indicates:", options: ["High volatility", "Low volatility, breakout coming", "Downtrend", "Uptrend"], correctAnswer: 1, explanation: "Squeeze = low volatility, expect big move.", category: "Bollinger Bands", difficulty: "intermediate" },
  { id: 34, question: "Standard Bollinger Band settings:", options: ["20, 2", "14, 1.5", "50, 3", "10, 1"], correctAnswer: 0, explanation: "20-period SMA with 2 standard deviations.", category: "Bollinger Bands", difficulty: "beginner" },
  { id: 35, question: "Bollinger Bandwidth measures:", options: ["Volume", "Volatility", "Trend direction", "Support level"], correctAnswer: 1, explanation: "Bandwidth = (Upper - Lower) / Middle, shows volatility.", category: "Bollinger Bands", difficulty: "intermediate" },
  { id: 36, question: "Walking the bands means:", options: ["Consolidation", "Strong trend touching band repeatedly", "Reversal", "Low volume"], correctAnswer: 1, explanation: "Price riding upper/lower band shows strong trend.", category: "Bollinger Bands", difficulty: "intermediate" },
  { id: 37, question: "Bollinger Band middle line is:", options: ["EMA", "SMA", "VWAP", "Median"], correctAnswer: 1, explanation: "Middle band is typically 20-period SMA.", category: "Bollinger Bands", difficulty: "beginner" },
  { id: 38, question: "Double bottom at lower band signals:", options: ["Sell", "Potential buy", "Short", "Wait"], correctAnswer: 1, explanation: "W pattern at lower band is bullish.", category: "Bollinger Bands", difficulty: "advanced" },
  { id: 39, question: "Bollinger Bands expand when:", options: ["Volatility increases", "Volatility decreases", "Volume drops", "Price is flat"], correctAnswer: 0, explanation: "Bands widen with increased volatility.", category: "Bollinger Bands", difficulty: "beginner" },
  { id: 40, question: "%B indicator shows:", options: ["Volume percentage", "Price position within bands", "Band width", "Trend strength"], correctAnswer: 1, explanation: "%B shows where price is relative to bands.", category: "Bollinger Bands", difficulty: "advanced" },
  { id: 41, question: "After a squeeze, price usually:", options: ["Stays flat", "Makes significant move", "Reverses trend", "Gaps down"], correctAnswer: 1, explanation: "Squeeze precedes volatility expansion.", category: "Bollinger Bands", difficulty: "intermediate" },
  { id: 42, question: "Bollinger Band breakout trade:", options: ["Buy when price exits upper band", "Fade the breakout", "Wait for confirmation", "Sell immediately"], correctAnswer: 2, explanation: "Wait for close outside band with confirmation.", category: "Bollinger Bands", difficulty: "intermediate" },
  { id: 43, question: "Mean reversion strategy uses bands for:", options: ["Trend following", "Buying low, selling high within bands", "Breakout trading", "News trading"], correctAnswer: 1, explanation: "Mean reversion expects price to return to middle.", category: "Bollinger Bands", difficulty: "intermediate" },
  { id: 44, question: "Bollinger Bands work best with:", options: ["Only in isolation", "Volume and other indicators", "News only", "Fundamentals only"], correctAnswer: 1, explanation: "Combining with volume/RSI improves signals.", category: "Bollinger Bands", difficulty: "intermediate" },
  { id: 45, question: "Headfake in Bollinger Bands is:", options: ["True breakout", "False breakout reversing quickly", "Gap up", "High volume spike"], correctAnswer: 1, explanation: "Headfake = false breakout that reverses.", category: "Bollinger Bands", difficulty: "advanced" },

  // Candlestick Patterns (46-75)
  { id: 46, question: "Doji candle indicates:", options: ["Strong trend", "Indecision", "Bullish reversal", "Bearish reversal"], correctAnswer: 1, explanation: "Doji shows equal buying/selling = indecision.", category: "Candlesticks", difficulty: "beginner" },
  { id: 47, question: "Hammer candle at bottom suggests:", options: ["Continuation down", "Potential reversal up", "No change", "Sell signal"], correctAnswer: 1, explanation: "Hammer at support = bullish reversal signal.", category: "Candlesticks", difficulty: "beginner" },
  { id: 48, question: "Engulfing bullish pattern:", options: ["Small green engulfs red", "Large green engulfs prior red", "Two red candles", "Doji after trend"], correctAnswer: 1, explanation: "Large bullish candle completely engulfs prior bearish.", category: "Candlesticks", difficulty: "beginner" },
  { id: 49, question: "Shooting star appears:", options: ["At bottom", "At top of uptrend", "In consolidation", "After gap"], correctAnswer: 1, explanation: "Shooting star at top = bearish reversal.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 50, question: "Morning star is:", options: ["Single candle", "Two candle pattern", "Three candle bullish reversal", "Bearish pattern"], correctAnswer: 2, explanation: "Morning star: bearish, small body, bullish = reversal.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 51, question: "Evening star signals:", options: ["Bullish reversal", "Bearish reversal at top", "Continuation", "Indecision"], correctAnswer: 1, explanation: "Evening star: bullish, small, bearish = top reversal.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 52, question: "Three white soldiers indicate:", options: ["Bearish reversal", "Strong bullish momentum", "Consolidation", "Weakness"], correctAnswer: 1, explanation: "Three consecutive bullish candles = strong buying.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 53, question: "Three black crows signal:", options: ["Bullish reversal", "Strong bearish momentum", "Neutral", "Accumulation"], correctAnswer: 1, explanation: "Three consecutive bearish candles = strong selling.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 54, question: "Inverted hammer at bottom:", options: ["Bearish", "Potential bullish reversal", "Continuation", "No significance"], correctAnswer: 1, explanation: "Inverted hammer at support can signal reversal up.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 55, question: "Hanging man appears:", options: ["At bottom", "At top after uptrend", "In downtrend", "During consolidation"], correctAnswer: 1, explanation: "Hanging man at top = potential bearish reversal.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 56, question: "Dragonfly doji has:", options: ["Long upper shadow", "Long lower shadow, no upper", "Equal shadows", "No shadows"], correctAnswer: 1, explanation: "Dragonfly: long lower wick, open=close=high.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 57, question: "Gravestone doji indicates:", options: ["Bullish reversal", "Bearish reversal potential", "Strong trend", "Accumulation"], correctAnswer: 1, explanation: "Gravestone: long upper shadow at top = bearish.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 58, question: "Marubozu candle has:", options: ["Long wicks", "No wicks", "Small body", "Doji body"], correctAnswer: 1, explanation: "Marubozu has no shadows = strong momentum.", category: "Candlesticks", difficulty: "beginner" },
  { id: 59, question: "Spinning top shows:", options: ["Strong trend", "Indecision like doji", "Reversal", "Breakout"], correctAnswer: 1, explanation: "Small body with wicks = indecision.", category: "Candlesticks", difficulty: "beginner" },
  { id: 60, question: "Piercing pattern is:", options: ["Bearish", "Bullish reversal at bottom", "Continuation", "Gap pattern"], correctAnswer: 1, explanation: "Bearish candle then bullish closing above midpoint.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 61, question: "Dark cloud cover signals:", options: ["Bullish continuation", "Bearish reversal at top", "Support", "Accumulation"], correctAnswer: 1, explanation: "Bullish then bearish closing below midpoint.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 62, question: "Harami pattern shows:", options: ["Strong momentum", "Potential reversal, small inside large", "Breakout", "Gap"], correctAnswer: 1, explanation: "Small candle within prior large candle body.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 63, question: "Tweezer tops indicate:", options: ["Bullish", "Bearish reversal", "Continuation", "Neutral"], correctAnswer: 1, explanation: "Two candles with same high at top = reversal.", category: "Candlesticks", difficulty: "advanced" },
  { id: 64, question: "Tweezer bottoms signal:", options: ["Bearish", "Bullish reversal", "Distribution", "Weakness"], correctAnswer: 1, explanation: "Two candles with same low at bottom = reversal up.", category: "Candlesticks", difficulty: "advanced" },
  { id: 65, question: "Three inside up pattern:", options: ["Bearish", "Bullish reversal confirmed", "Neutral", "Continuation down"], correctAnswer: 1, explanation: "Harami followed by bullish confirmation candle.", category: "Candlesticks", difficulty: "advanced" },
  { id: 66, question: "Three inside down is:", options: ["Bullish", "Bearish reversal confirmed", "Accumulation", "Support test"], correctAnswer: 1, explanation: "Harami followed by bearish confirmation.", category: "Candlesticks", difficulty: "advanced" },
  { id: 67, question: "Abandoned baby pattern:", options: ["Common pattern", "Rare reversal with gaps", "Continuation", "Volume pattern"], correctAnswer: 1, explanation: "Doji gapped away from both adjacent candles.", category: "Candlesticks", difficulty: "advanced" },
  { id: 68, question: "Kicker pattern indicates:", options: ["Weak signal", "Very strong reversal", "Consolidation", "Range bound"], correctAnswer: 1, explanation: "Gap in opposite direction = strong reversal.", category: "Candlesticks", difficulty: "advanced" },
  { id: 69, question: "Belt hold bullish:", options: ["Opens at high", "Opens at low, closes near high", "Doji pattern", "Small body"], correctAnswer: 1, explanation: "Opens at low with strong bullish close.", category: "Candlesticks", difficulty: "advanced" },
  { id: 70, question: "Rising three methods:", options: ["Reversal pattern", "Bullish continuation", "Bearish pattern", "Indecision"], correctAnswer: 1, explanation: "Large bullish, small retraces, large bullish.", category: "Candlesticks", difficulty: "advanced" },
  { id: 71, question: "Falling three methods:", options: ["Bullish reversal", "Bearish continuation", "Support", "Accumulation"], correctAnswer: 1, explanation: "Large bearish, small bounces, large bearish.", category: "Candlesticks", difficulty: "advanced" },
  { id: 72, question: "Long-legged doji shows:", options: ["Strong trend", "Extreme indecision", "Breakout", "Support"], correctAnswer: 1, explanation: "Very long wicks = extreme uncertainty.", category: "Candlesticks", difficulty: "intermediate" },
  { id: 73, question: "Candle body represents:", options: ["High to low range", "Open to close range", "Volume", "Volatility"], correctAnswer: 1, explanation: "Body shows difference between open and close.", category: "Candlesticks", difficulty: "beginner" },
  { id: 74, question: "Upper shadow indicates:", options: ["Buying pressure", "Selling pressure from high", "Support", "Accumulation"], correctAnswer: 1, explanation: "Upper wick = sellers pushed price down from high.", category: "Candlesticks", difficulty: "beginner" },
  { id: 75, question: "Lower shadow shows:", options: ["Selling pressure", "Buying pressure from low", "Resistance", "Distribution"], correctAnswer: 1, explanation: "Lower wick = buyers pushed price up from low.", category: "Candlesticks", difficulty: "beginner" },

  // Chart Patterns (76-100)
  { id: 76, question: "Head and shoulders is:", options: ["Bullish continuation", "Bearish reversal pattern", "Support pattern", "Accumulation"], correctAnswer: 1, explanation: "H&S at top signals trend reversal down.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 77, question: "Inverse head and shoulders signals:", options: ["Bearish reversal", "Bullish reversal", "Continuation down", "Distribution"], correctAnswer: 1, explanation: "IH&S at bottom = potential reversal up.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 78, question: "Double top pattern indicates:", options: ["Bullish continuation", "Bearish reversal", "Support", "Breakout"], correctAnswer: 1, explanation: "Two peaks at same level = resistance, reversal.", category: "Chart Patterns", difficulty: "beginner" },
  { id: 79, question: "Double bottom signals:", options: ["Bearish reversal", "Bullish reversal", "Continuation down", "Resistance"], correctAnswer: 1, explanation: "Two lows at same level = support, reversal up.", category: "Chart Patterns", difficulty: "beginner" },
  { id: 80, question: "Bull flag pattern is:", options: ["Reversal pattern", "Bullish continuation", "Bearish", "Support test"], correctAnswer: 1, explanation: "Strong move up, consolidation, continue up.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 81, question: "Bear flag indicates:", options: ["Bullish reversal", "Bearish continuation", "Support", "Accumulation"], correctAnswer: 1, explanation: "Strong move down, consolidation, continue down.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 82, question: "Cup and handle is:", options: ["Bearish pattern", "Bullish continuation", "Reversal", "Distribution"], correctAnswer: 1, explanation: "U-shape recovery then small pullback = bullish.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 83, question: "Ascending triangle indicates:", options: ["Bearish", "Bullish breakout likely", "Reversal", "No bias"], correctAnswer: 1, explanation: "Flat top, rising lows = buyers gaining strength.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 84, question: "Descending triangle signals:", options: ["Bullish", "Bearish breakout likely", "Reversal up", "Neutral"], correctAnswer: 1, explanation: "Flat bottom, lower highs = sellers gaining.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 85, question: "Symmetrical triangle is:", options: ["Always bullish", "Always bearish", "Can break either way", "Reversal only"], correctAnswer: 2, explanation: "Converging lines, wait for breakout direction.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 86, question: "Wedge pattern differs from triangle by:", options: ["Volume", "Both lines sloping same direction", "Time", "Size"], correctAnswer: 1, explanation: "Wedges have both trendlines moving same way.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 87, question: "Rising wedge is typically:", options: ["Bullish", "Bearish", "Neutral", "Continuation"], correctAnswer: 1, explanation: "Rising wedge usually breaks down.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 88, question: "Falling wedge signals:", options: ["Bearish", "Bullish breakout", "Continuation down", "Distribution"], correctAnswer: 1, explanation: "Falling wedge usually breaks up.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 89, question: "Pennant pattern is:", options: ["Reversal", "Short-term continuation", "Long-term trend", "Support"], correctAnswer: 1, explanation: "Small symmetrical triangle after strong move.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 90, question: "Rectangle pattern shows:", options: ["Trend change", "Consolidation between levels", "Reversal", "Gap"], correctAnswer: 1, explanation: "Price bouncing between support and resistance.", category: "Chart Patterns", difficulty: "beginner" },
  { id: 91, question: "Triple top is:", options: ["More reliable than double top", "Less reliable", "Same as double", "Bullish"], correctAnswer: 0, explanation: "Three tests of resistance = stronger pattern.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 92, question: "Rounding bottom indicates:", options: ["Bearish", "Slow bullish reversal", "Fast reversal", "Distribution"], correctAnswer: 1, explanation: "Gradual shift from selling to buying.", category: "Chart Patterns", difficulty: "advanced" },
  { id: 93, question: "Diamond pattern is:", options: ["Common", "Rare reversal pattern", "Continuation", "Support"], correctAnswer: 1, explanation: "Expanding then contracting range = reversal.", category: "Chart Patterns", difficulty: "advanced" },
  { id: 94, question: "Breakout confirmation needs:", options: ["Price above resistance only", "Price and volume", "Time only", "News"], correctAnswer: 1, explanation: "Valid breakouts have increased volume.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 95, question: "Neckline in H&S is:", options: ["The head level", "Support connecting shoulders", "Resistance", "The peak"], correctAnswer: 1, explanation: "Neckline connects lows between head/shoulders.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 96, question: "Pattern target is often measured by:", options: ["Time", "Pattern height projected", "Volume", "Random"], correctAnswer: 1, explanation: "Measure pattern height, project from breakout.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 97, question: "Failed pattern breakout:", options: ["Still valid", "Often leads to opposite move", "Should be ignored", "Common"], correctAnswer: 1, explanation: "Failed breakouts often reverse strongly.", category: "Chart Patterns", difficulty: "advanced" },
  { id: 98, question: "Higher timeframe patterns are:", options: ["Less reliable", "More reliable", "Same reliability", "Faster to complete"], correctAnswer: 1, explanation: "Higher timeframes = more significant patterns.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 99, question: "Throwback in chart patterns:", options: ["Pattern failure", "Retest of breakout level", "Fake breakout", "Volume spike"], correctAnswer: 1, explanation: "Price returns to breakout point before continuing.", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 100, question: "Inverted cup and handle is:", options: ["Bullish", "Bearish continuation", "Neutral", "Reversal up"], correctAnswer: 1, explanation: "Upside down C&H = bearish continuation.", category: "Chart Patterns", difficulty: "advanced" },

  // Support & Resistance (101-115)
  { id: 101, question: "Support level is where:", options: ["Selling overwhelms buying", "Buying overwhelms selling", "No activity", "Gaps form"], correctAnswer: 1, explanation: "Support = demand zone stopping price decline.", category: "Support & Resistance", difficulty: "beginner" },
  { id: 102, question: "Resistance becomes support when:", options: ["Price stays below", "Price breaks above and holds", "Volume drops", "Never"], correctAnswer: 1, explanation: "Broken resistance often becomes new support.", category: "Support & Resistance", difficulty: "beginner" },
  { id: 103, question: "More touches on support level means:", options: ["Weaker level", "Stronger level", "No difference", "Breakout soon"], correctAnswer: 1, explanation: "Multiple tests validate the level.", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 104, question: "Round numbers as S/R:", options: ["Meaningless", "Psychological levels", "Only for stocks", "Technical only"], correctAnswer: 1, explanation: "Round numbers (100, 50) act as psychological S/R.", category: "Support & Resistance", difficulty: "beginner" },
  { id: 105, question: "Dynamic support/resistance:", options: ["Fixed horizontal lines", "Moving averages", "Fibonacci only", "News levels"], correctAnswer: 1, explanation: "Moving averages provide dynamic S/R.", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 106, question: "When support breaks:", options: ["Buy more", "Expect further decline", "Price recovers", "Volume drops"], correctAnswer: 1, explanation: "Broken support often accelerates selling.", category: "Support & Resistance", difficulty: "beginner" },
  { id: 107, question: "Zone trading means:", options: ["Trading exact prices", "Trading areas not exact lines", "Scalping", "News trading"], correctAnswer: 1, explanation: "S/R are zones, not precise lines.", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 108, question: "Best entry near support:", options: ["Exact at support line", "Slightly above with confirmation", "Below support", "Any level"], correctAnswer: 1, explanation: "Enter with confirmation, not blind at level.", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 109, question: "Confluence in S/R:", options: ["Single level", "Multiple levels lining up", "No levels", "Only Fibonacci"], correctAnswer: 1, explanation: "Multiple S/R at same area = strong zone.", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 110, question: "Horizontal S/R vs trendline:", options: ["Same thing", "Horizontal is static, trendline is diagonal", "Trendline is stronger", "Horizontal only for crypto"], correctAnswer: 1, explanation: "Horizontal = fixed, trendlines = sloped.", category: "Support & Resistance", difficulty: "beginner" },
  { id: 111, question: "Identifying key levels uses:", options: ["Recent highs/lows", "Random points", "Only moving averages", "Only news"], correctAnswer: 0, explanation: "Look for obvious swing highs and lows.", category: "Support & Resistance", difficulty: "beginner" },
  { id: 112, question: "Supply zone is:", options: ["Support area", "Resistance area", "Neutral zone", "Gap"], correctAnswer: 1, explanation: "Supply zone = area of selling pressure.", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 113, question: "Demand zone is:", options: ["Resistance", "Support area", "Overbought area", "Distribution"], correctAnswer: 1, explanation: "Demand zone = area of buying pressure.", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 114, question: "Breakout from range needs:", options: ["Price move only", "Price and volume confirmation", "Time only", "News catalyst"], correctAnswer: 1, explanation: "Strong breakouts have volume behind them.", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 115, question: "Liquidity at S/R levels:", options: ["Low", "High due to stop orders", "None", "Only at resistance"], correctAnswer: 1, explanation: "Many stops cluster at obvious levels.", category: "Support & Resistance", difficulty: "advanced" },

  // Moving Averages (116-130)
  { id: 116, question: "SMA vs EMA: EMA is:", options: ["Slower", "Faster reacting", "Same", "For long term only"], correctAnswer: 1, explanation: "EMA gives more weight to recent prices.", category: "Moving Averages", difficulty: "beginner" },
  { id: 117, question: "Golden cross is:", options: ["50 MA crossing below 200", "50 MA crossing above 200", "Price crossing MA", "Two EMAs crossing"], correctAnswer: 1, explanation: "Golden cross = 50 above 200 = bullish.", category: "Moving Averages", difficulty: "beginner" },
  { id: 118, question: "Death cross signals:", options: ["Bullish trend", "Bearish trend starting", "Consolidation", "High volatility"], correctAnswer: 1, explanation: "Death cross = 50 below 200 = bearish.", category: "Moving Averages", difficulty: "beginner" },
  { id: 119, question: "200 MA is commonly used for:", options: ["Scalping", "Long-term trend direction", "News trading", "Options only"], correctAnswer: 1, explanation: "200 MA defines long-term trend.", category: "Moving Averages", difficulty: "beginner" },
  { id: 120, question: "Price above rising 20 EMA:", options: ["Bearish", "Short-term uptrend", "No significance", "Sell signal"], correctAnswer: 1, explanation: "Price above rising MA = bullish bias.", category: "Moving Averages", difficulty: "beginner" },
  { id: 121, question: "MA ribbon uses:", options: ["Single MA", "Multiple MAs of different periods", "Only EMA", "Fixed periods only"], correctAnswer: 1, explanation: "Ribbon shows multiple MAs for trend strength.", category: "Moving Averages", difficulty: "intermediate" },
  { id: 122, question: "MA crossover strategy:", options: ["Buy when fast crosses above slow", "Sell when fast above slow", "Ignore crossovers", "Only use one MA"], correctAnswer: 0, explanation: "Fast MA crossing above slow = buy signal.", category: "Moving Averages", difficulty: "beginner" },
  { id: 123, question: "MA as dynamic support in uptrend:", options: ["Price bounces off MA", "Price breaks MA", "MA is irrelevant", "Only at 200 MA"], correctAnswer: 0, explanation: "Trending markets often bounce off key MAs.", category: "Moving Averages", difficulty: "intermediate" },
  { id: 124, question: "Lagging nature of MAs means:", options: ["Predict future", "React to past price", "Lead indicators", "Real-time signals"], correctAnswer: 1, explanation: "MAs are based on historical prices.", category: "Moving Averages", difficulty: "beginner" },
  { id: 125, question: "Shorter MA period:", options: ["Smoother, fewer signals", "More responsive, more signals", "Same as longer", "For weekly charts only"], correctAnswer: 1, explanation: "Shorter period = more sensitive to price.", category: "Moving Averages", difficulty: "beginner" },
  { id: 126, question: "MA slope indicates:", options: ["Volume", "Trend direction and strength", "Support level", "Volatility"], correctAnswer: 1, explanation: "Rising MA = uptrend, falling = downtrend.", category: "Moving Averages", difficulty: "intermediate" },
  { id: 127, question: "Best MA for your strategy depends on:", options: ["One size fits all", "Your timeframe and style", "Only the asset", "Volume"], correctAnswer: 1, explanation: "Choose MA based on trading style.", category: "Moving Averages", difficulty: "intermediate" },
  { id: 128, question: "MA whipsaw happens in:", options: ["Strong trends", "Choppy sideways markets", "After breakouts", "High volume"], correctAnswer: 1, explanation: "MAs give false signals in ranging markets.", category: "Moving Averages", difficulty: "intermediate" },
  { id: 129, question: "VWAP is:", options: ["Simple average", "Volume weighted average price", "Exponential MA", "Volatility measure"], correctAnswer: 1, explanation: "VWAP factors in volume at each price.", category: "Moving Averages", difficulty: "intermediate" },
  { id: 130, question: "Price far from MA suggests:", options: ["Trend continuation", "Potential mean reversion", "No significance", "Volume spike"], correctAnswer: 1, explanation: "Extended price often reverts to MA.", category: "Moving Averages", difficulty: "intermediate" },

  // Volume (131-145)
  { id: 131, question: "Rising price with rising volume:", options: ["Weak trend", "Strong trend confirmation", "Reversal coming", "Distribution"], correctAnswer: 1, explanation: "Volume confirms price moves.", category: "Volume", difficulty: "beginner" },
  { id: 132, question: "Rising price with falling volume:", options: ["Very bullish", "Weak rally, caution", "Strong trend", "Accumulation"], correctAnswer: 1, explanation: "Declining volume suggests weakening move.", category: "Volume", difficulty: "intermediate" },
  { id: 133, question: "Volume spike often indicates:", options: ["Nothing", "Significant event or reversal", "Continuation only", "Low interest"], correctAnswer: 1, explanation: "Unusual volume marks important levels.", category: "Volume", difficulty: "beginner" },
  { id: 134, question: "Accumulation shows:", options: ["High volume selling", "Quiet buying, building position", "Distribution", "Panic selling"], correctAnswer: 1, explanation: "Smart money accumulates before moves up.", category: "Volume", difficulty: "intermediate" },
  { id: 135, question: "Distribution phase:", options: ["Smart money buying", "Smart money selling to public", "Low volume", "Uptrend start"], correctAnswer: 1, explanation: "Distribution = selling before decline.", category: "Volume", difficulty: "intermediate" },
  { id: 136, question: "OBV (On Balance Volume) measures:", options: ["Price momentum", "Cumulative volume flow", "Volatility", "Support levels"], correctAnswer: 1, explanation: "OBV adds volume on up days, subtracts on down.", category: "Volume", difficulty: "intermediate" },
  { id: 137, question: "Breakout with high volume:", options: ["Likely false breakout", "More reliable breakout", "No difference", "Should be avoided"], correctAnswer: 1, explanation: "Volume validates breakout legitimacy.", category: "Volume", difficulty: "beginner" },
  { id: 138, question: "Low volume consolidation suggests:", options: ["Distribution", "Rest before continuation", "Reversal", "High volatility"], correctAnswer: 1, explanation: "Low volume pause often precedes trend continuation.", category: "Volume", difficulty: "intermediate" },
  { id: 139, question: "Volume profile shows:", options: ["Time-based volume", "Volume at price levels", "Only daily volume", "Volatility"], correctAnswer: 1, explanation: "Volume profile displays volume by price.", category: "Volume", difficulty: "advanced" },
  { id: 140, question: "Climax volume usually means:", options: ["Trend start", "Potential exhaustion/reversal", "Continuation", "Low interest"], correctAnswer: 1, explanation: "Extreme volume can mark turning points.", category: "Volume", difficulty: "intermediate" },
  { id: 141, question: "Point of control (POC):", options: ["Lowest volume price", "Highest volume price", "Open price", "Close price"], correctAnswer: 1, explanation: "POC is price with most traded volume.", category: "Volume", difficulty: "advanced" },
  { id: 142, question: "Value area in volume profile:", options: ["10% of volume", "70% of volume range", "All volume", "Peak only"], correctAnswer: 1, explanation: "Value area contains 70% of traded volume.", category: "Volume", difficulty: "advanced" },
  { id: 143, question: "Churn means:", options: ["Low volume", "High volume with no price change", "Breakout", "Gap"], correctAnswer: 1, explanation: "Churn = heavy trading without movement.", category: "Volume", difficulty: "advanced" },
  { id: 144, question: "Volume precedes price means:", options: ["Volume spikes after moves", "Volume changes hint at future moves", "Volume is irrelevant", "Price leads volume"], correctAnswer: 1, explanation: "Volume changes often precede price moves.", category: "Volume", difficulty: "intermediate" },
  { id: 145, question: "Relative volume compares:", options: ["Today vs average volume", "Open vs close", "High vs low", "Buy vs sell"], correctAnswer: 0, explanation: "Relative volume = current vs typical volume.", category: "Volume", difficulty: "beginner" },

  // Fibonacci (146-160)
  { id: 146, question: "Key Fibonacci retracement levels:", options: ["25%, 50%, 75%", "23.6%, 38.2%, 61.8%", "10%, 20%, 30%", "33%, 66%, 100%"], correctAnswer: 1, explanation: "23.6%, 38.2%, 50%, 61.8%, 78.6% are key levels.", category: "Fibonacci", difficulty: "beginner" },
  { id: 147, question: "Fibonacci retracement measures:", options: ["Future extensions", "Pullback levels in trends", "Support only", "Volume"], correctAnswer: 1, explanation: "Retracements show potential pullback zones.", category: "Fibonacci", difficulty: "beginner" },
  { id: 148, question: "61.8% is called:", options: ["Silver ratio", "Golden ratio", "Platinum ratio", "Bronze ratio"], correctAnswer: 1, explanation: "61.8% is the golden ratio in Fibonacci.", category: "Fibonacci", difficulty: "beginner" },
  { id: 149, question: "Fib extension is used for:", options: ["Pullback levels", "Profit targets beyond swing", "Support levels", "Entry points only"], correctAnswer: 1, explanation: "Extensions project targets past 100%.", category: "Fibonacci", difficulty: "intermediate" },
  { id: 150, question: "Common Fib extension levels:", options: ["123.6%, 150%", "127.2%, 161.8%", "110%, 120%", "105%, 115%"], correctAnswer: 1, explanation: "127.2%, 161.8%, 261.8% are key extensions.", category: "Fibonacci", difficulty: "intermediate" },
  { id: 151, question: "Fib drawn from:", options: ["Random points", "Significant swing high to low", "Any two candles", "Only daily charts"], correctAnswer: 1, explanation: "Draw from major swing points.", category: "Fibonacci", difficulty: "beginner" },
  { id: 152, question: "In uptrend, draw Fib from:", options: ["High to low", "Low to high", "Close to open", "Random"], correctAnswer: 1, explanation: "Uptrend: swing low to swing high.", category: "Fibonacci", difficulty: "intermediate" },
  { id: 153, question: "Fib confluence means:", options: ["Single Fib level", "Multiple Fib levels at same area", "No Fib levels", "Only 50%"], correctAnswer: 1, explanation: "Multiple Fibs aligning = stronger zone.", category: "Fibonacci", difficulty: "intermediate" },
  { id: 154, question: "50% retracement is:", options: ["Not a Fib number", "A Fib number", "Most important Fib", "Only for stocks"], correctAnswer: 0, explanation: "50% is not Fibonacci but commonly used.", category: "Fibonacci", difficulty: "intermediate" },
  { id: 155, question: "Fibonacci time zones:", options: ["Price levels", "Time-based vertical lines", "Volume bars", "Support only"], correctAnswer: 1, explanation: "Time zones predict when moves may occur.", category: "Fibonacci", difficulty: "advanced" },
  { id: 156, question: "Best use of Fibonacci:", options: ["In isolation", "Combined with other analysis", "As exact levels", "Only for entries"], correctAnswer: 1, explanation: "Fib works best with confirmation.", category: "Fibonacci", difficulty: "intermediate" },
  { id: 157, question: "78.6% retracement suggests:", options: ["Shallow pullback", "Deep pullback, trend might fail", "No pullback", "Trend reversal confirmed"], correctAnswer: 1, explanation: "Deep retracements warn of potential failure.", category: "Fibonacci", difficulty: "intermediate" },
  { id: 158, question: "Fib fan:", options: ["Horizontal lines", "Diagonal lines from point", "Volume bars", "Moving averages"], correctAnswer: 1, explanation: "Fib fans create diagonal support/resistance.", category: "Fibonacci", difficulty: "advanced" },
  { id: 159, question: "Fib arcs:", options: ["Straight lines", "Curved S/R lines", "Horizontal only", "Volume profile"], correctAnswer: 1, explanation: "Arcs add time dimension to Fib levels.", category: "Fibonacci", difficulty: "advanced" },
  { id: 160, question: "Multiple timeframe Fib:", options: ["Less reliable", "More reliable confluence", "Not possible", "Only daily"], correctAnswer: 1, explanation: "Fib levels from different TFs add confluence.", category: "Fibonacci", difficulty: "advanced" },

  // Risk Management (161-180)
  { id: 161, question: "Risk/reward ratio of 1:3 means:", options: ["Risk $3 to make $1", "Risk $1 to make $3", "Equal risk and reward", "No risk"], correctAnswer: 1, explanation: "1:3 R/R = potential profit 3x the risk.", category: "Risk Management", difficulty: "beginner" },
  { id: 162, question: "Position sizing depends on:", options: ["How you feel", "Account size and risk per trade", "Only the stock", "News"], correctAnswer: 1, explanation: "Size based on risk tolerance and account.", category: "Risk Management", difficulty: "beginner" },
  { id: 163, question: "2% rule means:", options: ["2% profit target", "Risk max 2% of account per trade", "2% of price", "Win 2% of trades"], correctAnswer: 1, explanation: "Never risk more than 2% on single trade.", category: "Risk Management", difficulty: "beginner" },
  { id: 164, question: "Stop loss should be placed:", options: ["Randomly", "Based on technical invalidation", "Very tight always", "Very wide always"], correctAnswer: 1, explanation: "Place stops where your idea is wrong.", category: "Risk Management", difficulty: "intermediate" },
  { id: 165, question: "Trailing stop:", options: ["Fixed stop loss", "Moves with price to lock profit", "Market order", "Limit order"], correctAnswer: 1, explanation: "Trailing stops follow favorable moves.", category: "Risk Management", difficulty: "beginner" },
  { id: 166, question: "Break-even stop:", options: ["Stop at entry price", "Stop at resistance", "Stop at support", "No stop"], correctAnswer: 0, explanation: "Move stop to entry to eliminate risk.", category: "Risk Management", difficulty: "beginner" },
  { id: 167, question: "Win rate of 40% is profitable if:", options: ["Never", "R/R is high enough", "Always", "Only in bull markets"], correctAnswer: 1, explanation: "Low win rate works with high R/R.", category: "Risk Management", difficulty: "intermediate" },
  { id: 168, question: "Maximum drawdown is:", options: ["Daily loss", "Largest peak to trough decline", "Single trade loss", "Monthly loss"], correctAnswer: 1, explanation: "Max drawdown = biggest account decline.", category: "Risk Management", difficulty: "intermediate" },
  { id: 169, question: "Diversification helps by:", options: ["Concentrating risk", "Spreading risk across assets", "Increasing returns only", "Eliminating all risk"], correctAnswer: 1, explanation: "Diversification reduces single-asset risk.", category: "Risk Management", difficulty: "beginner" },
  { id: 170, question: "Overleveraging leads to:", options: ["Guaranteed profits", "Amplified losses and blowups", "Reduced risk", "Better returns always"], correctAnswer: 1, explanation: "Too much leverage destroys accounts.", category: "Risk Management", difficulty: "beginner" },
  { id: 171, question: "Risk of ruin:", options: ["Profit probability", "Chance of losing entire account", "Breakeven chance", "Win rate"], correctAnswer: 1, explanation: "Risk of ruin = probability of account blowup.", category: "Risk Management", difficulty: "advanced" },
  { id: 172, question: "Scaling into position:", options: ["All in at once", "Adding to position in parts", "Exiting only", "No position"], correctAnswer: 1, explanation: "Scaling = building position gradually.", category: "Risk Management", difficulty: "intermediate" },
  { id: 173, question: "Hedging purpose:", options: ["Increase risk", "Reduce/offset risk", "Maximize profit only", "Eliminate all loss"], correctAnswer: 1, explanation: "Hedging protects against adverse moves.", category: "Risk Management", difficulty: "intermediate" },
  { id: 174, question: "Never risk money you:", options: ["Have saved", "Can afford to lose", "Cannot afford to lose", "Earned recently"], correctAnswer: 2, explanation: "Only trade with money you can lose.", category: "Risk Management", difficulty: "beginner" },
  { id: 175, question: "Correlation in portfolio:", options: ["Doesn't matter", "High correlation increases risk", "Always good", "Only affects bonds"], correctAnswer: 1, explanation: "Correlated assets move together = more risk.", category: "Risk Management", difficulty: "intermediate" },
  { id: 176, question: "Fixed fractional sizing:", options: ["Same dollar amount always", "Percentage of account each trade", "Random sizing", "Max size always"], correctAnswer: 1, explanation: "Risk same percentage of current account.", category: "Risk Management", difficulty: "intermediate" },
  { id: 177, question: "Expectancy formula:", options: ["Win% × Avg Win", "(Win% × Avg Win) - (Loss% × Avg Loss)", "Loss% × Avg Loss", "R/R ratio only"], correctAnswer: 1, explanation: "Expectancy shows average expected return.", category: "Risk Management", difficulty: "advanced" },
  { id: 178, question: "Mental stop vs hard stop:", options: ["Same thing", "Mental is in head, hard is with broker", "Mental is better", "Hard doesn't work"], correctAnswer: 1, explanation: "Hard stops execute automatically.", category: "Risk Management", difficulty: "beginner" },
  { id: 179, question: "Slippage:", options: ["No effect", "Difference between expected and actual fill", "Guaranteed price", "Only in forex"], correctAnswer: 1, explanation: "Slippage = execution at worse price than expected.", category: "Risk Management", difficulty: "intermediate" },
  { id: 180, question: "Reducing position size after losses:", options: ["Never do this", "Helps preserve capital", "Increases risk", "Only for winners"], correctAnswer: 1, explanation: "Smaller size during drawdowns protects account.", category: "Risk Management", difficulty: "intermediate" },

  // Trading Psychology (181-200)
  { id: 181, question: "FOMO in trading:", options: ["Good for entries", "Fear of missing out, leads to bad trades", "Technical indicator", "News event"], correctAnswer: 1, explanation: "FOMO causes chasing and poor decisions.", category: "Psychology", difficulty: "beginner" },
  { id: 182, question: "Revenge trading is:", options: ["Good strategy", "Trading to recover losses emotionally", "Technical approach", "Hedging"], correctAnswer: 1, explanation: "Revenge trading = emotional, dangerous.", category: "Psychology", difficulty: "beginner" },
  { id: 183, question: "Trading journal helps by:", options: ["Nothing useful", "Tracking and improving decisions", "Predicting market", "Eliminating losses"], correctAnswer: 1, explanation: "Journals reveal patterns in your trading.", category: "Psychology", difficulty: "beginner" },
  { id: 184, question: "Overconfidence after wins:", options: ["Is healthy", "Can lead to oversized positions", "Improves trading", "Never happens"], correctAnswer: 1, explanation: "Overconfidence leads to careless mistakes.", category: "Psychology", difficulty: "intermediate" },
  { id: 185, question: "Best mindset for trading:", options: ["Emotional", "Detached and process-focused", "Aggressive", "Fearful"], correctAnswer: 1, explanation: "Focus on process, not individual outcomes.", category: "Psychology", difficulty: "intermediate" },
  { id: 186, question: "Loss aversion means:", options: ["Losses don't matter", "Losses feel worse than equal gains", "Avoiding all trades", "Taking more risk"], correctAnswer: 1, explanation: "Humans feel losses more than gains.", category: "Psychology", difficulty: "intermediate" },
  { id: 187, question: "Confirmation bias:", options: ["Seeking info that supports your view", "Objective analysis", "Technical analysis", "News trading"], correctAnswer: 0, explanation: "We tend to see what confirms our belief.", category: "Psychology", difficulty: "intermediate" },
  { id: 188, question: "Moving stop loss further away:", options: ["Good practice", "Sign of not accepting loss", "Always profitable", "Reduces risk"], correctAnswer: 1, explanation: "Moving stops = hoping, not trading.", category: "Psychology", difficulty: "intermediate" },
  { id: 189, question: "After a losing streak:", options: ["Trade bigger to recover", "Take a break, review", "Trade more frequently", "Ignore it"], correctAnswer: 1, explanation: "Pause and assess after losing streak.", category: "Psychology", difficulty: "beginner" },
  { id: 190, question: "Hindsight bias:", options: ["Good for learning", "Thinking you knew it after the fact", "Technical tool", "Risk measure"], correctAnswer: 1, explanation: "Hindsight makes us think we knew all along.", category: "Psychology", difficulty: "intermediate" },
  { id: 191, question: "Discipline in trading means:", options: ["Breaking rules when feeling good", "Following your plan consistently", "Trading more", "Ignoring stops"], correctAnswer: 1, explanation: "Discipline = sticking to your system.", category: "Psychology", difficulty: "beginner" },
  { id: 192, question: "Analysis paralysis:", options: ["Quick decisions", "Overthinking, unable to act", "Good analysis", "Simple strategy"], correctAnswer: 1, explanation: "Too much analysis prevents action.", category: "Psychology", difficulty: "intermediate" },
  { id: 193, question: "Greed causes:", options: ["Proper exits", "Holding too long, not taking profits", "Reduced risk", "Better entries"], correctAnswer: 1, explanation: "Greed makes traders miss profit targets.", category: "Psychology", difficulty: "beginner" },
  { id: 194, question: "Fear causes:", options: ["Taking every trade", "Missing good setups", "Overtrading", "More profits"], correctAnswer: 1, explanation: "Fear prevents taking valid trades.", category: "Psychology", difficulty: "beginner" },
  { id: 195, question: "Accepting losses is:", options: ["Weakness", "Essential part of trading", "Not necessary", "Only for beginners"], correctAnswer: 1, explanation: "Losses are part of trading, accept them.", category: "Psychology", difficulty: "beginner" },
  { id: 196, question: "Tilt in trading:", options: ["Good mindset", "Emotional state leading to poor decisions", "Technical term", "Profit phase"], correctAnswer: 1, explanation: "Tilt = emotional, irrational trading.", category: "Psychology", difficulty: "intermediate" },
  { id: 197, question: "Process vs outcome focus:", options: ["Focus on winning trades", "Focus on following your rules", "Results only matter", "Ignore process"], correctAnswer: 1, explanation: "Good process leads to good outcomes.", category: "Psychology", difficulty: "intermediate" },
  { id: 198, question: "Ego in trading:", options: ["Helps performance", "Prevents admitting mistakes", "Essential for success", "Improves analysis"], correctAnswer: 1, explanation: "Ego stops you from cutting losses.", category: "Psychology", difficulty: "intermediate" },
  { id: 199, question: "Patience in trading:", options: ["Unnecessary", "Crucial for waiting for setups", "Leads to losses", "Only for long-term"], correctAnswer: 1, explanation: "Patience for right setup is key.", category: "Psychology", difficulty: "beginner" },
  { id: 200, question: "Best way to improve:", options: ["Trade more randomly", "Study, journal, review consistently", "Copy others blindly", "Ignore mistakes"], correctAnswer: 1, explanation: "Consistent review and learning improves trading.", category: "Psychology", difficulty: "beginner" },
];

export const getRandomQuestions = (count: number = 10): PracticeQuestion[] => {
  return [...practiceQuestions].sort(() => Math.random() - 0.5).slice(0, count);
};

export const getQuestionsByCategory = (category: PatternCategory): PracticeQuestion[] => {
  const matchingCategories = Object.entries(categoryMapping)
    .filter(([_, mapped]) => mapped === category)
    .map(([original]) => original);
  return practiceQuestions.filter(q => matchingCategories.includes(q.category));
};

export const getQuestionsByDifficulty = (difficulty: PracticeQuestion['difficulty']): PracticeQuestion[] => {
  return practiceQuestions.filter(q => q.difficulty === difficulty);
};

export const swipeCardScenarios = [
  { id: 1, scenario: "RSI at 25, price at strong support, hammer candle forming", action: "buy", explanation: "Oversold RSI + support + bullish reversal candle = buy setup" },
  { id: 2, scenario: "RSI at 80, price at resistance, shooting star candle", action: "sell", explanation: "Overbought RSI + resistance + bearish candle = sell setup" },
  { id: 3, scenario: "Price breaks above resistance with high volume", action: "buy", explanation: "Volume-confirmed breakout is bullish" },
  { id: 4, scenario: "Price breaks below support with high volume", action: "sell", explanation: "Volume-confirmed breakdown is bearish" },
  { id: 5, scenario: "Golden cross: 50 MA crosses above 200 MA", action: "buy", explanation: "Golden cross signals bullish trend" },
  { id: 6, scenario: "Death cross: 50 MA crosses below 200 MA", action: "sell", explanation: "Death cross signals bearish trend" },
  { id: 7, scenario: "Bullish engulfing at demand zone", action: "buy", explanation: "Strong reversal pattern at support" },
  { id: 8, scenario: "Bearish engulfing at supply zone", action: "sell", explanation: "Strong reversal pattern at resistance" },
  { id: 9, scenario: "Double bottom pattern confirmed with neckline break", action: "buy", explanation: "Double bottom is bullish reversal" },
  { id: 10, scenario: "Double top pattern confirmed with neckline break", action: "sell", explanation: "Double top is bearish reversal" },
  { id: 11, scenario: "Price bouncing off rising 20 EMA in uptrend", action: "buy", explanation: "Trend continuation at dynamic support" },
  { id: 12, scenario: "Price rejected at falling 20 EMA in downtrend", action: "sell", explanation: "Trend continuation at dynamic resistance" },
  { id: 13, scenario: "MACD bullish crossover above zero line", action: "buy", explanation: "MACD confirms strong bullish momentum" },
  { id: 14, scenario: "MACD bearish crossover below zero line", action: "sell", explanation: "MACD confirms strong bearish momentum" },
  { id: 15, scenario: "Morning star pattern at 61.8% Fibonacci retracement", action: "buy", explanation: "Reversal pattern at key Fib level" },
  { id: 16, scenario: "Evening star pattern at 161.8% Fibonacci extension", action: "sell", explanation: "Reversal pattern at extension target" },
  { id: 17, scenario: "Bullish divergence: price lower low, RSI higher low", action: "buy", explanation: "Divergence signals momentum shift up" },
  { id: 18, scenario: "Bearish divergence: price higher high, RSI lower high", action: "sell", explanation: "Divergence signals momentum shift down" },
  { id: 19, scenario: "Cup and handle breakout with volume", action: "buy", explanation: "Classic bullish continuation pattern" },
  { id: 20, scenario: "Head and shoulders neckline break", action: "sell", explanation: "Classic bearish reversal pattern" },
  { id: 21, scenario: "Ascending triangle breakout above flat resistance", action: "buy", explanation: "Bullish breakout from accumulation" },
  { id: 22, scenario: "Descending triangle breakdown below flat support", action: "sell", explanation: "Bearish breakdown from distribution" },
  { id: 23, scenario: "Bull flag breakout after strong impulse move", action: "buy", explanation: "Continuation after healthy consolidation" },
  { id: 24, scenario: "Bear flag breakdown after strong drop", action: "sell", explanation: "Continuation of bearish momentum" },
  { id: 25, scenario: "Price at lower Bollinger Band with RSI oversold", action: "buy", explanation: "Mean reversion setup at extreme" },
  { id: 26, scenario: "Price at upper Bollinger Band with RSI overbought", action: "sell", explanation: "Mean reversion setup at extreme" },
  { id: 27, scenario: "Bollinger squeeze breakout to upside", action: "buy", explanation: "Low volatility breakout bullish" },
  { id: 28, scenario: "Bollinger squeeze breakdown to downside", action: "sell", explanation: "Low volatility breakdown bearish" },
  { id: 29, scenario: "Three white soldiers after downtrend", action: "buy", explanation: "Strong bullish reversal pattern" },
  { id: 30, scenario: "Three black crows after uptrend", action: "sell", explanation: "Strong bearish reversal pattern" },
];

export const categories = [
  "RSI", "MACD", "Bollinger Bands", "Candlesticks", "Chart Patterns",
  "Support & Resistance", "Moving Averages", "Volume", "Fibonacci",
  "Risk Management", "Psychology"
];