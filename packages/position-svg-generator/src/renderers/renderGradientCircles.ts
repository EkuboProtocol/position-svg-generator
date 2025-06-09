import { SVG_HEIGHT, SVG_WIDTH } from "../constants/svg";
import { PositionMetadata } from "../types";
import { gradientBlurId } from "./renderDefs";

export function renderGradientCircles(type: PositionMetadata["type"]) {
  return `
  <g clip-path="url(#innerRectClip)">
    <circle cx="${SVG_WIDTH / 5}" cy="${0}" r="${
    SVG_WIDTH / 2.5
  }" fill="#661CC466" filter="url(#${gradientBlurId})"/>

    <circle cx="${SVG_WIDTH / 1.2}" cy="${SVG_HEIGHT * 0.9}" r="${
    SVG_WIDTH / 2
  }" fill="${
    type === "DCA"
      ? "#9D5AF266"
      : type === "Oracle"
      ? "#dee06044"
      : type === "Mev-resist"
      ? "#DF7B3266"
      : type === "Full-range"
      ? "#26E8AD66"
      : "#EB1E7466"
  }" filter="url(#${gradientBlurId})"/>
  </g>`;
}
