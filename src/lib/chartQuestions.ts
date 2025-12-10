export interface CandleData {
  x: Date;
  y: [number, number, number, number];
}

export interface LineData {
  time: string;
  price: number;
}

export interface ChartQuestion {
  id: number;
  title: string;
  description: string;
  chartType: 'candlestick' | 'line';
  candleData?: CandleData[];
  lineData?: LineData[];
  correctAnswer: 'buy' | 'sell';
  explanation: string;
  patternName: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const baseDate = new Date('2024-01-01');
const day = (n: number) => new Date(baseDate.getTime() + n * 24 * 60 * 60 * 1000);

// Helper functions for generating chart data
const generateDowntrend = (len: number, start: number, volatility: number = 1.5): CandleData[] => {
  const data: CandleData[] = [];
  let price = start;
  for (let i = 0; i < len; i++) {
    const change = -(1 + Math.random() * volatility);
    const open = price;
    const close = price + change;
    const high = open + Math.random() * 0.5;
    const low = close - Math.random() * 0.5;
    data.push({ x: day(i), y: [open, high, low, close] });
    price = close;
  }
  return data;
};

const generateUptrend = (len: number, start: number, volatility: number = 1.5): CandleData[] => {
  const data: CandleData[] = [];
  let price = start;
  for (let i = 0; i < len; i++) {
    const change = 1 + Math.random() * volatility;
    const open = price;
    const close = price + change;
    const high = close + Math.random() * 0.5;
    const low = open - Math.random() * 0.5;
    data.push({ x: day(i), y: [open, high, low, close] });
    price = close;
  }
  return data;
};

const generateSideways = (len: number, start: number): CandleData[] => {
  const data: CandleData[] = [];
  let price = start;
  for (let i = 0; i < len; i++) {
    const change = (Math.random() - 0.5) * 2;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 1;
    const low = Math.min(open, close) - Math.random() * 1;
    data.push({ x: day(i), y: [open, high, low, close] });
    price = close;
  }
  return data;
};

const lineFromPoints = (points: number[]): LineData[] => 
  points.map((price, i) => ({ time: `Day ${i + 1}`, price }));

// ========== CANDLESTICK PATTERN GENERATORS ==========

// Hammer
const makeHammer = (variant: number): CandleData[] => {
  const data = generateDowntrend(7 + variant, 100 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const hammerOpen = lastPrice;
  const hammerClose = hammerOpen + 0.3 + variant * 0.1;
  data.push({ x: day(data.length), y: [hammerOpen, hammerClose + 0.2, hammerOpen - 4 - variant * 0.5, hammerClose] });
  return data;
};

// Inverted Hammer
const makeInvertedHammer = (variant: number): CandleData[] => {
  const data = generateDowntrend(7 + variant, 100 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const open = lastPrice;
  const close = open + 0.3;
  data.push({ x: day(data.length), y: [open, open + 4 + variant * 0.5, open - 0.2, close] });
  return data;
};

// Bullish Engulfing
const makeBullishEngulfing = (variant: number): CandleData[] => {
  const data = generateDowntrend(6 + variant, 100 + variant * 3);
  const lastPrice = data[data.length - 1].y[3];
  const smallOpen = lastPrice;
  const smallClose = smallOpen - 1;
  data.push({ x: day(data.length), y: [smallOpen, smallOpen + 0.2, smallClose - 0.3, smallClose] });
  const engulfOpen = smallClose - 0.5;
  const engulfClose = smallOpen + 1.5 + variant * 0.3;
  data.push({ x: day(data.length), y: [engulfOpen, engulfClose + 0.2, engulfOpen - 0.3, engulfClose] });
  return data;
};

// Bearish Engulfing
const makeBearishEngulfing = (variant: number): CandleData[] => {
  const data = generateUptrend(6 + variant, 80 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const smallOpen = lastPrice;
  const smallClose = smallOpen + 1;
  data.push({ x: day(data.length), y: [smallOpen, smallClose + 0.3, smallOpen - 0.2, smallClose] });
  const engulfOpen = smallClose + 0.5;
  const engulfClose = smallOpen - 1.5 - variant * 0.3;
  data.push({ x: day(data.length), y: [engulfOpen, engulfOpen + 0.3, engulfClose - 0.2, engulfClose] });
  return data;
};

// Morning Star
const makeMorningStar = (variant: number): CandleData[] => {
  const data = generateDowntrend(5 + variant, 100 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const bear1Open = lastPrice;
  const bear1Close = lastPrice - 3 - variant * 0.3;
  data.push({ x: day(data.length), y: [bear1Open, bear1Open + 0.2, bear1Close - 0.2, bear1Close] });
  const starOpen = bear1Close - 0.5;
  const starClose = starOpen + 0.3;
  data.push({ x: day(data.length), y: [starOpen, starClose + 0.5, starOpen - 0.5, starClose] });
  const bull1Open = starClose + 0.3;
  const bull1Close = bear1Open + variant * 0.2;
  data.push({ x: day(data.length), y: [bull1Open, bull1Close + 0.2, bull1Open - 0.2, bull1Close] });
  return data;
};

// Evening Star
const makeEveningStar = (variant: number): CandleData[] => {
  const data = generateUptrend(5 + variant, 80 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const bull1Open = lastPrice;
  const bull1Close = lastPrice + 3 + variant * 0.3;
  data.push({ x: day(data.length), y: [bull1Open, bull1Close + 0.2, bull1Open - 0.2, bull1Close] });
  const starOpen = bull1Close + 0.5;
  const starClose = starOpen - 0.3;
  data.push({ x: day(data.length), y: [starOpen, starOpen + 0.5, starClose - 0.5, starClose] });
  const bear1Open = starClose - 0.3;
  const bear1Close = bull1Open - variant * 0.2;
  data.push({ x: day(data.length), y: [bear1Open, bear1Open + 0.2, bear1Close - 0.2, bear1Close] });
  return data;
};

// Shooting Star
const makeShootingStar = (variant: number): CandleData[] => {
  const data = generateUptrend(7 + variant, 80 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const starOpen = lastPrice;
  const starClose = starOpen - 0.5;
  data.push({ x: day(data.length), y: [starOpen, starOpen + 4 + variant * 0.5, starClose - 0.2, starClose] });
  return data;
};

// Hanging Man
const makeHangingMan = (variant: number): CandleData[] => {
  const data = generateUptrend(7 + variant, 80 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const open = lastPrice;
  const close = open - 0.3;
  data.push({ x: day(data.length), y: [open, open + 0.2, open - 4 - variant * 0.5, close] });
  return data;
};

// Doji
const makeDoji = (variant: number, afterUptrend: boolean): CandleData[] => {
  const data = afterUptrend ? generateUptrend(7 + variant, 80) : generateDowntrend(7 + variant, 100);
  const lastPrice = data[data.length - 1].y[3];
  const dojiOpen = lastPrice;
  const dojiClose = dojiOpen + 0.1;
  data.push({ x: day(data.length), y: [dojiOpen, dojiOpen + 2 + variant * 0.3, dojiOpen - 2 - variant * 0.3, dojiClose] });
  return data;
};

// Three White Soldiers
const makeThreeWhiteSoldiers = (variant: number): CandleData[] => {
  const data = generateDowntrend(5 + variant, 100 + variant * 2);
  let price = data[data.length - 1].y[3];
  for (let i = 0; i < 3; i++) {
    const open = price;
    const close = price + 2.5 + variant * 0.2;
    data.push({ x: day(data.length), y: [open, close + 0.2, open - 0.2, close] });
    price = close;
  }
  return data;
};

// Three Black Crows
const makeThreeBlackCrows = (variant: number): CandleData[] => {
  const data = generateUptrend(5 + variant, 80 + variant * 2);
  let price = data[data.length - 1].y[3];
  for (let i = 0; i < 3; i++) {
    const open = price;
    const close = price - 2.5 - variant * 0.2;
    data.push({ x: day(data.length), y: [open, open + 0.2, close - 0.2, close] });
    price = close;
  }
  return data;
};

// Piercing Pattern
const makePiercingPattern = (variant: number): CandleData[] => {
  const data = generateDowntrend(6 + variant, 100 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const bear1Open = lastPrice;
  const bear1Close = lastPrice - 3;
  data.push({ x: day(data.length), y: [bear1Open, bear1Open + 0.2, bear1Close - 0.2, bear1Close] });
  const bullOpen = bear1Close - 0.5;
  const bullClose = (bear1Open + bear1Close) / 2 + 1 + variant * 0.2;
  data.push({ x: day(data.length), y: [bullOpen, bullClose + 0.2, bullOpen - 0.2, bullClose] });
  return data;
};

// Dark Cloud Cover
const makeDarkCloudCover = (variant: number): CandleData[] => {
  const data = generateUptrend(6 + variant, 80 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const bull1Open = lastPrice;
  const bull1Close = lastPrice + 3;
  data.push({ x: day(data.length), y: [bull1Open, bull1Close + 0.2, bull1Open - 0.2, bull1Close] });
  const bearOpen = bull1Close + 0.5;
  const bearClose = (bull1Open + bull1Close) / 2 - 1 - variant * 0.2;
  data.push({ x: day(data.length), y: [bearOpen, bearOpen + 0.2, bearClose - 0.2, bearClose] });
  return data;
};

// Bullish Harami
const makeBullishHarami = (variant: number): CandleData[] => {
  const data = generateDowntrend(6 + variant, 100 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const bigOpen = lastPrice;
  const bigClose = lastPrice - 4;
  data.push({ x: day(data.length), y: [bigOpen, bigOpen + 0.2, bigClose - 0.2, bigClose] });
  const smallOpen = (bigOpen + bigClose) / 2 - 0.5;
  const smallClose = (bigOpen + bigClose) / 2 + 0.5;
  data.push({ x: day(data.length), y: [smallOpen, smallClose + 0.2, smallOpen - 0.2, smallClose] });
  return data;
};

// Bearish Harami
const makeBearishHarami = (variant: number): CandleData[] => {
  const data = generateUptrend(6 + variant, 80 + variant * 2);
  const lastPrice = data[data.length - 1].y[3];
  const bigOpen = lastPrice;
  const bigClose = lastPrice + 4;
  data.push({ x: day(data.length), y: [bigOpen, bigClose + 0.2, bigOpen - 0.2, bigClose] });
  const smallOpen = (bigOpen + bigClose) / 2 + 0.5;
  const smallClose = (bigOpen + bigClose) / 2 - 0.5;
  data.push({ x: day(data.length), y: [smallOpen, smallOpen + 0.2, smallClose - 0.2, smallClose] });
  return data;
};

// Tweezer Bottom
const makeTweezerBottom = (variant: number): CandleData[] => {
  const data = generateDowntrend(6 + variant, 100 + variant * 2);
  const low = data[data.length - 1].y[3] - 2;
  data.push({ x: day(data.length), y: [low + 2, low + 2.5, low, low + 0.5] });
  data.push({ x: day(data.length), y: [low + 0.5, low + 2.5, low, low + 2] });
  return data;
};

// Tweezer Top
const makeTweezerTop = (variant: number): CandleData[] => {
  const data = generateUptrend(6 + variant, 80 + variant * 2);
  const high = data[data.length - 1].y[3] + 2;
  data.push({ x: day(data.length), y: [high - 2, high, high - 2.5, high - 0.5] });
  data.push({ x: day(data.length), y: [high - 0.5, high, high - 2.5, high - 2] });
  return data;
};

// Bullish Marubozu
const makeBullishMarubozu = (variant: number): CandleData[] => {
  const data = generateSideways(7 + variant, 90);
  const lastPrice = data[data.length - 1].y[3];
  data.push({ x: day(data.length), y: [lastPrice, lastPrice + 4 + variant * 0.3, lastPrice, lastPrice + 4 + variant * 0.3] });
  return data;
};

// Bearish Marubozu
const makeBearishMarubozu = (variant: number): CandleData[] => {
  const data = generateSideways(7 + variant, 90);
  const lastPrice = data[data.length - 1].y[3];
  data.push({ x: day(data.length), y: [lastPrice, lastPrice, lastPrice - 4 - variant * 0.3, lastPrice - 4 - variant * 0.3] });
  return data;
};

// Dragonfly Doji
const makeDragonflyDoji = (variant: number): CandleData[] => {
  const data = generateDowntrend(7 + variant, 100);
  const lastPrice = data[data.length - 1].y[3];
  data.push({ x: day(data.length), y: [lastPrice, lastPrice + 0.1, lastPrice - 4 - variant * 0.3, lastPrice] });
  return data;
};

// Gravestone Doji
const makeGravestoneDoji = (variant: number): CandleData[] => {
  const data = generateUptrend(7 + variant, 80);
  const lastPrice = data[data.length - 1].y[3];
  data.push({ x: day(data.length), y: [lastPrice, lastPrice + 4 + variant * 0.3, lastPrice - 0.1, lastPrice] });
  return data;
};

// ========== LINE CHART PATTERN GENERATORS ==========

// Double Bottom
const makeDoubleBottom = (variant: number): LineData[] => {
  const low = 80 + variant;
  return lineFromPoints([100, 95, 90, 85, low, 83, 87, 90, 86, low + 0.5, 84, 88, 93, 97, 102]);
};

// Double Top
const makeDoubleTop = (variant: number): LineData[] => {
  const high = 100 + variant;
  return lineFromPoints([80, 85, 90, 95, high, 97, 93, 90, 94, high - 0.5, 96, 92, 87, 83, 78]);
};

// Head and Shoulders
const makeHeadAndShoulders = (variant: number): LineData[] => {
  const head = 95 + variant;
  return lineFromPoints([70, 75, 80, 85, 82, 78, 82, 88, head, 88, 82, 78, 82, 86, 82, 78, 74, 70, 66]);
};

// Inverse Head and Shoulders
const makeInverseHeadAndShoulders = (variant: number): LineData[] => {
  const head = 75 - variant;
  return lineFromPoints([100, 95, 90, 85, 88, 92, 88, 82, head, 82, 88, 92, 88, 84, 88, 92, 96, 100, 104]);
};

// Ascending Triangle
const makeAscendingTriangle = (variant: number): LineData[] => {
  const resistance = 90 + variant;
  return lineFromPoints([80, 88, 85, resistance, 87, resistance, 88, resistance, 89, resistance, resistance, 92, 95, 98, 102]);
};

// Descending Triangle
const makeDescendingTriangle = (variant: number): LineData[] => {
  const support = 90 - variant;
  return lineFromPoints([100, 92, 95, support, 93, support, 92, support, 91, support, support, 88, 85, 82, 78]);
};

// Symmetrical Triangle Bullish
const makeSymmetricalTriangleBullish = (variant: number): LineData[] => {
  return lineFromPoints([85, 95, 87, 93, 88, 92, 89, 91, 90, 90.5, 91, 93, 96, 100, 105 + variant]);
};

// Symmetrical Triangle Bearish
const makeSymmetricalTriangleBearish = (variant: number): LineData[] => {
  return lineFromPoints([95, 85, 93, 87, 92, 88, 91, 89, 90, 89.5, 89, 87, 84, 80, 75 - variant]);
};

// Bull Flag
const makeBullFlag = (variant: number): LineData[] => {
  return lineFromPoints([70 + variant, 75, 82, 90, 95, 93, 91, 90, 89, 88, 87, 88, 90, 94, 100, 107]);
};

// Bear Flag
const makeBearFlag = (variant: number): LineData[] => {
  return lineFromPoints([100 - variant, 95, 88, 80, 75, 77, 79, 80, 81, 82, 81, 80, 76, 72, 68, 62]);
};

// Cup and Handle
const makeCupAndHandle = (variant: number): LineData[] => {
  return lineFromPoints([100 + variant, 95, 90, 86, 84, 85, 88, 92, 96, 99, 97, 98, 100, 103, 108, 114]);
};

// Rounding Bottom
const makeRoundingBottom = (variant: number): LineData[] => {
  return lineFromPoints([100, 96, 92, 89, 86, 84, 83, 83, 84, 86, 89, 92, 96, 100, 105 + variant]);
};

// Triple Bottom
const makeTripleBottom = (variant: number): LineData[] => {
  const low = 80 + variant;
  return lineFromPoints([100, 95, 90, 85, low, 84, 88, 84, low, 84, 88, 84, low, 85, 92, 98, 105]);
};

// Triple Top
const makeTripleTop = (variant: number): LineData[] => {
  const high = 100 + variant;
  return lineFromPoints([80, 85, 90, 95, high, 96, 92, 96, high, 96, 92, 96, high, 95, 88, 82, 75]);
};

// Falling Wedge
const makeFallingWedge = (variant: number): LineData[] => {
  return lineFromPoints([100, 97, 95, 92, 90, 89, 87, 86, 85, 84, 85, 88, 92, 97, 103 + variant]);
};

// Rising Wedge
const makeRisingWedge = (variant: number): LineData[] => {
  return lineFromPoints([80, 83, 85, 88, 90, 91, 93, 94, 95, 96, 95, 92, 88, 83, 77 - variant]);
};

// Support Bounce
const makeSupportBounce = (variant: number): LineData[] => {
  const support = 80 + variant;
  return lineFromPoints([95, 92, 88, 85, 82, support, support, 82, 85, 88, 92, 95, 98, 100, 102]);
};

// Resistance Rejection
const makeResistanceRejection = (variant: number): LineData[] => {
  const resistance = 100 + variant;
  return lineFromPoints([85, 88, 92, 95, 98, resistance, resistance, 98, 95, 92, 88, 85, 82, 80, 78]);
};

// Uptrend Continuation
const makeUptrendContinuation = (variant: number): LineData[] => {
  let price = 80;
  const points: number[] = [];
  for (let i = 0; i < 15; i++) {
    price += 1 + Math.random() * 1.5 + variant * 0.1;
    points.push(parseFloat(price.toFixed(2)));
  }
  return lineFromPoints(points);
};

// Downtrend Continuation
const makeDowntrendContinuation = (variant: number): LineData[] => {
  let price = 100;
  const points: number[] = [];
  for (let i = 0; i < 15; i++) {
    price -= 1 + Math.random() * 1.5 + variant * 0.1;
    points.push(parseFloat(price.toFixed(2)));
  }
  return lineFromPoints(points);
};

// Breakout Above Resistance
const makeBreakoutAboveResistance = (variant: number): LineData[] => {
  const resistance = 95 + variant;
  return lineFromPoints([85, 88, 92, resistance - 1, 93, resistance - 1, 94, resistance - 1, 94, resistance, resistance + 3, resistance + 6, resistance + 9, resistance + 12, resistance + 15]);
};

// Breakdown Below Support
const makeBreakdownBelowSupport = (variant: number): LineData[] => {
  const support = 85 - variant;
  return lineFromPoints([95, 92, 88, support + 1, 87, support + 1, 86, support + 1, 86, support, support - 3, support - 6, support - 9, support - 12, support - 15]);
};

// Channel Up Buy
const makeChannelUpBuy = (variant: number): LineData[] => {
  return lineFromPoints([80, 85, 82, 87, 84, 89, 86, 91, 88, 93, 90, 95 + variant, 92, 97, 94]);
};

// Channel Down Sell
const makeChannelDownSell = (variant: number): LineData[] => {
  return lineFromPoints([100, 95, 98, 93, 96, 91, 94, 89, 92, 87, 90, 85 - variant, 88, 83, 86]);
};

// Generate all 200 questions
export const chartQuestions: ChartQuestion[] = [
  // HAMMER PATTERNS (1-8)
  { id: 1, title: "Hammer Pattern", description: "Identify the candle at the end of this downtrend", chartType: 'candlestick', candleData: makeHammer(0), correctAnswer: 'buy', explanation: "Hammer at bottom signals bullish reversal - long lower shadow shows buyers stepped in", patternName: "Hammer", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 2, title: "Hammer Formation", description: "What does this candle indicate?", chartType: 'candlestick', candleData: makeHammer(1), correctAnswer: 'buy', explanation: "Hammer with long lower wick at support suggests reversal", patternName: "Hammer", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 3, title: "Hammer Signal", description: "Analyze the reversal candle", chartType: 'candlestick', candleData: makeHammer(2), correctAnswer: 'buy', explanation: "Classic hammer pattern - buyers rejected lower prices", patternName: "Hammer", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 4, title: "Bullish Hammer", description: "What action does this suggest?", chartType: 'candlestick', candleData: makeHammer(3), correctAnswer: 'buy', explanation: "Hammer at downtrend end is a buy signal", patternName: "Hammer", category: "Candlestick Patterns", difficulty: "beginner" },
  
  // INVERTED HAMMER (5-8)
  { id: 5, title: "Inverted Hammer", description: "Notice the candle with long upper shadow", chartType: 'candlestick', candleData: makeInvertedHammer(0), correctAnswer: 'buy', explanation: "Inverted hammer at bottom can signal reversal up", patternName: "Inverted Hammer", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 6, title: "Inverted Hammer Signal", description: "What does this pattern suggest?", chartType: 'candlestick', candleData: makeInvertedHammer(1), correctAnswer: 'buy', explanation: "Buyers attempted to push higher - bullish potential", patternName: "Inverted Hammer", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 7, title: "Bottom Reversal Candle", description: "Identify the bullish signal", chartType: 'candlestick', candleData: makeInvertedHammer(2), correctAnswer: 'buy', explanation: "Inverted hammer shows buying interest emerging", patternName: "Inverted Hammer", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 8, title: "Reversal Formation", description: "What action to take?", chartType: 'candlestick', candleData: makeInvertedHammer(3), correctAnswer: 'buy', explanation: "Long upper shadow at bottom indicates potential reversal", patternName: "Inverted Hammer", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // BULLISH ENGULFING (9-16)
  { id: 9, title: "Bullish Engulfing", description: "Large green candle engulfs the red", chartType: 'candlestick', candleData: makeBullishEngulfing(0), correctAnswer: 'buy', explanation: "Bullish engulfing is a strong reversal signal", patternName: "Bullish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 10, title: "Engulfing Buy Signal", description: "What does this two-candle pattern indicate?", chartType: 'candlestick', candleData: makeBullishEngulfing(1), correctAnswer: 'buy', explanation: "Buyers have overwhelmed sellers", patternName: "Bullish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 11, title: "Bottom Engulfing", description: "Analyze the pattern at support", chartType: 'candlestick', candleData: makeBullishEngulfing(2), correctAnswer: 'buy', explanation: "Engulfing pattern at bottom confirms reversal", patternName: "Bullish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 12, title: "Strong Reversal Pattern", description: "What is your trading decision?", chartType: 'candlestick', candleData: makeBullishEngulfing(3), correctAnswer: 'buy', explanation: "Large bullish candle shows strong buying pressure", patternName: "Bullish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  
  // BEARISH ENGULFING (13-20)
  { id: 13, title: "Bearish Engulfing", description: "Large red candle engulfs the green", chartType: 'candlestick', candleData: makeBearishEngulfing(0), correctAnswer: 'sell', explanation: "Bearish engulfing at top signals reversal down", patternName: "Bearish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 14, title: "Engulfing Sell Signal", description: "What does this pattern at top mean?", chartType: 'candlestick', candleData: makeBearishEngulfing(1), correctAnswer: 'sell', explanation: "Sellers have overwhelmed buyers", patternName: "Bearish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 15, title: "Top Reversal", description: "Analyze the bearish pattern", chartType: 'candlestick', candleData: makeBearishEngulfing(2), correctAnswer: 'sell', explanation: "Engulfing at resistance confirms selling pressure", patternName: "Bearish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 16, title: "Reversal at Peak", description: "What action to take?", chartType: 'candlestick', candleData: makeBearishEngulfing(3), correctAnswer: 'sell', explanation: "Large bearish candle shows strong selling momentum", patternName: "Bearish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  
  // MORNING STAR (17-24)
  { id: 17, title: "Morning Star", description: "Three-candle bullish reversal pattern", chartType: 'candlestick', candleData: makeMorningStar(0), correctAnswer: 'buy', explanation: "Morning star signals end of downtrend", patternName: "Morning Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 18, title: "Morning Star Formation", description: "Identify the reversal setup", chartType: 'candlestick', candleData: makeMorningStar(1), correctAnswer: 'buy', explanation: "Star candle shows indecision, bullish confirms reversal", patternName: "Morning Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 19, title: "Three-Candle Reversal", description: "What signal does this give?", chartType: 'candlestick', candleData: makeMorningStar(2), correctAnswer: 'buy', explanation: "Powerful bullish reversal pattern at bottom", patternName: "Morning Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 20, title: "Bullish Star Pattern", description: "What is your trade decision?", chartType: 'candlestick', candleData: makeMorningStar(3), correctAnswer: 'buy', explanation: "Morning star confirms buyers taking control", patternName: "Morning Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // EVENING STAR (21-28)
  { id: 21, title: "Evening Star", description: "Three-candle bearish reversal", chartType: 'candlestick', candleData: makeEveningStar(0), correctAnswer: 'sell', explanation: "Evening star signals end of uptrend", patternName: "Evening Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 22, title: "Evening Star Formation", description: "Identify the top reversal", chartType: 'candlestick', candleData: makeEveningStar(1), correctAnswer: 'sell', explanation: "Star shows hesitation, bearish confirms selling", patternName: "Evening Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 23, title: "Bearish Star Pattern", description: "What does this indicate?", chartType: 'candlestick', candleData: makeEveningStar(2), correctAnswer: 'sell', explanation: "Powerful reversal pattern at market top", patternName: "Evening Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 24, title: "Top Star Reversal", description: "What action should you take?", chartType: 'candlestick', candleData: makeEveningStar(3), correctAnswer: 'sell', explanation: "Evening star confirms sellers taking control", patternName: "Evening Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // SHOOTING STAR (25-32)
  { id: 25, title: "Shooting Star", description: "Long upper shadow at top", chartType: 'candlestick', candleData: makeShootingStar(0), correctAnswer: 'sell', explanation: "Shooting star shows rejection at highs", patternName: "Shooting Star", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 26, title: "Shooting Star Signal", description: "What does this candle mean?", chartType: 'candlestick', candleData: makeShootingStar(1), correctAnswer: 'sell', explanation: "Sellers pushed price down from highs - bearish", patternName: "Shooting Star", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 27, title: "Top Rejection Candle", description: "Analyze this pattern", chartType: 'candlestick', candleData: makeShootingStar(2), correctAnswer: 'sell', explanation: "Long upper wick indicates selling pressure", patternName: "Shooting Star", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 28, title: "Bearish Rejection", description: "What is your decision?", chartType: 'candlestick', candleData: makeShootingStar(3), correctAnswer: 'sell', explanation: "Shooting star at resistance is a sell signal", patternName: "Shooting Star", category: "Candlestick Patterns", difficulty: "beginner" },
  
  // HANGING MAN (29-36)
  { id: 29, title: "Hanging Man", description: "Hammer-like candle at top", chartType: 'candlestick', candleData: makeHangingMan(0), correctAnswer: 'sell', explanation: "Hanging man at top warns of reversal", patternName: "Hanging Man", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 30, title: "Hanging Man Warning", description: "What does this signal?", chartType: 'candlestick', candleData: makeHangingMan(1), correctAnswer: 'sell', explanation: "Despite recovery, pattern at top is bearish", patternName: "Hanging Man", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 31, title: "Top Hanging Pattern", description: "Analyze this formation", chartType: 'candlestick', candleData: makeHangingMan(2), correctAnswer: 'sell', explanation: "Hanging man suggests uptrend exhaustion", patternName: "Hanging Man", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 32, title: "Bearish Hanging Man", description: "What action to take?", chartType: 'candlestick', candleData: makeHangingMan(3), correctAnswer: 'sell', explanation: "Sell signal after extended uptrend", patternName: "Hanging Man", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // DOJI PATTERNS (33-40)
  { id: 33, title: "Doji at Top", description: "Indecision candle after uptrend", chartType: 'candlestick', candleData: makeDoji(0, true), correctAnswer: 'sell', explanation: "Doji at top signals potential reversal", patternName: "Doji", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 34, title: "Doji Indecision", description: "What does this suggest at top?", chartType: 'candlestick', candleData: makeDoji(1, true), correctAnswer: 'sell', explanation: "Equal buying/selling after uptrend = caution", patternName: "Doji", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 35, title: "Doji at Bottom", description: "Indecision after downtrend", chartType: 'candlestick', candleData: makeDoji(0, false), correctAnswer: 'buy', explanation: "Doji at bottom suggests selling exhaustion", patternName: "Doji", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 36, title: "Bottom Doji Signal", description: "What does this indicate?", chartType: 'candlestick', candleData: makeDoji(1, false), correctAnswer: 'buy', explanation: "Indecision at support may lead to bounce", patternName: "Doji", category: "Candlestick Patterns", difficulty: "beginner" },
  
  // THREE WHITE SOLDIERS (37-44)
  { id: 37, title: "Three White Soldiers", description: "Three consecutive bullish candles", chartType: 'candlestick', candleData: makeThreeWhiteSoldiers(0), correctAnswer: 'buy', explanation: "Strong bullish momentum after downtrend", patternName: "Three White Soldiers", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 38, title: "Strong Bullish Pattern", description: "What does this show?", chartType: 'candlestick', candleData: makeThreeWhiteSoldiers(1), correctAnswer: 'buy', explanation: "Three strong bullish candles confirm reversal", patternName: "Three White Soldiers", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 39, title: "Soldiers Formation", description: "Analyze this pattern", chartType: 'candlestick', candleData: makeThreeWhiteSoldiers(2), correctAnswer: 'buy', explanation: "Sustained buying pressure over three days", patternName: "Three White Soldiers", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 40, title: "Bullish Momentum", description: "What is your decision?", chartType: 'candlestick', candleData: makeThreeWhiteSoldiers(3), correctAnswer: 'buy', explanation: "Powerful reversal pattern with strong conviction", patternName: "Three White Soldiers", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // THREE BLACK CROWS (41-48)
  { id: 41, title: "Three Black Crows", description: "Three consecutive bearish candles", chartType: 'candlestick', candleData: makeThreeBlackCrows(0), correctAnswer: 'sell', explanation: "Strong bearish momentum after uptrend", patternName: "Three Black Crows", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 42, title: "Strong Bearish Pattern", description: "What does this indicate?", chartType: 'candlestick', candleData: makeThreeBlackCrows(1), correctAnswer: 'sell', explanation: "Three large bearish candles confirm downtrend", patternName: "Three Black Crows", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 43, title: "Crows Formation", description: "Analyze this setup", chartType: 'candlestick', candleData: makeThreeBlackCrows(2), correctAnswer: 'sell', explanation: "Sustained selling over three sessions", patternName: "Three Black Crows", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 44, title: "Bearish Momentum", description: "What action to take?", chartType: 'candlestick', candleData: makeThreeBlackCrows(3), correctAnswer: 'sell', explanation: "Strong reversal with selling conviction", patternName: "Three Black Crows", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // PIERCING PATTERN (45-50)
  { id: 45, title: "Piercing Pattern", description: "Bullish candle closes above midpoint", chartType: 'candlestick', candleData: makePiercingPattern(0), correctAnswer: 'buy', explanation: "Piercing pattern signals bullish reversal", patternName: "Piercing Pattern", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 46, title: "Piercing Line", description: "What does this two-candle setup mean?", chartType: 'candlestick', candleData: makePiercingPattern(1), correctAnswer: 'buy', explanation: "Opens below, closes above midpoint = bullish", patternName: "Piercing Pattern", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 47, title: "Bottom Piercing", description: "Analyze the reversal", chartType: 'candlestick', candleData: makePiercingPattern(2), correctAnswer: 'buy', explanation: "Strong buying after bearish candle", patternName: "Piercing Pattern", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 48, title: "Bullish Piercing", description: "What is your trade?", chartType: 'candlestick', candleData: makePiercingPattern(3), correctAnswer: 'buy', explanation: "Buyers showing strength at bottom", patternName: "Piercing Pattern", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // DARK CLOUD COVER (49-54)
  { id: 49, title: "Dark Cloud Cover", description: "Bearish candle closes below midpoint", chartType: 'candlestick', candleData: makeDarkCloudCover(0), correctAnswer: 'sell', explanation: "Dark cloud signals bearish reversal at top", patternName: "Dark Cloud Cover", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 50, title: "Dark Cloud Pattern", description: "What does this show?", chartType: 'candlestick', candleData: makeDarkCloudCover(1), correctAnswer: 'sell', explanation: "Opens above, closes below midpoint = bearish", patternName: "Dark Cloud Cover", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 51, title: "Top Dark Cloud", description: "Analyze the pattern", chartType: 'candlestick', candleData: makeDarkCloudCover(2), correctAnswer: 'sell', explanation: "Strong selling after bullish candle", patternName: "Dark Cloud Cover", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 52, title: "Bearish Cloud Cover", description: "What action to take?", chartType: 'candlestick', candleData: makeDarkCloudCover(3), correctAnswer: 'sell', explanation: "Sellers showing strength at top", patternName: "Dark Cloud Cover", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // BULLISH HARAMI (53-58)
  { id: 53, title: "Bullish Harami", description: "Small bullish inside large bearish", chartType: 'candlestick', candleData: makeBullishHarami(0), correctAnswer: 'buy', explanation: "Harami at bottom suggests reversal", patternName: "Bullish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 54, title: "Harami Buy Signal", description: "What does this indicate?", chartType: 'candlestick', candleData: makeBullishHarami(1), correctAnswer: 'buy', explanation: "Small candle inside large = indecision, potential reversal", patternName: "Bullish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 55, title: "Inside Candle Bottom", description: "Analyze the setup", chartType: 'candlestick', candleData: makeBullishHarami(2), correctAnswer: 'buy', explanation: "Selling pressure reduced, buyers emerging", patternName: "Bullish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 56, title: "Bottom Harami", description: "What is your decision?", chartType: 'candlestick', candleData: makeBullishHarami(3), correctAnswer: 'buy', explanation: "Bullish harami signals potential reversal up", patternName: "Bullish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // BEARISH HARAMI (57-62)
  { id: 57, title: "Bearish Harami", description: "Small bearish inside large bullish", chartType: 'candlestick', candleData: makeBearishHarami(0), correctAnswer: 'sell', explanation: "Harami at top warns of reversal", patternName: "Bearish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 58, title: "Harami Sell Signal", description: "What does this mean?", chartType: 'candlestick', candleData: makeBearishHarami(1), correctAnswer: 'sell', explanation: "Small inside candle shows momentum fading", patternName: "Bearish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 59, title: "Top Inside Candle", description: "Analyze the pattern", chartType: 'candlestick', candleData: makeBearishHarami(2), correctAnswer: 'sell', explanation: "Buying momentum reduced at top", patternName: "Bearish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 60, title: "Harami at Peak", description: "What action to take?", chartType: 'candlestick', candleData: makeBearishHarami(3), correctAnswer: 'sell', explanation: "Bearish harami signals potential reversal down", patternName: "Bearish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  
  // TWEEZER PATTERNS (61-68)
  { id: 61, title: "Tweezer Bottom", description: "Two candles with same low", chartType: 'candlestick', candleData: makeTweezerBottom(0), correctAnswer: 'buy', explanation: "Same low twice = strong support", patternName: "Tweezer Bottom", category: "Candlestick Patterns", difficulty: "advanced" },
  { id: 62, title: "Tweezer Support", description: "What does this show?", chartType: 'candlestick', candleData: makeTweezerBottom(1), correctAnswer: 'buy', explanation: "Price rejected same level twice - bullish", patternName: "Tweezer Bottom", category: "Candlestick Patterns", difficulty: "advanced" },
  { id: 63, title: "Bottom Tweezer Signal", description: "Analyze the reversal", chartType: 'candlestick', candleData: makeTweezerBottom(2), correctAnswer: 'buy', explanation: "Double test of support held - buy signal", patternName: "Tweezer Bottom", category: "Candlestick Patterns", difficulty: "advanced" },
  { id: 64, title: "Tweezer Top", description: "Two candles with same high", chartType: 'candlestick', candleData: makeTweezerTop(0), correctAnswer: 'sell', explanation: "Same high twice = strong resistance", patternName: "Tweezer Top", category: "Candlestick Patterns", difficulty: "advanced" },
  { id: 65, title: "Tweezer Resistance", description: "What does this indicate?", chartType: 'candlestick', candleData: makeTweezerTop(1), correctAnswer: 'sell', explanation: "Price rejected same level twice - bearish", patternName: "Tweezer Top", category: "Candlestick Patterns", difficulty: "advanced" },
  { id: 66, title: "Top Tweezer Signal", description: "Analyze the pattern", chartType: 'candlestick', candleData: makeTweezerTop(2), correctAnswer: 'sell', explanation: "Double rejection at resistance - sell signal", patternName: "Tweezer Top", category: "Candlestick Patterns", difficulty: "advanced" },
  
  // MARUBOZU (67-72)
  { id: 67, title: "Bullish Marubozu", description: "Full body candle, no wicks", chartType: 'candlestick', candleData: makeBullishMarubozu(0), correctAnswer: 'buy', explanation: "Complete buyer dominance - strong bullish", patternName: "Bullish Marubozu", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 68, title: "Strong Bullish Candle", description: "What does no wicks mean?", chartType: 'candlestick', candleData: makeBullishMarubozu(1), correctAnswer: 'buy', explanation: "Opened at low, closed at high - powerful buying", patternName: "Bullish Marubozu", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 69, title: "Marubozu Buy", description: "Analyze this momentum candle", chartType: 'candlestick', candleData: makeBullishMarubozu(2), correctAnswer: 'buy', explanation: "No seller resistance throughout session", patternName: "Bullish Marubozu", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 70, title: "Bearish Marubozu", description: "Full bearish body, no wicks", chartType: 'candlestick', candleData: makeBearishMarubozu(0), correctAnswer: 'sell', explanation: "Complete seller dominance - strong bearish", patternName: "Bearish Marubozu", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 71, title: "Strong Bearish Candle", description: "What does this indicate?", chartType: 'candlestick', candleData: makeBearishMarubozu(1), correctAnswer: 'sell', explanation: "Opened at high, closed at low - powerful selling", patternName: "Bearish Marubozu", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 72, title: "Marubozu Sell", description: "Analyze the selling pressure", chartType: 'candlestick', candleData: makeBearishMarubozu(2), correctAnswer: 'sell', explanation: "No buyer resistance throughout session", patternName: "Bearish Marubozu", category: "Candlestick Patterns", difficulty: "beginner" },
  
  // DRAGONFLY & GRAVESTONE DOJI (73-78)
  { id: 73, title: "Dragonfly Doji", description: "Long lower shadow, open=close at high", chartType: 'candlestick', candleData: makeDragonflyDoji(0), correctAnswer: 'buy', explanation: "Sellers pushed down but buyers recovered all - bullish", patternName: "Dragonfly Doji", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 74, title: "Dragonfly Signal", description: "What does this pattern mean?", chartType: 'candlestick', candleData: makeDragonflyDoji(1), correctAnswer: 'buy', explanation: "Strong buyer rejection of lower prices", patternName: "Dragonfly Doji", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 75, title: "Bottom Dragonfly", description: "Analyze this reversal candle", chartType: 'candlestick', candleData: makeDragonflyDoji(2), correctAnswer: 'buy', explanation: "Dragonfly at support is bullish signal", patternName: "Dragonfly Doji", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 76, title: "Gravestone Doji", description: "Long upper shadow, open=close at low", chartType: 'candlestick', candleData: makeGravestoneDoji(0), correctAnswer: 'sell', explanation: "Buyers pushed up but sellers recovered all - bearish", patternName: "Gravestone Doji", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 77, title: "Gravestone Signal", description: "What does this indicate?", chartType: 'candlestick', candleData: makeGravestoneDoji(1), correctAnswer: 'sell', explanation: "Strong seller rejection of higher prices", patternName: "Gravestone Doji", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 78, title: "Top Gravestone", description: "Analyze the reversal", chartType: 'candlestick', candleData: makeGravestoneDoji(2), correctAnswer: 'sell', explanation: "Gravestone at resistance is bearish signal", patternName: "Gravestone Doji", category: "Candlestick Patterns", difficulty: "intermediate" },

  // ========== LINE CHART PATTERNS ==========
  
  // DOUBLE BOTTOM (79-86)
  { id: 79, title: "Double Bottom", description: "Price tested support twice", chartType: 'line', lineData: makeDoubleBottom(0), correctAnswer: 'buy', explanation: "W pattern at bottom signals bullish reversal", patternName: "Double Bottom", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 80, title: "W Pattern", description: "What does this formation indicate?", chartType: 'line', lineData: makeDoubleBottom(1), correctAnswer: 'buy', explanation: "Two tests of support held - strong buying zone", patternName: "Double Bottom", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 81, title: "Double Bottom Reversal", description: "Analyze this chart pattern", chartType: 'line', lineData: makeDoubleBottom(2), correctAnswer: 'buy', explanation: "Classic reversal pattern at market bottom", patternName: "Double Bottom", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 82, title: "Support Retest", description: "What action to take?", chartType: 'line', lineData: makeDoubleBottom(3), correctAnswer: 'buy', explanation: "Double bottom confirms strong support", patternName: "Double Bottom", category: "Chart Patterns", difficulty: "intermediate" },
  
  // DOUBLE TOP (83-90)
  { id: 83, title: "Double Top", description: "Price tested resistance twice", chartType: 'line', lineData: makeDoubleTop(0), correctAnswer: 'sell', explanation: "M pattern at top signals bearish reversal", patternName: "Double Top", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 84, title: "M Pattern", description: "What does this show?", chartType: 'line', lineData: makeDoubleTop(1), correctAnswer: 'sell', explanation: "Two failed attempts at resistance - bearish", patternName: "Double Top", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 85, title: "Double Top Reversal", description: "Analyze the formation", chartType: 'line', lineData: makeDoubleTop(2), correctAnswer: 'sell', explanation: "Classic reversal pattern at market top", patternName: "Double Top", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 86, title: "Resistance Retest", description: "What is your decision?", chartType: 'line', lineData: makeDoubleTop(3), correctAnswer: 'sell', explanation: "Double top confirms strong resistance", patternName: "Double Top", category: "Chart Patterns", difficulty: "intermediate" },
  
  // HEAD AND SHOULDERS (87-94)
  { id: 87, title: "Head and Shoulders", description: "Three peaks with middle highest", chartType: 'line', lineData: makeHeadAndShoulders(0), correctAnswer: 'sell', explanation: "Classic bearish reversal pattern at top", patternName: "Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 88, title: "H&S Top", description: "What does this pattern signal?", chartType: 'line', lineData: makeHeadAndShoulders(1), correctAnswer: 'sell', explanation: "Head higher than shoulders indicates reversal", patternName: "Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 89, title: "Classic H&S Pattern", description: "Analyze this formation", chartType: 'line', lineData: makeHeadAndShoulders(2), correctAnswer: 'sell', explanation: "Neckline break confirms bearish reversal", patternName: "Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 90, title: "Top Reversal H&S", description: "What action to take?", chartType: 'line', lineData: makeHeadAndShoulders(3), correctAnswer: 'sell', explanation: "One of most reliable bearish patterns", patternName: "Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  
  // INVERSE HEAD AND SHOULDERS (91-98)
  { id: 91, title: "Inverse Head and Shoulders", description: "Three troughs with middle lowest", chartType: 'line', lineData: makeInverseHeadAndShoulders(0), correctAnswer: 'buy', explanation: "Bullish reversal pattern at bottom", patternName: "Inverse Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 92, title: "Inverse H&S Bottom", description: "What does this indicate?", chartType: 'line', lineData: makeInverseHeadAndShoulders(1), correctAnswer: 'buy', explanation: "Head lower than shoulders signals reversal up", patternName: "Inverse Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 93, title: "Classic IH&S", description: "Analyze the setup", chartType: 'line', lineData: makeInverseHeadAndShoulders(2), correctAnswer: 'buy', explanation: "Neckline break confirms bullish reversal", patternName: "Inverse Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 94, title: "Bottom Reversal IH&S", description: "What is your trade?", chartType: 'line', lineData: makeInverseHeadAndShoulders(3), correctAnswer: 'buy', explanation: "Reliable pattern for trend reversal", patternName: "Inverse Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  
  // ASCENDING TRIANGLE (95-100)
  { id: 95, title: "Ascending Triangle", description: "Flat resistance, rising support", chartType: 'line', lineData: makeAscendingTriangle(0), correctAnswer: 'buy', explanation: "Higher lows against flat resistance = bullish", patternName: "Ascending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 96, title: "Rising Triangle", description: "What does this formation mean?", chartType: 'line', lineData: makeAscendingTriangle(1), correctAnswer: 'buy', explanation: "Buyers getting stronger with each test", patternName: "Ascending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 97, title: "Bullish Triangle", description: "Analyze the pattern", chartType: 'line', lineData: makeAscendingTriangle(2), correctAnswer: 'buy', explanation: "Usually breaks upward with conviction", patternName: "Ascending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 98, title: "Triangle Breakout Up", description: "What action to take?", chartType: 'line', lineData: makeAscendingTriangle(3), correctAnswer: 'buy', explanation: "Ascending triangle is bullish continuation", patternName: "Ascending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  
  // DESCENDING TRIANGLE (99-104)
  { id: 99, title: "Descending Triangle", description: "Flat support, falling resistance", chartType: 'line', lineData: makeDescendingTriangle(0), correctAnswer: 'sell', explanation: "Lower highs against flat support = bearish", patternName: "Descending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 100, title: "Falling Triangle", description: "What does this show?", chartType: 'line', lineData: makeDescendingTriangle(1), correctAnswer: 'sell', explanation: "Sellers getting stronger with each bounce", patternName: "Descending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 101, title: "Bearish Triangle", description: "Analyze the formation", chartType: 'line', lineData: makeDescendingTriangle(2), correctAnswer: 'sell', explanation: "Usually breaks downward with conviction", patternName: "Descending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 102, title: "Triangle Breakdown", description: "What is your decision?", chartType: 'line', lineData: makeDescendingTriangle(3), correctAnswer: 'sell', explanation: "Descending triangle is bearish continuation", patternName: "Descending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  
  // SYMMETRICAL TRIANGLE (103-110)
  { id: 103, title: "Symmetrical Triangle Bullish", description: "Converging trendlines breaking up", chartType: 'line', lineData: makeSymmetricalTriangleBullish(0), correctAnswer: 'buy', explanation: "Breakout to upside confirms bullish bias", patternName: "Symmetrical Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 104, title: "Triangle Upside Break", description: "What does this breakout mean?", chartType: 'line', lineData: makeSymmetricalTriangleBullish(1), correctAnswer: 'buy', explanation: "Bulls won the battle at triangle apex", patternName: "Symmetrical Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 105, title: "Bullish Symmetrical", description: "Analyze the breakout", chartType: 'line', lineData: makeSymmetricalTriangleBullish(2), correctAnswer: 'buy', explanation: "Follow the breakout direction", patternName: "Symmetrical Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 106, title: "Symmetrical Triangle Bearish", description: "Converging trendlines breaking down", chartType: 'line', lineData: makeSymmetricalTriangleBearish(0), correctAnswer: 'sell', explanation: "Breakdown confirms bearish bias", patternName: "Symmetrical Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 107, title: "Triangle Downside Break", description: "What does this breakdown mean?", chartType: 'line', lineData: makeSymmetricalTriangleBearish(1), correctAnswer: 'sell', explanation: "Bears won the battle at triangle apex", patternName: "Symmetrical Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 108, title: "Bearish Symmetrical", description: "Analyze the breakdown", chartType: 'line', lineData: makeSymmetricalTriangleBearish(2), correctAnswer: 'sell', explanation: "Follow the breakdown direction", patternName: "Symmetrical Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  
  // BULL FLAG (109-116)
  { id: 109, title: "Bull Flag", description: "Strong up move then consolidation", chartType: 'line', lineData: makeBullFlag(0), correctAnswer: 'buy', explanation: "Flag is a pause in uptrend - continuation", patternName: "Bull Flag", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 110, title: "Bullish Flag Pattern", description: "What does this consolidation mean?", chartType: 'line', lineData: makeBullFlag(1), correctAnswer: 'buy', explanation: "Tight consolidation after rally = bullish", patternName: "Bull Flag", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 111, title: "Flag Continuation", description: "Analyze the pattern", chartType: 'line', lineData: makeBullFlag(2), correctAnswer: 'buy', explanation: "Healthy pullback before next leg up", patternName: "Bull Flag", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 112, title: "Bullish Continuation", description: "What is your trade?", chartType: 'line', lineData: makeBullFlag(3), correctAnswer: 'buy', explanation: "Bull flags have high success rate", patternName: "Bull Flag", category: "Chart Patterns", difficulty: "intermediate" },
  
  // BEAR FLAG (113-120)
  { id: 113, title: "Bear Flag", description: "Strong down move then consolidation", chartType: 'line', lineData: makeBearFlag(0), correctAnswer: 'sell', explanation: "Flag is a pause in downtrend - continuation", patternName: "Bear Flag", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 114, title: "Bearish Flag Pattern", description: "What does this mean?", chartType: 'line', lineData: makeBearFlag(1), correctAnswer: 'sell', explanation: "Slight bounce in downtrend = continuation down", patternName: "Bear Flag", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 115, title: "Flag Breakdown", description: "Analyze the setup", chartType: 'line', lineData: makeBearFlag(2), correctAnswer: 'sell', explanation: "Relief rally before next leg down", patternName: "Bear Flag", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 116, title: "Bearish Continuation", description: "What action to take?", chartType: 'line', lineData: makeBearFlag(3), correctAnswer: 'sell', explanation: "Bear flags often lead to further decline", patternName: "Bear Flag", category: "Chart Patterns", difficulty: "intermediate" },
  
  // CUP AND HANDLE (117-122)
  { id: 117, title: "Cup and Handle", description: "Rounded bottom with small pullback", chartType: 'line', lineData: makeCupAndHandle(0), correctAnswer: 'buy', explanation: "Classic bullish continuation pattern", patternName: "Cup and Handle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 118, title: "Cup Formation", description: "What does this U-shape indicate?", chartType: 'line', lineData: makeCupAndHandle(1), correctAnswer: 'buy', explanation: "Gradual accumulation with handle pullback", patternName: "Cup and Handle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 119, title: "Handle Breakout", description: "Analyze the pattern", chartType: 'line', lineData: makeCupAndHandle(2), correctAnswer: 'buy', explanation: "Handle is final shakeout before breakout", patternName: "Cup and Handle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 120, title: "C&H Buy Signal", description: "What is your decision?", chartType: 'line', lineData: makeCupAndHandle(3), correctAnswer: 'buy', explanation: "One of most reliable bullish patterns", patternName: "Cup and Handle", category: "Chart Patterns", difficulty: "intermediate" },
  
  // ROUNDING BOTTOM (121-126)
  { id: 121, title: "Rounding Bottom", description: "Gradual U-shaped recovery", chartType: 'line', lineData: makeRoundingBottom(0), correctAnswer: 'buy', explanation: "Slow shift from selling to buying", patternName: "Rounding Bottom", category: "Chart Patterns", difficulty: "advanced" },
  { id: 122, title: "Saucer Pattern", description: "What does this formation mean?", chartType: 'line', lineData: makeRoundingBottom(1), correctAnswer: 'buy', explanation: "Long-term accumulation pattern", patternName: "Rounding Bottom", category: "Chart Patterns", difficulty: "advanced" },
  { id: 123, title: "Bowl Formation", description: "Analyze the reversal", chartType: 'line', lineData: makeRoundingBottom(2), correctAnswer: 'buy', explanation: "Gradual sentiment change from bearish to bullish", patternName: "Rounding Bottom", category: "Chart Patterns", difficulty: "advanced" },
  { id: 124, title: "Rounded Reversal", description: "What action to take?", chartType: 'line', lineData: makeRoundingBottom(3), correctAnswer: 'buy', explanation: "Indicates major trend reversal", patternName: "Rounding Bottom", category: "Chart Patterns", difficulty: "advanced" },
  
  // TRIPLE BOTTOM (125-130)
  { id: 125, title: "Triple Bottom", description: "Three tests of same support", chartType: 'line', lineData: makeTripleBottom(0), correctAnswer: 'buy', explanation: "Three failed breakdowns = very strong support", patternName: "Triple Bottom", category: "Chart Patterns", difficulty: "advanced" },
  { id: 126, title: "Triple Support Test", description: "What does this show?", chartType: 'line', lineData: makeTripleBottom(1), correctAnswer: 'buy', explanation: "More reliable than double bottom", patternName: "Triple Bottom", category: "Chart Patterns", difficulty: "advanced" },
  { id: 127, title: "Strong Bottom", description: "Analyze the pattern", chartType: 'line', lineData: makeTripleBottom(2), correctAnswer: 'buy', explanation: "Major accumulation zone confirmed", patternName: "Triple Bottom", category: "Chart Patterns", difficulty: "advanced" },
  { id: 128, title: "Triple Bottom Buy", description: "What is your trade?", chartType: 'line', lineData: makeTripleBottom(3), correctAnswer: 'buy', explanation: "High probability reversal pattern", patternName: "Triple Bottom", category: "Chart Patterns", difficulty: "advanced" },
  
  // TRIPLE TOP (129-134)
  { id: 129, title: "Triple Top", description: "Three tests of same resistance", chartType: 'line', lineData: makeTripleTop(0), correctAnswer: 'sell', explanation: "Three failed breakouts = very strong resistance", patternName: "Triple Top", category: "Chart Patterns", difficulty: "advanced" },
  { id: 130, title: "Triple Resistance Test", description: "What does this indicate?", chartType: 'line', lineData: makeTripleTop(1), correctAnswer: 'sell', explanation: "More reliable than double top", patternName: "Triple Top", category: "Chart Patterns", difficulty: "advanced" },
  { id: 131, title: "Strong Top", description: "Analyze the formation", chartType: 'line', lineData: makeTripleTop(2), correctAnswer: 'sell', explanation: "Major distribution zone confirmed", patternName: "Triple Top", category: "Chart Patterns", difficulty: "advanced" },
  { id: 132, title: "Triple Top Sell", description: "What action to take?", chartType: 'line', lineData: makeTripleTop(3), correctAnswer: 'sell', explanation: "High probability reversal pattern", patternName: "Triple Top", category: "Chart Patterns", difficulty: "advanced" },
  
  // FALLING WEDGE (133-138)
  { id: 133, title: "Falling Wedge", description: "Converging down-sloping lines", chartType: 'line', lineData: makeFallingWedge(0), correctAnswer: 'buy', explanation: "Falling wedge usually breaks upward", patternName: "Falling Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 134, title: "Wedge Reversal", description: "What does this pattern mean?", chartType: 'line', lineData: makeFallingWedge(1), correctAnswer: 'buy', explanation: "Selling is exhausting, buyers emerging", patternName: "Falling Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 135, title: "Bullish Wedge", description: "Analyze the breakout", chartType: 'line', lineData: makeFallingWedge(2), correctAnswer: 'buy', explanation: "Converging trendlines with bullish bias", patternName: "Falling Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 136, title: "Wedge Breakout Up", description: "What is your decision?", chartType: 'line', lineData: makeFallingWedge(3), correctAnswer: 'buy', explanation: "Falling wedge is bullish pattern", patternName: "Falling Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  
  // RISING WEDGE (137-142)
  { id: 137, title: "Rising Wedge", description: "Converging up-sloping lines", chartType: 'line', lineData: makeRisingWedge(0), correctAnswer: 'sell', explanation: "Rising wedge usually breaks downward", patternName: "Rising Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 138, title: "Wedge Distribution", description: "What does this show?", chartType: 'line', lineData: makeRisingWedge(1), correctAnswer: 'sell', explanation: "Buying is exhausting, sellers emerging", patternName: "Rising Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 139, title: "Bearish Wedge", description: "Analyze the breakdown", chartType: 'line', lineData: makeRisingWedge(2), correctAnswer: 'sell', explanation: "Converging trendlines with bearish bias", patternName: "Rising Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 140, title: "Wedge Breakdown", description: "What action to take?", chartType: 'line', lineData: makeRisingWedge(3), correctAnswer: 'sell', explanation: "Rising wedge is bearish pattern", patternName: "Rising Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  
  // SUPPORT BOUNCE (141-148)
  { id: 141, title: "Support Bounce", description: "Price bouncing off support level", chartType: 'line', lineData: makeSupportBounce(0), correctAnswer: 'buy', explanation: "Support holding means buyers stepping in", patternName: "Support Bounce", category: "Support & Resistance", difficulty: "beginner" },
  { id: 142, title: "Support Level Test", description: "What does this indicate?", chartType: 'line', lineData: makeSupportBounce(1), correctAnswer: 'buy', explanation: "Price found buyers at support zone", patternName: "Support Bounce", category: "Support & Resistance", difficulty: "beginner" },
  { id: 143, title: "Buying at Support", description: "Analyze the bounce", chartType: 'line', lineData: makeSupportBounce(2), correctAnswer: 'buy', explanation: "Classic buy-the-dip opportunity", patternName: "Support Bounce", category: "Support & Resistance", difficulty: "beginner" },
  { id: 144, title: "Support Confirmation", description: "What is your trade?", chartType: 'line', lineData: makeSupportBounce(3), correctAnswer: 'buy', explanation: "Support bounce with confirmation = buy signal", patternName: "Support Bounce", category: "Support & Resistance", difficulty: "beginner" },
  
  // RESISTANCE REJECTION (145-152)
  { id: 145, title: "Resistance Rejection", description: "Price rejected at resistance", chartType: 'line', lineData: makeResistanceRejection(0), correctAnswer: 'sell', explanation: "Resistance holding means sellers stepping in", patternName: "Resistance Rejection", category: "Support & Resistance", difficulty: "beginner" },
  { id: 146, title: "Resistance Level Test", description: "What does this show?", chartType: 'line', lineData: makeResistanceRejection(1), correctAnswer: 'sell', explanation: "Price found sellers at resistance zone", patternName: "Resistance Rejection", category: "Support & Resistance", difficulty: "beginner" },
  { id: 147, title: "Selling at Resistance", description: "Analyze the rejection", chartType: 'line', lineData: makeResistanceRejection(2), correctAnswer: 'sell', explanation: "Classic sell-the-rally opportunity", patternName: "Resistance Rejection", category: "Support & Resistance", difficulty: "beginner" },
  { id: 148, title: "Resistance Confirmation", description: "What action to take?", chartType: 'line', lineData: makeResistanceRejection(3), correctAnswer: 'sell', explanation: "Resistance rejection with confirmation = sell signal", patternName: "Resistance Rejection", category: "Support & Resistance", difficulty: "beginner" },
  
  // UPTREND (149-156)
  { id: 149, title: "Strong Uptrend", description: "Higher highs and higher lows", chartType: 'line', lineData: makeUptrendContinuation(0), correctAnswer: 'buy', explanation: "Trend is your friend - buy in uptrend", patternName: "Uptrend", category: "Trend Analysis", difficulty: "beginner" },
  { id: 150, title: "Bullish Trend", description: "What does this pattern show?", chartType: 'line', lineData: makeUptrendContinuation(1), correctAnswer: 'buy', explanation: "Consistent higher highs = bullish momentum", patternName: "Uptrend", category: "Trend Analysis", difficulty: "beginner" },
  { id: 151, title: "Trending Higher", description: "Analyze the direction", chartType: 'line', lineData: makeUptrendContinuation(2), correctAnswer: 'buy', explanation: "Don't fight the trend - go with it", patternName: "Uptrend", category: "Trend Analysis", difficulty: "beginner" },
  { id: 152, title: "Buy the Trend", description: "What is your decision?", chartType: 'line', lineData: makeUptrendContinuation(3), correctAnswer: 'buy', explanation: "Uptrend continuation = buy opportunity", patternName: "Uptrend", category: "Trend Analysis", difficulty: "beginner" },
  
  // DOWNTREND (153-160)
  { id: 153, title: "Strong Downtrend", description: "Lower highs and lower lows", chartType: 'line', lineData: makeDowntrendContinuation(0), correctAnswer: 'sell', explanation: "Trend is your friend - sell in downtrend", patternName: "Downtrend", category: "Trend Analysis", difficulty: "beginner" },
  { id: 154, title: "Bearish Trend", description: "What does this indicate?", chartType: 'line', lineData: makeDowntrendContinuation(1), correctAnswer: 'sell', explanation: "Consistent lower lows = bearish momentum", patternName: "Downtrend", category: "Trend Analysis", difficulty: "beginner" },
  { id: 155, title: "Trending Lower", description: "Analyze the movement", chartType: 'line', lineData: makeDowntrendContinuation(2), correctAnswer: 'sell', explanation: "Don't buy into falling knife", patternName: "Downtrend", category: "Trend Analysis", difficulty: "beginner" },
  { id: 156, title: "Sell the Trend", description: "What action to take?", chartType: 'line', lineData: makeDowntrendContinuation(3), correctAnswer: 'sell', explanation: "Downtrend continuation = sell signal", patternName: "Downtrend", category: "Trend Analysis", difficulty: "beginner" },
  
  // BREAKOUT (157-164)
  { id: 157, title: "Resistance Breakout", description: "Price breaking above resistance", chartType: 'line', lineData: makeBreakoutAboveResistance(0), correctAnswer: 'buy', explanation: "Breakout above resistance is bullish", patternName: "Breakout", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 158, title: "Bullish Breakout", description: "What does this breakout mean?", chartType: 'line', lineData: makeBreakoutAboveResistance(1), correctAnswer: 'buy', explanation: "Buyers have overcome sellers", patternName: "Breakout", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 159, title: "Upside Break", description: "Analyze the move", chartType: 'line', lineData: makeBreakoutAboveResistance(2), correctAnswer: 'buy', explanation: "Breakout often leads to acceleration", patternName: "Breakout", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 160, title: "Buy the Breakout", description: "What is your trade?", chartType: 'line', lineData: makeBreakoutAboveResistance(3), correctAnswer: 'buy', explanation: "Resistance break = bullish momentum", patternName: "Breakout", category: "Support & Resistance", difficulty: "intermediate" },
  
  // BREAKDOWN (161-168)
  { id: 161, title: "Support Breakdown", description: "Price breaking below support", chartType: 'line', lineData: makeBreakdownBelowSupport(0), correctAnswer: 'sell', explanation: "Breakdown below support is bearish", patternName: "Breakdown", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 162, title: "Bearish Breakdown", description: "What does this indicate?", chartType: 'line', lineData: makeBreakdownBelowSupport(1), correctAnswer: 'sell', explanation: "Sellers have overwhelmed buyers", patternName: "Breakdown", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 163, title: "Downside Break", description: "Analyze the move", chartType: 'line', lineData: makeBreakdownBelowSupport(2), correctAnswer: 'sell', explanation: "Breakdown often accelerates selling", patternName: "Breakdown", category: "Support & Resistance", difficulty: "intermediate" },
  { id: 164, title: "Sell the Breakdown", description: "What action to take?", chartType: 'line', lineData: makeBreakdownBelowSupport(3), correctAnswer: 'sell', explanation: "Support break = bearish momentum", patternName: "Breakdown", category: "Support & Resistance", difficulty: "intermediate" },
  
  // CHANNEL PATTERNS (165-172)
  { id: 165, title: "Ascending Channel", description: "Price at lower trendline", chartType: 'line', lineData: makeChannelUpBuy(0), correctAnswer: 'buy', explanation: "Buy at channel support in uptrend", patternName: "Ascending Channel", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 166, title: "Channel Support Buy", description: "What does this setup show?", chartType: 'line', lineData: makeChannelUpBuy(1), correctAnswer: 'buy', explanation: "Price bouncing within rising channel", patternName: "Ascending Channel", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 167, title: "Bullish Channel", description: "Analyze the pattern", chartType: 'line', lineData: makeChannelUpBuy(2), correctAnswer: 'buy', explanation: "Trading within established uptrend channel", patternName: "Ascending Channel", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 168, title: "Channel Trade Long", description: "What is your decision?", chartType: 'line', lineData: makeChannelUpBuy(3), correctAnswer: 'buy', explanation: "Buy at support, sell at resistance within channel", patternName: "Ascending Channel", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 169, title: "Descending Channel", description: "Price at upper trendline", chartType: 'line', lineData: makeChannelDownSell(0), correctAnswer: 'sell', explanation: "Sell at channel resistance in downtrend", patternName: "Descending Channel", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 170, title: "Channel Resistance Sell", description: "What does this indicate?", chartType: 'line', lineData: makeChannelDownSell(1), correctAnswer: 'sell', explanation: "Price rejected within falling channel", patternName: "Descending Channel", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 171, title: "Bearish Channel", description: "Analyze the setup", chartType: 'line', lineData: makeChannelDownSell(2), correctAnswer: 'sell', explanation: "Trading within established downtrend channel", patternName: "Descending Channel", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 172, title: "Channel Trade Short", description: "What action to take?", chartType: 'line', lineData: makeChannelDownSell(3), correctAnswer: 'sell', explanation: "Sell at resistance within falling channel", patternName: "Descending Channel", category: "Chart Patterns", difficulty: "intermediate" },
  
  // ADDITIONAL CANDLESTICK VARIATIONS (173-186)
  { id: 173, title: "Hammer Variant", description: "Reversal candle at support", chartType: 'candlestick', candleData: makeHammer(4), correctAnswer: 'buy', explanation: "Another hammer showing buyer strength", patternName: "Hammer", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 174, title: "Engulfing Strength", description: "Strong bullish engulfing", chartType: 'candlestick', candleData: makeBullishEngulfing(4), correctAnswer: 'buy', explanation: "Large engulfing candle confirms reversal", patternName: "Bullish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 175, title: "Engulfing Weakness", description: "Strong bearish engulfing", chartType: 'candlestick', candleData: makeBearishEngulfing(4), correctAnswer: 'sell', explanation: "Large bearish engulfing at top", patternName: "Bearish Engulfing", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 176, title: "Morning Star Variant", description: "Three-candle bottom", chartType: 'candlestick', candleData: makeMorningStar(4), correctAnswer: 'buy', explanation: "Another morning star reversal", patternName: "Morning Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 177, title: "Evening Star Variant", description: "Three-candle top", chartType: 'candlestick', candleData: makeEveningStar(4), correctAnswer: 'sell', explanation: "Another evening star reversal", patternName: "Evening Star", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 178, title: "Star Pattern", description: "Shooting star at peak", chartType: 'candlestick', candleData: makeShootingStar(4), correctAnswer: 'sell', explanation: "Shooting star showing rejection", patternName: "Shooting Star", category: "Candlestick Patterns", difficulty: "beginner" },
  { id: 179, title: "Hanging Formation", description: "Hanging man warning", chartType: 'candlestick', candleData: makeHangingMan(4), correctAnswer: 'sell', explanation: "Hanging man at resistance", patternName: "Hanging Man", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 180, title: "Soldier March", description: "Three white soldiers", chartType: 'candlestick', candleData: makeThreeWhiteSoldiers(4), correctAnswer: 'buy', explanation: "Strong bullish continuation", patternName: "Three White Soldiers", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 181, title: "Crow Flight", description: "Three black crows", chartType: 'candlestick', candleData: makeThreeBlackCrows(4), correctAnswer: 'sell', explanation: "Strong bearish continuation", patternName: "Three Black Crows", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 182, title: "Pierce Pattern", description: "Bullish piercing line", chartType: 'candlestick', candleData: makePiercingPattern(4), correctAnswer: 'buy', explanation: "Piercing shows buyer strength", patternName: "Piercing Pattern", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 183, title: "Cloud Cover", description: "Dark cloud bearish", chartType: 'candlestick', candleData: makeDarkCloudCover(4), correctAnswer: 'sell', explanation: "Dark cloud shows seller strength", patternName: "Dark Cloud Cover", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 184, title: "Inside Bar Buy", description: "Bullish harami setup", chartType: 'candlestick', candleData: makeBullishHarami(4), correctAnswer: 'buy', explanation: "Harami at bottom", patternName: "Bullish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 185, title: "Inside Bar Sell", description: "Bearish harami setup", chartType: 'candlestick', candleData: makeBearishHarami(4), correctAnswer: 'sell', explanation: "Harami at top", patternName: "Bearish Harami", category: "Candlestick Patterns", difficulty: "intermediate" },
  { id: 186, title: "Doji Warning", description: "Doji at critical level", chartType: 'candlestick', candleData: makeDoji(2, true), correctAnswer: 'sell', explanation: "Doji showing indecision at top", patternName: "Doji", category: "Candlestick Patterns", difficulty: "beginner" },
  
  // ADDITIONAL LINE CHART VARIATIONS (187-200)
  { id: 187, title: "Double Bottom Setup", description: "W pattern forming", chartType: 'line', lineData: makeDoubleBottom(4), correctAnswer: 'buy', explanation: "Double bottom reversal pattern", patternName: "Double Bottom", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 188, title: "Double Top Setup", description: "M pattern forming", chartType: 'line', lineData: makeDoubleTop(4), correctAnswer: 'sell', explanation: "Double top reversal pattern", patternName: "Double Top", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 189, title: "Head Shoulders Top", description: "H&S formation complete", chartType: 'line', lineData: makeHeadAndShoulders(4), correctAnswer: 'sell', explanation: "Classic head and shoulders", patternName: "Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 190, title: "Inverse H&S Bottom", description: "IH&S formation complete", chartType: 'line', lineData: makeInverseHeadAndShoulders(4), correctAnswer: 'buy', explanation: "Inverse head and shoulders", patternName: "Inverse Head and Shoulders", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 191, title: "Rising Triangle", description: "Ascending triangle breakout", chartType: 'line', lineData: makeAscendingTriangle(4), correctAnswer: 'buy', explanation: "Bullish triangle breakout", patternName: "Ascending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 192, title: "Falling Triangle", description: "Descending triangle breakdown", chartType: 'line', lineData: makeDescendingTriangle(4), correctAnswer: 'sell', explanation: "Bearish triangle breakdown", patternName: "Descending Triangle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 193, title: "Flag Buy Setup", description: "Bull flag continuation", chartType: 'line', lineData: makeBullFlag(4), correctAnswer: 'buy', explanation: "Bullish flag pattern", patternName: "Bull Flag", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 194, title: "Flag Sell Setup", description: "Bear flag continuation", chartType: 'line', lineData: makeBearFlag(4), correctAnswer: 'sell', explanation: "Bearish flag pattern", patternName: "Bear Flag", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 195, title: "Cup Handle Buy", description: "C&H breakout setup", chartType: 'line', lineData: makeCupAndHandle(4), correctAnswer: 'buy', explanation: "Cup and handle bullish", patternName: "Cup and Handle", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 196, title: "Wedge Buy Signal", description: "Falling wedge breakout", chartType: 'line', lineData: makeFallingWedge(4), correctAnswer: 'buy', explanation: "Falling wedge bullish", patternName: "Falling Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 197, title: "Wedge Sell Signal", description: "Rising wedge breakdown", chartType: 'line', lineData: makeRisingWedge(4), correctAnswer: 'sell', explanation: "Rising wedge bearish", patternName: "Rising Wedge", category: "Chart Patterns", difficulty: "intermediate" },
  { id: 198, title: "Support Test", description: "Price at support zone", chartType: 'line', lineData: makeSupportBounce(4), correctAnswer: 'buy', explanation: "Buy at support level", patternName: "Support Bounce", category: "Support & Resistance", difficulty: "beginner" },
  { id: 199, title: "Resistance Test", description: "Price at resistance zone", chartType: 'line', lineData: makeResistanceRejection(4), correctAnswer: 'sell', explanation: "Sell at resistance level", patternName: "Resistance Rejection", category: "Support & Resistance", difficulty: "beginner" },
  { id: 200, title: "Trend Following", description: "Strong uptrend momentum", chartType: 'line', lineData: makeUptrendContinuation(4), correctAnswer: 'buy', explanation: "Follow the established trend", patternName: "Uptrend", category: "Trend Analysis", difficulty: "beginner" },
];

export const getChartQuestionsByCategory = (category: string): ChartQuestion[] => {
  return chartQuestions.filter(q => q.category === category);
};

export const getChartQuestionsByDifficulty = (difficulty: ChartQuestion['difficulty']): ChartQuestion[] => {
  return chartQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomChartQuestions = (count: number = 10): ChartQuestion[] => {
  return [...chartQuestions].sort(() => Math.random() - 0.5).slice(0, count);
};
