import { createServer } from "../src/server";
import request from "supertest";

describe("/health", () => {
  const { app } = createServer();

  it("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
