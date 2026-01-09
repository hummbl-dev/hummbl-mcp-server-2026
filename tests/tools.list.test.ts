import { createServer } from "../src/server";
import request from "supertest";

describe("/mcp/tools/list", () => {
  const { app } = createServer();

  it("returns an empty array initially", async () => {
    const res = await request(app).get("/mcp/tools/list");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Array.isArray(res.body.result)).toBe(true);
    expect(res.body.result.length).toBe(0);
  });
});
