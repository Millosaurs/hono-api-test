import { Scalar } from "@scalar/hono-api-reference";
import packageJSON from "../../package.json";
import type { AppOpenapi } from "./types";

export default function configureOpenAPI(app: AppOpenapi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "FUCK API",
      version: packageJSON.version,
    },
  });

  app.get(
    "/reference",
    Scalar({
      layout: "classic",
      defaultOpenAllTags: true,
      theme: "alternate",
      url: "/doc",
      pageTitle: "negga API",
    }),
  );
}
