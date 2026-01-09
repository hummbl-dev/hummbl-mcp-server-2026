
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

You can place these in a `.env` file at the project root:

```env
OIDC_ISSUER=https://example-issuer.com/
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret
```


### Example: OAuth2.1 Authorization Flow

1. Direct the user to the authorization URL:

	```
	https://your-oidc-issuer.com/authorize?response_type=code&client_id=your-client-id&redirect_uri=https://your-app/callback&scope=openid%20profile%20email&code_challenge=...&code_challenge_method=S256
	```

2. After user login and consent, exchange the code for a token:

	```bash
	curl -X POST https://your-oidc-issuer.com/token \
	  -d 'grant_type=authorization_code' \
	  -d 'code=AUTH_CODE_FROM_STEP_1' \
	  -d 'redirect_uri=https://your-app/callback' \
	  -d 'client_id=your-client-id' \
	  -d 'code_verifier=YOUR_CODE_VERIFIER'
	```

3. Use the returned access token to call MCP endpoints:

	```bash
	curl -H "Authorization: Bearer ACCESS_TOKEN" https://your-mcp-server/mcp/tools/list
	```

See your OIDC provider’s documentation for full details on PKCE and supported parameters.

---

## Documentation

See the `docs/` directory for protocol, conformance, and deployment details.
