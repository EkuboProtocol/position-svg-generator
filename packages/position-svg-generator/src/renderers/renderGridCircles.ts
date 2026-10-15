import prand from "pure-rand";

const GRID_SETTINGS = [
  [12, 7, 4, 2],
  [24, 14, 6, 3],
  [36, 21, 8, 4],
  [48, 28, 10, 5],
] as const;

export function renderGridCircles({
  tokenId,
  chainId,
  canvasWidth,
  fgColor1,
  fgColor2,
  xOffset = 0,
  yOffset = 0,
}: {
  tokenId: bigint;
  chainId: string;
  canvasWidth: number;
  fgColor1: [number, number, number, number];
  fgColor2: [number, number, number, number];
  randomSeed?: number;
  xOffset?: number;
  yOffset?: number;
}): string {
  const idNum = Number(tokenId % BigInt(Number.MAX_SAFE_INTEGER));
  let generator = prand.xoroshiro128plus(Number(chainId));
  generator = prand.xoroshiro128plus(
    idNum + prand.unsafeUniformIntDistribution(0, 2 ** 32 - idNum, generator),
  );

  const rng = () =>
    prand.unsafeUniformIntDistribution(0, 0xffffffff, generator) / 0x100000000;

  const settings = GRID_SETTINGS.slice();
  shuffle(settings, rng);
  const [gridCols, gridRows, maxBigSize, maxIntermediates] = settings[0];

  const cellSize = canvasWidth / gridCols;
  const canvasHeight = cellSize * gridRows;
  const totalCells = gridCols * gridRows;

  const smallCircleSize = 1;
  const minBigSize = Math.min(2, maxBigSize);
  const bigCircleSize =
    Math.floor(rng() * (maxBigSize - minBigSize + 1)) + minBigSize;

  const available = Array.from(
    { length: bigCircleSize - smallCircleSize - 1 },
    (_, i) => i + smallCircleSize + 1,
  );
  const circleSizes = [
    ...pickIntermediateSizes(available, maxIntermediates),
    bigCircleSize,
  ];

  type CircleType = {
    size: number;
    pairArea: number;
    maxPairs: number;
    validPositions: [number, number][];
    targetPairs: number;
    placedPairs: number;
  };

  const circleTypes: CircleType[] = circleSizes.map((size) => {
    const pairArea = 2 * size * size;
    const maxByArea = Math.floor(totalCells / pairArea);
    const maxByGrid =
      Math.floor(gridCols / (size * 2)) * Math.floor(gridRows / size);
    const maxPairs = Math.min(maxByArea, maxByGrid);

    const positions: [number, number][] = [];
    for (let r = 0; r <= gridRows - size; r++) {
      for (let c = 0; c <= gridCols - size * 2; c++) {
        positions.push([r, c]);
      }
    }

    return {
      size,
      pairArea,
      maxPairs,
      validPositions: positions,
      targetPairs: 0,
      placedPairs: 0,
    };
  });

  const totalPossibleArea = circleTypes.reduce(
    (sum, ct) => sum + ct.maxPairs * ct.pairArea,
    0,
  );
  const totalAreaToFill = Math.min(totalPossibleArea, totalCells);
  const areaPerType =
    circleTypes.length > 0 ? totalAreaToFill / circleTypes.length : 0;

  circleTypes.forEach((ct) => {
    let target = Math.max(1, Math.floor(areaPerType / ct.pairArea));
    ct.targetPairs = Math.min(target, ct.maxPairs);
  });

  const grid: boolean[][] = Array.from({ length: gridRows }, () =>
    Array(gridCols).fill(false),
  );
  const placements: Array<[number, number, number, number, number]> = [];

  function tryPlacePair(ct: CircleType) {
    shuffle(ct.validPositions, rng);
    for (const [r, c] of [...ct.validPositions]) {
      if (isAvailable(r, c, ct.size, ct.size * 2)) {
        markFilled(r, c, ct.size, ct.size * 2);
        circleTypes.forEach((other) => {
          other.validPositions = other.validPositions.filter(([rr, cc]) =>
            isAvailable(rr, cc, other.size, other.size * 2),
          );
        });
        placements.push([r, c, r, c + ct.size, ct.size]);
        return true;
      }
    }
    return false;
  }

  circleTypes.forEach((ct) => {
    if (ct.targetPairs > 0 && tryPlacePair(ct)) {
      ct.placedPairs++;
    }
  });

  let placing = true;
  while (placing) {
    placing = false;
    circleTypes.forEach((ct) => {
      if (ct.placedPairs < ct.targetPairs && tryPlacePair(ct)) {
        ct.placedPairs++;
        placing = true;
      }
    });
  }

  for (const [r1, c1, r2, c2] of pairUpEmptyCells(grid)) {
    placements.push([r1, c1, r2, c2, smallCircleSize]);
  }

  let circles = "";

  function interpolateColor(c1: number[], c2: number[], t: number): string {
    const [r, g, b, a] = [
      c1[0] + (c2[0] - c1[0]) * t,
      c1[1] + (c2[1] - c1[1]) * t,
      c1[2] + (c2[2] - c1[2]) * t,
      c1[3] + (c2[3] - c1[3]) * t,
    ];
    return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
  }

  function drawCircle(row: number, col: number, size: number, color: string) {
    const cx = (col + size / 2) * cellSize + xOffset;
    const cy = canvasHeight - (row + size / 2) * cellSize + yOffset;
    const r = (cellSize * size) / 2;
    circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>\n`;
  }

  function isAvailable(
    row: number,
    col: number,
    h: number,
    w: number,
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

  const total = placements.length;
  const palette = Array.from({ length: total }, (_, i) =>
    interpolateColor(fgColor1, fgColor2, total > 1 ? i / (total - 1) : 0.5),
  );
  shuffle(palette, rng);
  placements.forEach((pl, idx) => {
    const [r1, c1, r2, c2, size] = pl;
    const color = palette[idx];
    drawCircle(r1, c1, size, color);
    if (r1 !== r2 || c1 !== c2) drawCircle(r2, c2, size, color);
  });

  return circles;
}

function pickIntermediateSizes(
  available: number[],
  maxIntermediates: number,
): number[] {
  if (available.length === 0 || maxIntermediates <= 0) return [];
  if (available.length <= maxIntermediates) return [...available];

  const step = available.length / maxIntermediates;
  return Array.from(
    { length: maxIntermediates },
    (_, i) => available[Math.floor(i * step)],
  );
}

function pairUpEmptyCells(
  grid: boolean[][],
): Array<[number, number, number, number]> {
  const empty: [number, number][] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (!grid[r][c]) empty.push([r, c]);
    }
  }

  const pairs: Array<[number, number, number, number]> = [];
  for (let i = 0; i < empty.length; i += 2) {
    const [r1, c1] = empty[i];
    const [r2, c2] = empty[i + 1] ?? empty[i];
    grid[r1][c1] = true;
    grid[r2][c2] = true;
    pairs.push([r1, c1, r2, c2]);
  }
  return pairs;
}

function shuffle<T>(arr: T[], rngFn: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rngFn() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
