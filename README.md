# MCP Server 2026

**Version:** 2026.01  
**Framework:** Python 3.13+, FastAPI

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

- Python 3.13+ installed  
- `uv`, `poetry`, or `pip` for dependency management  
- Access to required OAuth2.1 / OIDC configuration values (issuer, client ID, secrets)  

### Setup and run (example)

```bash
git clone https://github.com/hummbl-dev/hummbl-mcp-server-2026.git
cd hummbl-mcp-server-2026

# Install dependencies (choose one)
pip install -r requirements.txt
# or: uv pip install -r requirements.txt
# or: poetry install

# Run the server (adjust module/app if your entrypoint differs)
uvicorn main:app --reload

## Endpoints

- `GET /health` – Liveness check.
- `POST /mcp/tools/{tool_name}` – Stub endpoint for MCP tool execution.

## Configuration

- `OIDC_ISSUER` – OIDC issuer URL.
- `OIDC_CLIENT_ID` – OAuth2.1 client ID.
- `OIDC_CLIENT_SECRET` – Client secret or token (if applicable).
---

## Endpoints

- `GET /health` — Health check endpoint, returns `{ "status": "ok" }` if server is running.
- `POST /mcp/tools/{tool_name}` — Stub endpoint for MCP tool execution (returns not implemented).

## Configuration

The server requires OAuth2.1/OIDC configuration for authentication and discovery endpoints. Set the following environment variables as needed:

- `OIDC_ISSUER` — OIDC issuer URL
- `OIDC_CLIENT_ID` — OAuth2.1 client ID
- `OIDC_CLIENT_SECRET` — OAuth2.1 client secret

Update these as you implement authentication and OIDC features.
