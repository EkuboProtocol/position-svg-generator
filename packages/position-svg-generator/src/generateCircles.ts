// Generates a grid of paired circles as an SVG string
export function generateGridSVGCircles({
  gridSettings = [
    [12, 7],
    [24, 14],
    [36, 21],
    [48, 28],
  ],
  canvasWidth = 256,
  fgColor1 = [0, 0, 0, 1],
  fgColor2 = [0, 255, 0, 1],
  randomSeed = 42,
  bigCircleSize = undefined,
  mediumCircleSize = undefined,
  smallCircleSize = 1,
  targetBigPercentage = undefined,
  targetMediumPercentage = undefined,
  xOffset,
  yOffset,
}: {
  gridSettings?: [number, number][];
  canvasWidth?: number;
  bgColor?: [number, number, number, number];
  fgColor1?: [number, number, number, number];
  fgColor2?: [number, number, number, number];
  randomSeed?: number;
  bigCircleSize?: number;
  mediumCircleSize?: number;
  smallCircleSize?: number;
  targetBigPercentage?: number;
  targetMediumPercentage?: number;
  xOffset?: number;
  yOffset?: number;
}): string {
  const rng = seedRandom(randomSeed);

  const [gridCols, gridRows] =
    gridSettings[Math.floor(rng() * gridSettings.length)];
  const cellSize = canvasWidth / gridCols;
  const canvasHeight = cellSize * gridRows;
  const totalCells = gridCols * gridRows;

  bigCircleSize ??= Math.max(3, Math.floor((gridCols / 4) * rng()));
  mediumCircleSize ??= Math.max(
    2,
    Math.floor((bigCircleSize + smallCircleSize) / 2)
  );

  targetBigPercentage ??= rng();
  targetMediumPercentage ??= rng() * (1 - targetBigPercentage);

  const grid: boolean[][] = Array.from({ length: gridRows }, () =>
    Array(gridCols).fill(false)
  );

  let circles = "";

  function interpolateColor(t: number): string {
    const r = fgColor1[0] + (fgColor2[0] - fgColor1[0]) * t;
    const g = fgColor1[1] + (fgColor2[1] - fgColor1[1]) * t;
    const b = fgColor1[2] + (fgColor2[2] - fgColor1[2]) * t;
    const a = fgColor1[3] + (fgColor2[3] - fgColor1[3]) * t;
    return rgba([r, g, b, a]);
  }

  function drawCircle(row: number, col: number, size: number, color: string) {
    const cx = (col + size / 2) * cellSize + xOffset;
    const cy = canvasHeight - (row + size / 2) * cellSize + yOffset;
    const r = (cellSize * size) / 2;
    circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" />\n`;
  }

  function isAvailable(
    row: number,
    col: number,
    h: number,
    w: number
  ): boolean {
    if (row + h > gridRows || col + w > gridCols) return false;
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        if (grid[row + r][col + c]) return false;
      }
    }
    return true;
  }

  function markFilled(row: number, col: number, h: number, w: number) {
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        grid[row + r][col + c] = true;
      }
    }
  }

  function placeCirclePairs(size: number, targetPairs: number) {
    let placed = 0;
    const positions = [];
    for (let r = 0; r <= gridRows - size; r++) {
      for (let c = 0; c <= gridCols - size * 2; c++) {
        positions.push([r, c]);
      }
    }
    shuffle(positions, rng);

    for (const [r, c] of positions) {
      if (placed >= targetPairs) break;
      if (isAvailable(r, c, size, size * 2)) {
        const color = interpolateColor(rng());
        drawCircle(r, c, size, color);
        drawCircle(r, c + size, size, color);
        markFilled(r, c, size, size * 2);
        placed++;
      }
    }
    return placed;
  }

  const bigPairArea = 2 * bigCircleSize * bigCircleSize;
  const mediumPairArea = 2 * mediumCircleSize * mediumCircleSize;
  const bigTargetPairs = Math.floor(
    (totalCells * targetBigPercentage) / bigPairArea
  );
  const mediumTargetPairs = Math.floor(
    (totalCells * targetMediumPercentage) / mediumPairArea
  );

  placeCirclePairs(bigCircleSize, bigTargetPairs);
  placeCirclePairs(mediumCircleSize, mediumTargetPairs);

  // Fill remaining cells with small circles
  const colorCache = interpolateColor(rng());
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      if (!grid[r][c]) {
        drawCircle(r, c, smallCircleSize, interpolateColor(rng()));
        grid[r][c] = true;
      }
    }
  }

  return circles;
}

function rgba([r, g, b, a]: number[]): string {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

function seedRandom(seed: number): () => number {
  let x = Math.sin(seed) * 10000;
  return () => {
    x = Math.sin(x) * 10000;
    return x - Math.floor(x);
  };
}

function shuffle<T>(array: T[], rng: () => number): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
