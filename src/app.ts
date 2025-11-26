import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import tasks from "@/routes/tasks/index.route";
import configureOpenAPI from "./lib/config-openapi";

const app = createApp();

const routes = [index, tasks];

configureOpenAPI(app);

routes.forEach((route) => {
    app.route("/", route);
});

export default app;
