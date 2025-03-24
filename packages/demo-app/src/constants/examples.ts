export const SVG_EXAMPLES = [
  {
    title: "Regular CL position with fees and tickspacing",
    args: [
      4322083467723223809427970398838266745n,
      "1",
      {
        lower_bound: "20045000",
        upper_bound: "20037000",

        token0Symbol: "ETH",
        token1Symbol: "USDC",

        token0Address: "0x0000000000000000000000000000000000000000",
        token1Address: "0Xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        fee: "9223372036854775",
        tick_spacing: "1000",

        extension: undefined,

        minted_timestamp: "1742502815000",
      },
    ],
  },
  {
    title: "Full range position with no extension",
    args: [
      223320167715534864472942017120693447232n,
      "1",
      {
        lower_bound: "-88722835",
        upper_bound: "88722835",

        token0Symbol: "ETH",
        token1Symbol: "USDC",

        token0Address: "0x0000000000000000000000000000000000000000",
        token1Address: "0Xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        fee: "9223372036854775",
        tick_spacing: "0",

        extension: undefined,

        minted_timestamp: "1742502815000",
      },
    ],
  },
  {
    title: "TWAMM position",
    args: [
      223320167715534864472942017120693447232n,
      "11155111",
      {
        lower_bound: "-88722835",
        upper_bound: "88722835",

        token0Symbol: "ETH",
        token1Symbol: "USDC",

        token0Address: "0x0000000000000000000000000000000000000000",
        token1Address: "0Xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        fee: "9223372036854775",
        tick_spacing: "0",

        extension: "TWAMM",

        minted_timestamp: "1742502815000",
      },
    ],
  },
  {
    title: "Oracle position",
    args: [
      283420062935785082055505916173879047197n,
      "1",
      {
        lower_bound: "-88722835",
        upper_bound: "88722835",

        token0Symbol: "ETH",
        token1Symbol: "EKUBO",

        token0Address: "0x0000000000000000000000000000000000000000",
        token1Address: "0X4c46e830bb56ce22735d5d8fc9cb90309317d0f",

        fee: "0",
        tick_spacing: "0",

        extension: "ORACLE",

        minted_timestamp: "1742502815000",
      },
    ],
  },
] as const;
