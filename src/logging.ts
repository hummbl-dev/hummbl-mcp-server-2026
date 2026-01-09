export type LogLevel = "info" | "error";

function base(level: LogLevel, payload: Record<string, unknown>) {
/* global process */
  process.stdout.write(
    JSON.stringify({
      ts: new Date().toISOString(),
      level,
      ...payload
    }) + "\n"
  );
}

export const logger = {
  info(payload: Record<string, unknown>) {
    base("info", payload);
  },
  error(payload: Record<string, unknown>) {
    base("error", payload);
  }
};
