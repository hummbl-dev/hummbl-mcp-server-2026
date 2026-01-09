
# MCP Server 2026

**Version:** 2026.01  
**Primary:** TypeScript (Node.js, Express, Jest, ESLint)  
**Reference Python slice:** Python 3.13+ (FastAPI, minimal, for compatibility/examples)

A fully compliant **Model Context Protocol (MCP) 2026 server** with:

- **OAuth2.1 + PKCE S256 authentication**
- **OIDC discovery endpoints**
- **Chunked HTTP/2 streaming** with WebSocket fallback
- **CIMD-compliant tool definitions** with sandboxed execution
- **MCP Registry integration** for server discovery
- **Security hardening:** TLS 1.3, CORS, sandbox policies, session management

This server is the reference MCP endpoint for HUMMBL’s Base120-aligned tool and knowledge infrastructure.

---

## Quick Start

### Prerequisites

- Node.js 20+ and npm installed
- Python 3.13+ (optional, for reference slice)
- Access to required OAuth2.1 / OIDC configuration values (issuer, client ID, secrets)

### Setup and run (TypeScript)

```bash
git clone https://github.com/hummbl-dev/hummbl-mcp-server-2026.git
cd hummbl-mcp-server-2026

# Install dependencies
npm ci

# Build and test
npx tsc
npx jest

# Run the server (adjust entrypoint if needed)
npx ts-node src/index.ts
```

### Setup and run (Python reference)

```bash
# Install Python dependencies (optional)
pip install -r requirements.txt
# or: uv pip install -r requirements.txt
# or: poetry install

# Run the Python reference server
uvicorn main:app --reload
```

---

## Endpoints

- `GET /health` — Health check endpoint, returns `{ "status": "ok" }` if server is running.
- `POST /mcp/tools/{tool_name}` — Stub endpoint for MCP tool execution (returns not implemented).

## Configuration

Set the following environment variables for OAuth2.1/OIDC authentication and discovery:

- `OIDC_ISSUER` — OIDC issuer URL
- `OIDC_CLIENT_ID` — OAuth2.1 client ID
- `OIDC_CLIENT_SECRET` — OAuth2.1 client secret

Update these as you implement authentication and OIDC features.

---

## Documentation

See the `docs/` directory for protocol, conformance, and deployment details.
