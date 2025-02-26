import { doublePrecision, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar(),
  price: doublePrecision().notNull(),
  image: varchar({length: 255}),
});

export const createProductSchema = createInsertSchema(productTable).pick({
  name: true,
  description: true,
  price: true,
  image: true,
});

export const updateProductSchema = createInsertSchema(productTable).pick({
  name: true,
  description: true,
  price: true,
  image: true
}).partial();
