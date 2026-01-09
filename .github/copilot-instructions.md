# Copilot Instructions for MCP Server 2026

## Project Overview
- **Purpose:** Implements a Model Context Protocol (MCP) 2026-compliant server for HUMMBL’s Base120-aligned tool and knowledge infrastructure.
- **Core stack:** Python 3.13+, FastAPI, OAuth2.1/OIDC, HTTP/2, WebSockets, CIMD tools, TLS 1.3.
- **Key features:**
  - OAuth2.1 + PKCE S256 authentication
  - OIDC discovery endpoints
  - Chunked HTTP/2 streaming (with WebSocket fallback)
  - CIMD-compliant tool definitions (sandboxed)
  - MCP Registry integration
  - Security hardening (TLS, CORS, sandbox, session)

## Developer Workflows
- **Install dependencies:**
  - `pip install -r requirements.txt` (or `uv pip install -r requirements.txt`, or `poetry install`)
- **Run server:**
  - `uvicorn main:app --reload` (adjust module/app if entrypoint differs)
- **Configuration:**
  - Requires OAuth2.1/OIDC config (issuer, client ID, secrets)

## Project Structure & Conventions
- **Entrypoint:** `main.py` (unless otherwise documented)
- **API:** FastAPI-based, likely organized by routers/modules for endpoints
- **Tool definitions:** CIMD-compliant, sandboxed for security
- **Security:** Strict TLS 1.3, CORS, and session management enforced
- **Streaming:** HTTP/2 chunked preferred, WebSocket as fallback
- **Integration:** MCP Registry for service discovery

## Patterns & Integration Points
- **Authentication:** Always use OAuth2.1 + PKCE S256; OIDC endpoints for discovery
- **Tool execution:** Use sandboxed environments for CIMD tools
- **External dependencies:**
  - FastAPI, Uvicorn, OAuth2.1/OIDC libraries, MCP Registry client

## Examples
- **Start server:**
  ```bash
  uvicorn main:app --reload
  ```
- **Install dependencies:**
  ```bash
  pip install -r requirements.txt
  ```

## References
- See `README.md` for setup and quick start
- Adjust entrypoint/module as needed for your deployment

---
**Update this file if project structure, workflows, or conventions change.**
