#!/usr/bin/env node

// Simple script to run the TypeScript test file
const { execSync } = require('child_process');
const path = require('path');

console.log('Installing ts-node for direct TypeScript execution...');
execSync('npm install --no-save ts-node', { stdio: 'inherit' });

console.log('\nRunning the test script...');
execSync('npx ts-node test/test-svg.ts', { stdio: 'inherit' });

console.log('\nTest completed successfully!');
