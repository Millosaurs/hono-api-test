import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey().notNull(),
  name: text().notNull(),
  done: boolean().notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});

export const insertTasksSchema = createInsertSchema(tasks, {
  name: (schema) => schema.min(1).max(255),
})
  .required({ done: true })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const selectTasksSchema = createSelectSchema(tasks);

export const patchTaskSchema = insertTasksSchema.partial();
