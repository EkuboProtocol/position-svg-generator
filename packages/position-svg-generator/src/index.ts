import prand from "pure-rand";
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
  id: bigint,
  chainId: string,
  positionMetadata: PositionMetadata
): string {
  const idNum = Number(id % BigInt(Number.MAX_SAFE_INTEGER));
  let generator = prand.xoroshiro128plus(Number(chainId));
  generator = prand.xoroshiro128plus(
    idNum + prand.unsafeUniformIntDistribution(0, 2 ** 32 - idNum, generator)
  );

  const randomColor = () =>
    `#${prand
      .unsafeUniformIntDistribution(0, 16777215, generator)
      .toString(16)
      .padStart(6, "0")}`;

  const randomIn = (min: number, max: number) =>
    prand.unsafeUniformIntDistribution(min, max, generator);

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
    <svg width="134" height="180" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">

        <circle cx="67" cy="67" r="${circleRadius}" fill="url(#paint${id.toString()}_linear_1_30)"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
            transform="rotate(${rotateAngle}, 67, 67)"
            d="M${rect1X} 54.0769C${rect1X} 47.9593 ${rect1X + rectWidth} 43 ${
    rect1X + rectWidth
  } 43H92.9C99.0304 43 104 47.9593 104 54.0769V79.9231C104 86.0407 99.0304 91 92.9 91H41.1C34.9696 91 30 86.0407 30 79.9231V54.0769ZM67 67C67 75.1568 60.3738 81.7692 52.2 81.7692C44.0262 81.7692 37.4 75.1568 37.4 67C37.4 58.8432 44.0262 52.2308 52.2 52.2308C60.3738 52.2308 67 58.8432 67 67ZM67 67C67 58.8432 73.6262 52.2308 81.8 52.2308C89.9738 52.2308 96.6 58.8432 96.6 67C96.6 75.1568 89.9738 81.7692 81.8 81.7692C73.6262 81.7692 67 75.1568 67 67Z"
            fill="#F1F0FA"/>

        <defs>
            <linearGradient id="paint${id.toString()}_linear_1_30" x1="0" y1="0" x2="134" y2="134" gradientUnits="userSpaceOnUse">
                <stop stop-color="${stopColor1}"/>
                <stop offset="1" stop-color="${stopColor2}"/>
            </linearGradient>
        </defs>

              <rect 
        x="0"
        y="0"
        width="134"
        height="180"
        fill="#00000044"
        rx="5"
        ry="5"
      />


        <text x="10" y="15" font-size="10" fill="white">
          isFullRange: ${isFullRange}
        </text>
        <text x="10" y="30" font-size="10" fill="white">
          extension: ${positionMetadata.extension}
        </text>
        <text x="10" y="45" font-size="10" fill="white">
          Lower tick: ${positionMetadata.lower_bound}
        </text>
        <text x="10" y="60" font-size="10" fill="white">
          Upper tick: ${positionMetadata.upper_bound}%
        </text>
        <text x="10" y="75" font-size="10" fill="white">
          token0: ${positionMetadata.token0Symbol}
        </text>
        <text x="10" y="90" font-size="10" fill="white">
          token1: ${positionMetadata.token1Symbol}
        </text>
        <text x="10" y="105" font-size="10" fill="white">
          token0 address: ${positionMetadata.token0Address}
        </text>
        <text x="10" y="120" font-size="10" fill="white">
          token1 address: ${positionMetadata.token1Address}
        </text>
        <text x="10" y="135" font-size="10" fill="white">
          Tick Spacing: ${formattedTickSpacingPercent}%
        </text>
        <text x="10" y="150" font-size="10" fill="white">
          Fee: ${formattedFeePercent}%
        </text>
    </svg>
    `;
}
