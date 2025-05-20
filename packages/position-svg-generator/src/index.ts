import prand from "pure-rand";
import { shortenAddress } from "./util/format";
import { urlToBase64 } from "./util/base64";
import { renderStyles } from "./renderers/renderStyles";
import { renderGridCircles } from "./renderers/renderGridCircles";
import {
  SVG_BOUNDS_FONT_SIZE,
  SVG_GLOBAL_PADDING,
  SVG_HEIGHT,
  SVG_INNER_RECT_RADIUS,
  SVG_INNER_RECT_STROKE_WIDTH,
  SVG_MAIN_FONT_SIZE,
  SVG_SMALLER_FONT_SIZE,
  SVG_TEXT_X_PADDING,
  SVG_TEXT_Y_PADDING,
  SVG_WIDTH,
} from "./constants/svg";
import { renderDefs } from "./renderers/renderDefs";
import { renderTokenImages } from "./renderers/renderTokenImages";
import { PositionMetadata } from "./types";
import { renderGradientCircles } from "./renderers/renderGradientCircles";
import { renderBackgroundSquares } from "./renderers/renderBackgroundSquares";
import { renderPositionNftFooter } from "./renderers/renderPositionNftFooter";

export async function generatePositionSvg(
  id: bigint,
  chainId: string,
  positionMetadata: PositionMetadata
): Promise<string> {
  const idNum = Number(id % BigInt(Number.MAX_SAFE_INTEGER));
  let generator = prand.xoroshiro128plus(Number(chainId));
  generator = prand.xoroshiro128plus(
    idNum + prand.unsafeUniformIntDistribution(0, 2 ** 32 - idNum, generator)
  );

  const randomIn = (min: number, max: number) =>
    prand.unsafeUniformIntDistribution(min, max, generator);

  const token0Base64Src = positionMetadata.token0Src
    ? await urlToBase64(positionMetadata.token0Src)
    : undefined;

  const token1Base64Src = positionMetadata.token1Src
    ? await urlToBase64(positionMetadata.token1Src)
    : undefined;

  return `
    <svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      ${renderStyles()}
      ${renderDefs()}
      ${renderBackgroundSquares()}
      ${renderGradientCircles(positionMetadata)}

      <text
        x="${SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING}"
        y="${SVG_GLOBAL_PADDING + SVG_TEXT_Y_PADDING + SVG_MAIN_FONT_SIZE}"
        font-size="${SVG_MAIN_FONT_SIZE}"
        fill="white"
        clip-path="url(#innerRectClip)"
      >
        ${
          positionMetadata.token0Symbol ??
          shortenAddress(positionMetadata.token0Address)
        }/${
    positionMetadata.token1Symbol ??
    shortenAddress(positionMetadata.token1Address)
  }
      </text>

      <text
        x="${SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING}"
        y="${SVG_GLOBAL_PADDING + SVG_TEXT_Y_PADDING + SVG_MAIN_FONT_SIZE * 2}"
        font-size="${SVG_MAIN_FONT_SIZE}"
        fill="white"
      >
        ${positionMetadata.formattedFeePercent}
        ${
          positionMetadata.type === undefined
            ? `<tspan fill="#878787" font-size="${SVG_SMALLER_FONT_SIZE}">
                ${positionMetadata.formattedTickSpacingPercent}
              </tspan>`
            : ""
        }
      </text>
      ${renderTokenImages({ token0Base64Src, token1Base64Src })}
      ${renderGridCircles({
        canvasWidth:
          SVG_WIDTH - 2 * SVG_GLOBAL_PADDING - 2 * SVG_INNER_RECT_STROKE_WIDTH,
        xOffset: SVG_GLOBAL_PADDING + SVG_INNER_RECT_STROKE_WIDTH,
        yOffset:
          SVG_GLOBAL_PADDING +
          SVG_TEXT_Y_PADDING * 1.5 +
          SVG_MAIN_FONT_SIZE * 2 +
          SVG_TEXT_Y_PADDING +
          ((positionMetadata.token0Symbol === undefined ||
            positionMetadata.token1Symbol === undefined) &&
          positionMetadata.type === undefined
            ? SVG_HEIGHT / 16
            : 0),
        randomSeed: idNum,
        fgColor1: [102, 28, 196, 1],
        fgColor2:
          positionMetadata.type === "Oracle"
            ? [223, 123, 50, 1]
            : positionMetadata.type === "DCA"
            ? [157, 90, 242, 1]
            : positionMetadata.type === "Full-range"
            ? [38, 232, 173, 1]
            : [235, 30, 116, 1],
      })}
      ${renderPositionNftFooter(positionMetadata)}
    </svg>`;
}
