// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  restaurants;
  menuItems;
  timeSlots;
  reservations;
  constructor() {
    this.restaurants = /* @__PURE__ */ new Map();
    this.menuItems = /* @__PURE__ */ new Map();
    this.timeSlots = /* @__PURE__ */ new Map();
    this.reservations = /* @__PURE__ */ new Map();
    this.initializeSampleData();
  }
  async initializeSampleData() {
    const restaurant1 = await this.createRestaurant({
      name: "La Terraza Mediterr\xE1nea",
      description: "Cocina mediterr\xE1nea \u2022 4.8 \u2B50 (120 rese\xF1as)",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      rating: "4.8",
      reviews: 120,
      priceFrom: "15.00",
      isOpen: "true"
    });
    const restaurant2 = await this.createRestaurant({
      name: "Nonna's Kitchen",
      description: "Cocina italiana \u2022 4.9 \u2B50 (89 rese\xF1as)",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      rating: "4.9",
      reviews: 89,
      priceFrom: "18.00",
      isOpen: "true"
    });
    const restaurant3 = await this.createRestaurant({
      name: "Sakura Sushi Bar",
      description: "Cocina japonesa \u2022 4.7 \u2B50 (156 rese\xF1as)",
      imageUrl: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      rating: "4.7",
      reviews: 156,
      priceFrom: "22.00",
      isOpen: "true"
    });
    const mediteraneanMenus = [
      { category: "primer", name: "Ensalada griega", price: "4.50" },
      { category: "primer", name: "Hummus con pan pita", price: "3.80" },
      { category: "primer", name: "Gazpacho andaluz", price: "4.20" },
      { category: "primer", name: "Bruschetta de tomate", price: "4.00" },
      { category: "segundo", name: "Lubina a la plancha", price: "8.90" },
      { category: "segundo", name: "Paella de verduras", price: "8.50" },
      { category: "segundo", name: "Moussaka griega", price: "7.80" },
      { category: "segundo", name: "Pollo mediterr\xE1neo", price: "8.20" },
      { category: "postre", name: "Baklava", price: "3.50" },
      { category: "postre", name: "Yogur griego con miel", price: "2.90" },
      { category: "postre", name: "Tiramis\xFA", price: "3.80" },
      { category: "postre", name: "Fruta fresca", price: "2.50" }
    ];
    for (const menu of mediteraneanMenus) {
      await this.createMenuItem({
        restaurantId: restaurant1.id,
        category: menu.category,
        name: menu.name,
        price: menu.price
      });
    }
    const italianMenus = [
      { category: "primer", name: "Antipasto italiano", price: "5.20" },
      { category: "primer", name: "Minestrone casero", price: "4.50" },
      { category: "primer", name: "Carpaccio de ternera", price: "6.00" },
      { category: "primer", name: "Burrata con r\xFAcula", price: "5.80" },
      { category: "segundo", name: "Osso buco alla milanese", price: "12.50" },
      { category: "segundo", name: "Pasta carbonara", price: "9.20" },
      { category: "segundo", name: "Pizza margherita", price: "8.80" },
      { category: "segundo", name: "Risotto ai funghi", price: "10.50" },
      { category: "postre", name: "Tiramis\xFA de la casa", price: "4.20" },
      { category: "postre", name: "Panna cotta", price: "3.80" },
      { category: "postre", name: "Gelato artesanal", price: "3.50" },
      { category: "postre", name: "Cannoli siciliano", price: "4.00" }
    ];
    for (const menu of italianMenus) {
      await this.createMenuItem({
        restaurantId: restaurant2.id,
        category: menu.category,
        name: menu.name,
        price: menu.price
      });
    }
    const japaneseMenus = [
      { category: "primer", name: "Miso soup", price: "3.50" },
      { category: "primer", name: "Ensalada wakame", price: "4.80" },
      { category: "primer", name: "Gyoza de cerdo", price: "5.50" },
      { category: "primer", name: "Edamame", price: "3.20" },
      { category: "segundo", name: "Sashimi variado", price: "15.50" },
      { category: "segundo", name: "Ramen tonkotsu", price: "11.80" },
      { category: "segundo", name: "Bento de pollo teriyaki", price: "12.20" },
      { category: "segundo", name: "Sushi set premium", price: "18.50" },
      { category: "postre", name: "Mochi ice cream", price: "4.50" },
      { category: "postre", name: "Dorayaki", price: "3.80" },
      { category: "postre", name: "Matcha cheesecake", price: "4.20" },
      { category: "postre", name: "Taiyaki", price: "3.50" }
    ];
    for (const menu of japaneseMenus) {
      await this.createMenuItem({
        restaurantId: restaurant3.id,
        category: menu.category,
        name: menu.name,
        price: menu.price
      });
    }
    const mediteraneanTimes = ["13:00", "13:30", "14:00", "14:30", "15:00"];
    for (const time of mediteraneanTimes) {
      await this.createTimeSlot({
        restaurantId: restaurant1.id,
        time
      });
    }
    const italianTimes = ["12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
    for (const time of italianTimes) {
      await this.createTimeSlot({
        restaurantId: restaurant2.id,
        time
      });
    }
    const japaneseTimes = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
    for (const time of japaneseTimes) {
      await this.createTimeSlot({
        restaurantId: restaurant3.id,
        time
      });
    }
  }
  async getAllRestaurants() {
    return Array.from(this.restaurants.values());
  }
  async getRestaurant(id) {
    return this.restaurants.get(id);
  }
  async createRestaurant(insertRestaurant) {
    const id = randomUUID();
    const restaurant = {
      ...insertRestaurant,
      id,
      isOpen: insertRestaurant.isOpen || "true"
    };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }
  async getMenuItemsByRestaurant(restaurantId) {
    return Array.from(this.menuItems.values()).filter(
      (item) => item.restaurantId === restaurantId
    );
  }
  async getMenuItem(id) {
    return this.menuItems.get(id);
  }
  async createMenuItem(insertMenuItem) {
    const id = randomUUID();
    const menuItem = { ...insertMenuItem, id };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }
  async getTimeSlotsByRestaurant(restaurantId) {
    return Array.from(this.timeSlots.values()).filter(
      (slot) => slot.restaurantId === restaurantId
    );
  }
  async createTimeSlot(insertTimeSlot) {
    const id = randomUUID();
    const timeSlot = { ...insertTimeSlot, id };
    this.timeSlots.set(id, timeSlot);
    return timeSlot;
  }
  async createReservation(insertReservation) {
    const id = randomUUID();
    const reservation = {
      ...insertReservation,
      id,
      status: insertReservation.status || "confirmed"
    };
    this.reservations.set(id, reservation);
    return reservation;
  }
  async getReservation(id) {
    return this.reservations.get(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var restaurants = pgTable("restaurants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviews: integer("reviews").notNull(),
  priceFrom: decimal("price_from", { precision: 4, scale: 2 }).notNull(),
  isOpen: text("is_open").notNull().default("true")
});
var menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: varchar("restaurant_id").notNull().references(() => restaurants.id),
  category: text("category").notNull(),
  // 'primer', 'segundo', 'postre'
  name: text("name").notNull(),
  price: decimal("price", { precision: 4, scale: 2 }).notNull()
});
var timeSlots = pgTable("time_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: varchar("restaurant_id").notNull().references(() => restaurants.id),
  time: text("time").notNull()
});
var reservations = pgTable("reservations", {
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
  status: text("status").notNull().default("confirmed")
});
var insertRestaurantSchema = createInsertSchema(restaurants).omit({
  id: true
});
var insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true
});
var insertTimeSlotSchema = createInsertSchema(timeSlots).omit({
  id: true
});
var insertReservationSchema = createInsertSchema(reservations).omit({
  id: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/restaurants", async (req, res) => {
    try {
      const restaurants2 = await storage.getAllRestaurants();
      res.json(restaurants2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching restaurants" });
    }
  });
  app2.get("/api/restaurants/:id", async (req, res) => {
    try {
      const restaurant = await storage.getRestaurant(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ message: "Error fetching restaurant" });
    }
  });
  app2.get("/api/restaurants/:id/menu", async (req, res) => {
    try {
      const menuItems2 = await storage.getMenuItemsByRestaurant(req.params.id);
      res.json(menuItems2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching menu items" });
    }
  });
  app2.get("/api/restaurants/:id/timeslots", async (req, res) => {
    try {
      const timeSlots2 = await storage.getTimeSlotsByRestaurant(req.params.id);
      res.json(timeSlots2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching time slots" });
    }
  });
  app2.post("/api/reservations", async (req, res) => {
    try {
      const validatedData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validatedData);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ message: "Invalid reservation data" });
    }
  });
  app2.get("/api/reservations/:id", async (req, res) => {
    try {
      const reservation = await storage.getReservation(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reservation" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: "0.0.0.0",
    port: 5e3,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
