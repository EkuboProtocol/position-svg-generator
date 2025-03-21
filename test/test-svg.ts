// Import directly from source
import { generateSvg } from "../src/index";
import fs from "fs";
import path from "path";

// Import the PositionMetadata type to ensure we're using proper types
interface PositionMetadata {
  lower_bound: string;
  upper_bound: string;
  token0Symbol: string;
  token1Symbol: string;
  token0Address: string;
  token1Address: string;
  fee: string;
  tick_spacing: string;
  extension?: "TWAMM" | "ORACLE" | "UNKNOWN";
  minted_timestamp: string;
}

// Examples
const examples: Array<{
  name: string;
  id: number;
  chainId: string;
  metadata: PositionMetadata;
}> = [
  {
    name: "Regular CL position",
    id: 223320167715534864472942017120693447232,
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
    id: 223320167715534864472942017120693447232,
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
    id: 223320167715534864472942017120693447232,
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
    id: 283420062935785082055505916173879047197,
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

// Create an output directory
const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create an HTML file to view all SVGs
let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Ekubo Position SVG Previews</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .position { margin-bottom: 30px; border: 1px solid #eee; padding: 15px; border-radius: 10px; }
    h1 { color: #333; }
    h2 { color: #555; }
    .svg-container { margin-top: 15px; }
  </style>
</head>
<body>
  <h1>Ekubo Position SVG Previews</h1>
`;

// Generate SVGs for each example
examples.forEach((example, index) => {
  console.log(`Generating SVG for ${example.name}...`);
  
  // Generate the SVG
  const svg = generateSvg(Number(example.id), example.chainId, example.metadata);
  
  // Save the SVG to a file
  const fileName = `position-${index + 1}.svg`;
  fs.writeFileSync(path.join(outputDir, fileName), svg);
  
  // Add to HTML
  htmlContent += `
  <div class="position">
    <h2>${example.name}</h2>
    <div class="svg-container">
      ${svg}
    </div>
  </div>
  `;
});

// Finish the HTML file
htmlContent += `
</body>
</html>
`;

// Save the HTML file
fs.writeFileSync(path.join(outputDir, "index.html"), htmlContent);

console.log("Done! SVGs and preview HTML have been generated in the test/output directory.");
