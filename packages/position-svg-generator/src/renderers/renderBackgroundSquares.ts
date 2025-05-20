import {
  SVG_GLOBAL_PADDING,
  SVG_HEIGHT,
  SVG_INNER_RECT_RADIUS,
  SVG_INNER_RECT_STROKE_WIDTH,
  SVG_WIDTH,
} from "../constants/svg";

export function renderBackgroundSquares() {
  return `
    <rect fill="#101010" width="${SVG_WIDTH}" height="${SVG_HEIGHT}"/>
    <rect
      fill="#1D1D1D"
      width="${SVG_WIDTH - 2 * SVG_GLOBAL_PADDING}"
      height="${SVG_HEIGHT - 2 * SVG_GLOBAL_PADDING}"
      x="${SVG_GLOBAL_PADDING}"
      y="${SVG_GLOBAL_PADDING}"
      rx="${SVG_INNER_RECT_RADIUS}"
      ry="${SVG_INNER_RECT_RADIUS}"
      stroke="#373737"
      stroke-width="${SVG_INNER_RECT_STROKE_WIDTH}"
    />
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
    `;
}
