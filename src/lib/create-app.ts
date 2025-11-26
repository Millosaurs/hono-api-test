import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import defaultHook from "stoker/openapi/default-hook";
import { logger } from "@/middlewares/pino-loger";
import type { AppBindings, AppOpenapi } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.notFound(notFound);
  app.onError(onError);
  app.use(serveEmojiFavicon("😃"));
  app.use(logger());
  return app;
}

export function createTestApp(router: AppOpenapi) {
  const testApp = createApp();
  testApp.route("/", router);
  return testApp;
}
