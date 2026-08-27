import {
  SVG_BOUNDS_FONT_SIZE,
  SVG_GLOBAL_PADDING,
  SVG_MAIN_FONT_SIZE,
  SVG_TEXT_X_PADDING,
  SVG_WIDTH,
} from "../constants/svg";
import { PositionMetadata } from "../types";
import { getTypeDisplayLabel } from "../util/typeLabels";

// These two labels are the long ones, so they render at half size and sit two
// pixels higher to stay optically aligned with the rest of the footer row.
const HALF_SIZE_LABEL_TYPES = new Set(["mev_capture", "boosted_fees"]);

const FOOTER_RIGHT_X = SVG_WIDTH - (SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING);

function renderTypeLabel(type: PositionMetadata["type"]): string {
  if (type === undefined) return "";

  const halfSize = HALF_SIZE_LABEL_TYPES.has(type);

  return `<text
        x="${SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING}"
        y="${halfSize ? 230 : 232}"
        font-size="${SVG_MAIN_FONT_SIZE / (halfSize ? 2.0 : 1)}"
        fill="white"
      >
        ${getTypeDisplayLabel(type)}
      </text>`;
}

function renderRange(positionMetadata: PositionMetadata): string {
  // DCA orders and oracle positions are always full range by construction, so
  // saying so on the card would be noise rather than information.
  const showsFullRange =
    positionMetadata.isFullRange &&
    positionMetadata.type !== "dca" &&
    positionMetadata.type !== "oracle";

  if (showsFullRange) {
    return `<text 
         x="${FOOTER_RIGHT_X}"
         y="228"
         fill="white"
         text-anchor="end"
         font-size="${SVG_MAIN_FONT_SIZE / 2}"
       >
        Full-range
       </text>`;
  }

  const { formattedMinPrice, formattedMaxPrice } = positionMetadata;
  if (!formattedMinPrice || !formattedMaxPrice) return "";

  return `<text 
         x="${FOOTER_RIGHT_X}"
         y="221"
         fill="#B1AFAF"
         text-anchor="end"
         font-size="${SVG_BOUNDS_FONT_SIZE}"
       >
         Min price: <tspan fill="white">${formattedMinPrice}</tspan>
       </text>

       <text
         x="${FOOTER_RIGHT_X}"
         y="${225 + SVG_BOUNDS_FONT_SIZE}"
         fill="#B1AFAF"
         text-anchor="end"
         font-size="${SVG_BOUNDS_FONT_SIZE}"
       >
         Max price: <tspan fill="white">${formattedMaxPrice}</tspan>
       </text>`;
}

export function renderPositionNftFooter(positionMetadata: PositionMetadata) {
  return (
    renderTypeLabel(positionMetadata.type) + renderRange(positionMetadata)
  );
}
