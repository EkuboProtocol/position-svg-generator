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
  const isFullRange = positionMetadata.lower_bound === "-88722835" && 
                      positionMetadata.upper_bound === "88722835";

  // Format the timestamp to a readable date
  const formattedDate = new Date(parseInt(positionMetadata.minted_timestamp))
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Generate random parameters for the visual elements
  const circleRadius = randomIn(45, 67);
  const stopColor1 = randomColor();
  const stopColor2 = randomColor();
  const rect1X = randomIn(10, 40);
  const rectWidth = randomIn(40, 70);
  const rotateAngle = randomIn(0, 360);

  // Determine extension badge color
  let extensionBadgeColor = "#FFFFFF";
  if (positionMetadata.extension === "TWAMM") {
    extensionBadgeColor = "#4CAF50"; // Green
  } else if (positionMetadata.extension === "ORACLE") {
    extensionBadgeColor = "#2196F3"; // Blue
  }
  
  // Generate position-specific colors based on token symbols
  const token0Color = `#${Math.abs(positionMetadata.token0Symbol.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 16777215).toString(16).padStart(6, '0')}`;
  const token1Color = `#${Math.abs(positionMetadata.token1Symbol.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 16777215).toString(16).padStart(6, '0')}`;

  return `
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Background gradient circle -->
        <circle cx="150" cy="150" r="${circleRadius * 1.5}" fill="url(#paint0_linear)"/>
        
        <!-- Position shape -->
        <path fill-rule="evenodd" clip-rule="evenodd"
            transform="rotate(${rotateAngle}, 150, 150) translate(60, 60)"
            d="M${rect1X} 54.0769C${rect1X} 47.9593 ${rect1X + rectWidth} 43 ${rect1X + rectWidth} 43H92.9C99.0304 43 104 47.9593 104 54.0769V79.9231C104 86.0407 99.0304 91 92.9 91H41.1C34.9696 91 30 86.0407 30 79.9231V54.0769ZM67 67C67 75.1568 60.3738 81.7692 52.2 81.7692C44.0262 81.7692 37.4 75.1568 37.4 67C37.4 58.8432 44.0262 52.2308 52.2 52.2308C60.3738 52.2308 67 58.8432 67 67ZM67 67C67 58.8432 73.6262 52.2308 81.8 52.2308C89.9738 52.2308 96.6 58.8432 96.6 67C96.6 75.1568 89.9738 81.7692 81.8 81.7692C73.6262 81.7692 67 75.1568 67 67Z"
            fill="#F1F0FA"/>
        
        <!-- Card background for information -->
        <rect x="50" y="130" width="200" height="140" rx="10" fill="white" fill-opacity="0.9"/>
        
        <!-- Token Pair Title -->
        <text x="150" y="155" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="black">
            ${positionMetadata.token0Symbol}/${positionMetadata.token1Symbol}
        </text>
        
        <!-- Token indicators -->
        <circle cx="90" cy="155" r="8" fill="${token0Color}"/>
        <circle cx="210" cy="155" r="8" fill="${token1Color}"/>
        
        <!-- Extension Badge (if applicable) -->
        ${positionMetadata.extension ? `
        <rect x="125" y="165" width="50" height="20" rx="5" fill="${extensionBadgeColor}"/>
        <text x="150" y="180" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="white">
            ${positionMetadata.extension}
        </text>
        ` : ''}
        
        <!-- Position Range Box -->
        <rect x="70" y="${positionMetadata.extension ? '195' : '175'}" width="160" height="30" rx="5" 
              fill="${isFullRange ? '#E0F7FA' : '#FFF9C4'}"/>
        <text x="150" y="${positionMetadata.extension ? '213' : '193'}" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="black">
            ${isFullRange ? 'Full Range' : `Range: ${positionMetadata.lower_bound} - ${positionMetadata.upper_bound}`}
        </text>
        
        <!-- Fee Information -->
        <text x="150" y="${positionMetadata.extension ? '235' : '215'}" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#666666">
            Fee: ${formattedFeePercent}%
        </text>
        
        <!-- Date Information -->
        <text x="150" y="${positionMetadata.extension ? '255' : '235'}" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#888888">
            Minted: ${formattedDate}
        </text>
        
        <!-- ID Information at the bottom -->
        <text x="150" y="275" font-family="Arial, sans-serif" font-size="9" text-anchor="middle" fill="#AAAAAA">
            ID: ${id.toString().slice(0, 8)}...${id.toString().slice(-8)} · Chain: ${chainId}
        </text>

        <!-- Definitions for gradients and other effects -->
        <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="300" y2="300" gradientUnits="userSpaceOnUse">
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
