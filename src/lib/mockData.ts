export interface Token {
  symbol: string;
  price: number;
  change: number;
  category: string;
}

const mockData: Token[] = [
  // ------------------------------------
  // NEW TOKENS
  // ------------------------------------
  {
    symbol: "BTC",
    price: 45123.45,
    change: 1.25,
    category: "new",
  },
  {
    symbol: "ETH",
    price: 2750.32,
    change: -0.42,
    category: "new",
  },
  {
    symbol: "SOL",
    price: 112.54,
    change: 3.12,
    category: "new",
  },

  // ------------------------------------
  // FINAL STRETCH TOKENS
  // ------------------------------------
  {
    symbol: "MATIC",
    price: 0.89,
    change: 0.55,
    category: "final",
  },
  {
    symbol: "DOT",
    price: 6.23,
    change: -1.05,
    category: "final",
  },
  {
    symbol: "ATOM",
    price: 9.43,
    change: 2.44,
    category: "final",
  },

  // ------------------------------------
  // MIGRATED TOKENS
  // ------------------------------------
  {
    symbol: "XRP",
    price: 0.68,
    change: 1.02,
    category: "migrated",
  },
  {
    symbol: "LTC",
    price: 83.12,
    change: 0.12,
    category: "migrated",
  },
  {
    symbol: "DOGE",
    price: 0.085,
    change: -0.22,
    category: "migrated",
  },

  // ------------------------------------
  // TOKEN PAIRS (Optional Feature)
  // ------------------------------------
  {
    symbol: "BTC/ETH",
    price: 17.45,
    change: 0.44,
    category: "pairs",
  },
  {
    symbol: "SOL/ETH",
    price: 0.042,
    change: -1.22,
    category: "pairs",
  },
  {
    symbol: "MATIC/BTC",
    price: 0.000019,
    change: 2.12,
    category: "pairs",
  },

  // ------------------------------------
  // STRETCH TOKENS (Optional Feature)
  // ------------------------------------
  {
    symbol: "AVAX",
    price: 39.22,
    change: -0.92,
    category: "stretch",
  },
  {
    symbol: "AAVE",
    price: 92.18,
    change: 0.65,
    category: "stretch",
  },
  {
    symbol: "LINK",
    price: 15.44,
    change: 3.88,
    category: "stretch",
  },
];

export default mockData;
