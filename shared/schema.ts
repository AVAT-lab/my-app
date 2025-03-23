import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Définir un type zod pour les ingrédients
export const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  unit: z.string()
});

export type Ingredient = z.infer<typeof ingredientSchema>;

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  prepTimeMinutes: integer("prep_time_minutes").notNull(),
  calories: integer("calories").notNull(),
  difficulty: text("difficulty").notNull(),
  categories: text("categories").array().notNull(),
  ingredients: jsonb("ingredients").$type<Ingredient[]>().notNull(),
  instructions: text("instructions").array().notNull(),
  isVegetarian: boolean("is_vegetarian").default(false).notNull(),
  isEconomic: boolean("is_economic").default(false).notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  favorites: integer("favorites").array().default([]).notNull(),
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
