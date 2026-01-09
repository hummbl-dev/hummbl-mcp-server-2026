// CLI entrypoint for schema integrity check
if (require.main === module && process.argv.includes('--check-schema')) {
  try {
    assertSchemaIntegrity();
    // eslint-disable-next-line no-console
    console.log('Schema integrity check passed.');
    process.exit(0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Schema integrity check failed:', err);
    process.exit(1);
  }
}
import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { MCPError, MCPErrorCode } from "../types/errors";
import { MCPTool } from "../types/tool";

/**
 * AJV INSTANCE — STRICT, NO COERCION
 */
const ajv = new Ajv({
  strict: true,
  allErrors: true,
  allowUnionTypes: false,
  coerceTypes: false,
  removeAdditional: false,
  useDefaults: false,
  validateFormats: true,
});

addFormats(ajv);

/**
 * Load canonical tool schema (single source of truth)
 */
const TOOL_SCHEMA_PATH = resolve(
/* global process */
  process.cwd(),
  "tools/schema/tool.schema.json"
);

const toolSchema = JSON.parse(
  readFileSync(TOOL_SCHEMA_PATH, "utf-8")
);

/**
 * Compile validator at startup (FAIL FAST)
 */
const validateToolFn: ValidateFunction<MCPTool> =
  ajv.compile<MCPTool>(toolSchema);

/**
 * Validate a tool definition.
 * Throws MCPError on failure.
 */
export function validateTool(tool: unknown): asserts tool is MCPTool {
  const valid = validateToolFn(tool);

  if (!valid) {
    throw new MCPError(
      MCPErrorCode.SCHEMA_VIOLATION,
      "Tool schema validation failed",
      formatAjvErrors(validateToolFn.errors)
    );
  }
}

/**
 * Validate arbitrary payload against a provided JSON schema.
 * Used for invocation-time argument validation.
 */
export function validatePayload(
  schema: object,
  payload: unknown
): void {
  const fn = ajv.compile(schema);
  const valid = fn(payload);

  if (!valid) {
    throw new MCPError(
      MCPErrorCode.SCHEMA_VIOLATION,
      "Payload schema validation failed",
      formatAjvErrors(fn.errors)
    );
  }
}

/**
 * Normalize AJV errors into structured diagnostics
 */
function formatAjvErrors(
  errors: ErrorObject[] | null | undefined
): Array<{
  path: string;
  message: string;
}> {
  if (!errors) return [];

  return errors.map((err) => ({
    path: err.instancePath || err.schemaPath,
    message: err.message ?? "schema violation",
  }));
}

/**
 * Hard startup check.
 * Call once during server boot.
 */
export function assertSchemaIntegrity(): void {
  // Re-compile forces AJV to surface schema-level errors
  ajv.compile(toolSchema);
}
