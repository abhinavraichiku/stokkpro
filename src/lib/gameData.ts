// Game data and lesson content for StockMaster - Complete Trading Roadmap

export interface Phase {
  id: number;
  name: string;
  tagline: string;
  days: string;
  badge: string;
  icon: string;
  color: string;
}

export interface Lesson {
  day: number;
  phase: number;
  title: string;
  emoji: string;
  theory: {
    title: string;
    points: string[];
    visual?: { type: 'chart' | 'comparison' | 'formula' | 'warning' | 'candlestick' | 'lineChart' | 'priceTable'; data: any };
    keyTerm: string;
    keyTermDef: string;
    unlock?: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  challenge: {
    title: string;
    scenario: string;
    priceData: { time: string; price: number; note?: string }[];
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  trade: {
    stock: string;
    buyPrice: number;
    sellPrice: number;
    profit: number;
  };
}

export const phases: Phase[] = [
  { id: 0, name: "FOUNDATIONS", tagline: "Start Here", days: "1-10", badge: "Beginner", icon: "📚", color: "info" },
  { id: 1, name: "SURVIVAL BASICS", tagline: "Don't Blow Up", days: "11-16", badge: "Survivor", icon: "🛡️", color: "destructive" },
  { id: 2, name: "CHART READING", tagline: "See The Market", days: "17-24", badge: "Chart Reader", icon: "📊", color: "primary" },
  { id: 3, name: "CANDLESTICK PATTERNS", tagline: "Read Price Action", days: "25-36", badge: "Pattern Spotter", icon: "🕯️", color: "info" },
  { id: 4, name: "INDICATORS", tagline: "Confirm Your Edge", days: "37-46", badge: "Indicator Pro", icon: "📈", color: "accent" },
  { id: 5, name: "CHART PATTERNS", tagline: "Spot Big Moves", days: "47-58", badge: "Pattern Master", icon: "🎯", color: "warning" },
  { id: 6, name: "SWING TRADING", tagline: "Ride The Waves", days: "59-66", badge: "Swing Trader", icon: "🌊", color: "secondary" },
  { id: 7, name: "OPTIONS BASICS", tagline: "Leverage Power", days: "67-74", badge: "Options Learner", icon: "⚡", color: "primary" },
  { id: 8, name: "PSYCHOLOGY & SYSTEM", tagline: "The Real Game", days: "75-80", badge: "Trading Master", icon: "🧠", color: "accent" },
];

export const lessons: Lesson[] = [
  // PHASE 0: FOUNDATIONS (Days 1-10) - Absolute Basics for Complete Beginners
  {
    day: 1,
    phase: 0,
    title: "WHAT IS THE STOCK MARKET?",
    emoji: "🏛️",
    theory: {
      title: "THE MARKETPLACE FOR COMPANIES",
      points: [
        "🏛️ Stock market = Place where company shares are bought & sold",
        "📊 NSE & BSE are India's two main stock exchanges",
        "💼 Companies sell shares to raise money for growth",
        "🎯 You buy a share = You own a tiny piece of that company"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "NSE", value: 80, color: "primary", desc: "National Stock Exchange" },
            { label: "BSE", value: 60, color: "secondary", desc: "Bombay Stock Exchange" }
          ]
        }
      },
      keyTerm: "Stock Exchange",
      keyTermDef: "A marketplace where stocks are bought and sold",
      unlock: "Now you know what the stock market is!"
    },
    quiz: {
      question: "What is a stock exchange?",
      options: ["A shopping mall", "A marketplace for buying/selling company shares", "A bank"],
      correctIndex: 1,
      explanation: "A stock exchange is where you buy and sell shares of companies!"
    },
    challenge: {
      title: "UNDERSTAND THE BASICS",
      scenario: "You want to buy Reliance shares:",
      priceData: [
        { time: "Company", price: 0, note: "Reliance Industries" },
        { time: "Exchange", price: 0, note: "NSE" },
        { time: "Action", price: 0, note: "Buy 1 share" }
      ],
      question: "Where do you buy Reliance shares?",
      options: ["From Reliance office", "On NSE/BSE through a broker", "From your bank"],
      correctIndex: 1,
      explanation: "You buy shares through stock exchanges like NSE or BSE!"
    },
    trade: { stock: "Reliance", buyPrice: 2500, sellPrice: 2520, profit: 20 }
  },
  {
    day: 2,
    phase: 0,
    title: "WHAT IS A SHARE/STOCK?",
    emoji: "📄",
    theory: {
      title: "OWNING A PIECE OF A COMPANY",
      points: [
        "📄 Share = Small ownership unit of a company",
        "🍕 Like owning 1 slice of a pizza (company)",
        "💰 If company profits, share price goes UP",
        "📉 If company struggles, share price goes DOWN"
      ],
      visual: { 
        type: 'formula', 
        data: { 
          formula: "1 Share = Tiny piece of company ownership",
          example: "Buy 10 TCS shares = Own a tiny part of TCS"
        }
      },
      keyTerm: "Share",
      keyTermDef: "A unit of ownership in a company",
      unlock: "Now you understand what shares are!"
    },
    quiz: {
      question: "If you buy 10 shares of TCS, what do you own?",
      options: ["TCS office building", "A tiny part of TCS company", "TCS products"],
      correctIndex: 1,
      explanation: "Shares represent ownership in the company!"
    },
    challenge: {
      title: "SHARE OWNERSHIP",
      scenario: "TCS has 100 crore total shares:",
      priceData: [
        { time: "Total Shares", price: 10000000000, note: "100 crore" },
        { time: "You Buy", price: 10, note: "10 shares" },
        { time: "Your Ownership", price: 0, note: "Tiny %" }
      ],
      question: "What happens if TCS profits increase?",
      options: ["Nothing", "Share price likely goes UP", "Share price goes DOWN"],
      correctIndex: 1,
      explanation: "Good company performance = Higher share price!"
    },
    trade: { stock: "TCS", buyPrice: 3500, sellPrice: 3550, profit: 500 }
  },
  {
    day: 3,
    phase: 0,
    title: "HOW PRICES MOVE",
    emoji: "📈",
    theory: {
      title: "SUPPLY AND DEMAND",
      points: [
        "📈 More buyers than sellers = Price goes UP",
        "📉 More sellers than buyers = Price goes DOWN",
        "⚖️ This is called Supply and Demand",
        "🔄 Prices change every second during market hours"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "More Buyers", value: 80, color: "primary", desc: "Price ↑ UP" },
            { label: "More Sellers", value: 80, color: "destructive", desc: "Price ↓ DOWN" }
          ]
        }
      },
      keyTerm: "Supply & Demand",
      keyTermDef: "The balance between buyers and sellers that determines price",
      unlock: "Now you know why prices move!"
    },
    quiz: {
      question: "What happens when more people want to BUY a stock?",
      options: ["Price stays same", "Price goes DOWN", "Price goes UP"],
      correctIndex: 2,
      explanation: "More demand (buyers) = Higher price!"
    },
    challenge: {
      title: "PRICE MOVEMENT",
      scenario: "Breaking news: Reliance wins huge contract!",
      priceData: [
        { time: "Before News", price: 2500 },
        { time: "After News", price: 2600, note: "+4% 🚀" },
        { time: "Reason", price: 0, note: "More buyers!" }
      ],
      question: "Why did the price jump?",
      options: ["Sellers increased", "More people wanted to buy", "Market closed"],
      correctIndex: 1,
      explanation: "Good news = More buyers = Price goes UP!"
    },
    trade: { stock: "Reliance", buyPrice: 2500, sellPrice: 2600, profit: 100 }
  },
  {
    day: 4,
    phase: 0,
    title: "READING PRICE CHARTS",
    emoji: "📊",
    theory: {
      title: "CHARTS TELL A STORY",
      points: [
        "📊 Charts show price history visually",
        "⬆️ Line going UP = Price is rising",
        "⬇️ Line going DOWN = Price is falling",
        "➡️ Flat line = Price not moving much"
      ],
      visual: { type: 'lineChart', data: {} },
      keyTerm: "Price Chart",
      keyTermDef: "Visual representation of price over time",
      unlock: "Now you can read basic charts!"
    },
    quiz: {
      question: "A chart line going from bottom-left to top-right shows?",
      options: ["Price is falling", "Price is rising", "Price is stuck"],
      correctIndex: 1,
      explanation: "Upward slope = Price is increasing over time!"
    },
    challenge: {
      title: "READ THE CHART",
      scenario: "HDFC Bank chart shows:",
      priceData: [
        { time: "Monday", price: 1600 },
        { time: "Tuesday", price: 1620 },
        { time: "Wednesday", price: 1650 },
        { time: "Thursday", price: 1680, note: "Rising ↑" }
      ],
      question: "What is the price doing?",
      options: ["Falling", "Rising", "No change"],
      correctIndex: 1,
      explanation: "Each day is higher = Price is rising!"
    },
    trade: { stock: "HDFC Bank", buyPrice: 1600, sellPrice: 1680, profit: 80 }
  },
  {
    day: 5,
    phase: 0,
    title: "WHAT IS TRADING?",
    emoji: "💹",
    theory: {
      title: "BUY LOW, SELL HIGH",
      points: [
        "💹 Trading = Buying and selling to profit from price changes",
        "🎯 Goal: Buy at low price, sell at higher price",
        "💰 Profit = Sell Price - Buy Price",
        "📊 Traders look for short-term opportunities"
      ],
      visual: { 
        type: 'formula', 
        data: { 
          formula: "Profit = Selling Price - Buying Price",
          example: "Bought ₹100, Sold ₹110 = ₹10 profit"
        }
      },
      keyTerm: "Trading",
      keyTermDef: "Buying and selling stocks for profit",
      unlock: "Now you understand trading basics!"
    },
    quiz: {
      question: "You buy at ₹500 and sell at ₹550. What's your profit?",
      options: ["₹500", "₹50", "₹550"],
      correctIndex: 1,
      explanation: "Profit = 550 - 500 = ₹50!"
    },
    challenge: {
      title: "CALCULATE PROFIT",
      scenario: "Your first trade:",
      priceData: [
        { time: "Buy Price", price: 1000 },
        { time: "Sell Price", price: 1080, note: "+8%" },
        { time: "Quantity", price: 10, note: "10 shares" }
      ],
      question: "Total profit on 10 shares?",
      options: ["₹80", "₹800", "₹1080"],
      correctIndex: 1,
      explanation: "(1080-1000) × 10 = ₹800 profit!"
    },
    trade: { stock: "Infosys", buyPrice: 1000, sellPrice: 1080, profit: 800 }
  },
  {
    day: 6,
    phase: 0,
    title: "NIFTY & SENSEX",
    emoji: "📈",
    theory: {
      title: "MARKET INDICES",
      points: [
        "📈 Nifty 50 = Top 50 companies on NSE",
        "📊 Sensex = Top 30 companies on BSE",
        "🌡️ They show overall market health",
        "⬆️ Nifty up = Most big stocks are up"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Nifty 50", value: 50, color: "primary", desc: "50 companies (NSE)" },
            { label: "Sensex", value: 30, color: "secondary", desc: "30 companies (BSE)" }
          ]
        }
      },
      keyTerm: "Index",
      keyTermDef: "Average of top stocks showing market direction",
      unlock: "Now you understand market indices!"
    },
    quiz: {
      question: "Nifty is at 22000 and goes to 22500. What does this mean?",
      options: ["Market is falling", "Market is rising", "Nothing changed"],
      correctIndex: 1,
      explanation: "Higher Nifty = Market going UP!"
    },
    challenge: {
      title: "READ THE INDEX",
      scenario: "Market open:",
      priceData: [
        { time: "9:15 AM", price: 22000, note: "Open" },
        { time: "12:00 PM", price: 22200, note: "+200" },
        { time: "3:30 PM", price: 22350, note: "+350" }
      ],
      question: "How was the market today?",
      options: ["Bearish (falling)", "Bullish (rising)", "Sideways"],
      correctIndex: 1,
      explanation: "Nifty gained 350 points = Bullish day!"
    },
    trade: { stock: "Nifty", buyPrice: 22000, sellPrice: 22350, profit: 350 }
  },
  {
    day: 7,
    phase: 0,
    title: "MARKET HOURS & DAYS",
    emoji: "⏰",
    theory: {
      title: "WHEN MARKETS ARE OPEN",
      points: [
        "⏰ Market opens: 9:15 AM",
        "🔔 Market closes: 3:30 PM",
        "📅 Monday to Friday only",
        "🚫 Closed on weekends & holidays"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Pre-market", value: 15, color: "warning", desc: "9:00-9:15 AM" },
            { label: "Trading", value: 85, color: "primary", desc: "9:15 AM - 3:30 PM" }
          ]
        }
      },
      keyTerm: "Market Hours",
      keyTermDef: "Time when stock exchanges are open for trading",
      unlock: "Now you know when to trade!"
    },
    quiz: {
      question: "Can you buy stocks at 8 PM on Sunday?",
      options: ["Yes", "No, market is closed", "Only on NSE"],
      correctIndex: 1,
      explanation: "Market is closed after 3:30 PM and on weekends!"
    },
    challenge: {
      title: "TIMING YOUR TRADE",
      scenario: "You want to buy shares:",
      priceData: [
        { time: "Friday 3 PM", price: 2500, note: "Market open" },
        { time: "Saturday", price: 0, note: "Market closed!" },
        { time: "Monday 10 AM", price: 2510, note: "Market open" }
      ],
      question: "If you place order Saturday, when will it execute?",
      options: ["Saturday", "Monday", "Never"],
      correctIndex: 1,
      explanation: "Weekend orders execute on next trading day (Monday)!"
    },
    trade: { stock: "TCS", buyPrice: 3500, sellPrice: 3520, profit: 20 }
  },
  {
    day: 8,
    phase: 0,
    title: "BROKERS & DEMAT",
    emoji: "🏦",
    theory: {
      title: "HOW TO START TRADING",
      points: [
        "🏦 Broker = Company that lets you trade (Zerodha, Groww)",
        "📱 Open account with a broker first",
        "🗃️ Demat account = Where your shares are stored digitally",
        "💳 Link bank account to add/withdraw money"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Zerodha", value: 90, color: "primary", desc: "Most popular" },
            { label: "Groww", value: 80, color: "secondary", desc: "Easy to use" },
            { label: "Angel One", value: 70, color: "accent", desc: "Good app" }
          ]
        }
      },
      keyTerm: "Broker",
      keyTermDef: "Company that executes your buy/sell orders",
      unlock: "Now you know how to start!"
    },
    quiz: {
      question: "Where are your purchased shares stored?",
      options: ["In your bank", "In Demat account", "At company office"],
      correctIndex: 1,
      explanation: "Demat = Dematerialized account for holding shares!"
    },
    challenge: {
      title: "SET UP FOR TRADING",
      scenario: "Starting your trading journey:",
      priceData: [
        { time: "Step 1", price: 1, note: "Choose broker" },
        { time: "Step 2", price: 2, note: "Open Demat account" },
        { time: "Step 3", price: 3, note: "Add money & trade!" }
      ],
      question: "What do you need first to trade?",
      options: ["Just a phone", "Broker + Demat account", "Only bank account"],
      correctIndex: 1,
      explanation: "You need a broker and Demat account to start trading!"
    },
    trade: { stock: "Practice", buyPrice: 100, sellPrice: 105, profit: 5 }
  },
  {
    day: 9,
    phase: 0,
    title: "BULLS & BEARS",
    emoji: "🐂",
    theory: {
      title: "MARKET MOODS",
      points: [
        "🐂 Bull = Market going UP (optimistic)",
        "🐻 Bear = Market going DOWN (pessimistic)",
        "📈 Bullish = You expect prices to rise",
        "📉 Bearish = You expect prices to fall"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Bull 🐂", value: 70, color: "primary", desc: "Market UP" },
            { label: "Bear 🐻", value: 70, color: "destructive", desc: "Market DOWN" }
          ]
        }
      },
      keyTerm: "Bullish/Bearish",
      keyTermDef: "Terms describing market direction expectations",
      unlock: "Now you speak trader language!"
    },
    quiz: {
      question: "'I am bullish on Reliance' means?",
      options: ["I think it will fall", "I think it will rise", "I don't know"],
      correctIndex: 1,
      explanation: "Bullish = Expecting price to go UP!"
    },
    challenge: {
      title: "MARKET SENTIMENT",
      scenario: "News says 'Markets in bear grip':",
      priceData: [
        { time: "Nifty Open", price: 22000 },
        { time: "Nifty Close", price: 21500, note: "-500 pts" },
        { time: "Mood", price: 0, note: "Bearish 🐻" }
      ],
      question: "What does 'bear grip' mean?",
      options: ["Market rising fast", "Market falling, pessimism", "Market closed"],
      correctIndex: 1,
      explanation: "Bear = Falling market with negative sentiment!"
    },
    trade: { stock: "Market Lesson", buyPrice: 0, sellPrice: 0, profit: 0 }
  },
  {
    day: 10,
    phase: 0,
    title: "GREEN & RED DAYS",
    emoji: "🟢",
    theory: {
      title: "UNDERSTANDING COLORS",
      points: [
        "🟢 Green = Price is UP from yesterday",
        "🔴 Red = Price is DOWN from yesterday",
        "📊 Green candle = Price rose in that period",
        "📊 Red candle = Price fell in that period"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Green Day", value: 60, color: "primary", desc: "Stock went UP" },
            { label: "Red Day", value: 40, color: "destructive", desc: "Stock went DOWN" }
          ]
        }
      },
      keyTerm: "Green/Red",
      keyTermDef: "Colors indicating price increase or decrease",
      unlock: "✅ BADGE: Beginner - You know the basics!"
    },
    quiz: {
      question: "Your portfolio shows green color. What happened?",
      options: ["You lost money", "You made profit", "Error"],
      correctIndex: 1,
      explanation: "Green = Your stocks are UP, you're in profit!"
    },
    challenge: {
      title: "READ THE COLORS",
      scenario: "Your watchlist today:",
      priceData: [
        { time: "Reliance", price: 2550, note: "🟢 +2%" },
        { time: "TCS", price: 3480, note: "🔴 -1%" },
        { time: "HDFC", price: 1690, note: "🟢 +1.5%" }
      ],
      question: "Which stock fell today?",
      options: ["Reliance", "TCS", "HDFC"],
      correctIndex: 1,
      explanation: "TCS is red = It fell by 1%!"
    },
    trade: { stock: "Foundation Complete", buyPrice: 0, sellPrice: 100, profit: 100 }
  },

  // PHASE 1: SURVIVAL BASICS (Days 11-16)
  {
    day: 11,
    phase: 1,
    title: "RISK & REWARD RATIO",
    emoji: "⚖️",
    theory: {
      title: "ONLY TAKE GOOD TRADES",
      points: [
        "📈 Risk ₹1 to make ₹2 minimum (1:2 ratio)",
        "🛑 Stop Loss = Your maximum loss",
        "🎯 Target = Your profit goal",
        "❌ Never trade without a plan"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Good Trade", value: 67, color: "primary", desc: "Risk ₹100, Target ₹200" },
            { label: "Bad Trade", value: 33, color: "destructive", desc: "Risk ₹200, Target ₹100" }
          ]
        }
      },
      keyTerm: "Risk:Reward",
      keyTermDef: "How much you can lose vs how much you can gain",
      unlock: "Now you can filter bad trades"
    },
    quiz: {
      question: "Entry ₹100, Stop Loss ₹95, Target ₹115. Risk:Reward?",
      options: ["1:3", "1:2", "1:1"],
      correctIndex: 0,
      explanation: "Risk ₹5, Reward ₹15. That's 1:3 - excellent trade!"
    },
    challenge: {
      title: "EVALUATE THE SETUP",
      scenario: "Nifty trade setup:",
      priceData: [
        { time: "Entry", price: 22500 },
        { time: "Stop Loss", price: 22450, note: "Risk: 50 pts" },
        { time: "Target", price: 22600, note: "Reward: 100 pts" }
      ],
      question: "Should you take this trade?",
      options: ["No, R:R is bad", "Yes, 1:2 is good", "Need more data"],
      correctIndex: 1,
      explanation: "Risk 50, Reward 100 = 1:2 ratio. GOOD trade setup!"
    },
    trade: { stock: "Nifty", buyPrice: 22500, sellPrice: 22600, profit: 100 }
  },
  {
    day: 12,
    phase: 1,
    title: "STOP LOSS TYPES",
    emoji: "🛑",
    theory: {
      title: "PROTECT YOUR CAPITAL",
      points: [
        "🎯 Fixed SL: Set at entry, never move against you",
        "📊 Percentage SL: Based on % of capital (e.g., 2%)",
        "🕯️ Technical SL: Below support/chart pattern",
        "⚠️ No SL = Gambling, not trading"
      ],
      visual: { 
        type: 'warning', 
        data: { message: "90% of traders lose because they don't use stop loss!" }
      },
      keyTerm: "Stop Loss",
      keyTermDef: "Order that automatically exits your trade at a set loss level",
      unlock: "Now you can limit your losses"
    },
    quiz: {
      question: "You bought at ₹100. Where's the best SL?",
      options: ["₹99", "₹95 (below support)", "No SL"],
      correctIndex: 1,
      explanation: "SL below support gives your trade room to breathe!"
    },
    challenge: {
      title: "SET YOUR STOP",
      scenario: "You bought Bank Nifty at 48000:",
      priceData: [
        { time: "Entry", price: 48000 },
        { time: "Support", price: 47800, note: "Key level" },
        { time: "Current", price: 48200, note: "+200 pts" }
      ],
      question: "Where should your initial SL be?",
      options: ["47950", "47750 (below support)", "No SL needed"],
      correctIndex: 1,
      explanation: "SL below support level gives your trade room to breathe!"
    },
    trade: { stock: "Bank Nifty", buyPrice: 48000, sellPrice: 48200, profit: 200 }
  },
  {
    day: 13,
    phase: 1,
    title: "TRAILING STOP LOSS",
    emoji: "📈",
    theory: {
      title: "LOCK IN YOUR PROFITS",
      points: [
        "🔒 Trail SL as price moves in your favor",
        "📊 Move SL to entry = risk-free trade",
        "🎯 Trail below swing lows (for longs)",
        "💰 Never let a winner become a loser"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Without Trail", value: 40, color: "destructive", desc: "Winner turns loser" },
            { label: "With Trail", value: 85, color: "primary", desc: "Profits locked in" }
          ]
        }
      },
      keyTerm: "Trailing SL",
      keyTermDef: "Stop loss that follows price to lock in profits",
      unlock: "Now you can protect your winners"
    },
    quiz: {
      question: "Entry ₹100, now at ₹115. What should you do?",
      options: ["Move SL to ₹105", "Keep SL at original", "Remove SL"],
      correctIndex: 0,
      explanation: "Trail your SL to lock profits as price moves!"
    },
    challenge: {
      title: "TRAIL YOUR STOP",
      scenario: "Your trade is in profit:",
      priceData: [
        { time: "Entry", price: 500 },
        { time: "Original SL", price: 485, note: "-3%" },
        { time: "Current", price: 540, note: "+8%" }
      ],
      question: "Where should you trail SL?",
      options: ["Keep at ₹485", "Move to ₹520", "Move to ₹500"],
      correctIndex: 1,
      explanation: "Trail SL to ₹520, locking in profit even if it reverses!"
    },
    trade: { stock: "Reliance", buyPrice: 2500, sellPrice: 2600, profit: 200 }
  },
  {
    day: 14,
    phase: 1,
    title: "POSITION SIZING",
    emoji: "📏",
    theory: {
      title: "THE 2% RULE",
      points: [
        "🎯 Never risk more than 2% per trade",
        "📊 Calculate: Capital × 0.02 = Max Risk per trade",
        "🧮 Shares = Max Risk ÷ SL Distance",
        "🛡️ This keeps you in the game long term"
      ],
      visual: { 
        type: 'formula', 
        data: { 
          formula: "Position Size = (Capital × 2%) ÷ SL Distance",
          example: "(₹1,00,000 × 2%) ÷ ₹10 = 200 shares"
        }
      },
      keyTerm: "Position Sizing",
      keyTermDef: "How many shares to buy based on your risk",
      unlock: "Now you size trades correctly"
    },
    quiz: {
      question: "Capital ₹50,000, Entry ₹100, SL ₹95. Max shares?",
      options: ["500 shares", "200 shares", "100 shares"],
      correctIndex: 1,
      explanation: "2% of 50K = ₹1000. SL = ₹5. 1000÷5 = 200 shares max!"
    },
    challenge: {
      title: "SIZE YOUR TRADE",
      scenario: "You have ₹2,00,000 capital:",
      priceData: [
        { time: "Capital", price: 200000 },
        { time: "2% Risk", price: 4000, note: "Max loss" },
        { time: "SL Distance", price: 20, note: "Per share" }
      ],
      question: "How many shares can you trade?",
      options: ["500 shares", "200 shares", "100 shares"],
      correctIndex: 1,
      explanation: "₹4000 ÷ ₹20 = 200 shares maximum!"
    },
    trade: { stock: "Reliance", buyPrice: 2500, sellPrice: 2540, profit: 400 }
  },
  {
    day: 15,
    phase: 1,
    title: "ORDER TYPES",
    emoji: "📝",
    theory: {
      title: "BID, ASK & ORDER TYPES",
      points: [
        "💰 Bid: Price buyers are willing to pay",
        "💸 Ask: Price sellers want to receive",
        "⚡ Market Order: Instant fill at current price",
        "🎯 Limit Order: Fill only at your price or better"
      ],
      keyTerm: "Bid-Ask Spread",
      keyTermDef: "Difference between highest bid and lowest ask",
      unlock: "Now you understand order flow"
    },
    quiz: {
      question: "Stock shows Bid ₹99, Ask ₹101. You buy market order. Fill price?",
      options: ["₹99", "₹101", "₹100"],
      correctIndex: 1,
      explanation: "Market buy fills at Ask price (seller's price)!"
    },
    challenge: {
      title: "PLACE YOUR ORDER",
      scenario: "You want to buy TCS:",
      priceData: [
        { time: "Current", price: 3500 },
        { time: "Bid", price: 3498, note: "Buyers want" },
        { time: "Ask", price: 3502, note: "Sellers want" }
      ],
      question: "For guaranteed fill, which order type?",
      options: ["Limit at ₹3500", "Market order", "Limit at ₹3490"],
      correctIndex: 1,
      explanation: "Market order guarantees fill but at ₹3502 (Ask price)!"
    },
    trade: { stock: "TCS", buyPrice: 3502, sellPrice: 3550, profit: 96 }
  },
  {
    day: 16,
    phase: 1,
    title: "BEST & WORST TIMES",
    emoji: "⏰",
    theory: {
      title: "WHEN TO TRADE",
      points: [
        "🚀 9:15-9:45: High volatility, gaps fill",
        "☕ 10:00-11:30: Best for trends",
        "😴 12:00-2:00: Lunch trap, avoid",
        "💪 2:30-3:15: Strong moves before close"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Morning", value: 80, color: "primary", desc: "10-11:30 AM best" },
            { label: "Lunch", value: 20, color: "destructive", desc: "Avoid 12-2 PM" },
            { label: "Closing", value: 70, color: "warning", desc: "2:30-3:15 PM" }
          ]
        }
      },
      keyTerm: "Trading Session",
      keyTermDef: "Different times have different market behavior",
      unlock: "✅ BADGE: Survivor - You won't blow up!"
    },
    quiz: {
      question: "When is the WORST time to trade?",
      options: ["9:30 AM", "12:30 PM", "2:45 PM"],
      correctIndex: 1,
      explanation: "Lunch time (12-2 PM) is choppy with fake moves. Avoid!"
    },
    challenge: {
      title: "TIME YOUR TRADE",
      scenario: "You see a setup at different times:",
      priceData: [
        { time: "9:20 AM", price: 100, note: "High volatility" },
        { time: "10:30 AM", price: 102, note: "Trend forming" },
        { time: "12:45 PM", price: 101, note: "Choppy" }
      ],
      question: "Best time to take the trade?",
      options: ["9:20 AM", "10:30 AM", "12:45 PM"],
      correctIndex: 1,
      explanation: "10:30 AM - Volatility settled, trend visible!"
    },
    trade: { stock: "Nifty", buyPrice: 22550, sellPrice: 22620, profit: 70 }
  },

  // PHASE 2: CHART READING (Days 17-24)
  {
    day: 17,
    phase: 2,
    title: "LINE CHART BASICS",
    emoji: "📉",
    theory: {
      title: "THE SIMPLE VIEW",
      points: [
        "📈 Line chart connects closing prices",
        "🎯 Best for seeing overall trend direction",
        "📊 Removes noise, shows clear direction",
        "💡 Great for beginners to spot trends"
      ],
      visual: { type: 'lineChart', data: {} },
      keyTerm: "Line Chart",
      keyTermDef: "Chart showing only closing prices connected by a line",
      unlock: "Now you can read basic charts"
    },
    quiz: {
      question: "Line chart shows price going up-right. What's the trend?",
      options: ["Downtrend", "Uptrend", "Sideways"],
      correctIndex: 1,
      explanation: "Rising line = Uptrend. Price is making higher closes!"
    },
    challenge: {
      title: "READ THE LINE",
      scenario: "TCS line chart shows:",
      priceData: [
        { time: "Week 1", price: 3500 },
        { time: "Week 2", price: 3550 },
        { time: "Week 3", price: 3600 },
        { time: "Week 4", price: 3650, note: "Rising ↑" }
      ],
      question: "What's the trend?",
      options: ["Downtrend", "Uptrend", "No trend"],
      correctIndex: 1,
      explanation: "Each week closes higher = Clear uptrend!"
    },
    trade: { stock: "TCS", buyPrice: 3600, sellPrice: 3700, profit: 100 }
  },
  {
    day: 18,
    phase: 2,
    title: "CANDLESTICK BASICS",
    emoji: "🕯️",
    theory: {
      title: "READ PRICE ACTION",
      points: [
        "🕯️ Candle shows: Open, High, Low, Close (OHLC)",
        "🟢 Green/White: Close > Open (buyers won)",
        "🔴 Red/Black: Close < Open (sellers won)",
        "📊 Body = difference between open & close"
      ],
      visual: { type: 'candlestick', data: {} },
      keyTerm: "Candlestick",
      keyTermDef: "Chart showing OHLC with body and wicks",
      unlock: "Now you can read candles"
    },
    quiz: {
      question: "Green candle with small body and long upper wick means?",
      options: ["Strong buying", "Buyers got rejected at top", "No information"],
      correctIndex: 1,
      explanation: "Long upper wick = sellers rejected higher prices!"
    },
    challenge: {
      title: "READ THE CANDLE",
      scenario: "Analyze this candle:",
      priceData: [
        { time: "Open", price: 100 },
        { time: "High", price: 110, note: "Reached here" },
        { time: "Low", price: 99, note: "Dipped here" },
        { time: "Close", price: 102, note: "Green candle" }
      ],
      question: "What does this candle tell us?",
      options: ["Strong bulls", "Weak recovery", "Buyers won but sellers fought"],
      correctIndex: 2,
      explanation: "Close near open despite high = bulls won but faced resistance!"
    },
    trade: { stock: "HDFC Bank", buyPrice: 1650, sellPrice: 1680, profit: 90 }
  },
  {
    day: 19,
    phase: 2,
    title: "SUPPORT LEVELS",
    emoji: "🟢",
    theory: {
      title: "FLOORS WHERE PRICE BOUNCES",
      points: [
        "🟢 Support = Price level where buying pressure exists",
        "🔄 Price tends to bounce UP from support",
        "💡 Like a floor that holds the price",
        "🎯 More touches = Stronger support level"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Strong Support", value: 85, color: "primary", desc: "3+ bounces" },
            { label: "Weak Support", value: 40, color: "warning", desc: "1-2 bounces" }
          ]
        }
      },
      keyTerm: "Support",
      keyTermDef: "Price level where buyers step in and prevent further fall",
      unlock: "Now you can find support levels"
    },
    quiz: {
      question: "Price bounced from ₹500 three times. What is ₹500?",
      options: ["Resistance", "Support", "Random level"],
      correctIndex: 1,
      explanation: "Price bouncing UP from a level = Support!"
    },
    challenge: {
      title: "FIND SUPPORT",
      scenario: "Reliance price history:",
      priceData: [
        { time: "Jan", price: 2400, note: "Bounced up" },
        { time: "Feb", price: 2405, note: "Bounced up" },
        { time: "Mar", price: 2398, note: "Bounced up" },
        { time: "Now", price: 2410, note: "Near ₹2400" }
      ],
      question: "What's the support level?",
      options: ["₹2500", "₹2400", "₹2300"],
      correctIndex: 1,
      explanation: "Price bounced from ~₹2400 multiple times = Strong support!"
    },
    trade: { stock: "Reliance", buyPrice: 2400, sellPrice: 2500, profit: 100 }
  },
  {
    day: 20,
    phase: 2,
    title: "RESISTANCE LEVELS",
    emoji: "🔴",
    theory: {
      title: "CEILINGS WHERE PRICE FALLS",
      points: [
        "🔴 Resistance = Price level where selling pressure exists",
        "🔄 Price tends to fall from resistance",
        "💡 Like a ceiling that blocks price",
        "🎯 More rejections = Stronger resistance"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Strong Resistance", value: 85, color: "destructive", desc: "3+ rejections" },
            { label: "Weak Resistance", value: 40, color: "warning", desc: "1-2 rejections" }
          ]
        }
      },
      keyTerm: "Resistance",
      keyTermDef: "Price level where sellers step in and prevent further rise",
      unlock: "Now you can find resistance levels"
    },
    quiz: {
      question: "Price fell from ₹800 three times. What is ₹800?",
      options: ["Support", "Resistance", "Moving average"],
      correctIndex: 1,
      explanation: "Price falling DOWN from a level = Resistance!"
    },
    challenge: {
      title: "FIND RESISTANCE",
      scenario: "TCS price history:",
      priceData: [
        { time: "Week 1", price: 3800, note: "Fell from here" },
        { time: "Week 3", price: 3795, note: "Fell again" },
        { time: "Week 5", price: 3802, note: "Rejected again" },
        { time: "Now", price: 3750, note: "Approaching" }
      ],
      question: "What's the resistance level?",
      options: ["₹3700", "₹3800", "₹3900"],
      correctIndex: 1,
      explanation: "Price rejected from ~₹3800 multiple times = Strong resistance!"
    },
    trade: { stock: "TCS", buyPrice: 3600, sellPrice: 3750, profit: 150 }
  },
  {
    day: 21,
    phase: 2,
    title: "SUPPORT BECOMES RESISTANCE",
    emoji: "🔄",
    theory: {
      title: "ROLE REVERSAL",
      points: [
        "🔄 When support breaks, it becomes resistance",
        "🔄 When resistance breaks, it becomes support",
        "📊 This is called 'polarity' or 'role reversal'",
        "🎯 Very reliable for planning entries"
      ],
      keyTerm: "Role Reversal",
      keyTermDef: "Broken support becomes resistance and vice versa",
      unlock: "Now you understand level dynamics"
    },
    quiz: {
      question: "Stock breaks below ₹100 support. What is ₹100 now?",
      options: ["Still support", "Now resistance", "Nothing"],
      correctIndex: 1,
      explanation: "Broken support becomes resistance!"
    },
    challenge: {
      title: "ROLE REVERSAL",
      scenario: "Nifty breaks support:",
      priceData: [
        { time: "Support", price: 22000, note: "Held 3 times" },
        { time: "Breakdown", price: 21950, note: "Broke below" },
        { time: "Bounce back", price: 22000, note: "Testing..." },
        { time: "Rejected", price: 21900, note: "Failed!" }
      ],
      question: "Why did Nifty fall from 22000?",
      options: ["Random", "Old support is now resistance", "News event"],
      correctIndex: 1,
      explanation: "22000 support became resistance after breakdown!"
    },
    trade: { stock: "Nifty", buyPrice: 21900, sellPrice: 22200, profit: 300 }
  },
  {
    day: 22,
    phase: 2,
    title: "TRENDS & DIRECTION",
    emoji: "📊",
    theory: {
      title: "TREND IS YOUR FRIEND",
      points: [
        "📈 Uptrend: Higher highs + Higher lows",
        "📉 Downtrend: Lower highs + Lower lows",
        "➡️ Sideways: No clear direction (range)",
        "🎯 Trade WITH the trend, not against"
      ],
      keyTerm: "Trend",
      keyTermDef: "Overall direction the market is moving",
      unlock: "Now you can identify trends"
    },
    quiz: {
      question: "Stock makes High 100, Low 90, then High 105, Low 95. Trend?",
      options: ["Downtrend", "Uptrend", "Sideways"],
      correctIndex: 1,
      explanation: "Higher High (105>100) + Higher Low (95>90) = Uptrend!"
    },
    challenge: {
      title: "SPOT THE TREND",
      scenario: "Reliance price action:",
      priceData: [
        { time: "Week 1", price: 2400, note: "High: 2450" },
        { time: "Week 2", price: 2350, note: "Low: 2320" },
        { time: "Week 3", price: 2300, note: "High: 2380" },
        { time: "Week 4", price: 2250, note: "Low: 2200" }
      ],
      question: "What trend is Reliance in?",
      options: ["Uptrend", "Downtrend", "Sideways"],
      correctIndex: 1,
      explanation: "Lower Highs (2450→2380) + Lower Lows (2320→2200) = Downtrend!"
    },
    trade: { stock: "Reliance Short", buyPrice: 2380, sellPrice: 2300, profit: 80 }
  },
  {
    day: 23,
    phase: 2,
    title: "VOLUME ANALYSIS",
    emoji: "📊",
    theory: {
      title: "VOLUME CONFIRMS MOVES",
      points: [
        "📈 High volume breakout = Real move, trust it",
        "📉 Low volume breakout = Fake out likely",
        "🔺 Rising price + rising volume = Strong move",
        "🔻 Rising price + falling volume = Weak, may reverse"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "High Volume Break", value: 85, color: "primary", desc: "Trust it!" },
            { label: "Low Volume Break", value: 25, color: "destructive", desc: "Fake out likely" }
          ]
        }
      },
      keyTerm: "Volume",
      keyTermDef: "Number of shares traded - shows conviction behind a move",
      unlock: "Now you can confirm moves"
    },
    quiz: {
      question: "Stock breaks resistance with 3x average volume. What to do?",
      options: ["Wait for pullback", "Enter now", "Avoid"],
      correctIndex: 1,
      explanation: "High volume breakout = strong conviction, valid move!"
    },
    challenge: {
      title: "CONFIRM THE BREAKOUT",
      scenario: "Infosys breaking resistance:",
      priceData: [
        { time: "Resistance", price: 1500 },
        { time: "Day 1", price: 1510, note: "Vol: 50K (avg)" },
        { time: "Day 2", price: 1520, note: "Vol: 200K (4x)" },
        { time: "Day 3", price: 1535, note: "Vol: 180K (3.5x)" }
      ],
      question: "Is this breakout valid?",
      options: ["No, volume too high", "Yes, volume confirms", "Wait for more data"],
      correctIndex: 1,
      explanation: "Above average volume on breakout = real move, not fake!"
    },
    trade: { stock: "Infosys", buyPrice: 1510, sellPrice: 1550, profit: 80 }
  },
  {
    day: 24,
    phase: 2,
    title: "TIMEFRAMES",
    emoji: "⏱️",
    theory: {
      title: "MULTIPLE TIMEFRAME ANALYSIS",
      points: [
        "📅 Daily: Shows the big picture trend",
        "⏰ Hourly: Good for entry timing",
        "⚡ 15min: For scalping and quick entries",
        "🎯 Higher TF trend + Lower TF entry = Best combo"
      ],
      keyTerm: "Timeframe",
      keyTermDef: "Period each candle represents (1min to monthly)",
      unlock: "✅ BADGE: Chart Reader - You see the market!"
    },
    quiz: {
      question: "Daily uptrend, 15min downtrend. What to do?",
      options: ["Short on 15min", "Wait for 15min to align, then buy", "Avoid trading"],
      correctIndex: 1,
      explanation: "Trade with higher TF! Wait for lower TF to align."
    },
    challenge: {
      title: "MULTI-TF SETUP",
      scenario: "Nifty analysis:",
      priceData: [
        { time: "Daily", price: 22500, note: "Uptrend ↑" },
        { time: "Hourly", price: 22450, note: "Pullback ↓" },
        { time: "15min", price: 22420, note: "At support" }
      ],
      question: "Best action?",
      options: ["Short now", "Buy at 15min support", "Wait for daily breakdown"],
      correctIndex: 1,
      explanation: "Daily up + 15min at support = Great long entry!"
    },
    trade: { stock: "Nifty", buyPrice: 22420, sellPrice: 22550, profit: 130 }
  },

  // PHASE 3: CANDLESTICK PATTERNS (Days 25-36)
  {
    day: 25,
    phase: 3,
    title: "DOJI CANDLE",
    emoji: "➕",
    theory: {
      title: "INDECISION PATTERN",
      points: [
        "➕ Doji: Open ≈ Close (tiny or no body)",
        "🤔 Shows indecision between bulls & bears",
        "🔄 Often signals a trend change coming",
        "📍 More powerful at support/resistance"
      ],
      keyTerm: "Doji",
      keyTermDef: "Candle where open and close are nearly equal - shows indecision",
      unlock: "Now you can spot indecision"
    },
    quiz: {
      question: "Doji forms after a strong uptrend. What next?",
      options: ["Trend continues", "Possible reversal coming", "Nothing special"],
      correctIndex: 1,
      explanation: "Doji after uptrend = bulls losing steam, reversal possible!"
    },
    challenge: {
      title: "TRADE THE DOJI",
      scenario: "Nifty forms doji at resistance:",
      priceData: [
        { time: "Resistance", price: 22800 },
        { time: "Doji Open", price: 22795 },
        { time: "Doji High", price: 22820 },
        { time: "Doji Close", price: 22798, note: "Almost = Open" }
      ],
      question: "Trade decision?",
      options: ["Buy breakout", "Wait for confirmation", "No signal"],
      correctIndex: 1,
      explanation: "Doji at resistance = wait for next candle to confirm!"
    },
    trade: { stock: "Nifty", buyPrice: 22700, sellPrice: 22600, profit: 100 }
  },
  {
    day: 26,
    phase: 3,
    title: "HAMMER CANDLE",
    emoji: "🔨",
    theory: {
      title: "BULLISH REVERSAL AT BOTTOMS",
      points: [
        "🔨 Hammer: Long lower wick, small body at top",
        "📍 Appears at support/after downtrend",
        "📐 Lower wick should be 2x body minimum",
        "💪 Shows buyers rejected lower prices"
      ],
      keyTerm: "Hammer",
      keyTermDef: "Bullish reversal candle with long lower wick at support",
      unlock: "Now you can spot bottom reversals"
    },
    quiz: {
      question: "Long lower wick candle at support. Pattern?",
      options: ["Hanging Man", "Hammer", "Doji"],
      correctIndex: 1,
      explanation: "At support with long lower wick = Hammer (bullish)!"
    },
    challenge: {
      title: "SPOT THE HAMMER",
      scenario: "Reliance at support:",
      priceData: [
        { time: "Support", price: 2400 },
        { time: "Open", price: 2420 },
        { time: "Low", price: 2395, note: "Long wick down" },
        { time: "Close", price: 2418, note: "Near high" }
      ],
      question: "Valid hammer?",
      options: ["No, wick too short", "Yes, classic hammer", "Need more candles"],
      correctIndex: 1,
      explanation: "At support + long lower wick + small body = Valid hammer!"
    },
    trade: { stock: "Reliance", buyPrice: 2420, sellPrice: 2480, profit: 120 }
  },
  {
    day: 27,
    phase: 3,
    title: "SHOOTING STAR",
    emoji: "💫",
    theory: {
      title: "BEARISH REVERSAL AT TOPS",
      points: [
        "💫 Long upper wick, small body at bottom",
        "📍 Appears after uptrend at resistance",
        "📏 Upper wick 2x body minimum",
        "⚠️ Sellers rejected higher prices"
      ],
      keyTerm: "Shooting Star",
      keyTermDef: "Bearish reversal with long upper shadow at resistance",
      unlock: "Now you can spot top reversals"
    },
    quiz: {
      question: "At resistance: long upper wick, body near low. Pattern?",
      options: ["Hammer", "Shooting Star", "Doji"],
      correctIndex: 1,
      explanation: "Long upper wick at resistance = Shooting Star (bearish)!"
    },
    challenge: {
      title: "SPOT THE SHOOTING STAR",
      scenario: "Nifty at resistance:",
      priceData: [
        { time: "Resistance", price: 23000 },
        { time: "Open", price: 22900 },
        { time: "High", price: 23100, note: "Long wick up" },
        { time: "Close", price: 22920, note: "Near low" }
      ],
      question: "Trade decision?",
      options: ["Buy the dip", "Prepare to short", "Wait for ATH break"],
      correctIndex: 1,
      explanation: "Shooting star at resistance = bearish reversal signal!"
    },
    trade: { stock: "Nifty Short", buyPrice: 22920, sellPrice: 22750, profit: 170 }
  },
  {
    day: 28,
    phase: 3,
    title: "ENGULFING PATTERNS",
    emoji: "🔄",
    theory: {
      title: "STRONG REVERSAL SIGNALS",
      points: [
        "🟢 Bullish Engulfing: Big green candle 'eats' previous small red",
        "🔴 Bearish Engulfing: Big red candle 'eats' previous small green",
        "📏 Second candle must fully cover first candle's body",
        "💪 Bigger engulfing candle = Stronger signal"
      ],
      keyTerm: "Engulfing",
      keyTermDef: "Second candle completely covers first candle's body",
      unlock: "Now you can spot strong reversals"
    },
    quiz: {
      question: "Small red candle, then big green covers it entirely. Pattern?",
      options: ["Bearish Engulfing", "Bullish Engulfing", "Doji"],
      correctIndex: 1,
      explanation: "Green eating red = Bullish Engulfing!"
    },
    challenge: {
      title: "TRADE THE ENGULFING",
      scenario: "TCS shows pattern:",
      priceData: [
        { time: "Day 1 Open", price: 3650 },
        { time: "Day 1 Close", price: 3600, note: "Red candle" },
        { time: "Day 2 Open", price: 3590 },
        { time: "Day 2 Close", price: 3680, note: "Covers Day 1" }
      ],
      question: "What pattern is this?",
      options: ["Bearish Engulfing", "Bullish Engulfing", "Inside Bar"],
      correctIndex: 1,
      explanation: "Day 2 green covers Day 1 red = Bullish Engulfing!"
    },
    trade: { stock: "TCS", buyPrice: 3680, sellPrice: 3750, profit: 140 }
  },
  {
    day: 29,
    phase: 3,
    title: "MORNING & EVENING STAR",
    emoji: "⭐",
    theory: {
      title: "THREE CANDLE PATTERNS",
      points: [
        "🌅 Morning Star (bullish): Big red → Small doji → Big green",
        "🌙 Evening Star (bearish): Big green → Small doji → Big red",
        "📍 Morning Star appears at bottoms",
        "📍 Evening Star appears at tops"
      ],
      keyTerm: "Morning Star",
      keyTermDef: "Three candle bullish reversal pattern at bottoms",
      unlock: "Now you can spot major reversals"
    },
    quiz: {
      question: "Big red, small doji, big green at support. Pattern?",
      options: ["Evening Star", "Morning Star", "Three Crows"],
      correctIndex: 1,
      explanation: "At support: Red → Doji → Green = Morning Star (bullish)!"
    },
    challenge: {
      title: "IDENTIFY THE STAR",
      scenario: "Infosys pattern forming:",
      priceData: [
        { time: "Candle 1", price: 1500, note: "Big red -3%" },
        { time: "Candle 2", price: 1490, note: "Small doji" },
        { time: "Candle 3", price: 1540, note: "Big green +3%" }
      ],
      question: "Valid Morning Star?",
      options: ["No, middle candle wrong", "Yes, perfect formation", "Need 4th candle"],
      correctIndex: 1,
      explanation: "Big down → Small pause → Big up = Classic Morning Star!"
    },
    trade: { stock: "Infosys", buyPrice: 1540, sellPrice: 1600, profit: 120 }
  },
  {
    day: 30,
    phase: 3,
    title: "THREE BLACK CROWS",
    emoji: "🐦‍⬛",
    theory: {
      title: "STRONG BEARISH SIGNAL",
      points: [
        "🐦‍⬛ Three consecutive red candles in a row",
        "📉 Each opens within previous candle's body",
        "📉 Each closes lower than previous close",
        "💪 Strong selling pressure - avoid buying!"
      ],
      keyTerm: "Three Black Crows",
      keyTermDef: "Three falling red candles showing strong selling pressure",
      unlock: "Now you can spot strong bearish moves"
    },
    quiz: {
      question: "Three red candles, each closing lower. Pattern?",
      options: ["Three White Soldiers", "Three Black Crows", "Three Inside Down"],
      correctIndex: 1,
      explanation: "Three falling red candles = Three Black Crows (very bearish)!"
    },
    challenge: {
      title: "SPOT THE CROWS",
      scenario: "TCS price action:",
      priceData: [
        { time: "Day 1", price: 3800, note: "Close: 3750 (-50)" },
        { time: "Day 2", price: 3740, note: "Close: 3680 (-60)" },
        { time: "Day 3", price: 3670, note: "Close: 3600 (-70)" }
      ],
      question: "What's the signal?",
      options: ["Buy the dip", "Strong sell signal", "No pattern"],
      correctIndex: 1,
      explanation: "Three Black Crows = Strong bearish, don't buy!"
    },
    trade: { stock: "TCS Short", buyPrice: 3670, sellPrice: 3580, profit: 90 }
  },
  {
    day: 31,
    phase: 3,
    title: "THREE WHITE SOLDIERS",
    emoji: "⚔️",
    theory: {
      title: "STRONG BULLISH SIGNAL",
      points: [
        "⚔️ Three consecutive green candles in a row",
        "📈 Each opens within previous candle's body",
        "📈 Each closes higher than previous close",
        "💪 Strong buying pressure - bullish!"
      ],
      keyTerm: "Three White Soldiers",
      keyTermDef: "Three rising green candles showing strong buying pressure",
      unlock: "Now you can spot strong bullish moves"
    },
    quiz: {
      question: "Three green candles at support, each closing higher. Pattern?",
      options: ["Three Black Crows", "Three White Soldiers", "Morning Star"],
      correctIndex: 1,
      explanation: "Three rising green candles = Three White Soldiers (very bullish)!"
    },
    challenge: {
      title: "SPOT THE SOLDIERS",
      scenario: "Reliance bouncing:",
      priceData: [
        { time: "Day 1", price: 2400, note: "Close: 2430 (+30)" },
        { time: "Day 2", price: 2425, note: "Close: 2460 (+30)" },
        { time: "Day 3", price: 2455, note: "Close: 2500 (+40)" }
      ],
      question: "What's the signal?",
      options: ["Sell now", "Strong buy signal", "Wait for pullback"],
      correctIndex: 1,
      explanation: "Three White Soldiers = Strong bullish, momentum is up!"
    },
    trade: { stock: "Reliance", buyPrice: 2500, sellPrice: 2580, profit: 160 }
  },
  {
    day: 32,
    phase: 3,
    title: "HANGING MAN",
    emoji: "💀",
    theory: {
      title: "BEARISH AT TOPS",
      points: [
        "💀 Same shape as Hammer but at TOP of uptrend",
        "📍 Long lower wick, small body near high",
        "⚠️ Warning: Trend may reverse down",
        "🔄 Needs confirmation from next candle"
      ],
      keyTerm: "Hanging Man",
      keyTermDef: "Bearish warning signal at the top of an uptrend",
      unlock: "Now you can spot top warnings"
    },
    quiz: {
      question: "Long lower wick candle at resistance after uptrend. Pattern?",
      options: ["Hammer", "Hanging Man", "Shooting Star"],
      correctIndex: 1,
      explanation: "At TOP with long lower wick = Hanging Man (bearish warning)!"
    },
    challenge: {
      title: "SPOT THE HANGING MAN",
      scenario: "Nifty at all-time high:",
      priceData: [
        { time: "ATH Resistance", price: 23000 },
        { time: "Open", price: 22980 },
        { time: "Low", price: 22850, note: "Long wick down" },
        { time: "Close", price: 22970, note: "Near high" }
      ],
      question: "What does this signal?",
      options: ["Strong buy", "Potential reversal warning", "No signal"],
      correctIndex: 1,
      explanation: "Hanging Man at top = Sellers tested, be cautious!"
    },
    trade: { stock: "Nifty", buyPrice: 22900, sellPrice: 22700, profit: 200 }
  },
  {
    day: 33,
    phase: 3,
    title: "INVERTED HAMMER",
    emoji: "🔄",
    theory: {
      title: "BULLISH AT BOTTOMS",
      points: [
        "🔄 Long upper wick, small body at bottom",
        "📍 Appears after DOWNtrend at support",
        "🤔 Buyers tested higher, sellers pushed back",
        "✅ Need confirmation candle to enter long"
      ],
      keyTerm: "Inverted Hammer",
      keyTermDef: "Potential bullish reversal at support",
      unlock: "Now you can spot bottom reversal attempts"
    },
    quiz: {
      question: "Long upper wick at support after downtrend. Pattern?",
      options: ["Shooting Star", "Inverted Hammer", "Hanging Man"],
      correctIndex: 1,
      explanation: "Upper wick at SUPPORT after downtrend = Inverted Hammer!"
    },
    challenge: {
      title: "TRADE INVERTED HAMMER",
      scenario: "Reliance at support after drop:",
      priceData: [
        { time: "Support", price: 2350 },
        { time: "Open", price: 2360 },
        { time: "High", price: 2400, note: "Long upper wick" },
        { time: "Close", price: 2365 }
      ],
      question: "When to enter long?",
      options: ["Immediately", "On break above 2400", "Wait for hammer instead"],
      correctIndex: 1,
      explanation: "Enter on confirmation break above the high!"
    },
    trade: { stock: "Reliance", buyPrice: 2400, sellPrice: 2450, profit: 100 }
  },
  {
    day: 34,
    phase: 3,
    title: "DRAGONFLY DOJI",
    emoji: "🐉",
    theory: {
      title: "SPECIAL BULLISH DOJI",
      points: [
        "🐉 Dragonfly: Long lower wick, no upper wick",
        "📍 Open = High = Close (at the top)",
        "💪 At support = Very strong buy signal",
        "🎯 Shows complete rejection of lower prices"
      ],
      keyTerm: "Dragonfly Doji",
      keyTermDef: "Doji with long lower shadow - strong bullish reversal",
      unlock: "Now you can spot strong doji signals"
    },
    quiz: {
      question: "Doji with only lower wick at support. Pattern?",
      options: ["Gravestone Doji", "Dragonfly Doji", "Regular Doji"],
      correctIndex: 1,
      explanation: "Lower wick only doji = Dragonfly (bullish at support)!"
    },
    challenge: {
      title: "IDENTIFY DRAGONFLY",
      scenario: "Bank Nifty at support:",
      priceData: [
        { time: "Support", price: 47500 },
        { time: "Open/High/Close", price: 47600, note: "All same" },
        { time: "Low", price: 47450, note: "Long wick down" }
      ],
      question: "What pattern is this?",
      options: ["Gravestone", "Dragonfly", "Hammer"],
      correctIndex: 1,
      explanation: "Open=High=Close with lower wick = Dragonfly Doji!"
    },
    trade: { stock: "Bank Nifty", buyPrice: 47600, sellPrice: 47900, profit: 300 }
  },
  {
    day: 35,
    phase: 3,
    title: "GRAVESTONE DOJI",
    emoji: "🪦",
    theory: {
      title: "SPECIAL BEARISH DOJI",
      points: [
        "🪦 Gravestone: Long upper wick, no lower wick",
        "📍 Open = Low = Close (at the bottom)",
        "⚠️ At resistance = Very strong sell signal",
        "🎯 Shows complete rejection of higher prices"
      ],
      keyTerm: "Gravestone Doji",
      keyTermDef: "Doji with long upper shadow - strong bearish reversal",
      unlock: "Now you master doji patterns"
    },
    quiz: {
      question: "Doji with only upper wick at resistance. Pattern?",
      options: ["Dragonfly Doji", "Gravestone Doji", "Spinning Top"],
      correctIndex: 1,
      explanation: "Upper wick only doji = Gravestone (bearish at resistance)!"
    },
    challenge: {
      title: "IDENTIFY GRAVESTONE",
      scenario: "Nifty at resistance:",
      priceData: [
        { time: "Resistance", price: 23000 },
        { time: "Open/Low/Close", price: 22900, note: "All same" },
        { time: "High", price: 23050, note: "Long wick up" }
      ],
      question: "Trade decision?",
      options: ["Buy breakout", "Prepare to short", "No signal"],
      correctIndex: 1,
      explanation: "Gravestone at resistance = Strong bearish signal!"
    },
    trade: { stock: "Nifty Short", buyPrice: 22900, sellPrice: 22700, profit: 200 }
  },
  {
    day: 36,
    phase: 3,
    title: "MARUBOZU CANDLE",
    emoji: "📊",
    theory: {
      title: "NO WICK = STRONG MOVE",
      points: [
        "📊 Marubozu: Candle with NO wicks at all",
        "🟢 Green Marubozu: Opened at low, closed at high",
        "🔴 Red Marubozu: Opened at high, closed at low",
        "💪 Shows complete dominance by one side"
      ],
      keyTerm: "Marubozu",
      keyTermDef: "Strong candle with no shadows - extreme conviction",
      unlock: "✅ BADGE: Pattern Spotter - You read price action!"
    },
    quiz: {
      question: "Green candle with no upper or lower wick. What is it?",
      options: ["Doji", "Marubozu", "Hammer"],
      correctIndex: 1,
      explanation: "No wicks = Marubozu, complete bull dominance!"
    },
    challenge: {
      title: "TRADE THE MARUBOZU",
      scenario: "Nifty shows strong candle:",
      priceData: [
        { time: "Open", price: 22500 },
        { time: "Low", price: 22500, note: "Same as open" },
        { time: "High", price: 22700, note: "Same as close" },
        { time: "Close", price: 22700 }
      ],
      question: "What does this mean?",
      options: ["Indecision", "Very strong bullish day", "Reversal coming"],
      correctIndex: 1,
      explanation: "Green Marubozu = Bulls dominated from open to close!"
    },
    trade: { stock: "Nifty", buyPrice: 22700, sellPrice: 22850, profit: 150 }
  },

  // PHASE 4: INDICATORS (Days 37-46)
  {
    day: 37,
    phase: 4,
    title: "MOVING AVERAGES (MA)",
    emoji: "📈",
    theory: {
      title: "MA & EMA BASICS",
      points: [
        "📊 MA (SMA): Simple average of closing prices",
        "⚡ EMA: Gives more weight to recent prices (faster)",
        "📈 Price above MA = Bullish trend",
        "📉 Price below MA = Bearish trend"
      ],
      keyTerm: "Moving Average",
      keyTermDef: "Average price over a period, smooths out noise",
      unlock: "Now you can use trend indicators"
    },
    quiz: {
      question: "Price crosses above 20 EMA. Signal?",
      options: ["Sell", "Buy", "Wait"],
      correctIndex: 1,
      explanation: "Price above MA = bullish signal!"
    },
    challenge: {
      title: "TRADE THE MA",
      scenario: "Nifty and 20 EMA:",
      priceData: [
        { time: "20 EMA", price: 22400 },
        { time: "Yesterday", price: 22350, note: "Below EMA" },
        { time: "Today", price: 22450, note: "Above EMA!" }
      ],
      question: "Trade setup?",
      options: ["Short on cross", "Long on cross", "No signal"],
      correctIndex: 1,
      explanation: "Price crossing above EMA = bullish!"
    },
    trade: { stock: "Nifty", buyPrice: 22450, sellPrice: 22550, profit: 100 }
  },
  {
    day: 38,
    phase: 4,
    title: "MA CROSSOVERS",
    emoji: "✖️",
    theory: {
      title: "GOLDEN & DEATH CROSS",
      points: [
        "✨ Golden Cross: 50 MA crosses above 200 MA (bullish)",
        "💀 Death Cross: 50 MA crosses below 200 MA (bearish)",
        "📊 Crossovers signal major trend changes",
        "⏳ Works best on daily/weekly charts"
      ],
      keyTerm: "Golden Cross",
      keyTermDef: "Short-term MA crossing above long-term MA",
      unlock: "Now you can spot trend changes"
    },
    quiz: {
      question: "50 EMA crosses above 200 EMA. What's this called?",
      options: ["Death Cross", "Golden Cross", "MA Divergence"],
      correctIndex: 1,
      explanation: "Short MA above long MA = Golden Cross (bullish)!"
    },
    challenge: {
      title: "IDENTIFY THE CROSS",
      scenario: "TCS MA analysis:",
      priceData: [
        { time: "50 EMA", price: 3650, note: "Rising" },
        { time: "200 EMA", price: 3600, note: "Flat" },
        { time: "Price", price: 3700, note: "Above both" }
      ],
      question: "What just happened?",
      options: ["Death Cross", "Golden Cross", "No signal"],
      correctIndex: 1,
      explanation: "50 EMA crossed above 200 EMA = Golden Cross, bullish!"
    },
    trade: { stock: "TCS", buyPrice: 3700, sellPrice: 3850, profit: 150 }
  },
  {
    day: 39,
    phase: 4,
    title: "RSI INDICATOR",
    emoji: "📊",
    theory: {
      title: "RELATIVE STRENGTH INDEX",
      points: [
        "📏 RSI ranges from 0 to 100",
        "🔥 Above 70 = Overbought (may fall)",
        "❄️ Below 30 = Oversold (may rise)",
        "⚠️ Can stay extreme in strong trends"
      ],
      keyTerm: "RSI",
      keyTermDef: "Momentum indicator showing overbought/oversold levels",
      unlock: "Now you can spot exhaustion"
    },
    quiz: {
      question: "RSI at 85 after big rally. What does this mean?",
      options: ["More upside", "Overbought, possible pullback", "Buy more"],
      correctIndex: 1,
      explanation: "RSI 85 = very overbought, expect pullback!"
    },
    challenge: {
      title: "USE RSI",
      scenario: "HDFC Bank analysis:",
      priceData: [
        { time: "Price", price: 1700 },
        { time: "RSI", price: 25, note: "Oversold zone" },
        { time: "Support", price: 1680, note: "Key level" }
      ],
      question: "Trading decision?",
      options: ["Short more", "Look for long entry", "RSI doesn't matter"],
      correctIndex: 1,
      explanation: "RSI 25 at support = oversold, look for long entry!"
    },
    trade: { stock: "HDFC Bank", buyPrice: 1680, sellPrice: 1730, profit: 100 }
  },
  {
    day: 40,
    phase: 4,
    title: "RSI DIVERGENCE",
    emoji: "↔️",
    theory: {
      title: "HIDDEN SIGNALS",
      points: [
        "📈 Bullish Divergence: Price makes lower low, RSI makes higher low",
        "📉 Bearish Divergence: Price makes higher high, RSI makes lower high",
        "🎯 Divergence = Trend weakening, reversal possible",
        "💡 Trade with divergence for early entries"
      ],
      keyTerm: "RSI Divergence",
      keyTermDef: "When price and RSI move in opposite directions",
      unlock: "Now you can spot hidden reversals"
    },
    quiz: {
      question: "Price makes new high, RSI makes lower high. What's this?",
      options: ["Bullish Divergence", "Bearish Divergence", "Normal"],
      correctIndex: 1,
      explanation: "Price higher, RSI lower = Bearish Divergence, weakness!"
    },
    challenge: {
      title: "SPOT THE DIVERGENCE",
      scenario: "Nifty at resistance:",
      priceData: [
        { time: "Peak 1 Price", price: 22800, note: "RSI: 75" },
        { time: "Peak 2 Price", price: 22900, note: "New high" },
        { time: "Peak 2 RSI", price: 68, note: "Lower than before" }
      ],
      question: "What's the signal?",
      options: ["Buy breakout", "Bearish divergence, be cautious", "No signal"],
      correctIndex: 1,
      explanation: "Higher price + lower RSI = Bearish divergence, weakness!"
    },
    trade: { stock: "Nifty Short", buyPrice: 22900, sellPrice: 22700, profit: 200 }
  },
  {
    day: 41,
    phase: 4,
    title: "MACD INDICATOR",
    emoji: "📊",
    theory: {
      title: "TREND & MOMENTUM",
      points: [
        "📈 MACD Line: Fast EMA - Slow EMA (12-26 default)",
        "📊 Signal Line: 9-period EMA of MACD",
        "🔼 MACD above Signal = Bullish momentum",
        "🔽 MACD below Signal = Bearish momentum"
      ],
      keyTerm: "MACD Crossover",
      keyTermDef: "When MACD line crosses signal line",
      unlock: "Now you can confirm trend momentum"
    },
    quiz: {
      question: "MACD crosses above Signal line. What to do?",
      options: ["Sell", "Buy", "Hold"],
      correctIndex: 1,
      explanation: "MACD bullish crossover = buy signal!"
    },
    challenge: {
      title: "TRADE THE MACD",
      scenario: "TCS MACD analysis:",
      priceData: [
        { time: "MACD", price: -5, note: "Below zero" },
        { time: "Signal", price: -8, note: "MACD crossed above!" },
        { time: "Price trend", price: 3700, note: "Starting to rise" }
      ],
      question: "Valid buy signal?",
      options: ["No, MACD negative", "Yes, bullish crossover", "Need more data"],
      correctIndex: 1,
      explanation: "MACD crossing above Signal = bullish, even if below zero!"
    },
    trade: { stock: "TCS", buyPrice: 3700, sellPrice: 3780, profit: 80 }
  },
  {
    day: 42,
    phase: 4,
    title: "BOLLINGER BANDS",
    emoji: "📊",
    theory: {
      title: "VOLATILITY BANDS",
      points: [
        "📊 Middle Band: 20-period MA",
        "⬆️ Upper Band: MA + 2 standard deviations",
        "⬇️ Lower Band: MA - 2 standard deviations",
        "🎯 Price tends to stay within bands 95% of time"
      ],
      keyTerm: "Bollinger Squeeze",
      keyTermDef: "Bands contract before big moves - volatility coming",
      unlock: "Now you can trade volatility"
    },
    quiz: {
      question: "Price touches lower band with RSI 28. Signal?",
      options: ["Strong sell", "Potential bounce up", "No signal"],
      correctIndex: 1,
      explanation: "Lower band + oversold RSI = likely bounce!"
    },
    challenge: {
      title: "TRADE THE BANDS",
      scenario: "Reliance at bands:",
      priceData: [
        { time: "Upper Band", price: 2600 },
        { time: "Lower Band", price: 2400 },
        { time: "Current", price: 2410, note: "Near lower" },
        { time: "RSI", price: 32, note: "Nearly oversold" }
      ],
      question: "Trade setup?",
      options: ["Short to lower", "Long for bounce", "Wait for breakout"],
      correctIndex: 1,
      explanation: "At lower band + low RSI = bounce likely!"
    },
    trade: { stock: "Reliance", buyPrice: 2410, sellPrice: 2500, profit: 180 }
  },
  {
    day: 43,
    phase: 4,
    title: "SUPERTREND",
    emoji: "🚀",
    theory: {
      title: "SIMPLE TREND INDICATOR",
      points: [
        "🟢 Green line below price = Uptrend, stay long",
        "🔴 Red line above price = Downtrend, stay short",
        "🔄 Color change = Trend reversal signal",
        "🎯 Great for trailing stop loss"
      ],
      keyTerm: "Supertrend",
      keyTermDef: "ATR-based indicator showing clear trend direction",
      unlock: "Now you can follow trends easily"
    },
    quiz: {
      question: "Supertrend turns green from red. What to do?",
      options: ["Sell", "Buy", "Wait for confirmation"],
      correctIndex: 1,
      explanation: "Green Supertrend = uptrend started, buy!"
    },
    challenge: {
      title: "USE SUPERTREND",
      scenario: "Bank Nifty Supertrend:",
      priceData: [
        { time: "Supertrend", price: 47800, note: "Turned green" },
        { time: "Current", price: 48000, note: "Above indicator" },
        { time: "Previous", price: 47600, note: "Was red" }
      ],
      question: "Trade action?",
      options: ["Short at resistance", "Long, trend is up", "Avoid, too late"],
      correctIndex: 1,
      explanation: "Green Supertrend + price above = confirmed uptrend!"
    },
    trade: { stock: "Bank Nifty", buyPrice: 48000, sellPrice: 48300, profit: 300 }
  },
  {
    day: 44,
    phase: 4,
    title: "FIBONACCI RETRACEMENT",
    emoji: "🔢",
    theory: {
      title: "KEY PULLBACK LEVELS",
      points: [
        "📐 Draw from swing low to swing high",
        "38.2%: Shallow pullback (strong trend)",
        "50%: Medium pullback (normal retracement)",
        "61.8%: Deep pullback (golden ratio level)"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "38.2%", value: 38, color: "primary", desc: "Shallow pullback" },
            { label: "50%", value: 50, color: "warning", desc: "Medium pullback" },
            { label: "61.8%", value: 62, color: "destructive", desc: "Deep pullback" }
          ]
        }
      },
      keyTerm: "Fibonacci",
      keyTermDef: "Mathematical levels where price often retraces to",
      unlock: "Now you can predict pullback levels"
    },
    quiz: {
      question: "Stock rallied 100→200. 50% retracement level?",
      options: ["₹150", "₹100", "₹175"],
      correctIndex: 0,
      explanation: "50% of ₹100 move = ₹50. 200-50 = ₹150!"
    },
    challenge: {
      title: "TRADE FIBONACCI",
      scenario: "Nifty Fibonacci:",
      priceData: [
        { time: "Swing Low", price: 22000 },
        { time: "Swing High", price: 23000 },
        { time: "61.8% Level", price: 22382, note: "Key support" },
        { time: "Current", price: 22400, note: "Near 61.8%" }
      ],
      question: "Trade setup?",
      options: ["Short breakdown", "Long at 61.8%", "Wait for 38.2%"],
      correctIndex: 1,
      explanation: "61.8% is golden ratio - strong support level!"
    },
    trade: { stock: "Nifty", buyPrice: 22400, sellPrice: 22700, profit: 300 }
  },
  {
    day: 45,
    phase: 4,
    title: "VWAP & TWAP",
    emoji: "📊",
    theory: {
      title: "INSTITUTIONAL LEVELS",
      points: [
        "📊 VWAP: Volume Weighted Average Price",
        "⏰ TWAP: Time Weighted Average Price",
        "📈 Price above VWAP = Bullish day",
        "🏦 Institutions use VWAP as benchmark"
      ],
      visual: { 
        type: 'formula', 
        data: { 
          formula: "VWAP = Σ(Price × Volume) ÷ Total Volume",
          example: "Intraday anchor for institutional trades"
        }
      },
      keyTerm: "VWAP",
      keyTermDef: "Average price weighted by volume - institutional benchmark",
      unlock: "Now you trade like institutions"
    },
    quiz: {
      question: "Price above VWAP all day. What does it mean?",
      options: ["Bearish day", "Bullish day", "No information"],
      correctIndex: 1,
      explanation: "Above VWAP = buyers in control, bullish day!"
    },
    challenge: {
      title: "USE VWAP",
      scenario: "Bank Nifty intraday:",
      priceData: [
        { time: "VWAP", price: 48100 },
        { time: "Current", price: 48050, note: "Below VWAP" },
        { time: "Morning", price: 48300, note: "Was above" }
      ],
      question: "Trade setup?",
      options: ["Short breakdown", "Long above VWAP", "Day turned bearish"],
      correctIndex: 1,
      explanation: "If price reclaims VWAP, go long for continuation!"
    },
    trade: { stock: "Bank Nifty", buyPrice: 48100, sellPrice: 48250, profit: 150 }
  },
  {
    day: 46,
    phase: 4,
    title: "SLIPPAGE & EXECUTION",
    emoji: "⚡",
    theory: {
      title: "REAL EXECUTION MATTERS",
      points: [
        "📉 Slippage: Difference between expected and actual fill price",
        "💨 High volatility = More slippage",
        "🎯 Limit orders reduce slippage",
        "📊 Account for slippage in your R:R calculations"
      ],
      keyTerm: "Slippage",
      keyTermDef: "Price difference between order placement and execution",
      unlock: "✅ BADGE: Indicator Pro - You confirm your edge!"
    },
    quiz: {
      question: "You place buy at ₹100, filled at ₹102. Slippage?",
      options: ["₹0", "₹2", "₹100"],
      correctIndex: 1,
      explanation: "102 - 100 = ₹2 slippage!"
    },
    challenge: {
      title: "MINIMIZE SLIPPAGE",
      scenario: "High volatility trade:",
      priceData: [
        { time: "Your order", price: 48000 },
        { time: "Market fill", price: 48025, note: "Slipped!" },
        { time: "Limit order", price: 48000, note: "May not fill" }
      ],
      question: "For guaranteed price?",
      options: ["Market order", "Limit order", "Stop order"],
      correctIndex: 1,
      explanation: "Limit order guarantees your price but may not fill!"
    },
    trade: { stock: "Bank Nifty", buyPrice: 48000, sellPrice: 48120, profit: 120 }
  },

  // PHASE 5: CHART PATTERNS (Days 47-58)
  {
    day: 47,
    phase: 5,
    title: "DOUBLE TOP & BOTTOM",
    emoji: "🔄",
    theory: {
      title: "M & W PATTERNS",
      points: [
        "📉 Double Top (M shape): Two peaks at same level - bearish",
        "📈 Double Bottom (W shape): Two troughs at same level - bullish",
        "🎯 Entry: On neckline break",
        "📏 Target = Pattern height"
      ],
      keyTerm: "Double Top",
      keyTermDef: "Bearish reversal pattern with two equal highs forming M shape",
      unlock: "Now you can spot reversal patterns"
    },
    quiz: {
      question: "Stock hits ₹200 twice, can't break higher. Pattern?",
      options: ["Double Bottom", "Double Top", "Triangle"],
      correctIndex: 1,
      explanation: "Two failed attempts at same high = Double Top!"
    },
    challenge: {
      title: "TRADE THE PATTERN",
      scenario: "Nifty Double Top:",
      priceData: [
        { time: "Peak 1", price: 23000, note: "First top" },
        { time: "Neckline", price: 22700, note: "Support" },
        { time: "Peak 2", price: 23000, note: "Failed again" },
        { time: "Current", price: 22680, note: "Breaking neck" }
      ],
      question: "Trade setup?",
      options: ["Buy the dip", "Short on neckline break", "Pattern incomplete"],
      correctIndex: 1,
      explanation: "Double top + neckline break = Short, target 22400!"
    },
    trade: { stock: "Nifty Short", buyPrice: 22680, sellPrice: 22400, profit: 280 }
  },
  {
    day: 48,
    phase: 5,
    title: "HEAD & SHOULDERS",
    emoji: "🧍",
    theory: {
      title: "THE KING OF REVERSALS",
      points: [
        "👤 Three peaks: Left shoulder → Head (highest) → Right shoulder",
        "📏 Head is the tallest peak",
        "📉 Neckline connects the two lows between peaks",
        "🎯 Very reliable reversal pattern"
      ],
      keyTerm: "Head & Shoulders",
      keyTermDef: "Major reversal pattern with three peaks, middle one highest",
      unlock: "Now you can spot major reversals"
    },
    quiz: {
      question: "Peak 100, Peak 120, Peak 100 with lows at 90. Pattern?",
      options: ["Triple Top", "Head & Shoulders", "Double Top"],
      correctIndex: 1,
      explanation: "Middle peak higher (head) = Head & Shoulders!"
    },
    challenge: {
      title: "TRADE H&S",
      scenario: "Bank Nifty H&S:",
      priceData: [
        { time: "Left Shoulder", price: 48500 },
        { time: "Head", price: 49000, note: "Highest" },
        { time: "Right Shoulder", price: 48500 },
        { time: "Neckline", price: 48000, note: "Breaking!" }
      ],
      question: "Target on neckline break?",
      options: ["47500", "47000", "48500"],
      correctIndex: 1,
      explanation: "Height = 1000 pts. Target = 48000-1000 = 47000!"
    },
    trade: { stock: "Bank Nifty Short", buyPrice: 48000, sellPrice: 47200, profit: 800 }
  },
  {
    day: 49,
    phase: 5,
    title: "CUP & HANDLE",
    emoji: "☕",
    theory: {
      title: "BULLISH CONTINUATION",
      points: [
        "☕ U-shaped cup with small handle dip on the right",
        "📈 Bullish continuation pattern",
        "🎯 Entry: Handle breakout above cup rim",
        "📏 Target = Cup depth added to breakout level"
      ],
      keyTerm: "Cup & Handle",
      keyTermDef: "Bullish pattern resembling a tea cup with handle",
      unlock: "Now you can spot continuation setups"
    },
    quiz: {
      question: "U-shaped recovery, small pullback, then breakout. Pattern?",
      options: ["Head & Shoulders", "Cup & Handle", "Double Bottom"],
      correctIndex: 1,
      explanation: "U-shape + small handle dip + breakout = Cup & Handle!"
    },
    challenge: {
      title: "TRADE THE CUP",
      scenario: "TCS Cup & Handle:",
      priceData: [
        { time: "Cup Rim", price: 3800, note: "Resistance level" },
        { time: "Cup Bottom", price: 3500, note: "300 pts depth" },
        { time: "Handle Low", price: 3750, note: "Small pullback" },
        { time: "Breakout", price: 3810, note: "Above rim!" }
      ],
      question: "Target?",
      options: ["3900", "4100", "4000"],
      correctIndex: 1,
      explanation: "Depth 300 + Breakout 3810 = Target ~4100!"
    },
    trade: { stock: "TCS", buyPrice: 3810, sellPrice: 4050, profit: 240 }
  },
  {
    day: 50,
    phase: 5,
    title: "FLAG PATTERN",
    emoji: "🚩",
    theory: {
      title: "CONTINUATION AFTER STRONG MOVE",
      points: [
        "🚩 Flag: Rectangle consolidation after strong move (pole)",
        "⬆️ Bull flag: Downward sloping after up move",
        "⬇️ Bear flag: Upward sloping after down move",
        "🎯 Target = Pole height from breakout"
      ],
      keyTerm: "Flag Pattern",
      keyTermDef: "Brief pause pattern before continuation of prior move",
      unlock: "Now you can trade momentum continuation"
    },
    quiz: {
      question: "Strong up move, then small downward channel. Pattern?",
      options: ["Bear Flag", "Bull Flag", "Descending Triangle"],
      correctIndex: 1,
      explanation: "Up move + down sloping consolidation = Bull Flag!"
    },
    challenge: {
      title: "TRADE THE FLAG",
      scenario: "Reliance Bull Flag:",
      priceData: [
        { time: "Pole Start", price: 2400, note: "Move began" },
        { time: "Pole Top", price: 2550, note: "+150 pts pole" },
        { time: "Flag Low", price: 2510, note: "Pullback" },
        { time: "Breakout", price: 2560, note: "Flag breaks up!" }
      ],
      question: "Target?",
      options: ["2600", "2710", "2650"],
      correctIndex: 1,
      explanation: "Pole = 150 pts. Target = 2560+150 = 2710!"
    },
    trade: { stock: "Reliance", buyPrice: 2560, sellPrice: 2680, profit: 240 }
  },
  {
    day: 51,
    phase: 5,
    title: "TRIANGLE PATTERNS",
    emoji: "📐",
    theory: {
      title: "COMPRESSION BEFORE EXPLOSION",
      points: [
        "📐 Ascending Triangle: Higher lows + flat top (bullish)",
        "📐 Descending Triangle: Lower highs + flat bottom (bearish)",
        "📐 Symmetrical Triangle: Converging lines (either way)",
        "💥 Breakout is usually powerful"
      ],
      keyTerm: "Triangle",
      keyTermDef: "Consolidation pattern with converging trendlines",
      unlock: "Now you can trade breakouts"
    },
    quiz: {
      question: "Higher lows meeting flat resistance. Pattern?",
      options: ["Descending Triangle", "Ascending Triangle", "Symmetrical"],
      correctIndex: 1,
      explanation: "Higher lows + flat top = Ascending Triangle (bullish)!"
    },
    challenge: {
      title: "TRADE THE TRIANGLE",
      scenario: "Infosys Ascending Triangle:",
      priceData: [
        { time: "Resistance", price: 1600, note: "Flat top" },
        { time: "HL 1", price: 1520 },
        { time: "HL 2", price: 1550 },
        { time: "HL 3", price: 1575, note: "Squeezing!" }
      ],
      question: "Entry point?",
      options: ["Buy at 1575", "Buy above 1600 breakout", "Short at resistance"],
      correctIndex: 1,
      explanation: "Ascending Triangle = bullish, enter on break above!"
    },
    trade: { stock: "Infosys", buyPrice: 1605, sellPrice: 1680, profit: 150 }
  },
  {
    day: 52,
    phase: 5,
    title: "WEDGE PATTERNS",
    emoji: "📈",
    theory: {
      title: "RISING & FALLING WEDGES",
      points: [
        "📈 Rising Wedge: Both lines slope up (bearish pattern)",
        "📉 Falling Wedge: Both lines slope down (bullish pattern)",
        "🔄 Counter-intuitive: wedges break opposite direction",
        "💥 Break is usually sharp"
      ],
      keyTerm: "Rising Wedge",
      keyTermDef: "Bearish pattern with converging upward sloping lines",
      unlock: "Now you can spot wedge reversals"
    },
    quiz: {
      question: "Price making higher highs and higher lows but narrowing. Pattern?",
      options: ["Rising Wedge", "Ascending Triangle", "Bull Flag"],
      correctIndex: 0,
      explanation: "Both lines sloping up but converging = Rising Wedge (bearish)!"
    },
    challenge: {
      title: "TRADE THE WEDGE",
      scenario: "Nifty Rising Wedge:",
      priceData: [
        { time: "Point 1", price: 22000, note: "Start" },
        { time: "Point 2", price: 22300, note: "HH" },
        { time: "Point 3", price: 22100, note: "HL" },
        { time: "Point 4", price: 22400, note: "HH but narrowing" }
      ],
      question: "Expected break direction?",
      options: ["Upward", "Downward", "Either way"],
      correctIndex: 1,
      explanation: "Rising Wedge breaks DOWN!"
    },
    trade: { stock: "Nifty Short", buyPrice: 22350, sellPrice: 22100, profit: 250 }
  },
  {
    day: 53,
    phase: 5,
    title: "PRICE GAPS",
    emoji: "🕳️",
    theory: {
      title: "GAPS & GAP TRADING",
      points: [
        "⬆️ Gap Up: Opens higher than previous close",
        "⬇️ Gap Down: Opens lower than previous close",
        "🔄 Most gaps fill within 1-3 days",
        "🚀 Breakaway gaps often don't fill (new trend)"
      ],
      keyTerm: "Gap",
      keyTermDef: "Empty space between previous close and current open",
      unlock: "Now you can trade gaps"
    },
    quiz: {
      question: "Stock closes at ₹100, opens at ₹95 next day. What gap?",
      options: ["Gap up", "Gap down", "No gap"],
      correctIndex: 1,
      explanation: "Opens LOWER than previous close = Gap Down!"
    },
    challenge: {
      title: "TRADE THE GAP",
      scenario: "HDFC gap down scenario:",
      priceData: [
        { time: "Previous Close", price: 1700 },
        { time: "Gap Down Open", price: 1680, note: "-20 gap" },
        { time: "Current", price: 1685, note: "Recovering" }
      ],
      question: "Gap fill target?",
      options: ["₹1680", "₹1700", "₹1720"],
      correctIndex: 1,
      explanation: "Gap fill = Return to previous close at ₹1700!"
    },
    trade: { stock: "HDFC", buyPrice: 1685, sellPrice: 1700, profit: 75 }
  },
  {
    day: 54,
    phase: 5,
    title: "FALSE BREAKOUT",
    emoji: "🪤",
    theory: {
      title: "DON'T GET TRAPPED",
      points: [
        "🪤 Price breaks level then reverses quickly - trap!",
        "📊 Low volume breakout = likely fake",
        "⏰ Wait for candle close for confirmation",
        "🎯 Trap = Opportunity to trade opposite direction"
      ],
      visual: { 
        type: 'warning', 
        data: { message: "50% of breakouts fail! Always confirm with volume and candle close." }
      },
      keyTerm: "False Breakout",
      keyTermDef: "Breakout that fails and reverses - a trap",
      unlock: "Now you can avoid traps"
    },
    quiz: {
      question: "Resistance breaks with low volume, quickly returns below. What happened?",
      options: ["Real breakout", "False breakout", "Normal pullback"],
      correctIndex: 1,
      explanation: "Low volume + quick reversal = False breakout!"
    },
    challenge: {
      title: "SPOT THE FAKE",
      scenario: "Nifty breaks resistance:",
      priceData: [
        { time: "Resistance", price: 22800 },
        { time: "Break", price: 22830, note: "Vol: Low" },
        { time: "Wick", price: 22850, note: "Quick spike" },
        { time: "Close", price: 22770, note: "Below resistance!" }
      ],
      question: "What happened?",
      options: ["Valid breakout", "False breakout - trap", "Need more data"],
      correctIndex: 1,
      explanation: "Low volume + closed below = Trap, consider shorting!"
    },
    trade: { stock: "Nifty Short", buyPrice: 22770, sellPrice: 22600, profit: 170 }
  },
  {
    day: 55,
    phase: 5,
    title: "REAL BREAKOUT",
    emoji: "🚀",
    theory: {
      title: "CONFIRM YOUR BREAKOUTS",
      points: [
        "📊 High volume on break = Real, trustworthy",
        "🕯️ Strong candle close beyond level",
        "⏰ Multiple timeframe agreement",
        "🔄 Retest holds = Double confirmation"
      ],
      keyTerm: "Breakout",
      keyTermDef: "Price moving beyond key level with conviction",
      unlock: "Now you can confirm real breakouts"
    },
    quiz: {
      question: "Resistance breaks with 3x volume, retest holds. Valid?",
      options: ["No, could still fail", "Yes, high probability", "Need more time"],
      correctIndex: 1,
      explanation: "High volume + retest hold = Valid breakout!"
    },
    challenge: {
      title: "CONFIRM THE BREAKOUT",
      scenario: "HDFC breakout:",
      priceData: [
        { time: "Resistance", price: 1700 },
        { time: "Break", price: 1720, note: "Vol: 3x average" },
        { time: "Retest", price: 1705, note: "Held support!" },
        { time: "Current", price: 1730, note: "Resuming up" }
      ],
      question: "Valid breakout?",
      options: ["No, too extended", "Yes, all signals confirm", "Wait for pullback"],
      correctIndex: 1,
      explanation: "Volume + retest hold = Valid! Trade the retest bounce."
    },
    trade: { stock: "HDFC Bank", buyPrice: 1705, sellPrice: 1780, profit: 150 }
  },
  {
    day: 56,
    phase: 5,
    title: "BULL & BEAR TRAPS",
    emoji: "🕳️",
    theory: {
      title: "TRAP PATTERNS",
      points: [
        "🐂 Bull Trap: False breakout above resistance traps buyers",
        "🐻 Bear Trap: False breakdown below support traps sellers",
        "🎯 Trade opposite to the trap direction",
        "📊 Look for volume divergence to spot traps"
      ],
      keyTerm: "Bull Trap",
      keyTermDef: "False breakout that traps buyers at highs",
      unlock: "Now you can profit from traps"
    },
    quiz: {
      question: "Price breaks above resistance, then reverses sharply down. What trap?",
      options: ["Bear Trap", "Bull Trap", "No trap"],
      correctIndex: 1,
      explanation: "Failed upside break = Bull Trap, traps buyers!"
    },
    challenge: {
      title: "TRADE THE TRAP",
      scenario: "Nifty bull trap:",
      priceData: [
        { time: "Resistance", price: 23000 },
        { time: "Spike high", price: 23050, note: "Trapped longs" },
        { time: "Reversal", price: 22950, note: "Sharp fall" },
        { time: "Target", price: 22800, note: "Support" }
      ],
      question: "Trade setup?",
      options: ["Buy the dip", "Short the trap reversal", "Wait for clarity"],
      correctIndex: 1,
      explanation: "Bull trap = Short for move to support!"
    },
    trade: { stock: "Nifty Short", buyPrice: 22950, sellPrice: 22800, profit: 150 }
  },
  {
    day: 57,
    phase: 5,
    title: "ALL TIME HIGH/LOW",
    emoji: "🏔️",
    theory: {
      title: "EXTREME PRICE LEVELS",
      points: [
        "🏔️ ATH: All Time High - no historical resistance above",
        "🕳️ ATL: All Time Low - no historical support below",
        "🚀 ATH breakout = Blue sky territory, can run far",
        "⚠️ ATH can see profit booking, be cautious"
      ],
      visual: { 
        type: 'warning', 
        data: { message: "At ATH, previous holders may book profits. Enter on confirmation!" }
      },
      keyTerm: "ATH/ATL",
      keyTermDef: "Highest or lowest price ever recorded for a stock",
      unlock: "Now you can trade extreme levels"
    },
    quiz: {
      question: "Stock at ATH with huge volume. What does it mean?",
      options: ["Avoid buying", "Strong buying interest", "Manipulation"],
      correctIndex: 1,
      explanation: "ATH with volume = Strong demand, potential continuation!"
    },
    challenge: {
      title: "TRADE ATH",
      scenario: "TCS at All Time High:",
      priceData: [
        { time: "Previous ATH", price: 4000, note: "2 years ago" },
        { time: "Current", price: 4010, note: "Breaking out!" },
        { time: "Volume", price: 300, note: "3x average" }
      ],
      question: "What's the signal?",
      options: ["Short at ATH", "Buy the breakout", "Wait for pullback to 3800"],
      correctIndex: 1,
      explanation: "ATH break with high volume = Strong! No resistance above."
    },
    trade: { stock: "TCS", buyPrice: 4010, sellPrice: 4150, profit: 140 }
  },
  {
    day: 58,
    phase: 5,
    title: "CHANNEL PATTERNS",
    emoji: "📊",
    theory: {
      title: "PRICE CHANNELS",
      points: [
        "📈 Ascending Channel: Parallel upward sloping lines",
        "📉 Descending Channel: Parallel downward sloping lines",
        "🎯 Trade bounces within the channel",
        "💥 Channel breakout signals trend acceleration"
      ],
      keyTerm: "Price Channel",
      keyTermDef: "Parallel trendlines containing price movement",
      unlock: "✅ BADGE: Pattern Master - You spot big moves!"
    },
    quiz: {
      question: "Price bouncing between two parallel up-sloping lines. What is it?",
      options: ["Rising Wedge", "Ascending Channel", "Flag"],
      correctIndex: 1,
      explanation: "Parallel upward lines = Ascending Channel!"
    },
    challenge: {
      title: "TRADE THE CHANNEL",
      scenario: "TCS Ascending Channel:",
      priceData: [
        { time: "Lower line", price: 3700, note: "Support" },
        { time: "Upper line", price: 3850, note: "Resistance" },
        { time: "Current", price: 3710, note: "Near support" }
      ],
      question: "Trade setup?",
      options: ["Short at support", "Long at channel support", "Wait for breakout"],
      correctIndex: 1,
      explanation: "Buy at lower channel line in uptrend!"
    },
    trade: { stock: "TCS", buyPrice: 3710, sellPrice: 3830, profit: 120 }
  },

  // PHASE 6: SWING TRADING (Days 59-66)
  {
    day: 59,
    phase: 6,
    title: "SWING TRADING BASICS",
    emoji: "🌊",
    theory: {
      title: "RIDE THE WAVES",
      points: [
        "🌊 Swing: Hold positions for days to weeks",
        "📈 Catch intermediate price swings",
        "🕐 Less screen time than day trading",
        "💰 Bigger profits per trade"
      ],
      keyTerm: "Swing Trading",
      keyTermDef: "Trading medium-term price swings over days/weeks",
      unlock: "Now you understand swing trading"
    },
    quiz: {
      question: "You buy stock, plan to hold 5-10 days for 5% move. Style?",
      options: ["Scalping", "Swing Trading", "Position Trading"],
      correctIndex: 1,
      explanation: "Days to weeks holding period = Swing Trading!"
    },
    challenge: {
      title: "PLAN A SWING",
      scenario: "Reliance setup:",
      priceData: [
        { time: "Entry", price: 2500, note: "At support" },
        { time: "Stop Loss", price: 2450, note: "-2%" },
        { time: "Target", price: 2650, note: "+6% in 2 weeks" }
      ],
      question: "Valid swing setup?",
      options: ["No, R:R bad", "Yes, 1:3 R:R", "Hold time too long"],
      correctIndex: 1,
      explanation: "Risk 50, Reward 150 = 1:3 excellent swing setup!"
    },
    trade: { stock: "Reliance Swing", buyPrice: 2500, sellPrice: 2650, profit: 300 }
  },
  {
    day: 60,
    phase: 6,
    title: "SWING ENTRY STRATEGIES",
    emoji: "🎯",
    theory: {
      title: "WHEN TO ENTER SWINGS",
      points: [
        "🔄 Pullback to support in uptrend",
        "📊 Breakout with volume confirmation",
        "🕯️ Reversal candle pattern at key level",
        "📈 Multiple confluence = Higher probability"
      ],
      keyTerm: "Pullback Entry",
      keyTermDef: "Entering on retracement in direction of main trend",
      unlock: "Now you know when to enter swings"
    },
    quiz: {
      question: "Uptrend stock pulls back to 20 EMA with hammer candle. Entry?",
      options: ["Wait for new high", "Enter on hammer", "Short the pullback"],
      correctIndex: 1,
      explanation: "Pullback + EMA support + reversal candle = Great entry!"
    },
    challenge: {
      title: "FIND THE ENTRY",
      scenario: "TCS in uptrend:",
      priceData: [
        { time: "Trend", price: 3800, note: "Uptrend" },
        { time: "20 EMA", price: 3700, note: "Support level" },
        { time: "Pullback", price: 3710, note: "Near EMA" },
        { time: "Candle", price: 3720, note: "Hammer forming" }
      ],
      question: "Best entry?",
      options: ["Wait for 3600", "Enter at hammer", "Wait for breakout above 3800"],
      correctIndex: 1,
      explanation: "EMA support + hammer = Ideal swing entry point!"
    },
    trade: { stock: "TCS Swing", buyPrice: 3720, sellPrice: 3900, profit: 180 }
  },
  {
    day: 61,
    phase: 6,
    title: "SWING EXIT STRATEGIES",
    emoji: "🚪",
    theory: {
      title: "WHEN TO EXIT SWINGS",
      points: [
        "🎯 Fixed target at resistance level",
        "📊 Trail stop using Supertrend or MA",
        "🕯️ Exit on reversal pattern formation",
        "⚠️ Time-based exit if no movement"
      ],
      keyTerm: "Swing Exit",
      keyTermDef: "Closing position at optimal profit point",
      unlock: "Now you know when to exit swings"
    },
    quiz: {
      question: "Swing trade up 8%, showing bearish engulfing. Action?",
      options: ["Hold for more", "Exit on reversal signal", "Add to position"],
      correctIndex: 1,
      explanation: "Reversal pattern = Exit signal, book profits!"
    },
    challenge: {
      title: "PLAN YOUR EXIT",
      scenario: "Your swing trade:",
      priceData: [
        { time: "Entry", price: 2500 },
        { time: "Current", price: 2650, note: "+6% profit" },
        { time: "Resistance", price: 2700, note: "Next level" },
        { time: "Supertrend", price: 2580, note: "Trail SL here" }
      ],
      question: "Best exit strategy?",
      options: ["Exit now at 6%", "Trail SL to 2580, target 2700", "Hold forever"],
      correctIndex: 1,
      explanation: "Trail SL + keep target = Maximize gain, protect profit!"
    },
    trade: { stock: "Reliance Exit", buyPrice: 2500, sellPrice: 2700, profit: 400 }
  },
  {
    day: 62,
    phase: 6,
    title: "STOCK SELECTION FOR SWINGS",
    emoji: "🔍",
    theory: {
      title: "PICKING SWING STOCKS",
      points: [
        "📊 High liquidity (easy entry/exit)",
        "📈 Clear trend (up or down, not sideways)",
        "🎯 Near key support/resistance levels",
        "💪 Strong relative strength vs market"
      ],
      keyTerm: "Stock Selection",
      keyTermDef: "Filtering best candidates for swing trades",
      unlock: "Now you can pick winning swing stocks"
    },
    quiz: {
      question: "Stock at support, in uptrend, RSI 35, high volume. Good swing pick?",
      options: ["No, RSI too low", "Yes, all criteria met", "Need more analysis"],
      correctIndex: 1,
      explanation: "All bullish criteria = Great swing candidate!"
    },
    challenge: {
      title: "SELECT THE STOCK",
      scenario: "Compare three stocks:",
      priceData: [
        { time: "Stock A", price: 1, note: "Sideways, low volume" },
        { time: "Stock B", price: 2, note: "Uptrend, at support" },
        { time: "Stock C", price: 3, note: "Downtrend, at ATL" }
      ],
      question: "Best swing candidate?",
      options: ["Stock A", "Stock B", "Stock C"],
      correctIndex: 1,
      explanation: "Uptrend + at support = Best swing setup!"
    },
    trade: { stock: "Selected Stock", buyPrice: 500, sellPrice: 560, profit: 120 }
  },
  {
    day: 63,
    phase: 6,
    title: "SCALING IN & OUT",
    emoji: "📊",
    theory: {
      title: "ADVANCED POSITION MANAGEMENT",
      points: [
        "📊 Scale In: Add to position as trade confirms",
        "📊 Scale Out: Book partial profits at targets",
        "🎯 First entry: 50% of planned position",
        "➕ Add 25% each on confirmation signals"
      ],
      keyTerm: "Scaling",
      keyTermDef: "Gradually building or reducing position size",
      unlock: "Now you can scale positions like a pro"
    },
    quiz: {
      question: "Trade in profit, breakout pattern confirms. What to do?",
      options: ["Exit full position", "Scale in, add more", "Do nothing"],
      correctIndex: 1,
      explanation: "Confirmation = Scale in for bigger profit opportunity!"
    },
    challenge: {
      title: "SCALE YOUR TRADE",
      scenario: "Your swing trade progress:",
      priceData: [
        { time: "Entry 1", price: 2500, note: "50% position" },
        { time: "Confirms", price: 2550, note: "Pattern works" },
        { time: "Entry 2", price: 2550, note: "Add 25% more" },
        { time: "Target", price: 2700, note: "Exit all" }
      ],
      question: "Best approach?",
      options: ["All in at start", "Scale in as shown", "Never add to winners"],
      correctIndex: 1,
      explanation: "Scale in on confirmation = Lower average risk, higher reward!"
    },
    trade: { stock: "Scaled Trade", buyPrice: 2525, sellPrice: 2700, profit: 350 }
  },
  {
    day: 64,
    phase: 6,
    title: "HEDGING BASICS",
    emoji: "🛡️",
    theory: {
      title: "PROTECT YOUR POSITIONS",
      points: [
        "🛡️ Hedge = Insurance for your trade",
        "📈 Long stock + Buy Put = Protected downside",
        "📉 Short position + Buy Call = Protected upside",
        "💰 Cost of hedge = Premium paid"
      ],
      keyTerm: "Hedging",
      keyTermDef: "Using options/positions to limit potential losses",
      unlock: "Now you can protect positions"
    },
    quiz: {
      question: "You're long Nifty futures. How to hedge downside?",
      options: ["Buy more futures", "Buy Put option", "Sell Call option"],
      correctIndex: 1,
      explanation: "Long position + Put = Hedged against downside!"
    },
    challenge: {
      title: "HEDGE YOUR TRADE",
      scenario: "Your positions:",
      priceData: [
        { time: "Long Nifty", price: 22500, note: "Futures" },
        { time: "Profit", price: 50000, note: "Unrealized gains" },
        { time: "22300 PE", price: 50, note: "Put cost" }
      ],
      question: "To protect gains?",
      options: ["Exit futures now", "Buy 22300 Put", "Hope it holds"],
      correctIndex: 1,
      explanation: "Buy Put = Lock in profits, stay in for more upside!"
    },
    trade: { stock: "Hedged Position", buyPrice: 22500, sellPrice: 22800, profit: 300 }
  },
  {
    day: 65,
    phase: 6,
    title: "SWING VS DAY TRADING",
    emoji: "⚖️",
    theory: {
      title: "CHOOSE YOUR STYLE",
      points: [
        "📅 Swing: Less time commitment, bigger moves",
        "⚡ Day: Full-time focus, frequent small trades",
        "💼 Swing suits people with jobs",
        "🖥️ Day trading needs dedicated screen time"
      ],
      visual: { 
        type: 'comparison', 
        data: { 
          items: [
            { label: "Swing Trading", value: 70, color: "primary", desc: "2-3 hrs/day" },
            { label: "Day Trading", value: 95, color: "destructive", desc: "6+ hrs/day" }
          ]
        }
      },
      keyTerm: "Trading Style",
      keyTermDef: "Your preferred approach based on time and lifestyle",
      unlock: "Now you can choose your style"
    },
    quiz: {
      question: "You have a full-time job. Best trading style?",
      options: ["Scalping", "Swing Trading", "Day Trading"],
      correctIndex: 1,
      explanation: "Job + trading = Swing trading is the best fit!"
    },
    challenge: {
      title: "CHOOSE YOUR STYLE",
      scenario: "Your situation:",
      priceData: [
        { time: "Time available", price: 2, note: "2 hours/day" },
        { time: "Capital", price: 300000, note: "₹3 Lakhs" },
        { time: "Experience", price: 6, note: "6 months" }
      ],
      question: "Best approach for you?",
      options: ["Aggressive day trading", "Focus on swing trades", "Options scalping"],
      correctIndex: 1,
      explanation: "Limited time + moderate capital = Swing trading!"
    },
    trade: { stock: "Style Decision", buyPrice: 0, sellPrice: 0, profit: 0 }
  },
  {
    day: 66,
    phase: 6,
    title: "SCALPING BASICS",
    emoji: "⚡",
    theory: {
      title: "QUICK IN, QUICK OUT",
      points: [
        "⚡ Scalping: Hold for seconds to minutes",
        "🎯 Target: Small profits, high frequency",
        "📊 Need high liquidity instruments",
        "⚠️ Requires fast execution and focus"
      ],
      keyTerm: "Scalping",
      keyTermDef: "Ultra-short-term trading for small quick profits",
      unlock: "✅ BADGE: Swing Trader - You ride the waves!"
    },
    quiz: {
      question: "Trade held for 2 minutes, ₹50 profit. Style?",
      options: ["Swing Trading", "Scalping", "Position Trading"],
      correctIndex: 1,
      explanation: "Minutes holding + small profit = Scalping!"
    },
    challenge: {
      title: "SCALP SETUP",
      scenario: "Bank Nifty opening:",
      priceData: [
        { time: "9:15", price: 200, note: "ATM option" },
        { time: "9:17", price: 240, note: "+20%" },
        { time: "Target", price: 230, note: "+15% profit" }
      ],
      question: "Scalp exit strategy?",
      options: ["Hold for 100% gain", "Exit at 15-20% quickly", "Wait for expiry"],
      correctIndex: 1,
      explanation: "Scalp = Quick 15-20% and exit. Don't be greedy!"
    },
    trade: { stock: "Bank Nifty Scalp", buyPrice: 200, sellPrice: 230, profit: 30 }
  },

  // PHASE 7: OPTIONS BASICS (Days 67-74)
  {
    day: 67,
    phase: 7,
    title: "WHAT ARE OPTIONS",
    emoji: "📜",
    theory: {
      title: "OPTIONS INTRODUCTION",
      points: [
        "📞 Call Option: Right to BUY at a fixed price",
        "📲 Put Option: Right to SELL at a fixed price",
        "💰 Premium: Price you pay for the option contract",
        "📅 Expiry: Last date the option is valid"
      ],
      keyTerm: "Option",
      keyTermDef: "Contract giving right (not obligation) to buy/sell at fixed price",
      unlock: "Now you understand options basics"
    },
    quiz: {
      question: "You think Nifty will go UP. Which option to buy?",
      options: ["Buy Put", "Buy Call", "Sell Call"],
      correctIndex: 1,
      explanation: "Bullish view = Buy Call option!"
    },
    challenge: {
      title: "PICK THE OPTION",
      scenario: "Nifty at 22500:",
      priceData: [
        { time: "Current Nifty", price: 22500 },
        { time: "Your view", price: 23000, note: "Bullish" },
        { time: "23000 CE", price: 100, note: "Call premium" }
      ],
      question: "What to buy for bullish view?",
      options: ["23000 Put", "23000 Call", "22000 Put"],
      correctIndex: 1,
      explanation: "Bullish + expecting 23000 = Buy 23000 Call!"
    },
    trade: { stock: "Nifty 23000 CE", buyPrice: 100, sellPrice: 250, profit: 150 }
  },
  {
    day: 68,
    phase: 7,
    title: "LOT SIZE & LEVERAGE",
    emoji: "⚡",
    theory: {
      title: "OPTIONS LEVERAGE",
      points: [
        "📦 Lot Size: Minimum shares per contract (Nifty = 50)",
        "💰 Control large value with small premium",
        "⚡ Leverage: Magnifies gains AND losses",
        "⚠️ Can lose 100% of premium if wrong!"
      ],
      visual: { 
        type: 'formula', 
        data: { 
          formula: "Leverage = Contract Value ÷ Premium Paid",
          example: "Nifty: ₹11L value controlled with ₹15K premium = ~70x leverage"
        }
      },
      keyTerm: "Lot Size",
      keyTermDef: "Minimum quantity per options contract",
      unlock: "Now you understand options leverage"
    },
    quiz: {
      question: "Nifty lot = 50, Nifty at 22000. Contract value?",
      options: ["₹11,00,000", "₹22,000", "₹50,000"],
      correctIndex: 0,
      explanation: "50 shares × ₹22000 = ₹11,00,000!"
    },
    challenge: {
      title: "CALCULATE LEVERAGE",
      scenario: "Bank Nifty option:",
      priceData: [
        { time: "Lot Size", price: 15, note: "15 shares/lot" },
        { time: "Strike", price: 48000 },
        { time: "Premium", price: 10000, note: "Per lot" }
      ],
      question: "What's the leverage?",
      options: ["3x", "48x", "72x"],
      correctIndex: 2,
      explanation: "Value = 15×48000 = ₹7.2L. Premium ₹10K. Leverage = 72x!"
    },
    trade: { stock: "Bank Nifty CE", buyPrice: 10000, sellPrice: 15000, profit: 5000 }
  },
  {
    day: 69,
    phase: 7,
    title: "OPTION CHAIN READING",
    emoji: "📊",
    theory: {
      title: "READING THE OPTION CHAIN",
      points: [
        "🎯 Strike: Different price levels available",
        "📊 OI: Open Interest (total contracts outstanding)",
        "🔴 High Put OI = Support level (sellers defending)",
        "🟢 High Call OI = Resistance level (sellers defending)"
      ],
      keyTerm: "Open Interest",
      keyTermDef: "Total outstanding option contracts at each strike",
      unlock: "Now you can read option chain data"
    },
    quiz: {
      question: "Massive Call OI at 23000 strike. What does it mean?",
      options: ["Support at 23000", "Resistance at 23000", "No significance"],
      correctIndex: 1,
      explanation: "High Call OI = Option sellers defending = Resistance!"
    },
    challenge: {
      title: "READ THE CHAIN",
      scenario: "Nifty Option Chain:",
      priceData: [
        { time: "22800 CE OI", price: 50, note: "50 lakh" },
        { time: "23000 CE OI", price: 200, note: "2 crore!" },
        { time: "22500 PE OI", price: 180, note: "1.8 crore" }
      ],
      question: "Key levels from OI?",
      options: ["S: 22800, R: 23000", "S: 22500, R: 23000", "No clear levels"],
      correctIndex: 1,
      explanation: "High Put OI at 22500 = Support. High Call OI at 23000 = Resistance!"
    },
    trade: { stock: "Nifty", buyPrice: 22550, sellPrice: 22850, profit: 300 }
  },
  {
    day: 70,
    phase: 7,
    title: "ITM, ATM, OTM",
    emoji: "🎯",
    theory: {
      title: "OPTION MONEYNESS",
      points: [
        "💰 ITM (In The Money): Has intrinsic value",
        "🎯 ATM (At The Money): Strike = Spot price",
        "❌ OTM (Out of Money): No intrinsic value yet",
        "📊 OTM options are cheaper but riskier"
      ],
      keyTerm: "Moneyness",
      keyTermDef: "Relationship between strike price and spot price",
      unlock: "Now you understand option types"
    },
    quiz: {
      question: "Nifty at 22500. What is 22000 Call?",
      options: ["OTM", "ATM", "ITM"],
      correctIndex: 2,
      explanation: "Strike 22000 < Spot 22500. Call can be exercised profitably = ITM!"
    },
    challenge: {
      title: "IDENTIFY MONEYNESS",
      scenario: "Nifty at 22500:",
      priceData: [
        { time: "22000 CE", price: 550, note: "?" },
        { time: "22500 CE", price: 150, note: "?" },
        { time: "23000 CE", price: 50, note: "?" }
      ],
      question: "Which Call is OTM?",
      options: ["22000 CE", "22500 CE", "23000 CE"],
      correctIndex: 2,
      explanation: "Strike 23000 > Spot 22500 for Call = OTM!"
    },
    trade: { stock: "Nifty 23000 CE", buyPrice: 50, sellPrice: 150, profit: 100 }
  },
  {
    day: 71,
    phase: 7,
    title: "TIME DECAY (THETA)",
    emoji: "⏰",
    theory: {
      title: "OPTIONS LOSE VALUE DAILY",
      points: [
        "⏰ Theta: Daily time value loss",
        "📉 Decay accelerates near expiry",
        "⚠️ Option buyers lose to time decay",
        "💰 Option sellers profit from decay"
      ],
      visual: { 
        type: 'warning', 
        data: { message: "Options can lose 30-50% value in final week! Don't hold to expiry." }
      },
      keyTerm: "Theta Decay",
      keyTermDef: "Rate of time value loss per day in options",
      unlock: "Now you understand time decay"
    },
    quiz: {
      question: "You hold ₹100 option, 3 days to expiry, Nifty flat. Value now?",
      options: ["Still ₹100", "Much less than ₹100", "More than ₹100"],
      correctIndex: 1,
      explanation: "Time decay eats premium, especially near expiry!"
    },
    challenge: {
      title: "MANAGE TIME DECAY",
      scenario: "Your option position:",
      priceData: [
        { time: "Days to expiry", price: 3 },
        { time: "Current value", price: 80 },
        { time: "Theta", price: -20, note: "Losing ₹20/day" }
      ],
      question: "Best action?",
      options: ["Hold to expiry", "Exit if no move soon", "Buy more"],
      correctIndex: 1,
      explanation: "High theta + close expiry = Exit unless expecting big move!"
    },
    trade: { stock: "Exit Option", buyPrice: 100, sellPrice: 80, profit: -20 }
  },
  {
    day: 72,
    phase: 7,
    title: "OPTION BUYING RULES",
    emoji: "📋",
    theory: {
      title: "WHEN TO BUY OPTIONS",
      points: [
        "🎯 Have clear directional view",
        "⏰ Enough time to expiry (>7 days preferred)",
        "💰 Risk only what you can lose 100%",
        "📊 Buy ATM or slight ITM for better odds"
      ],
      keyTerm: "Option Buying",
      keyTermDef: "Paying premium for leveraged directional bet",
      unlock: "Now you can buy options strategically"
    },
    quiz: {
      question: "Strong bullish view, 10 days to expiry. Best option to buy?",
      options: ["Far OTM (cheap)", "ATM or slight ITM", "Deep ITM (expensive)"],
      correctIndex: 1,
      explanation: "ATM balances premium cost and probability of profit!"
    },
    challenge: {
      title: "BUY THE RIGHT OPTION",
      scenario: "Nifty bullish setup:",
      priceData: [
        { time: "Spot", price: 22500 },
        { time: "Expiry", price: 10, note: "10 days away" },
        { time: "22500 CE", price: 200, note: "ATM" },
        { time: "23000 CE", price: 50, note: "OTM" }
      ],
      question: "Better buy for higher probability?",
      options: ["23000 CE (cheaper)", "22500 CE (ATM)", "23500 CE (very cheap)"],
      correctIndex: 1,
      explanation: "ATM option = Best balance of cost and probability!"
    },
    trade: { stock: "Nifty 22500 CE", buyPrice: 200, sellPrice: 350, profit: 150 }
  },
  {
    day: 73,
    phase: 7,
    title: "OPTIONS FOR HEDGING",
    emoji: "🛡️",
    theory: {
      title: "PROTECT WITH OPTIONS",
      points: [
        "🛡️ Buy Put to protect long stock position",
        "📞 Buy Call to protect short position",
        "💰 Cost = Premium (like insurance)",
        "🎯 Limits max loss while keeping profit potential"
      ],
      keyTerm: "Protective Put",
      keyTermDef: "Buying put option to protect long stock position",
      unlock: "Now you can hedge with options"
    },
    quiz: {
      question: "You're long Nifty futures. How to hedge with options?",
      options: ["Buy Call", "Buy Put", "Sell Put"],
      correctIndex: 1,
      explanation: "Long position + Put = Protected against downside!"
    },
    challenge: {
      title: "HEDGE YOUR POSITION",
      scenario: "Your portfolio:",
      priceData: [
        { time: "Long Nifty", price: 22500, note: "Futures" },
        { time: "Current profit", price: 50000, note: "Unrealized" },
        { time: "22300 PE cost", price: 50, note: "Per lot" }
      ],
      question: "To lock in profits?",
      options: ["Exit futures", "Buy 22300 Put", "Do nothing"],
      correctIndex: 1,
      explanation: "Buy Put = Protect gains, stay in for more upside!"
    },
    trade: { stock: "Hedged Position", buyPrice: 22500, sellPrice: 22800, profit: 300 }
  },
  {
    day: 74,
    phase: 7,
    title: "SCALPING OPTIONS",
    emoji: "⚡",
    theory: {
      title: "QUICK OPTIONS TRADES",
      points: [
        "⚡ Hold: Minutes to hours only",
        "🎯 Target: 10-30% of premium",
        "📊 Trade high liquidity strikes (ATM)",
        "⚠️ Need fast decision making"
      ],
      keyTerm: "Options Scalping",
      keyTermDef: "Quick in-out trades in options for small profits",
      unlock: "✅ BADGE: Options Learner - You understand leverage power!"
    },
    quiz: {
      question: "Best time to scalp Bank Nifty options?",
      options: ["Lunch time", "First hour (9:15-10:15)", "Last 30 mins"],
      correctIndex: 1,
      explanation: "First hour = Most volatility for scalping!"
    },
    challenge: {
      title: "SCALP OPTIONS",
      scenario: "Bank Nifty opening:",
      priceData: [
        { time: "9:15", price: 200, note: "ATM CE" },
        { time: "9:25", price: 250, note: "+25%" },
        { time: "Target", price: 240, note: "+20% profit" }
      ],
      question: "Exit strategy?",
      options: ["Hold for 100% gain", "Exit at 20% profit", "Wait for expiry"],
      correctIndex: 1,
      explanation: "Scalp = Quick 20% and out. Don't get greedy!"
    },
    trade: { stock: "Bank Nifty Scalp", buyPrice: 200, sellPrice: 240, profit: 40 }
  },

  // PHASE 8: PSYCHOLOGY & SYSTEM (Days 75-80)
  {
    day: 75,
    phase: 8,
    title: "TRADING PSYCHOLOGY",
    emoji: "🧠",
    theory: {
      title: "MASTER YOUR EMOTIONS",
      points: [
        "😨 Fear: Makes you exit winners too early",
        "🤑 Greed: Makes you hold losers too long",
        "😤 Revenge trading: Biggest account killer",
        "🧘 Discipline: Follow your rules ALWAYS"
      ],
      visual: { 
        type: 'warning', 
        data: { message: "95% of trading success is psychology, not strategy!" }
      },
      keyTerm: "Trading Psychology",
      keyTermDef: "Managing emotions to execute trades properly",
      unlock: "Now you understand the mental game"
    },
    quiz: {
      question: "After 3 losses, you want to take bigger position. What is this?",
      options: ["Good strategy", "Revenge trading", "Scaling up"],
      correctIndex: 1,
      explanation: "Bigger size after losses = Revenge trading. NEVER do this!"
    },
    challenge: {
      title: "CONTROL EMOTIONS",
      scenario: "Your trading day:",
      priceData: [
        { time: "Trade 1", price: -1000, note: "Loss" },
        { time: "Trade 2", price: -800, note: "Loss" },
        { time: "Trade 3", price: -1200, note: "Loss" },
        { time: "Urge", price: 5000, note: "Bet big to recover?" }
      ],
      question: "Best action now?",
      options: ["Double position size", "Stop trading for the day", "One more small trade"],
      correctIndex: 1,
      explanation: "3 losses = Stop! Your emotions are compromised."
    },
    trade: { stock: "Paper Trade", buyPrice: 0, sellPrice: 0, profit: 0 }
  },
  {
    day: 76,
    phase: 8,
    title: "TRADING JOURNAL",
    emoji: "📓",
    theory: {
      title: "TRACK EVERYTHING",
      points: [
        "📝 Record: Entry, exit, reason, result, emotions",
        "📊 Review weekly: Find patterns in your mistakes",
        "✅ Screenshot every trade setup",
        "📈 Track win rate and average R:R"
      ],
      keyTerm: "Trading Journal",
      keyTermDef: "Diary of all trades with analysis and learnings",
      unlock: "Now you can learn from yourself"
    },
    quiz: {
      question: "Most important thing to record in journal?",
      options: ["Just P&L number", "Entry + reasoning + emotions", "Only winning trades"],
      correctIndex: 1,
      explanation: "Reasoning + emotions reveal your patterns and mistakes!"
    },
    challenge: {
      title: "JOURNAL ANALYSIS",
      scenario: "Your journal shows:",
      priceData: [
        { time: "Monday losses", price: 5, note: "All during lunch" },
        { time: "Friday wins", price: 8, note: "All morning trades" },
        { time: "Emotional trades", price: 10, note: "All losses" }
      ],
      question: "What to change?",
      options: ["Trade more on Monday", "Avoid lunch time trades", "Trade on emotions"],
      correctIndex: 1,
      explanation: "Journal shows lunch trades lose - avoid that time!"
    },
    trade: { stock: "Journaled Trade", buyPrice: 22500, sellPrice: 22600, profit: 100 }
  },
  {
    day: 77,
    phase: 8,
    title: "NEWS & EVENTS",
    emoji: "📰",
    theory: {
      title: "TRADE THE REACTION",
      points: [
        "📰 News is usually priced in before announcement",
        "📈 Trade the REACTION, not the news itself",
        "📅 Avoid trading during major events",
        "⚡ Expect volatility spikes = Use wider SL"
      ],
      keyTerm: "Event Risk",
      keyTermDef: "Sudden price moves from news/announcements",
      unlock: "Now you can handle news events"
    },
    quiz: {
      question: "RBI cuts rate, market gaps up 2%. Your action?",
      options: ["Buy immediately", "Wait to see reaction", "Short the gap"],
      correctIndex: 1,
      explanation: "Wait for reaction - gap could fill or extend further!"
    },
    challenge: {
      title: "TRADE THE NEWS",
      scenario: "Budget day:",
      priceData: [
        { time: "Pre-budget", price: 22000, note: "Very volatile" },
        { time: "Gap up open", price: 22500, note: "+2.3%" },
        { time: "Reaction", price: 22300, note: "Gap filling" },
        { time: "Real move", price: 22600, note: "After settling" }
      ],
      question: "Best entry point?",
      options: ["At gap open", "After gap fill settles", "Before budget"],
      correctIndex: 1,
      explanation: "Enter after reaction settles - usually at gap fill!"
    },
    trade: { stock: "Post-News", buyPrice: 22300, sellPrice: 22550, profit: 250 }
  },
  {
    day: 78,
    phase: 8,
    title: "PROMOTER ACTIVITY",
    emoji: "🔍",
    theory: {
      title: "FOLLOW SMART MONEY",
      points: [
        "👔 Promoters: Company founders/insiders",
        "📈 Promoter buying = Very bullish signal",
        "📉 Promoter selling = Caution warranted",
        "📊 Check quarterly shareholding pattern"
      ],
      keyTerm: "Promoter Holding",
      keyTermDef: "Percentage owned by founders/insiders",
      unlock: "Now you can spot smart money moves"
    },
    quiz: {
      question: "Promoter increases stake from 50% to 55%. Signal?",
      options: ["Bearish", "Very Bullish", "Neutral"],
      correctIndex: 1,
      explanation: "Promoter buying = They believe stock will go higher!"
    },
    challenge: {
      title: "FOLLOW PROMOTERS",
      scenario: "Company shareholding:",
      priceData: [
        { time: "Q1", price: 45, note: "45% promoter" },
        { time: "Q2", price: 48, note: "48% promoter" },
        { time: "Q3", price: 52, note: "52% promoter" },
        { time: "Stock price", price: 500, note: "Rising too" }
      ],
      question: "What's happening?",
      options: ["Promoter selling", "Promoter accumulating", "No correlation"],
      correctIndex: 1,
      explanation: "Rising promoter holding = Bullish insider confidence!"
    },
    trade: { stock: "Promoter Pick", buyPrice: 500, sellPrice: 580, profit: 160 }
  },
  {
    day: 79,
    phase: 8,
    title: "BUILDING YOUR SYSTEM",
    emoji: "🎯",
    theory: {
      title: "CREATE YOUR TRADING EDGE",
      points: [
        "📋 Define clear entry rules (what setups to trade)",
        "🛑 Define exit rules (SL and target levels)",
        "📏 Position sizing rules (how much to risk)",
        "📓 Review and improve your system constantly"
      ],
      keyTerm: "Trading System",
      keyTermDef: "Complete set of rules for consistent trading",
      unlock: "Now you can build your own system"
    },
    quiz: {
      question: "Most important part of a trading system?",
      options: ["Complex indicators", "Following rules consistently", "Secret strategy"],
      correctIndex: 1,
      explanation: "Consistency in following rules beats complexity!"
    },
    challenge: {
      title: "SYSTEM CHECKLIST",
      scenario: "Your trading system:",
      priceData: [
        { time: "Setup", price: 1, note: "Define patterns" },
        { time: "Entry", price: 2, note: "Clear triggers" },
        { time: "Risk", price: 3, note: "2% max" },
        { time: "Exit", price: 4, note: "SL & target rules" }
      ],
      question: "Ready to trade?",
      options: ["Need more study", "Yes, have a system!", "Maybe someday"],
      correctIndex: 1,
      explanation: "You have the tools. Now execute with discipline!"
    },
    trade: { stock: "System Trade", buyPrice: 10000, sellPrice: 10500, profit: 500 }
  },
  {
    day: 80,
    phase: 8,
    title: "YOUR TRADING JOURNEY",
    emoji: "🏆",
    theory: {
      title: "THE COMPLETE TRADER",
      points: [
        "🎓 80 days of comprehensive learning complete!",
        "📊 You know charts, patterns, and indicators",
        "🌊 You can swing trade effectively",
        "⚡ You understand options basics",
        "🧠 You know psychology matters most"
      ],
      visual: { 
        type: 'warning', 
        data: { message: "🏆 CONGRATULATIONS! You've completed the trading journey. Now practice with discipline and start with small size. Remember: Consistency > Perfection!" }
      },
      keyTerm: "Complete Trader",
      keyTermDef: "Equipped with knowledge, ready for disciplined practice",
      unlock: "✅ FINAL BADGE: Trading Master - Complete System!"
    },
    quiz: {
      question: "What's next after completing this course?",
      options: ["Trade with max capital immediately", "Paper trade first, then trade small", "Stop trading"],
      correctIndex: 1,
      explanation: "Practice first with paper trading, then trade small size, then grow gradually!"
    },
    challenge: {
      title: "YOUR COMMITMENT",
      scenario: "Your trading pledge:",
      priceData: [
        { time: "Rule 1", price: 1, note: "Always use SL" },
        { time: "Rule 2", price: 2, note: "Max 2% risk" },
        { time: "Rule 3", price: 3, note: "Follow my system" },
        { time: "Rule 4", price: 4, note: "Review every trade" }
      ],
      question: "Ready to be a disciplined trader?",
      options: ["Not yet, need more study", "YES! Let's do this!", "Maybe someday"],
      correctIndex: 1,
      explanation: "80 days done. Now go make it happen with discipline! 🚀"
    },
    trade: { stock: "Your Trading Future", buyPrice: 0, sellPrice: 1000000, profit: 1000000 }
  }
];

export const getPhaseForDay = (day: number): Phase => {
  if (day <= 10) return phases[0];
  if (day <= 16) return phases[1];
  if (day <= 24) return phases[2];
  if (day <= 36) return phases[3];
  if (day <= 46) return phases[4];
  if (day <= 58) return phases[5];
  if (day <= 66) return phases[6];
  if (day <= 74) return phases[7];
  return phases[8];
};

export const getDaysInPhase = (phaseId: number): number[] => {
  const ranges: { [key: number]: [number, number] } = {
    0: [1, 10],
    1: [11, 16],
    2: [17, 24],
    3: [25, 36],
    4: [37, 46],
    5: [47, 58],
    6: [59, 66],
    7: [67, 74],
    8: [75, 80]
  };
  const [start, end] = ranges[phaseId] || [1, 10];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
