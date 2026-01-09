import { registerTool } from "../src/server";
import { MCPTool } from "../src/types/tool";

describe("tool schema validation", () => {
  it("fails to register an invalid tool", () => {
    const invalidTool = { name: 123 } as unknown as MCPTool;
    expect(() => registerTool(invalidTool)).toThrow();
  });
});
