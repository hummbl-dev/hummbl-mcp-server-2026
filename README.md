# MCP Server 2026

**Version:** 2026.01 

**Framework:** Python 3.13+, FastAPI

A fully-compliant **Model Context Protocol (MCP) 2026 server** with:

- **OAuth2.1 + PKCE S256 authentication**  
- **OIDC discovery endpoints**  
- **Chunked HTTP/2 streaming** with WebSocket fallback  
- **CIMD-compliant tool definitions** with sandboxed execution  
- **MCP Registry integration** for server discovery  
- **Security hardening:** TLS 1.3, CORS, sandbox policies, session management

---

## Repository Structure

auth/           # OAuth2.1 + PKCE + OIDC endpoints
transport/      # Streaming transport logic
tools/          # Tool definitions and executors
registry/       # MCP Registry integration
security/       # Hardening & sandboxing
tests/          # Spec compliance and security tests
docs/           # Documentation
scripts/        # Deployment and utility scripts
k8s/            # Containerization and orchestration
main.py         # FastAPI app entrypoint
requirements.txt
README.md
