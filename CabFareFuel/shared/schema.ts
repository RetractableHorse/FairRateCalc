import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  baseFare: decimal("base_fare", { precision: 10, scale: 2 }).notNull(),
  costPerMile: decimal("cost_per_mile", { precision: 10, scale: 2 }).notNull(),
  costPerMinute: decimal("cost_per_minute", { precision: 10, scale: 2 }).notNull(),
  distance: decimal("distance", { precision: 10, scale: 2 }).notNull(),
  duration: decimal("duration", { precision: 10, scale: 2 }).notNull(),
  fuelType: text("fuel_type").notNull(),
  mpg: decimal("mpg", { precision: 10, scale: 2 }).notNull(),
  gasPrice: decimal("gas_price", { precision: 10, scale: 2 }).notNull(),
  fuelSurchargeType: text("fuel_surcharge_type"),
  fuelSurchargeAmount: decimal("fuel_surcharge_amount", { precision: 10, scale: 2 }),
  fareModel: text("fare_model").notNull(),
  totalFare: decimal("total_fare", { precision: 10, scale: 2 }).notNull(),
  fuelCost: decimal("fuel_cost", { precision: 10, scale: 2 }).notNull(),
  breakdown: jsonb("breakdown"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type FareModel = "balanced" | "premium" | "budget";
export type FuelType = "gasoline" | "hybrid" | "ev";
export type SurchargeType = "flat" | "perMile" | "none";

export interface FareCalculation {
  baseFare: number;
  distanceCharge: number;
  timeCharge: number;
  fuelSurcharge: number;
  fuelCost: number;
  subtotal: number;
  total: number;
}
