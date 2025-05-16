import prand from "pure-rand";
import { shortenAddress } from "./util/format";
import { generateGridSVGCircles } from "./generateCircles";
import { suisseIntlMediumBase64 } from "./fonts";

interface PositionMetadata {
  token0Address: string;
  token1Address: string;

  token0Symbol?: string;
  token1Symbol?: string;

  token0Src?: string;
  token1Src?: string;

  formattedFeePercent: string;
  formattedTickSpacingPercent: string;

  formattedMinPrice: string;
  formattedMaxPrice: string;

  type?: "DCA" | "Oracle" | "Full-range";
}

const ratio = 4;

const SVG_WIDTH = 1_000 / ratio;
const SVG_HEIGHT = 1_000 / ratio;

const SVG_GLOBAL_PADDING = 30 / ratio;
const SVG_TEXT_X_PADDING = 42 / ratio;
const SVG_TEXT_Y_PADDING = 22 / ratio;

const SVG_MAIN_FONT_SIZE = 94 / ratio;
const SVG_SMALLER_FONT_SIZE = 64 / ratio;

const SVG_INNER_RECT_RADIUS = 18 / ratio;
const SVG_INNER_RECT_STROKE_WIDTH = 1 / ratio;

const SVG_BOUNDS_FONT_SIZE = 36 / ratio;

const SVG_IMAGE_STROKE_WIDTH = 10 / ratio;
const SVG_IMAGE_SIZE = SVG_MAIN_FONT_SIZE;

const SVG_IMAGE_Y_OFFSET = SVG_MAIN_FONT_SIZE * 0.13;

const SVG_GRADIENT_GRADIENT_RECT_WIDTH = 300 / ratio;
const SVG_GRADIENT_GRADIENT_RECT_HEIGHT = 140 / ratio;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const base64 = arrayBufferToBase64(arrayBuffer);
  const mime =
    response.headers.get("content-type") || "application/octet-stream";
  return `data:${mime};base64,${base64}`;
}

function renderStyles() {
  return `
  <style type="text/css">
    @font-face {
      font-family: 'SuisseIntl';
      src: url('${suisseIntlMediumBase64}') format('woff2');
      font-weight: 500
    }

    text {
      font-family: 'SuisseIntl';
      font-weight: 500
    }

  </style>
  `;
}

export async function generateSvg(
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

  // Generate random parameters
  const circles = generateGridSVGCircles({
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
  });

  const renderTokenImages = () => {
    const imageY = SVG_GLOBAL_PADDING + SVG_TEXT_Y_PADDING + SVG_IMAGE_Y_OFFSET;

    return `
    <defs>
      <linearGradient
        id="grad"
        gradientUnits="objectBoundingBox"
        x1="1" y1="0"
        x2="0" y2="0"

      >
        <stop offset="64.57%" stop-color="#1F1D21"/>
        <stop offset="98.57%" stop-color="#1F1D21" stop-opacity="0"/>
      </linearGradient>

      <mask id="token0RoundedMask">
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

      <mask id="token1RoundedMask">
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
    </defs>

      <rect
        width="${SVG_GRADIENT_GRADIENT_RECT_WIDTH}"
        height="${SVG_GRADIENT_GRADIENT_RECT_HEIGHT}"
        fill="url(#grad)"
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
          fill="none"
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
              mask="url(#token1RoundedMask)"
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
      fill="none"
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
      mask="url(#token0RoundedMask)"
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

  return `
    <svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${renderStyles()}
    <rect fill="#101010" width="${SVG_WIDTH}" height="${SVG_HEIGHT}"/>
    <rect fill="#1D1D1D" width="${
      SVG_WIDTH - 2 * SVG_GLOBAL_PADDING
    }" height="${
    SVG_HEIGHT - 2 * SVG_GLOBAL_PADDING
  }" x="${SVG_GLOBAL_PADDING}" y="${SVG_GLOBAL_PADDING}" rx="${SVG_INNER_RECT_RADIUS}" ry="${SVG_INNER_RECT_RADIUS}" stroke="#373737" stroke-width="${SVG_INNER_RECT_STROKE_WIDTH}"/>

  <defs>
    <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${120 / ratio}" />
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
  }" fill="${
    positionMetadata.type === "DCA"
      ? "#9D5AF266"
      : positionMetadata.type === "Oracle"
      ? "#DF7B3266"
      : positionMetadata.type === "Full-range"
      ? "#26E8AD66"
      : "#EB1E7466"
  }" filter="url(#blurFilter)"/>
  </g>

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
        fill="white">
          ${positionMetadata.formattedFeePercent}
          ${
            positionMetadata.type === undefined
              ? `<tspan fill="#878787" font-size="${SVG_SMALLER_FONT_SIZE}">
            ${positionMetadata.formattedTickSpacingPercent}
          </tspan>`
              : ""
          }
        </text>

  ${renderTokenImages()}
  ${circles}


  ${
    positionMetadata.type !== undefined
      ? `<text
                 x="${SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING}"
                 y="232"
                 font-size="${SVG_MAIN_FONT_SIZE}"
                 fill="white"
               >
                ${positionMetadata.type}
              </text>`
      : positionMetadata.token0Symbol && positionMetadata.token1Symbol
      ? `
              <text 
                x="${SVG_WIDTH - (SVG_GLOBAL_PADDING + SVG_TEXT_X_PADDING)}"
                y="222"
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
                y="${224 + SVG_BOUNDS_FONT_SIZE}"
                fill="#B1AFAF"
                text-anchor="end"
                font-size="${SVG_BOUNDS_FONT_SIZE}"
              >
                Max price: <tspan fill="white">${
                  positionMetadata.formattedMaxPrice
                }</tspan>
              </text>
            `
      : ""
  }

    </svg>
    `;
}
