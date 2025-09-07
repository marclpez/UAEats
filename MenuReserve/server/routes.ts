import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReservationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all restaurants
  app.get("/api/restaurants", async (req, res) => {
    try {
      const restaurants = await storage.getAllRestaurants();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error fetching restaurants" });
    }
  });

  // Get restaurant by ID
  app.get("/api/restaurants/:id", async (req, res) => {
    try {
      console.log("Entrando");
      const restaurant = await storage.getRestaurant(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ message: "Error fetching restaurant" });
    }
  });

  // Get menu items for a restaurant
  app.get("/api/restaurants/:id/menu", async (req, res) => {
    try {
      const menuItems = await storage.getMenuItemsByRestaurant(req.params.id);
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching menu items" });
    }
  });

  // Get time slots for a restaurant
  app.get("/api/restaurants/:id/timeslots", async (req, res) => {
    try {
      const timeSlots = await storage.getTimeSlotsByRestaurant(req.params.id);
      res.json(timeSlots);
    } catch (error) {
      res.status(500).json({ message: "Error fetching time slots" });
    }
  });

  // Create a reservation
  app.post("/api/reservations", async (req, res) => {
    try {
      const validatedData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validatedData);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ message: "Invalid reservation data" });
    }
  });

  // Get reservation by ID
  app.get("/api/reservations/:id", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
