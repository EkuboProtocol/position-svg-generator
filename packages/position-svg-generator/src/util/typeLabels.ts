export function getTypeDisplayLabel(type: "dca" | "oracle" | "full_range" | "mev_resist"): string {
  switch (type) {
    case "dca":
      return "DCA";
    case "oracle":
      return "Oracle";
    case "full_range":
      return "Full-range";
    case "mev_resist":
      return "MEV-resist";
  }
}
