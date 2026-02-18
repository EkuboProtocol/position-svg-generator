import {
  SVG_GLOBAL_PADDING,
  SVG_GRADIENT_GRADIENT_RECT_HEIGHT,
  SVG_GRADIENT_GRADIENT_RECT_WIDTH,
  SVG_IMAGE_SIZE,
  SVG_IMAGE_STROKE_WIDTH,
  SVG_IMAGE_Y_OFFSET,
  SVG_TEXT_X_PADDING,
  SVG_TEXT_Y_PADDING,
  SVG_WIDTH,
} from "../constants/svg";
import {
  textGradientId,
  token0RoundedMaskId,
  token1RoundedMaskId,
} from "./renderDefs";

type RenderTokenImagesParams = {
  token0Base64Src?: string;
  token1Base64Src?: string;
};

const imageY = SVG_GLOBAL_PADDING + SVG_TEXT_Y_PADDING + SVG_IMAGE_Y_OFFSET;

export const renderTokenImages = ({
  token0Base64Src,
  token1Base64Src,
}: RenderTokenImagesParams) => {
  return `
      <rect
        width="${SVG_GRADIENT_GRADIENT_RECT_WIDTH}"
        height="${SVG_GRADIENT_GRADIENT_RECT_HEIGHT}"
        fill="url(#${textGradientId})"
        clip-path="url(#innerRectClip)"
        x="${SVG_WIDTH - SVG_GRADIENT_GRADIENT_RECT_WIDTH - SVG_GLOBAL_PADDING}"
        y="${SVG_GLOBAL_PADDING}"
      />

        <circle
          cx="${
            SVG_WIDTH -
            SVG_GLOBAL_PADDING -
            SVG_TEXT_X_PADDING -
            SVG_IMAGE_SIZE +
            SVG_IMAGE_SIZE / 2
          }"
          cy="${
            SVG_GLOBAL_PADDING +
            SVG_TEXT_Y_PADDING +
            SVG_IMAGE_SIZE / 2 +
            SVG_IMAGE_Y_OFFSET
          }"
          r="${SVG_IMAGE_SIZE / 2}"
          fill="#1D1D1D"
          stroke="${token1Base64Src ? "#1D1D1D" : "#9D5AF2"}"
          stroke-width="${SVG_IMAGE_STROKE_WIDTH}"
        />
    ${
      token1Base64Src
        ? `
        
        <image
              href="${token1Base64Src}" width="${SVG_IMAGE_SIZE}"
              height="${SVG_IMAGE_SIZE}"
              x="${
                SVG_WIDTH -
                SVG_GLOBAL_PADDING -
                SVG_TEXT_X_PADDING -
                SVG_IMAGE_SIZE
              }"
              y="${imageY}"
              mask="url(#${token1RoundedMaskId})"
        />
              `
        : `
        <g transform="translate(${
          SVG_WIDTH - SVG_GLOBAL_PADDING - SVG_TEXT_X_PADDING - SVG_IMAGE_SIZE
        },${imageY})">
          <rect width="${SVG_IMAGE_SIZE}" height="${SVG_IMAGE_SIZE}" rx="100" fill="#261B34"
          >
          </rect>
          <path
            transform="translate(${7},${6})"
            d="M3.0768 10.45V8.4901H5.079V10.45H3.0768ZM4.938 7.3621H3.2319C3.2225 7.2775 3.2178 7.1882 3.2178 7.0942C3.2178 6.9908 3.2178 6.8968 3.2178 6.8122C3.2178 6.361 3.293 5.9897 3.4434 5.6983C3.5938 5.4069 3.8147 5.1531 4.1061 4.9369C4.3975 4.7113 4.7453 4.4857 5.1495 4.2601C5.5537 4.0345 5.8639 3.8042 6.0801 3.5692C6.3057 3.3342 6.4185 3.0522 6.4185 2.7232C6.4185 2.319 6.254 2.0041 5.925 1.7785C5.596 1.5435 5.173 1.426 4.656 1.426C4.186 1.426 3.7959 1.5106 3.4857 1.6798C3.1755 1.849 2.9452 2.0746 2.7948 2.3566C2.6444 2.6292 2.5598 2.93 2.541 3.259H0.8913C0.9007 2.5916 1.0652 2.0182 1.3848 1.5388C1.7138 1.0594 2.1603 0.6928 2.7243 0.439C3.2977 0.1758 3.951 0.0441999 4.6842 0.0441999C5.2764 0.0441999 5.8357 0.1382 6.3621 0.3262C6.8885 0.5048 7.3162 0.7868 7.6452 1.1722C7.9836 1.5482 8.1528 2.0276 8.1528 2.6104C8.1528 3.0522 8.0635 3.4423 7.8849 3.7807C7.7063 4.1191 7.4713 4.4152 7.1799 4.669C6.8885 4.9134 6.5736 5.1343 6.2352 5.3317C5.9344 5.5009 5.6853 5.6607 5.4879 5.8111C5.2999 5.9521 5.1589 6.1119 5.0649 6.2905C4.9803 6.4597 4.938 6.6806 4.938 6.9532V7.3621Z"
            fill="#9D5AF2"
          />
        </g>
        `
    }

    <circle
      cx="${
        SVG_WIDTH -
        SVG_GLOBAL_PADDING -
        SVG_TEXT_X_PADDING -
        1.7 * SVG_IMAGE_SIZE +
        SVG_IMAGE_SIZE / 2
      }"
      cy="${
        SVG_GLOBAL_PADDING +
        SVG_TEXT_Y_PADDING +
        SVG_IMAGE_SIZE / 2 +
        SVG_IMAGE_Y_OFFSET
      }"
      r="${SVG_IMAGE_SIZE / 2}"
      fill="#1D1D1D"
      stroke="${token0Base64Src ? "#1D1D1D" : "#9D5AF2"}"
      stroke-width="${SVG_IMAGE_STROKE_WIDTH}"
    />
 
    ${
      token0Base64Src
        ? `
    <image
      href="${token0Base64Src}"
      width="${SVG_IMAGE_SIZE}"
      height="${SVG_IMAGE_SIZE}"
      x="${
        SVG_WIDTH -
        SVG_GLOBAL_PADDING -
        SVG_TEXT_X_PADDING -
        1.7 * SVG_IMAGE_SIZE
      }"
      y="${imageY}"
      mask="url(#${token0RoundedMaskId})"
    />
    `
        : `
        <g transform="translate(${
          SVG_WIDTH -
          SVG_GLOBAL_PADDING -
          SVG_TEXT_X_PADDING -
          1.7 * SVG_IMAGE_SIZE
        },${imageY})">
          <rect width="${SVG_IMAGE_SIZE}" height="${SVG_IMAGE_SIZE}" rx="100" fill="#261B34">
          </rect>
          <path
            transform="translate(${7},${6})"
            d="M3.0768 10.45V8.4901H5.079V10.45H3.0768ZM4.938 7.3621H3.2319C3.2225 7.2775 3.2178 7.1882 3.2178 7.0942C3.2178 6.9908 3.2178 6.8968 3.2178 6.8122C3.2178 6.361 3.293 5.9897 3.4434 5.6983C3.5938 5.4069 3.8147 5.1531 4.1061 4.9369C4.3975 4.7113 4.7453 4.4857 5.1495 4.2601C5.5537 4.0345 5.8639 3.8042 6.0801 3.5692C6.3057 3.3342 6.4185 3.0522 6.4185 2.7232C6.4185 2.319 6.254 2.0041 5.925 1.7785C5.596 1.5435 5.173 1.426 4.656 1.426C4.186 1.426 3.7959 1.5106 3.4857 1.6798C3.1755 1.849 2.9452 2.0746 2.7948 2.3566C2.6444 2.6292 2.5598 2.93 2.541 3.259H0.8913C0.9007 2.5916 1.0652 2.0182 1.3848 1.5388C1.7138 1.0594 2.1603 0.6928 2.7243 0.439C3.2977 0.1758 3.951 0.0441999 4.6842 0.0441999C5.2764 0.0441999 5.8357 0.1382 6.3621 0.3262C6.8885 0.5048 7.3162 0.7868 7.6452 1.1722C7.9836 1.5482 8.1528 2.0276 8.1528 2.6104C8.1528 3.0522 8.0635 3.4423 7.8849 3.7807C7.7063 4.1191 7.4713 4.4152 7.1799 4.669C6.8885 4.9134 6.5736 5.1343 6.2352 5.3317C5.9344 5.5009 5.6853 5.6607 5.4879 5.8111C5.2999 5.9521 5.1589 6.1119 5.0649 6.2905C4.9803 6.4597 4.938 6.6806 4.938 6.9532V7.3621Z"
            fill="#9D5AF2"
          />
        </g>
        `
    }
    
    `;
};
