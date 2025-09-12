# SVG Snapshots

This directory contains snapshot tests for the SVG generator functions. These snapshots are generated automatically by the test suite and allow for visual review of changes to the SVG output on GitHub.

## Files

### Position SVGs (5 examples)
- `position-1-regular-cl-position-with-fees-and-tickspacing.svg` - Regular CL position with fees and tickspacing
- `position-2-full-range-position-with-no-extension.svg` - Full range position with no extension
- `position-3-twamm-position.svg` - TWAMM position
- `position-4-oracle-position.svg` - Oracle position
- `position-5-mev-capture-position.svg` - MEV-capture position

### DCA Order SVGs (4 examples)
- `dca-order-1.svg` - DCA order with both token symbols and images
- `dca-order-2.svg` - DCA order with sell token only
- `dca-order-3.svg` - DCA order with buy token only
- `dca-order-4.svg` - DCA order with no token symbols or images

### Limit Order SVGs (4 examples)
- `limit-order-1.svg` - Limit order with both token symbols and images
- `limit-order-2.svg` - Limit order with sell token only
- `limit-order-3.svg` - Limit order with buy token only
- `limit-order-4.svg` - Limit order with no token symbols or images

## Generating Snapshots

To regenerate all snapshots, run:

```bash
npm run test:snapshots
```

Or to run all tests including snapshots:

```bash
npm test
```

## Review Process

When changes are made to the SVG generator code, these snapshot files will show the visual differences in GitHub pull requests, making it easy to review the impact of changes on the generated SVGs.
