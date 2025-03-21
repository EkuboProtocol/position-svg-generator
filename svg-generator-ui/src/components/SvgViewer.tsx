import React, { useState, useEffect } from 'react';
import { generateSvg } from '@ekubo/position-svg-generator';

// Example presets for demonstration purposes
const EXAMPLES = {
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
  }
};

type ExampleName = keyof typeof EXAMPLES;

const SvgViewer: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<ExampleName>("Regular CL Position");
  const [svgOutput, setSvgOutput] = useState<string>("");
  const [randomId, setRandomId] = useState<number>(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

  // Generate SVG when the selected example changes
  useEffect(() => {
    try {
      const example = EXAMPLES[selectedExample];
      const svg = generateSvg(example.id, example.chainId, example.metadata);
      setSvgOutput(svg);
    } catch (error) {
      console.error("Error generating SVG:", error);
      setSvgOutput(`<svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="134" height="134" fill="#f8d7da"/>
        <text x="67" y="67" font-size="12" text-anchor="middle" fill="#721c24">Error generating SVG</text>
      </svg>`);
    }
  }, [selectedExample]);

  // Generate SVG with random ID
  const generateWithRandomId = () => {
    try {
      const newRandomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      setRandomId(newRandomId);
      const example = EXAMPLES[selectedExample];
      const svg = generateSvg(newRandomId, example.chainId, example.metadata);
      setSvgOutput(svg);
    } catch (error) {
      console.error("Error generating SVG:", error);
    }
  };

  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExample(e.target.value as ExampleName);
  };

  return (
    <div>
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
        <button onClick={generateWithRandomId} style={{ marginLeft: '15px' }}>
          Generate with Random ID
        </button>
      </div>

      <div className="svg-preview">
        <div dangerouslySetInnerHTML={{ __html: svgOutput }} />
      </div>

      <div>
        <h3>Current Settings</h3>
        <p>Example: {selectedExample}</p>
        <p>ID: {randomId}</p>
      </div>
    </div>
  );
};

export default SvgViewer;
