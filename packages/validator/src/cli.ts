#!/usr/bin/env node

import { validateUrl } from './index.js';

const url = process.argv[2];

if (!url) {
  console.error("Usage: npx @well-known-mcp/validator <url>");
  process.exit(1);
}

validateUrl(url).then(result => {
  if (result.valid) {
    console.log("✅ Valid mcp.json found!");
    console.log(JSON.stringify(result.data, null, 2));
    process.exit(0);
  } else {
    console.error("❌ Validation failed:");
    console.error(JSON.stringify(result.errors, null, 2));
    process.exit(1);
  }
});
