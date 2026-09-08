import fs from 'fs';
import path from 'path';

export function generateMcpJson(data: any, outputPath: string) {
  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(outputPath, content, 'utf8');
}

export const templates: Record<string, any> = {
  steuerberater: {
    version: "1.0",
    name: "Steuerberater Muster GmbH",
    description: "DATEV und ELSTER Integrationen für KI Agenten.",
    endpoints: [
      {
        url: "https://api.muster-steuer.de/mcp",
        transport: "streamable-http",
        authentication: "oauth2"
      }
    ],
    capabilities: {
      tools: ["datev_upload", "elster_check"]
    }
  },
  onlineshop: {
    version: "1.0",
    name: "Muster Shop",
    description: "E-Commerce API für Produktsuche und Checkout.",
    endpoints: [
      {
        url: "https://shop.muster.de/mcp",
        transport: "streamable-http",
        authentication: "none"
      }
    ],
    capabilities: {
      tools: ["product_search", "add_to_cart", "checkout"]
    }
  },
  saas: {
    version: "1.0",
    name: "Muster SaaS",
    description: "SaaS API für Agenten.",
    endpoints: [
      {
        url: "https://api.muster-saas.com/mcp",
        transport: "websocket",
        authentication: "api-key"
      }
    ]
  },
  bank: {
    version: "1.0",
    name: "Muster Bank",
    description: "Banking API für Kontostand und Überweisungen.",
    endpoints: [
      {
        url: "https://api.muster-bank.de/mcp",
        transport: "streamable-http",
        authentication: "oauth2"
      }
    ]
  }
};
