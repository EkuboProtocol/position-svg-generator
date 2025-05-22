"use client";

import {
  generateDCAOrderSvg,
  generateLimitOrderSvg,
  generatePositionSvg,
} from "@ekubo/position-svg-generator";
import {
  SVG_DCA_ORDER_EXAMPLES,
  SVG_LIMIT_ORDER_EXAMPLES,
  SVG_POSITION_EXAMPLES,
} from "./constants/examples";
import { useQuery } from "@tanstack/react-query";

function randomBigIntFromBytes(byteLength: number) {
  const buf = new Uint8Array(byteLength);
  crypto.getRandomValues(buf);
  return buf.reduce((acc, b) => (acc << 8n) | BigInt(b), 0n);
}

const POSITION_METADATA_OVERRIDES = [
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

    formattedMinPrice: undefined,
    formattedMaxPrice: undefined,
  }, // One unknown token
  {
    token0Symbol: undefined,
    token0Src: undefined,
    token0Address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

    token1Symbol: undefined,
    token1Src: undefined,
    token1Address: "0x5Aa78dE756742a984027af7b870a7eC8655f789C",

    formattedMinPrice: undefined,
    formattedMaxPrice: undefined,
  }, // Two unknown token
] as const;

function PositionSVG({
  tokenId,
  chainId,
  queryKey,
  args,
}: {
  tokenId: bigint;
  queryKey: string;
  chainId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any;
}) {
  const { data: svgString } = useQuery({
    queryFn: async () => {
      const result = await generatePositionSvg(tokenId, chainId, args);
      return result;
    },
    queryKey: [queryKey],
  });

  if (!svgString) {
    return (
      <div style={{ height: "250px", width: "250px", background: "#101010" }} />
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svgString,
      }}
    />
  );
}

function DCAOrderSVG({
  tokenId,
  chainId,
  args,
}: {
  tokenId: bigint;
  chainId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any;
}) {
  const { data: svgString } = useQuery({
    queryFn: async () => {
      const result = await generateDCAOrderSvg(tokenId, chainId, args);
      return result;
    },
    queryKey: [tokenId.toString()],
  });

  if (!svgString) {
    return (
      <div style={{ height: "250px", width: "250px", background: "#101010" }} />
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svgString,
      }}
    />
  );
}

function LimitOrderSVG({
  tokenId,
  chainId,
  args,
}: {
  tokenId: bigint;
  chainId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any;
}) {
  const { data: svgString } = useQuery({
    queryFn: async () => {
      const result = await generateLimitOrderSvg(tokenId, chainId, args);
      return result;
    },
    queryKey: [tokenId.toString()],
  });

  if (!svgString) {
    return (
      <div style={{ height: "250px", width: "250px", background: "#101010" }} />
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svgString,
      }}
    />
  );
}

function App() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "80rem",
        padding: "1rem",
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
        {SVG_POSITION_EXAMPLES.map((example) => {
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
                        POSITION_METADATA_OVERRIDES[
                          index % POSITION_METADATA_OVERRIDES.length
                        ];

                      return (
                        <PositionSVG
                          key={`${example.title}-${index}`}
                          queryKey={`${example.title}-${index}`}
                          tokenId={randomTokenId}
                          chainId={example.args[0]}
                          args={{ ...example.args[1], ...override }}
                        />
                      );
                    })}
                </div>
              </>
            </div>
          );
        })}

        <div
          style={{
            background: "#1D1D1D",
            borderRadius: "1rem",
            padding: "1rem",
            width: "100%",
          }}
        >
          <h2 style={{ marginBottom: 0, marginTop: 0 }}>DCA Orders</h2>

          <div
            style={{
              marginTop: "1rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(16rem , 1fr))",
              gap: "3rem",
            }}
          >
            {SVG_DCA_ORDER_EXAMPLES.map((example, index) => {
              const randomTokenId = randomBigIntFromBytes(index + 1);

              return (
                <DCAOrderSVG
                  tokenId={randomTokenId}
                  chainId={example.args[0]}
                  args={example.args[1]}
                />
              );
            })}
          </div>
        </div>

        <div
          style={{
            background: "#1D1D1D",
            borderRadius: "1rem",
            padding: "1rem",
            width: "100%",
          }}
        >
          <h2 style={{ marginBottom: 0, marginTop: 0 }}>Limit Orders</h2>

          <div
            style={{
              marginTop: "1rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(16rem , 1fr))",
              gap: "3rem",
            }}
          >
            {SVG_LIMIT_ORDER_EXAMPLES.map((example, index) => {
              const randomTokenId = randomBigIntFromBytes(index + 1);

              return (
                <LimitOrderSVG
                  tokenId={randomTokenId}
                  chainId={example.args[0]}
                  args={example.args[1]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
