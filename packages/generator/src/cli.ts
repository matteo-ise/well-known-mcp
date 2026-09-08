#!/usr/bin/env node

import inquirer from 'inquirer';
import { generateMcpJson, templates } from './index.js';
import path from 'path';

async function main() {
  const args = process.argv.slice(2);
  if (args[0] !== 'init') {
    console.error("Usage: npx @well-known-mcp/generator init");
    process.exit(1);
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Welches Template möchtest du verwenden?',
      choices: ['steuerberater', 'onlineshop', 'saas', 'bank', 'custom']
    }
  ]);

  let data: any;

  if (answers.template === 'custom') {
    const customAnswers = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Organisationsname:' },
      { type: 'input', name: 'description', message: 'Beschreibung:' },
      { type: 'input', name: 'url', message: 'MCP Endpoint URL:' },
      { type: 'list', name: 'transport', message: 'Transport Protocol:', choices: ['streamable-http', 'stdio', 'websocket'] },
      { type: 'list', name: 'authentication', message: 'Authentication:', choices: ['none', 'api-key', 'oauth2'] }
    ]);
    
    data = {
      version: "1.0",
      name: customAnswers.name,
      description: customAnswers.description,
      endpoints: [
        {
          url: customAnswers.url,
          transport: customAnswers.transport,
          authentication: customAnswers.authentication
        }
      ]
    };
  } else {
    data = templates[answers.template];
  }

  const outputPath = path.resolve(process.cwd(), 'mcp.json');
  generateMcpJson(data, outputPath);
  console.log(`✅ mcp.json generiert in ${outputPath}`);
}

main().catch(console.error);
