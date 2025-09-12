export function getTypeDisplayLabel(type: "dca" | "oracle" | "full_range" | "mev_capture"): string {
  switch (type) {
    case "dca":
      return "DCA";
    case "oracle":
      return "Oracle";
    case "full_range":
      return "Full-range";
    case "mev_capture":
      return "MEV-capture";
  }
}
