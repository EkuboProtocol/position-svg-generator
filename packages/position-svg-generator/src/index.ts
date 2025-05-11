import prand from "pure-rand";
import { feeToPercent, spacingToPercent } from "./util/format";
import { generateGridSVGCircles } from "./generateCircles";

interface PositionMetadata {
  lower_bound: string;
  upper_bound: string;

  token0Symbol: string;
  token1Symbol: string;
  token0Address: string;
  token1Address: string;

  fee: string;
  tick_spacing: string;

  extension?: "DCA" | "Oracle" | "UNKNOWN";

  minted_timestamp: string;
}

const ratio = 4;

const SVG_WIDTH = 1_000 / ratio;
const SVG_HEIGHT = 1_000 / ratio;

const SVG_GLOBAL_PADDING = 30 / ratio;
const SVG_TEXT_PADDING = 42 / ratio;

const SVG_MAIN_FONT_SIZE = 94 / ratio;
const SVG_SMALLER_FONT_SIZE = 64 / ratio;

const SVG_INNER_RECT_RADIUS = 18 / ratio;
const SVG_INNER_RECT_STROKE_WIDTH = 1 / ratio;

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

  const randomIn = (min: number, max: number) =>
    prand.unsafeUniformIntDistribution(min, max, generator);

  const formattedFeePercent = feeToPercent(BigInt(positionMetadata.fee));
  const formattedTickSpacingPercent = spacingToPercent(
    Number(positionMetadata.tick_spacing)
  );
  const isFullRange =
    Number(positionMetadata.tick_spacing) === 0 &&
    positionMetadata.extension === undefined;

  // Generate random parameters
  const circles = generateGridSVGCircles({
    canvasWidth:
      SVG_WIDTH - 2 * SVG_GLOBAL_PADDING - 2 * SVG_INNER_RECT_STROKE_WIDTH,
    xOffset: SVG_GLOBAL_PADDING + SVG_INNER_RECT_STROKE_WIDTH,
    yOffset:
      SVG_GLOBAL_PADDING +
      SVG_TEXT_PADDING +
      SVG_MAIN_FONT_SIZE * 2 +
      SVG_TEXT_PADDING,
    randomSeed: idNum,
    fgColor1: [102, 28, 196, 1],
    fgColor2:
      positionMetadata.extension === "Oracle"
        ? [223, 123, 50, 1]
        : positionMetadata.extension === "DCA"
        ? [157, 90, 242, 1]
        : isFullRange
        ? [38, 232, 173, 1]
        : undefined,
  });

  return `
    <svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <rect fill="#101010" width="${SVG_WIDTH}" height="${SVG_HEIGHT}"/>
    <rect fill="#1D1D1D" width="${
      SVG_WIDTH - 2 * SVG_GLOBAL_PADDING
    }" height="${
    SVG_HEIGHT - 2 * SVG_GLOBAL_PADDING
  }" x="${SVG_GLOBAL_PADDING}" y="${SVG_GLOBAL_PADDING}" rx="${SVG_INNER_RECT_RADIUS}" ry="${SVG_INNER_RECT_RADIUS}" stroke="#373737" stroke-width="${SVG_INNER_RECT_STROKE_WIDTH}"/>

  <defs>
    <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${164 / ratio}" />
    </filter>
  </defs>

  <clipPath id="innerRectClip">
    <rect 
      x="${SVG_GLOBAL_PADDING}" 
      y="${SVG_GLOBAL_PADDING}" 
      width="${SVG_WIDTH - 2 * SVG_GLOBAL_PADDING}" 
      height="${SVG_HEIGHT - 2 * SVG_GLOBAL_PADDING}" 
      rx="${SVG_INNER_RECT_RADIUS}" 
      ry="${SVG_INNER_RECT_RADIUS}"
    />
  </clipPath>



  <g clip-path="url(#innerRectClip)">
  <circle cx="${SVG_WIDTH / 5}" cy="${0}" r="${
    SVG_WIDTH / 2.5
  }" fill="#661CC466" filter="url(#blurFilter)"/>

  <circle cx="${SVG_WIDTH / 1.2}" cy="${SVG_HEIGHT * 0.9}" r="${
    SVG_WIDTH / 2
  }" fill="#9D5AF266" filter="url(#blurFilter)"/>
  </g>


    ${circles}

        <text x=${SVG_GLOBAL_PADDING + SVG_TEXT_PADDING} y=${
    SVG_GLOBAL_PADDING + SVG_TEXT_PADDING + SVG_MAIN_FONT_SIZE
  } font-size="${SVG_MAIN_FONT_SIZE}" font-weight="700" fill="white">
          ${positionMetadata.token0Symbol} / ${positionMetadata.token1Symbol}
        </text>

        <text x=${SVG_GLOBAL_PADDING + SVG_TEXT_PADDING} y=${
    SVG_GLOBAL_PADDING + SVG_TEXT_PADDING + SVG_MAIN_FONT_SIZE * 2
  } font-size="${SVG_MAIN_FONT_SIZE}" font-weight="700" fill="white">
          ${formattedFeePercent}%
          <tspan fill="#878787" font-size="${SVG_SMALLER_FONT_SIZE}">
            ${formattedTickSpacingPercent}%
          </tspan>
        </text>


        ${
          positionMetadata.extension !== undefined
            ? `<text x="${
                SVG_GLOBAL_PADDING + SVG_TEXT_PADDING
              }" y="235" font-size="${SVG_MAIN_FONT_SIZE}" fill="white" font-weight="500">
          ${positionMetadata.extension}
        </text>`
            : ""
        }

    </svg>
    `;
}

// <text x="10" y="230" font-size="10" fill="white">
//   Upper tick: ${positionMetadata.upper_bound}
// </text>
// <text x="10" y="250" font-size="10" fill="white">
//   Lower tick: ${positionMetadata.lower_bound}
// </text>
