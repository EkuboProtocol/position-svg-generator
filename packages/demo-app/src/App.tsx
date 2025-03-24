import { generateSvg } from "@ekubo/position-svg-generator";
import { SVG_EXAMPLES } from "./constants/examples";

function App() {
  return (
    <div>
      <h1>Ekubo positions SVG examples</h1>

      <div>
        {SVG_EXAMPLES.map((example) => {
          return (
            <div key={example.title}>
              <h3 style={{ marginBottom: 0 }}>{example.title}</h3>

              <div
                dangerouslySetInnerHTML={{
                  __html: generateSvg(
                    example.args[0],
                    example.args[1],
                    example.args[2]
                  ),
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
