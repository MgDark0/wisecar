import { 
  users, 
  type User, 
  type InsertUser,
  type Car,
  type ContactSubmission
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Car related methods
  getAllCars(): Promise<Car[]>;
  getCarById(id: number): Promise<Car | undefined>;
  getFeaturedCars(): Promise<Car[]>;
  filterCars(type: string, minPrice?: number, maxPrice?: number): Promise<Car[]>;
  
  // Contact form
  submitContactForm(contactData: ContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cars: Map<number, Car>;
  private contactSubmissions: ContactSubmission[];
  private userCurrentId: number;
  private carCurrentId: number;

  constructor() {
    this.users = new Map();
    this.cars = new Map();
    this.contactSubmissions = [];
    this.userCurrentId = 1;
    this.carCurrentId = 1;
    
    // Seed some initial cars
    this.seedCars();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Car methods
  async getAllCars(): Promise<Car[]> {
    return Array.from(this.cars.values());
  }

  async getCarById(id: number): Promise<Car | undefined> {
    return this.cars.get(id);
  }

  async getFeaturedCars(): Promise<Car[]> {
    return Array.from(this.cars.values()).filter(car => car.featured);
  }

  async filterCars(type: string, minPrice?: number, maxPrice?: number): Promise<Car[]> {
    return Array.from(this.cars.values()).filter(car => {
      const matchesType = type === 'all' || car.type === type;
      const matchesMinPrice = minPrice === undefined || car.price >= minPrice;
      const matchesMaxPrice = maxPrice === undefined || car.price <= maxPrice;
      
      return matchesType && matchesMinPrice && matchesMaxPrice;
    });
  }

  // Contact form
  async submitContactForm(contactData: ContactSubmission): Promise<ContactSubmission> {
    this.contactSubmissions.push(contactData);
    return contactData;
  }

  // Seed data method
  private seedCars() {
    const carData: Omit<Car, 'id'>[] = [
      {
        name: "Porsche 911 GT3",
        type: "sports",
        price: 189500,
        description: "The perfect blend of performance and luxury. Experience the thrill of 502 HP and precision handling.",
        imageUrl: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
        horsepower: 502,
        acceleration: "3.2",
        mpg: 20,
        featured: true
      },
      {
        name: "Audi R8",
        type: "sports",
        price: 158700,
        description: "A masterpiece of German engineering with V10 power and quattro all-wheel drive for exceptional performance.",
        imageUrl: "https://pixabay.com/get/g2e997bd53e086abf425560aa0f132008eb2312193e6b5ff3598c53cb3749617cc4184a543251876542c9dd886f299eba7825bcefc9105425341047fdc91f5cb8_1280.jpg",
        horsepower: 562,
        acceleration: "3.4",
        mpg: 17,
        featured: true
      },
      {
        name: "Ferrari F8 Tributo",
        type: "sports",
        price: 276000,
        description: "The epitome of Italian supercar design with breathtaking performance and unmistakable Ferrari character.",
        imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
        horsepower: 710,
        acceleration: "2.9",
        mpg: 16,
        featured: true
      },
      {
        name: "Mercedes-Benz GLE Coupe",
        type: "suv",
        price: 92500,
        description: "Combines the elegance of a coupe with the presence of an SUV, offering unparalleled luxury and comfort.",
        imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
        horsepower: 429,
        acceleration: "5.2",
        mpg: 22,
        featured: false
      },
      {
        name: "BMW M5 Competition",
        type: "luxury",
        price: 120900,
        description: "A luxury sedan with the heart of a supercar. Experience unmatched performance with everyday usability.",
        imageUrl: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
        horsepower: 617,
        acceleration: "3.1",
        mpg: 17,
        featured: false
      },
      {
        name: "Lamborghini Huracan",
        type: "sports",
        price: 208000,
        description: "The perfect combination of Italian design and explosive performance. An automotive icon in every sense.",
        imageUrl: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
        horsepower: 631,
        acceleration: "2.8",
        mpg: 15,
        featured: true
      },
      {
        name: "Bentley Continental GT",
        type: "luxury",
        price: 215000,
        description: "The ultimate grand tourer that combines exquisite craftsmanship with exhilarating performance.",
        imageUrl: "https://images.unsplash.com/photo-1580274418392-25bdbaa52ecd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
        horsepower: 626,
        acceleration: "3.6",
        mpg: 19,
        featured: false
      },
      {
        name: "Range Rover Autobiography",
        type: "suv",
        price: 152000,
        description: "The pinnacle of luxury SUVs, with extraordinary refinement, capability, and sophistication.",
        imageUrl: "https://images.unsplash.com/photo-1536149247585-1b9f5099c9a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
        horsepower: 518,
        acceleration: "5.1",
        mpg: 18,
        featured: false
      }
    ];

    carData.forEach(car => {
      const id = this.carCurrentId++;
      this.cars.set(id, { ...car, id });
    });
  }
}

export const storage = new MemStorage();
