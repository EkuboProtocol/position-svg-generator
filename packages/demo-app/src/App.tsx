import { generateSvg } from "@ekubo/position-svg-generator";
import { SVG_EXAMPLES } from "./constants/examples";
import { Fragment } from "react";

function randomBigIntFromBytes(byteLength: number) {
  const buf = new Uint8Array(byteLength);
  crypto.getRandomValues(buf);
  return buf.reduce((acc, b) => (acc << 8n) | BigInt(b), 0n);
}

const METADATA_OVERRIDES = [
  {},
  {
    token0Symbol: "WANLOG",
    token0Src:
      "https://assets.kraken.com/marketing/web/icons-uni-webp/s_anlog.webp?i=kds",
    token1Symbol: "EKUBO",
    token1Src:
      "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/634d9c36-2f0b-4781-93e6-72d701b5af00/logo",
  }, // Name Overflow
  {
    token0Symbol: undefined,
    token0Src: undefined,
    token0Address: "0x5Aa78dE756742a984027af7b870a7eC8655f789C",
  }, // One unknown token
  {
    token0Symbol: undefined,
    token0Src: undefined,

    token1Symbol: undefined,
    token1Src: undefined,
    token1Address: "0x5Aa78dE756742a984027af7b870a7eC8655f789C",
  }, // Two unknown token
] as const;

function App() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "80rem",
        padding: "0 1rem",
        margin: "0 auto",
      }}
    >
      <h1>Ekubo positions SVG examples</h1>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {SVG_EXAMPLES.map((example) => {
          return (
            <div
              key={example.title}
              style={{
                background: "#1D1D1D",
                borderRadius: "1rem",
                padding: "1rem",
                width: "100%",
              }}
            >
              <>
                <h2 style={{ marginBottom: 0, marginTop: 0 }}>
                  {example.title}
                </h2>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "grid",

                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(16rem , 1fr))",
                    gap: "3rem",
                  }}
                >
                  {Array(16)
                    .fill(null)
                    .map((_, index) => {
                      const randomTokenId = randomBigIntFromBytes(index + 1);
                      const override =
                        METADATA_OVERRIDES[index % METADATA_OVERRIDES.length];

                      return (
                        <Fragment key={index}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: generateSvg(
                                randomTokenId,
                                example.args[0],
                                { ...example.args[1], ...override }
                              ),
                            }}
                          />
                        </Fragment>
                      );
                    })}
                </div>
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
