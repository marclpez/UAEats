import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const restaurants = pgTable("restaurants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviews: integer("reviews").notNull(),
  priceFrom: decimal("price_from", { precision: 4, scale: 2 }).notNull(),
  isOpen: text("is_open").notNull().default("true"),
});

export const menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: varchar("restaurant_id").notNull().references(() => restaurants.id),
  category: text("category").notNull(), // 'primer', 'segundo', 'postre'
  name: text("name").notNull(),
  price: decimal("price", { precision: 4, scale: 2 }).notNull(),
});

export const timeSlots = pgTable("time_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: varchar("restaurant_id").notNull().references(() => restaurants.id),
  time: text("time").notNull(),
});

export const reservations = pgTable("reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: varchar("restaurant_id").notNull().references(() => restaurants.id),
  restaurantName: text("restaurant_name").notNull(),
  primerPlatoId: varchar("primer_plato_id").notNull(),
  primerPlatoName: text("primer_plato_name").notNull(),
  primerPlatoPrice: decimal("primer_plato_price", { precision: 4, scale: 2 }).notNull(),
  segundoPlatoId: varchar("segundo_plato_id").notNull(),
  segundoPlatoName: text("segundo_plato_name").notNull(),
  segundoPlatoPrice: decimal("segundo_plato_price", { precision: 4, scale: 2 }).notNull(),
  postreId: varchar("postre_id").notNull(),
  postreName: text("postre_name").notNull(),
  postrePrice: decimal("postre_price", { precision: 4, scale: 2 }).notNull(),
  timeSlot: text("time_slot").notNull(),
  totalPrice: decimal("total_price", { precision: 4, scale: 2 }).notNull(),
  status: text("status").notNull().default("confirmed"),
});

export const insertRestaurantSchema = createInsertSchema(restaurants).omit({
  id: true,
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
});

export const insertTimeSlotSchema = createInsertSchema(timeSlots).omit({
  id: true,
});

export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
});

export type Restaurant = typeof restaurants.$inferSelect;
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type TimeSlot = typeof timeSlots.$inferSelect;
export type InsertTimeSlot = z.infer<typeof insertTimeSlotSchema>;
export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
