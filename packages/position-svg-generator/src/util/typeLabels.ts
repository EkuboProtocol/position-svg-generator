import { PositionMetadata } from "../types";

export function getTypeDisplayLabel(type: PositionMetadata["type"]): string {
  switch (type) {
    case "dca":
      return "DCA";
    case "oracle":
      return "Oracle";
    case "boosted_fees":
      return "Boosted Fees";
    case "mev_capture":
      return "MEV-capture";
  }
}
