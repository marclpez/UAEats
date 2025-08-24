import { type Restaurant, type MenuItem, type TimeSlot, type Reservation, type InsertRestaurant, type InsertMenuItem, type InsertTimeSlot, type InsertReservation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Restaurants
  getAllRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: string): Promise<Restaurant | undefined>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;

  // Menu Items
  getMenuItemsByRestaurant(restaurantId: string): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;

  // Time Slots
  getTimeSlotsByRestaurant(restaurantId: string): Promise<TimeSlot[]>;
  createTimeSlot(timeSlot: InsertTimeSlot): Promise<TimeSlot>;

  // Reservations
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getReservation(id: string): Promise<Reservation | undefined>;
}

export class MemStorage implements IStorage {
  private restaurants: Map<string, Restaurant>;
  private menuItems: Map<string, MenuItem>;
  private timeSlots: Map<string, TimeSlot>;
  private reservations: Map<string, Reservation>;

  constructor() {
    this.restaurants = new Map();
    this.menuItems = new Map();
    this.timeSlots = new Map();
    this.reservations = new Map();

    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Create restaurants
    const restaurant1 = await this.createRestaurant({
      name: "La Terraza Mediterránea",
      description: "Cocina mediterránea • 4.8 ⭐ (120 reseñas)",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      rating: "4.8",
      reviews: 120,
      priceFrom: "15.00",
      isOpen: "true"
    });

    const restaurant2 = await this.createRestaurant({
      name: "Nonna's Kitchen",
      description: "Cocina italiana • 4.9 ⭐ (89 reseñas)",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      rating: "4.9",
      reviews: 89,
      priceFrom: "18.00",
      isOpen: "true"
    });

    const restaurant3 = await this.createRestaurant({
      name: "Sakura Sushi Bar",
      description: "Cocina japonesa • 4.7 ⭐ (156 reseñas)",
      imageUrl: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      rating: "4.7",
      reviews: 156,
      priceFrom: "22.00",
      isOpen: "true"
    });

    // Menu items for La Terraza Mediterránea
    const mediteraneanMenus = [
      { category: "primer", name: "Ensalada griega", price: "4.50" },
      { category: "primer", name: "Hummus con pan pita", price: "3.80" },
      { category: "primer", name: "Gazpacho andaluz", price: "4.20" },
      { category: "primer", name: "Bruschetta de tomate", price: "4.00" },
      { category: "segundo", name: "Lubina a la plancha", price: "8.90" },
      { category: "segundo", name: "Paella de verduras", price: "8.50" },
      { category: "segundo", name: "Moussaka griega", price: "7.80" },
      { category: "segundo", name: "Pollo mediterráneo", price: "8.20" },
      { category: "postre", name: "Baklava", price: "3.50" },
      { category: "postre", name: "Yogur griego con miel", price: "2.90" },
      { category: "postre", name: "Tiramisú", price: "3.80" },
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

    // Menu items for Nonna's Kitchen
    const italianMenus = [
      { category: "primer", name: "Antipasto italiano", price: "5.20" },
      { category: "primer", name: "Minestrone casero", price: "4.50" },
      { category: "primer", name: "Carpaccio de ternera", price: "6.00" },
      { category: "primer", name: "Burrata con rúcula", price: "5.80" },
      { category: "segundo", name: "Osso buco alla milanese", price: "12.50" },
      { category: "segundo", name: "Pasta carbonara", price: "9.20" },
      { category: "segundo", name: "Pizza margherita", price: "8.80" },
      { category: "segundo", name: "Risotto ai funghi", price: "10.50" },
      { category: "postre", name: "Tiramisú de la casa", price: "4.20" },
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

    // Menu items for Sakura Sushi Bar
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

    // Time slots
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

  async getAllRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  async getRestaurant(id: string): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = randomUUID();
    const restaurant: Restaurant = { 
      ...insertRestaurant, 
      id,
      isOpen: insertRestaurant.isOpen || "true"
    };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  async getMenuItemsByRestaurant(restaurantId: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      item => item.restaurantId === restaurantId
    );
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const menuItem: MenuItem = { ...insertMenuItem, id };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async getTimeSlotsByRestaurant(restaurantId: string): Promise<TimeSlot[]> {
    return Array.from(this.timeSlots.values()).filter(
      slot => slot.restaurantId === restaurantId
    );
  }

  async createTimeSlot(insertTimeSlot: InsertTimeSlot): Promise<TimeSlot> {
    const id = randomUUID();
    const timeSlot: TimeSlot = { ...insertTimeSlot, id };
    this.timeSlots.set(id, timeSlot);
    return timeSlot;
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = randomUUID();
    const reservation: Reservation = { 
      ...insertReservation, 
      id,
      status: insertReservation.status || "confirmed"
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async getReservation(id: string): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }
}

export const storage = new MemStorage();
