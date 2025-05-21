export interface PositionMetadata {
  token0Address: string;
  token1Address: string;

  token0Symbol?: string;
  token1Symbol?: string;

  token0Src?: string;
  token1Src?: string;

  formattedFeePercent: string;
  formattedTickSpacingPercent: string;

  formattedMinPrice: string;
  formattedMaxPrice: string;

  type?: "DCA" | "Oracle" | "Full-range";
}

export interface DCAOrderMetadata {
  sellTokenAddress: string;
  buyTokenAddress: string;

  sellTokenSymbol?: string;
  buyTokenSymbol?: string;

  sellTokenSrc?: string;
  buyTokenSrc?: string;

  formattedSellAmount?: string;
  formattedStartTime: string;
  formattedDuration: string;
}

export interface LimitOrderMetadata {
  sellTokenAddress: string;
  buyTokenAddress: string;

  sellTokenSymbol?: string;
  buyTokenSymbol?: string;

  sellTokenSrc?: string;
  buyTokenSrc?: string;

  formattedSellAmount?: string;
  formattedLimitPrice?: string;
}
