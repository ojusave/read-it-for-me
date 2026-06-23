/** Workflow entry: registers all Render Workflow tasks. */
export {};

await import("./tasks/fetch.js");
await import("./tasks/analyze.js");
await import("./tasks/synthesize.js");
