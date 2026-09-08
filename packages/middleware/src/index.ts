import fs from 'fs';
import path from 'path';

export interface McpDiscoveryOptions {
  configPath?: string;
  configData?: any;
}

export function serveMcpDiscovery(options: McpDiscoveryOptions) {
  let mcpData: any;

  if (options.configData) {
    mcpData = options.configData;
  } else if (options.configPath) {
    const fullPath = path.resolve(process.cwd(), options.configPath);
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      mcpData = JSON.parse(content);
    } catch (err) {
      console.error(`[well-known-mcp] Error reading config at ${fullPath}:`, err);
      mcpData = { error: "Configuration not found or invalid" };
    }
  } else {
    throw new Error("Must provide either configPath or configData to serveMcpDiscovery");
  }

  return (req: any, res: any, next: any) => {
    if (req.path === '/.well-known/mcp.json' || req.path === '/.well-known/mcp-server') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(mcpData);
    } else {
      next();
    }
  };
}
