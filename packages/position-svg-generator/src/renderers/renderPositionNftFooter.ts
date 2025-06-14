import {
  SVG_BOUNDS_FONT_SIZE,
  SVG_GLOBAL_PADDING,
  SVG_MAIN_FONT_SIZE,
  SVG_TEXT_X_PADDING,
  SVG_WIDTH,
} from "../constants/svg";
import { PositionMetadata } from "../types";

export function renderPositionNftFooter(positionMetadata: PositionMetadata) {
  let positionFooterTexts = ``;

  if (positionMetadata.type !== undefined) {
    positionFooterTexts += `<text
        x="${SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING}"
        y="${positionMetadata.type === "MEV-resist" ? 230 : 232}"
        font-size="${
          SVG_MAIN_FONT_SIZE /
          (positionMetadata.type === "MEV-resist" ? 1.4 : 1)
        }"
        fill="white"
      >
        ${positionMetadata.type}
      </text>`;
  }
  if (
    positionMetadata.formattedMinPrice &&
    positionMetadata.formattedMaxPrice
  ) {
    positionFooterTexts += `<text 
         x="${SVG_WIDTH - (SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING)}"
         y="221"
         fill="#B1AFAF"
         text-anchor="end"
         font-size="${SVG_BOUNDS_FONT_SIZE}"
       >
         Min price: <tspan fill="white">${
           positionMetadata.formattedMinPrice
         }</tspan>
       </text>

       <text
         x="${SVG_WIDTH - (SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING)}"
         y="${225 + SVG_BOUNDS_FONT_SIZE}"
         fill="#B1AFAF"
         text-anchor="end"
         font-size="${SVG_BOUNDS_FONT_SIZE}"
       >
         Max price: <tspan fill="white">${
           positionMetadata.formattedMaxPrice
         }</tspan>
       </text>`;
  }

  return positionFooterTexts;
}
