## Environment Configuration

The server expects OAuth2.1/OIDC configuration via environment variables. Example .env file:

```env
OIDC_ISSUER=https://example-issuer.com/
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret
```

These must be set for authentication and OIDC discovery endpoints to function.
# MCP Protocol Specification

## Versioning

- **Spec Version:** 2026.x (explicit pin required before first release)
- **Transport:** Agnostic (supports stdio, HTTP, WebSocket)
- **Error Taxonomy:** Explicit, versioned

---

## Message Lifecycle

1. **Init**
   - Client initiates handshake with server
   - Negotiates protocol version and capabilities

2. **Discover**
   - Client requests available tools and schemas
   - Server returns tool list conforming to canonical schema

3. **Invoke**
   - Client sends tool invocation request (validated against schema)
   - Server authenticates, authorizes, and validates payload

4. **Stream**
   - Server streams response chunks (if supported)
   - Each chunk is a valid partial or complete response

5. **Finalize**
   - Server signals completion (success or error)
   - Client receives final status and output

---

## Error Taxonomy

- **INVALID_REQUEST**: Malformed or missing fields
- **UNAUTHORIZED**: Missing or invalid auth
- **FORBIDDEN**: Insufficient scope
- **NOT_FOUND**: Tool or endpoint does not exist
- **SCHEMA_INVALID**: Input or output fails schema validation
- **INTERNAL_ERROR**: Unhandled server error
- **NOT_IMPLEMENTED**: Capability not available

All errors MUST include:

- `code` (string, from above)
- `message` (human-readable)
- `details` (optional, for debugging)

---

## Version Pinning

- Protocol and schema versions are pinned in handshake
- Breaking changes require explicit version bump
- Clients and servers MUST reject mismatched versions

---

## Transport Notes

- HTTP: Use standard REST verbs, chunked transfer for streaming
- WebSocket: Each message is a protocol frame
- stdio: Line-delimited JSON

---

## Extensibility

- New error codes and message types require version bump
- Backward compatibility is not guaranteed pre-1.0.0

---

## Non-Goals

- No UI or dashboard
- No persistence or agent memory
- No multi-tenant support

---

## Change Control

- This document is authoritative for protocol behavior
- Changes require versioned justification and main branch commit
