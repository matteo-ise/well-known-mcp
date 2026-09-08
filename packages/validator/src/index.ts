import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(__dirname, '../../../spec/mcp-discovery.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateSchema = ajv.compile(schema);

export interface ValidationResult {
  valid: boolean;
  errors?: any[];
  data?: any;
}

export async function validateUrl(url: string): Promise<ValidationResult> {
  try {
    const targetUrl = new URL(url);
    if (!targetUrl.pathname.endsWith('.well-known/mcp.json')) {
      targetUrl.pathname = path.posix.join(targetUrl.pathname, '.well-known/mcp.json');
    }
    
    const response = await fetch(targetUrl.toString());
    if (!response.ok) {
      return { valid: false, errors: [{ message: `HTTP Error: ${response.status} ${response.statusText}` }] };
    }
    
    const data = await response.json();
    return validateData(data);
  } catch (err: any) {
    return { valid: false, errors: [{ message: err.message }] };
  }
}

export function validateData(data: any): ValidationResult {
  const valid = validateSchema(data);
  if (!valid) {
    return { valid: false, errors: validateSchema.errors };
  }
  return { valid: true, data };
}
