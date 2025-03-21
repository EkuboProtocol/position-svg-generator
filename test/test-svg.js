// Simple test script to view the SVG output

const fs = require('fs');
const path = require('path');

// Import the generateSvg function - this will work after we build
// const { generateSvg } = require('../dist');

// For now, let's use the examples from the source code
const examples = [
  {
    name: "Regular CL position",
    id: 223320167715534864472942017120693447232n,
    chainId: "1",
    metadata: {
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
    }
  },
  {
    name: "Full range position",
    id: 223320167715534864472942017120693447232n,
    chainId: "1",
    metadata: {
      lower_bound: "-88722835",
      upper_bound: "88722835",
      token0Symbol: "ETH",
      token1Symbol: "USDC",
      token0Address: "0x0000000000000000000000000000000000000000",
      token1Address: "0Xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      fee: "9223372036854775",
      tick_spacing: "0",
      extension: undefined,
      minted_timestamp: "1742502815000",
    }
  },
  {
    name: "TWAMM position",
    id: 223320167715534864472942017120693447232n,
    chainId: "11155111",
    metadata: {
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
    }
  },
  {
    name: "Oracle position",
    id: 283420062935785082055505916173879047197n,
    chainId: "1",
    metadata: {
      lower_bound: "-88722835",
      upper_bound: "88722835",
      token0Symbol: "ETH",
      token1Symbol: "EKUBO",
      token0Address: "0x0000000000000000000000000000000000000000",
      token1Address: "0X4c46e830bb56ce22735d5d8fc9cb90309317d0f",
      fee: "0",
      tick_spacing: "0",
      extension: "ORACLE",
      minted_timestamp: "1742502815000",
    }
  }
];

// We'll build the project and then run this script to test the SVG output
console.log("Please run 'npm run build' and then 'node test/test-svg.js' to test the SVG output");
