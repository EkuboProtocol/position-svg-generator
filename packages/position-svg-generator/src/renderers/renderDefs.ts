import {
  ratio,
  SVG_GLOBAL_PADDING,
  SVG_IMAGE_SIZE,
  SVG_IMAGE_Y_OFFSET,
  SVG_TEXT_X_PADDING,
  SVG_TEXT_Y_PADDING,
  SVG_WIDTH,
} from "../constants/svg";

export const textGradientId = "textGradient";
export const token0RoundedMaskId = "token0RoundedMask";
export const token1RoundedMaskId = "token1RoundedMask";
export const gradientBlurId = "gradientBlurFilter";

const imageY = SVG_GLOBAL_PADDING + SVG_TEXT_Y_PADDING + SVG_IMAGE_Y_OFFSET;

export function renderDefs() {
  return `<defs>
    <linearGradient
      id="${textGradientId}"
      gradientUnits="objectBoundingBox"
      x1="1"
      y1="0"
      x2="0"
      y2="0"
    >
      <stop offset="64.57%" stop-color="#1F1D21" />
      <stop offset="98.57%" stop-color="#1F1D21" stop-opacity="0" />
    </linearGradient>

    <mask id="${token0RoundedMaskId}">
      <rect
        x="${
          SVG_WIDTH -
          SVG_GLOBAL_PADDING -
          SVG_TEXT_X_PADDING -
          1.7 * SVG_IMAGE_SIZE
        }"
        y="${imageY}"
        width="${SVG_IMAGE_SIZE}"
        height="${SVG_IMAGE_SIZE}"
        rx="100"
        ry="100"
        fill="white"
      />
    </mask>

    <mask id="${token1RoundedMaskId}">
      <rect
        x="${
          SVG_WIDTH - SVG_GLOBAL_PADDING - SVG_TEXT_X_PADDING - SVG_IMAGE_SIZE
        }"
        y="${imageY}"
        width="${SVG_IMAGE_SIZE}"
        height="${SVG_IMAGE_SIZE}"
        rx="100"
        ry="100"
        fill="white"
      />
    </mask>

    <filter id="${gradientBlurId}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${120 / ratio}" />
    </filter>
  </defs>`;
}
