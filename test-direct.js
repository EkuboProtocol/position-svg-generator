// Direct test script running from source using ts-node
const { execSync } = require('child_process');

// Run the test with ts-node to directly use the TypeScript source
console.log("Testing SVG generation directly from source...\n");

// Create a simple TypeScript file to test our SVG generator
const fs = require('fs');
fs.writeFileSync('test-svg.ts', `
import { generateSvg } from "./src/index";

// Test regular position
const regularSvg = generateSvg(223320167715534864472942017120693447232, "1", {
  lower_bound: "20045000",
  upper_bound: "20037000",
  token0Symbol: "ETH",
  token1Symbol: "USDC",
  token0Address: "0x0000000000000000000000000000000000000000",
  token1Address: "0Xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  fee: "9223372036854775",
  tick_spacing: "1000",
  extension: undefined,
  minted_timestamp: "1742502815000",
});

// Test TWAMM position
const twammSvg = generateSvg(223320167715534864472942017120693447232, "11155111", {
  lower_bound: "-88722835",
  upper_bound: "88722835",
  token0Symbol: "ETH",
  token1Symbol: "USDC",
  token0Address: "0x0000000000000000000000000000000000000000",
  token1Address: "0Xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  fee: "9223372036854775",
  tick_spacing: "0",
  extension: "TWAMM",
  minted_timestamp: "1742502815000",
});

// Print first 10 lines of each SVG to verify
console.log("Regular Position SVG (first 10 lines):");
console.log(regularSvg.split('\\n').slice(0, 10).join('\\n'));

console.log("\\nTWAMM Position SVG (first 10 lines):");
console.log(twammSvg.split('\\n').slice(0, 10).join('\\n'));

console.log("\\nSVG generation is working!");
`);

// Run the test with ts-node
try {
  execSync('npx ts-node test-svg.ts', { stdio: 'inherit' });
  console.log('\nTest completed successfully!');
} catch (error) {
  console.error('Test failed:', error.message);
}
