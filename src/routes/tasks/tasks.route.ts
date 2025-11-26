import { createRoute, z } from "@hono/zod-openapi";
import * as HttpsStatus from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import {
  insertTasksSchema,
  patchTaskSchema,
  selectTasksSchema,
} from "@/database/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Tasks"];

export const list = createRoute({
  tags,
  path: "/tasks",
  method: "get",
  responses: {
    [HttpsStatus.OK]: jsonContent(z.array(selectTasksSchema), "List of tasks"),
  },
});

export const create = createRoute({
  tags,
  path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(insertTasksSchema, "Create a new task"),
  },
  responses: {
    [HttpsStatus.OK]: jsonContent(selectTasksSchema, "Create a task"),
    [HttpsStatus.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "Validation error",
    ),
  },
});

export const getOne = createRoute({
  tags,
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  method: "get",
  responses: {
    [HttpsStatus.OK]: jsonContent(selectTasksSchema, "Task details"),
    [HttpsStatus.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpsStatus.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Id Validation error",
    ),
  },
});

export const patch = createRoute({
  path: "/tasks/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchTaskSchema, "The task updates"),
  },
  tags,
  responses: {
    [HttpsStatus.OK]: jsonContent(selectTasksSchema, "The updated task"),
    [HttpsStatus.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpsStatus.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchTaskSchema).or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpsStatus.NO_CONTENT]: {
      description: "The task was deleted successfully",
    },
    [HttpsStatus.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpsStatus.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid Id error(s)",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
