// src/types/Gym.ts

export interface Gym {
  _id: string; // Assuming MongoDB generates a unique identifier
  name: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  facilities?: string[];
  contactInfo?: {
    phone: string;
    email: string;
  };
  userId: string; // Store the ID of the user who owns or created the gym
}
