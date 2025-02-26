import { doublePrecision, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const productTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar(),
  price: doublePrecision().notNull(),
  image: varchar({length: 255}),
  quantity: integer().default(0)
});
