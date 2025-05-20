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
