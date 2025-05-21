import {
  SVG_BOUNDS_FONT_SIZE,
  SVG_GLOBAL_PADDING,
  SVG_MAIN_FONT_SIZE,
  SVG_TEXT_X_PADDING,
  SVG_WIDTH,
} from "../constants/svg";
import { DCAOrderMetadata } from "../types";

export function renderDCAOrderNftFooter(orderMetadata: DCAOrderMetadata) {
  const xPosition = SVG_WIDTH - (SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING);

  return `
      ${
        orderMetadata.formattedSellAmount
          ? `<text
        x="${xPosition}"
        y="216"
        fill="#B1AFAF"
        text-anchor="end"
        font-size="${SVG_BOUNDS_FONT_SIZE}"
      >
        Sell amount: <tspan fill="white">${orderMetadata.formattedSellAmount}</tspan>
      </text>`
          : ``
      }

      <text
        x="${xPosition}"
        y="${
          orderMetadata.formattedSellAmount ? 218 + SVG_BOUNDS_FONT_SIZE : "222"
        }"
        fill="#B1AFAF"
        text-anchor="end"
        font-size="${SVG_BOUNDS_FONT_SIZE}"
      >
        Start Time: <tspan fill="white">${
          orderMetadata.formattedStartTime
        }</tspan>
      </text>

      <text
        x="${xPosition}"
        y="${
          orderMetadata.formattedSellAmount
            ? 229 + SVG_BOUNDS_FONT_SIZE
            : 224 + SVG_BOUNDS_FONT_SIZE
        }"
        fill="#B1AFAF"
        text-anchor="end"
        font-size="${SVG_BOUNDS_FONT_SIZE}"
      >
        Duration: <tspan fill="white">${orderMetadata.formattedDuration}</tspan>
      </text>`;
}
