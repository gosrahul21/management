// src/types/User.ts

export interface User {
    _id: string; // Assuming MongoDB generates a unique identifier
    email: string;
    phoneNo?: string;
    password?: string;
    googleId?: string;
    firstName: string;
    lastName?: string;
    image?: string;
  }
  