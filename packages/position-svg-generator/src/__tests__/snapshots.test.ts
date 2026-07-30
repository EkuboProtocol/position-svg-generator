import { describe, it, expect } from 'vitest';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import {
  generatePositionSvg,
  generateDCAOrderSvg,
  generateAuctionOrderSvg,
  generateLimitOrderSvg,
} from '../index';

// Import examples from demo app
// Since we're in a monorepo, we can reference the demo app examples directly
import { 
  SVG_POSITION_EXAMPLES, 
  SVG_DCA_ORDER_EXAMPLES, 
  SVG_AUCTION_ORDER_EXAMPLES,
  SVG_LIMIT_ORDER_EXAMPLES 
} from '../../../demo-app/src/constants/examples';

const SNAPSHOTS_DIR = join(__dirname, '..', '..', 'snapshots');

// Ensure snapshots directory exists
function ensureSnapshotsDir() {
  try {
    mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist, ignore error
  }
}

describe('SVG Generator Snapshots', () => {
  describe('Position SVGs', () => {
    SVG_POSITION_EXAMPLES.forEach((example, index) => {
      it(`should generate position SVG snapshot ${index + 1}: ${example.title}`, async () => {
        ensureSnapshotsDir();
        
        const [chainId, metadata] = example.args;
        const tokenId = BigInt(index + 1); // Use index as token ID for consistency
        
        const svg = await generatePositionSvg(tokenId, chainId, metadata);
        
        // Save as snapshot file
        const filename = `position-${index + 1}-${example.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.svg`;
        const filepath = join(SNAPSHOTS_DIR, filename);
        writeFileSync(filepath, svg);
        
        // Basic validation that SVG was generated
        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
        expect(svg).toContain(metadata.token0Symbol || 'undefined');
        expect(svg).toBeTruthy();

        if (metadata.type === 've33') {
          expect(svg).toContain('<tspan font-style="italic">Dyn.</tspan>');
          expect(svg).toMatch(/>\s*ve33\s*<\/text>/);
        }
      });
    });
  });

  describe('DCA Order SVGs', () => {
    SVG_DCA_ORDER_EXAMPLES.forEach((example, index) => {
      it(`should generate DCA order SVG snapshot ${index + 1}`, async () => {
        ensureSnapshotsDir();
        
        const [chainId, metadata] = example.args;
        const orderId = BigInt(index + 1); // Use index as order ID for consistency
        
        const svg = await generateDCAOrderSvg(orderId, chainId, metadata);
        
        // Save as snapshot file
        const filename = `dca-order-${index + 1}.svg`;
        const filepath = join(SNAPSHOTS_DIR, filename);
        writeFileSync(filepath, svg);
        
        // Basic validation that SVG was generated
        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
        expect(svg).toContain('DCA Order');
        expect(svg).toBeTruthy();
      });
    });
  });

  describe('Auction Order SVGs', () => {
    SVG_AUCTION_ORDER_EXAMPLES.forEach((example, index) => {
      it(`should generate auction order SVG snapshot ${index + 1}`, async () => {
        ensureSnapshotsDir();
        
        const [chainId, metadata] = example.args;
        const orderId = BigInt(index + 1); // Use index as order ID for consistency
        
        const svg = await generateAuctionOrderSvg(orderId, chainId, metadata);
        
        // Save as snapshot file
        const filename = `auction-order-${index + 1}.svg`;
        const filepath = join(SNAPSHOTS_DIR, filename);
        writeFileSync(filepath, svg);
        
        // Basic validation that SVG was generated
        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
        expect(svg).toContain('Auction');
        expect(svg).toBeTruthy();
      });
    });
  });

  describe('Limit Order SVGs', () => {
    SVG_LIMIT_ORDER_EXAMPLES.forEach((example, index) => {
      it(`should generate limit order SVG snapshot ${index + 1}`, async () => {
        ensureSnapshotsDir();
        
        const [chainId, metadata] = example.args;
        const orderId = BigInt(index + 1); // Use index as order ID for consistency
        
        const svg = await generateLimitOrderSvg(orderId, chainId, metadata);
        
        // Save as snapshot file
        const filename = `limit-order-${index + 1}.svg`;
        const filepath = join(SNAPSHOTS_DIR, filename);
        writeFileSync(filepath, svg);
        
        // Basic validation that SVG was generated
        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
        expect(svg).toContain('Limit Order');
        expect(svg).toBeTruthy();
      });
    });
  });
});
