import debug from "debug";

export const appLogger = debug("app");

if (process.env.NODE_ENV === "development") {
  // debug.enable("app,app:*");
  debug.enable("")
}
