import Decimal from "decimal.js-light";

export function feeToPercent(fee: bigint) {
  return Number(
    new Decimal(fee.toString() ?? 0)
      .div(new Decimal(2).pow(64))
      .toSignificantDigits(5)
      .toString()
  ).toLocaleString("en-US");
}

const BASE = new Decimal(1.000001);

export function spacingToPercent(tickSpacing: number) {
  return Number(
    BASE.pow(tickSpacing ?? 0)
      .sub(1)
      .toSignificantDigits(5)
  ).toLocaleString("en-US");
}

export function shortenAddress(address: string) {
  if (!address.startsWith("0x")) address = `0x${BigInt(address).toString(16)}`;
  return (
    address.slice(0, 4) +
    "\u2026" +
    address.slice(address.length - 2, address.length)
  );
}
