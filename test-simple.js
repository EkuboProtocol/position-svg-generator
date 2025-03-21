// Import the library (after build)
const { generateSvg } = require('./dist/index.js');

// Define a few examples
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

// Build the project first
console.log("Building project...");
require('child_process').execSync('npm run build', { stdio: 'inherit' });

// Print a sample of each SVG
examples.forEach((example, i) => {
  console.log(`\n\n==== Example ${i+1}: ${example.name} ====\n`);
  
  // Generate the SVG
  const svg = generateSvg(Number(example.id), example.chainId, example.metadata);
  
  // Print the first few lines to see the structure
  console.log(svg.split('\n').slice(0, 15).join('\n') + '\n...\n');
});

console.log("\nTest completed! The SVG generation is working.");
