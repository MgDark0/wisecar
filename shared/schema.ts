import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Car schema
export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // luxury, sports, suv
  price: integer("price").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  horsepower: integer("horsepower").notNull(),
  acceleration: text("acceleration").notNull(), // 0-60 mph time
  mpg: integer("mpg").notNull(), // miles per gallon
  featured: boolean("featured").default(false),
});

export const insertCarSchema = createInsertSchema(cars).omit({
  id: true,
});

export type InsertCar = z.infer<typeof insertCarSchema>;
export type Car = typeof cars.$inferSelect;

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  interest: z.enum(["purchase", "test-drive", "financing", "trade-in", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactSubmission = z.infer<typeof contactSchema>;
