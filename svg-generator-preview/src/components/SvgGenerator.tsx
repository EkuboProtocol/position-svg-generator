import React, { useState, useEffect } from 'react';
import { generateSvg, PositionMetadata } from '../lib/svgGenerator';

// Example presets based on the console.log examples from index.ts
const EXAMPLES: Record<string, { id: number; chainId: string; metadata: PositionMetadata }> = {
  "Regular CL Position": {
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
      minted_timestamp: "1742502815000"
    }
  },
  "Full Range Position": {
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
      minted_timestamp: "1742502815000"
    }
  },
  "TWAMM Position": {
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
      extensio# Check if all files are in place
ls -la

# Install deps again to make sure everything is complete
npm install

# Start the development server
npm run dev
# Let's see what we have in the directory
ls -la

# Check if package.json is set up correctly
cat package.json

# Let's fix the problematic files
# First recreate SvgGenerator.tsx correctly
cat > src/components/SvgGenerator.tsx << 'EOF'
import React, { useState, useEffect } from 'react';
import { generateSvg, PositionMetadata } from '../lib/svgGenerator';

// Example presets based on the console.log examples from index.ts
const EXAMPLES: Record<string, { id: number; chainId: string; metadata: PositionMetadata }> = {
  "Regular CL Position": {
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
      minted_timestamp: "1742502815000"
    }
  },
  "Full Range Position": {
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
      minted_timestamp: "1742502815000"
    }
  },
  "TWAMM Position": {
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
      minted_timestamp: "1742502815000"
    }
  },
  "Oracle Position": {
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
      minted_timestamp: "1742502815000"
    }
  },
  "Custom Position": {
    id: 123456789,
    chainId: "1",
    metadata: {
      lower_bound: "10000000",
      upper_bound: "20000000",
      token0Symbol: "CUSTOM",
      token1Symbol: "TOKEN",
      token0Address: "0x0000000000000000000000000000000000000000",
      token1Address: "0x0000000000000000000000000000000000000000",
      fee: "500000000000000",
      tick_spacing: "10",
      minted_timestamp: Date.now().toString()
    }
  }
};

const defaultExample = "Regular CL Position";

const SvgGenerator: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(defaultExample);
  const [id, setId] = useState<number>(EXAMPLES[defaultExample].id);
  const [chainId, setChainId] = useState<string>(EXAMPLES[defaultExample].chainId);
  const [metadata, setMetadata] = useState<PositionMetadata>(EXAMPLES[defaultExample].metadata);
  const [svgOutput, setSvgOutput] = useState<string>("");
  const [customMetadata, setCustomMetadata] = useState<string>(JSON.stringify(EXAMPLES[defaultExample].metadata, null, 2));
  const [editMode, setEditMode] = useState<boolean>(false);

  // Generate SVG when component mounts or when params change
  useEffect(() => {
    try {
      const svg = generateSvg(id, chainId, metadata);
      setSvgOutput(svg);
    } catch (error) {
      console.error("Error generating SVG:", error);
      setSvgOutput(`<svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="134" height="134" fill="#f8d7da"/>
        <text x="67" y="67" font-size="12" text-anchor="middle" fill="#721c24">Error generating SVG</text>
      </svg>`);
    }
  }, [id, chainId, metadata]);

  // Handle example selection change
  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedExample(selected);
    setId(EXAMPLES[selected].id);
    setChainId(EXAMPLES[selected].chainId);
    setMetadata(EXAMPLES[selected].metadata);
    setCustomMetadata(JSON.stringify(EXAMPLES[selected].metadata, null, 2));
  };

  // Handle metadata editing
  const handleMetadataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomMetadata(e.target.value);
    try {
      const parsedMetadata = JSON.parse(e.target.value);
      setMetadata(parsedMetadata);
    } catch (error) {
      // Don't update metadata if JSON is invalid
      console.error("Invalid JSON:", error);
    }
  };

  // Handle ID change
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(Number(value));
  };

  // Handle chain ID change
  const handleChainIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChainId(value);
  };

  // Generate a random ID
  const generateRandomId = () => {
    const randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    setId(randomId);
  };

  return (
    <div className="svg-generator">
      <div className="controls">
        <div className="control-group">
          <label htmlFor="example-select">Select Example:</label>
          <select
            id="example-select"
            value={selectedExample}
            onChange={handleExampleChange}
          >
            {Object.keys(EXAMPLES).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="id-input">ID:</label>
          <input
            id="id-input"
            type="number"
            value={id}
            onChange={handleIdChange}
          />
          <button onClick={generateRandomId}>Random ID</button>
        </div>

        <div className="control-group">
          <label htmlFor="chain-id-input">Chain ID:</label>
          <input
            id="chain-id-input"
            type="text"
            value={chainId}
            onChange={handleChainIdChange}
          />
        </div>

        <div className="control-group">
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Hide Metadata Editor" : "Edit Metadata"}
          </button>
        </div>

        {editMode && (
          <div className="control-group">
            <textarea
              className="json-editor"
              value={customMetadata}
              onChange={handleMetadataChange}
              rows={15}
            />
          </div>
        )}
      </div>

      <div className="svg-preview">
        <div dangerouslySetInnerHTML={{ __html: svgOutput }} />
      </div>

      <div>
        <h2>SVG Code</h2>
        <textarea
          className="svg-code"
          readOnly
          value={svgOutput}
          rows={10}
        />
      </div>
    </div>
  );
};

export default SvgGenerator;
