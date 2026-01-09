# MCP_CONFORMANCE.md

## Status
**Authoritative for this repository.**  
All MCP-related behavior MUST conform to this document unless explicitly versioned otherwise.

---

## MCP Specification Pin

- **Protocol:** Model Context Protocol (MCP)
- **Pinned Spec Version:** 2026.x (explicit pin required before first release)
- **Compatibility Mode:** Strict
- **Backward Compatibility:** None (breaking changes allowed until v1.0.0)

Any deviation from the pinned MCP spec MUST be documented here before implementation.

---

## Supported MCP Capabilities

This server implements the following MCP capability classes:

- Server handshake and capability declaration
- Tool discovery (authenticated)
- Tool metadata delivery (schema-first)
- Streaming responses (HTTP chunked)

The following are explicitly **out of scope** for initial conformance:

- Tool execution side effects
- Persistent agent memory
- Multi-tenant isolation
- MCP Registry auto-registration

---

## Required MCP Endpoints

All endpoints are REQUIRED unless explicitly marked optional.

### Core MCP

- `GET /mcp/handshake`
  - Purpose: protocol negotiation and server capability declaration
  - Auth: Required
  - Side effects: None

- `GET /mcp/tools/list`
  - Purpose: return list of available tools and schemas
  - Auth: Required
  - Scope: `tools.read`
  - Side effects: None

### Authentication

- `GET /auth/authorize`
- `POST /auth/token`
- `GET /.well-known/openid-configuration`

OAuth2.1 + PKCE is mandatory. Client secrets are not supported.

---

## Authentication & Authorization Requirements

- OAuth2.1 Authorization Code flow with PKCE (S256 only)
- No unauthenticated MCP endpoints except health checks
- All tool discovery requires a valid access token
- All tools declare required scopes
- Scope checks are enforced server-side, not advisory

Failure to enforce auth or scope checks is a **conformance violation**.

---

## Tool Model Requirements

- All tools MUST conform to the canonical JSON schema:
  - `tools/schema/tool.schema.json`
- Tool schemas are authoritative over implementation
- Tools are declared before they are executable
- Tools may be marked as:
  - `readOnly`
  - `sideEffecting`
  - `destructive`

Execution semantics are deferred until explicitly enabled.

---

## Transport Requirements

- HTTPS only
- Chunked HTTP streaming supported
- WebSockets optional and non-canonical
- No SSE-only implementations

---

## Non-Goals (Explicit)

The following are NOT goals of this repository at this stage:

- Feature parity with Claude MCP server
- Performance optimization
- Horizontal scaling
- Kubernetes-first deployment
- UI or dashboard

Any work in these areas requires a governance decision.

---

## Conformance Enforcement

Conformance is enforced via:

- CI checks
- Negative-case auth tests
- JSON schema validation
- Manual review against this document

CI failures related to MCP conformance are **release-blocking**.

---

## Change Control

This document may only be changed by:

- A committed change to `main`
- A versioned justification in commit message
- Explicit acknowledgement of breaking changes

Silent drift is prohibited.

---
