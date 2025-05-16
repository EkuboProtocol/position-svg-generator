export const SVG_EXAMPLES = [
  {
    title: "Regular CL position with fees and tickspacing",
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

        type: undefined,
      },
    ],
  },
  {
    title: "Full range position with no extension",
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

        type: "Full-range",
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

        formattedMinPrice: "1,123 ETH / USDC",
        formattedMaxPrice: "1,123 ETH / USDC",

        type: "DCA",
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

        formattedMinPrice: "1,123 ETH / USDC",
        formattedMaxPrice: "1,123 ETH / USDC",

        type: "Oracle",
      },
    ],
  },
] as const;
