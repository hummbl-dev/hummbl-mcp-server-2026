import express from "express";
import { randomUUID } from "node:crypto";
import { MCPTool } from "./types/tool";
import { MCPResponse, MCPSuccessResponse } from "./types/response";
import { MCPError, MCPErrorCode } from "./types/errors";
import { validateTool, assertSchemaIntegrity } from "./validation/ajv";
import { logger } from "./logging";

const PROTOCOL_VERSION = "2026.1";

type ToolRegistry = Map<string, MCPTool>;
const tools: ToolRegistry = new Map();

export function createServer() {
  assertSchemaIntegrity();
  const app = express();
  app.use(express.json());

  app.use((req, _res, next) => {
    (req as any).requestId = randomUUID();
    next();
  });

  app.get("/mcp/handshake", (req, res) => {
    log(req, "handshake");
    const response: MCPSuccessResponse = {
      id: (req as any).requestId,
      protocol_version: PROTOCOL_VERSION,
      ok: true,
      result: {
        protocol_version: PROTOCOL_VERSION,
        capabilities: { tools: true, streaming: false }
      }
    };
    res.json(response);
  });

  app.get("/mcp/tools/list", (req, res) => {
    log(req, "tools.list");
    const response: MCPSuccessResponse<MCPTool[]> = {
      id: (req as any).requestId,
      protocol_version: PROTOCOL_VERSION,
      ok: true,
      result: Array.from(tools.values())
    };
    res.json(response);
  });

  app.use((err: unknown, req: any, res: any, _next: any) => {
    const mcpError =
      err instanceof MCPError
        ? err
        : new MCPError(
            MCPErrorCode.INTERNAL_ERROR,
            "Unhandled server error"
          );
    logger.error({
      requestId: req.requestId,
      code: mcpError.code,
      message: mcpError.message,
      details: mcpError.details
    });
    const response: MCPResponse = {
      id: req.requestId ?? "unknown",
      protocol_version: PROTOCOL_VERSION,
      ok: false,
      error: {
        code: mcpError.code,
        message: mcpError.message,
        details: mcpError.details
      }
    };
    res.status(400).json(response);
  });

  return { app, registerTool };
}

export function registerTool(tool: MCPTool) {
  validateTool(tool);
  if (tools.has(tool.name)) {
    throw new MCPError(
      MCPErrorCode.INVALID_REQUEST,
      `Tool already registered: ${tool.name}`
    );
  }
  tools.set(tool.name, tool);
}

function log(req: any, event: string) {
  logger.info({
    event,
    method: req.method,
    path: req.path,
    requestId: req.requestId
  });
}
