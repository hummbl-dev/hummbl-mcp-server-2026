from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI(title="HUMMBL MCP Server 2026")

@app.get("/health")
def health():
    return JSONResponse({"status": "ok"})

@app.post("/mcp/tools/{tool_name}")
def mcp_tool_stub(tool_name: str):
    # Stub for MCP tool execution endpoint
    return JSONResponse({"tool": tool_name, "result": "not implemented"})
