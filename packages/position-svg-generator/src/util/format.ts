export function shortenAddress(address: string) {
  if (!address.startsWith("0x")) address = `0x${BigInt(address).toString(16)}`;
  return (
    address.slice(0, 4) +
    "\u2026" +
    address.slice(address.length - 2, address.length)
  );
}
