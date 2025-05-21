import {
  SVG_BOUNDS_FONT_SIZE,
  SVG_GLOBAL_PADDING,
  SVG_MAIN_FONT_SIZE,
  SVG_TEXT_X_PADDING,
  SVG_WIDTH,
} from "../constants/svg";
import { LimitOrderMetadata } from "../types";

export function renderLimitOrderNftFooter(orderMetadata: LimitOrderMetadata) {
  const xPosition = SVG_WIDTH - (SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING);

  return `
  ${
    orderMetadata.formattedSellAmount
      ? `
      <text
        x="${xPosition}"
        y="${orderMetadata.formattedLimitPrice ? "222" : "227"}"
        fill="#B1AFAF"
        text-anchor="end"
        font-size="${
          SVG_BOUNDS_FONT_SIZE * (orderMetadata.formattedLimitPrice ? 1 : 1.3)
        }"
      >
       Sell amount : <tspan fill="white">${
         orderMetadata.formattedSellAmount
       }</tspan>
      </text>
    `
      : ``
  }

      ${
        orderMetadata.formattedLimitPrice
          ? `<text
        x="${xPosition}"
        y="${
          orderMetadata.formattedSellAmount ? 224 + SVG_BOUNDS_FONT_SIZE : "230"
        }"
        fill="#B1AFAF"
        text-anchor="end"
        font-size="${SVG_BOUNDS_FONT_SIZE}"
      >
        Limit price: <tspan fill="white">${
          orderMetadata.formattedLimitPrice
        }</tspan>
      </text>`
          : ""
      }`;
}
