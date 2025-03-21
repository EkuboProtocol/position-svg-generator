import prand, { unsafeUniformIntDistribution } from "pure-rand";
import { feeToPercent, spacingToPercent } from "./util/format";

interface PositionMetadata {
  lower_bound: string;
  upper_bound: string;

  token0Symbol: string;
  token1Symbol: string;
  token0Address: string;
  token1Address: string;

  fee: string;
  tick_spacing: string;

  extension?: "TWAMM" | "ORACLE" | "UNKNOWN";

  minted_timestamp: string;
}

export function generateSvg(
  id: number,
  chainId: string,
  positionMetadata: PositionMetadata
): string {
  let generator = prand.xoroshiro128plus(Number(chainId));
  generator = prand.xoroshiro128plus(
    id + unsafeUniformIntDistribution(0, 2 ** 32 - id, generator)
  );

  const randomColor = () =>
    `#${unsafeUniformIntDistribution(0, 16777215, generator)
      .toString(16)
      .padStart(6, "0")}`;

  const randomIn = (min: number, max: number) =>
    unsafeUniformIntDistribution(min, max, generator);

  const formattedFeePercent = feeToPercent(BigInt(positionMetadata.fee));
  const formattedTickSpacingPercent = spacingToPercent(
    Number(positionMetadata.tick_spacing)
  );
  const isFullRange = Number(positionMetadata.tick_spacing) === 0;

  // Generate random parameters
  const circleRadius = randomIn(45, 67);
  const stopColor1 = randomColor();
  const stopColor2 = randomColor();
  const rect1X = randomIn(10, 40);
  const rectWidth = randomIn(40, 70);
  const rotateAngle = randomIn(0, 360);

  return `
    <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="67" cy="67" r="${circleRadius}" fill="url(#paint0_linear_1_30)"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
            transform="rotate(${rotateAngle}, 67, 67)"
            d="M${rect1X} 54.0769C${rect1X} 47.9593 ${rect1X + rectWidth} 43 ${
    rect1X + rectWidth
  } 43H92.9C99.0304 43 104 47.9593 104 54.0769V79.9231C104 86.0407 99.0304 91 92.9 91H41.1C34.9696 91 30 86.0407 30 79.9231V54.0769ZM67 67C67 75.1568 60.3738 81.7692 52.2 81.7692C44.0262 81.7692 37.4 75.1568 37.4 67C37.4 58.8432 44.0262 52.2308 52.2 52.2308C60.3738 52.2308 67 58.8432 67 67ZM67 67C67 58.8432 73.6262 52.2308 81.8 52.2308C89.9738 52.2308 96.6 58.8432 96.6 67C96.6 75.1568 89.9738 81.7692 81.8 81.7692C73.6262 81.7692 67 75.1568 67 67Z"
            fill="#F1F0FA"/>

                  <text
        x="67"
        y="60"
        font-size="10"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="black"
      >
        ${JSON.stringify(positionMetadata)}
      </text>

        <defs>
            <linearGradient id="paint0_linear_1_30" x1="0" y1="0" x2="134" y2="134" gradientUnits="userSpaceOnUse">
                <stop stop-color="${stopColor1}"/>
                <stop offset="1" stop-color="${stopColor2}"/>
            </linearGradient>
        </defs>
    </svg>
    `;
}

// Regular CL position with fees and tick spacing
console.log(
  generateSvg(223320167715534864472942017120693447232, "1", {
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
  })
);

// Full range position with no extension
console.log(
  generateSvg(223320167715534864472942017120693447232, "1", {
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
  })
);

// TWAMM position
console.log(
  generateSvg(223320167715534864472942017120693447232, "11155111", {
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
  })
);

// Oracle position
console.log(
  generateSvg(283420062935785082055505916173879047197, "1", {
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
  })
);
