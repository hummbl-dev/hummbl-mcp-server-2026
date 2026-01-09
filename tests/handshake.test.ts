import { createServer } from "../src/server";
import request from "supertest";

describe("/mcp/handshake", () => {
  const { app } = createServer();

  it("returns protocol version and capabilities", async () => {
    const res = await request(app).get("/mcp/handshake");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.result.protocol_version).toBeDefined();
    expect(res.body.result.capabilities.tools).toBe(true);
  });
});
