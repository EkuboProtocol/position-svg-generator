export const SVG_POSITION_EXAMPLES = [
  {
    title: "Regular CL position with fees and tickspacing",
    args: [
      "1",
      {
        token0Symbol: "WBTC",
        token1Symbol: "cbBTC",

        token0Address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        token1Address: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf",

        token0Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/7dcb2db2-a7a7-44af-660b-8262e057a100/logo",
        token1Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",

        formattedFeePercent: "0.001%",
        formattedTickSpacingPercent: "0.001%",

        formattedMinPrice: "1,123 ETH / USDC",
        formattedMaxPrice: "1,123 ETH / USDC",

        type: undefined,
        isFullRange: true,
      },
    ],
  },
  {
    title: "Boosted fees position",
    args: [
      "1",
      {
        token0Symbol: "ETH",
        token1Symbol: "USDC",

        token0Address: "0x0000000000000000000000000000000000000000",
        token1Address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        token0Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",
        token1Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e5aaa970-a998-47e8-bd43-4a3b56b87200/logo",

        formattedFeePercent: "0.001%",
        formattedTickSpacingPercent: "0%",

        formattedMinPrice: "1,123 ETH / USDC",
        formattedMaxPrice: "1,123 ETH / USDC",

        type: "boosted_fees",
        isFullRange: true,
      },
    ],
  },
  {
    title: "TWAMM position",
    args: [
      "11155111",
      {
        token0Symbol: "ETH",
        token1Symbol: "USDC",

        token0Address: "0x0000000000000000000000000000000000000000",
        token1Address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        token0Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",
        token1Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e5aaa970-a998-47e8-bd43-4a3b56b87200/logo",

        formattedFeePercent: "0.001%",
        formattedTickSpacingPercent: "0%",

        type: "dca",
        isFullRange: true,
      },
    ],
  },
  {
    title: "Oracle position",
    args: [
      "1",
      {
        token0Symbol: "ETH",
        token1Symbol: "EKUBO",

        token0Address: "0x0000000000000000000000000000000000000000",
        token1Address: "0x4c46e830bb56ce22735d5d8fc9cb90309317d0f",

        token0Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",
        token1Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/634d9c36-2f0b-4781-93e6-72d701b5af00/logo",

        formattedFeePercent: "0%",
        formattedTickSpacingPercent: "0%",

        type: "oracle",
        isFullRange: true,
      },
    ],
  },
  {
    title: "MEV-capture position",
    args: [
      "1",
      {
        token0Symbol: "ETH",
        token1Symbol: "USDC",

        token0Address: "0x0000000000000000000000000000000000000000",
        token1Address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        token0Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",
        token1Src:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e5aaa970-a998-47e8-bd43-4a3b56b87200/logo",

        formattedFeePercent: "0.001%",
        formattedTickSpacingPercent: "0.001%",

        formattedMinPrice: "1,123 ETH / USDC",
        formattedMaxPrice: "1,123 ETH / USDC",

        type: "mev_capture",
        isFullRange: false,
      },
    ],
  },
] as const;

export const SVG_DCA_ORDER_EXAMPLES = [
  {
    args: [
      "1",
      {
        sellTokenSymbol: "ETH",
        buyTokenSymbol: "USDC",

        sellTokenAddress: "0x0000000000000000000000000000000000000000",
        buyTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        sellTokenSrc:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",
        buyTokenSrc:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e5aaa970-a998-47e8-bd43-4a3b56b87200/logo",

        formattedSellAmount: "1,222 ETH",
        formattedStartTime: "2025-05-21 14:00 UTC",
        formattedEndTime: "2025-05-21 14:00 UTC",
      },
    ],
  },
  {
    args: [
      "1",
      {
        sellTokenSymbol: "ETH",
        buyTokenSymbol: undefined,

        sellTokenAddress: "0x0000000000000000000000000000000000000000",
        buyTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        sellTokenSrc:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",
        buyTokenSrc: undefined,

        formattedSellAmount: "1,222 ETH",
        formattedStartTime: "2025-05-21 14:00 UTC",
        formattedEndTime: "2025-05-21 14:00 UTC",
      },
    ],
  },
  {
    args: [
      "1",
      {
        sellTokenSymbol: undefined,
        buyTokenSymbol: "USDC",

        sellTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        buyTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        sellTokenSrc: undefined,
        buyTokenSrc:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e5aaa970-a998-47e8-bd43-4a3b56b87200/logo",

        formattedSellAmount: undefined,
        formattedStartTime: "2025-05-21 14:00 UTC",
        formattedEndTime: "2025-05-21 14:00 UTC",
      },
    ],
  },
  {
    args: [
      "1",
      {
        sellTokenSymbol: undefined,
        buyTokenSymbol: undefined,

        sellTokenAddress: "0x0000000000000000000000000000000000000000",
        buyTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        sellTokenSrc: undefined,
        buyTokenSrc: undefined,

        formattedSellAmount: undefined,
        formattedStartTime: "2025-05-21 14:00 UTC",
        formattedEndTime: "2025-05-21 14:00 UTC",
      },
    ],
  },
] as const;

// formattedSellAmount?: string;
// formattedLimitPrice?: string;
export const SVG_LIMIT_ORDER_EXAMPLES = [
  {
    args: [
      "1",
      {
        sellTokenSymbol: "ETH",
        buyTokenSymbol: "USDC",

        sellTokenAddress: "0x0000000000000000000000000000000000000000",
        buyTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        sellTokenSrc:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",
        buyTokenSrc:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e5aaa970-a998-47e8-bd43-4a3b56b87200/logo",

        formattedSellAmount: "1,222 ETH",
        formattedLimitPrice: "3,354.54 USDC/ETH",
      },
    ],
  },
  {
    args: [
      "1",
      {
        sellTokenSymbol: "ETH",
        buyTokenSymbol: undefined,

        sellTokenAddress: "0x0000000000000000000000000000000000000000",
        buyTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        sellTokenSrc:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",
        buyTokenSrc: undefined,

        formattedSellAmount: "1,222 ETH",
        formattedLimitPrice: undefined,
      },
    ],
  },
  {
    args: [
      "1",
      {
        sellTokenSymbol: undefined,
        buyTokenSymbol: "USDC",

        sellTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        buyTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        sellTokenSrc: undefined,
        buyTokenSrc:
          "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e5aaa970-a998-47e8-bd43-4a3b56b87200/logo",

        formattedSellAmount: undefined,
        formattedLimitPrice: undefined,
      },
    ],
  },
  {
    args: [
      "1",
      {
        sellTokenSymbol: undefined,
        buyTokenSymbol: undefined,

        sellTokenAddress: "0x0000000000000000000000000000000000000000",
        buyTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        sellTokenSrc: undefined,
        buyTokenSrc: undefined,

        formattedSellAmount: undefined,
        formattedLimitPrice: undefined,
      },
    ],
  },
] as const;
