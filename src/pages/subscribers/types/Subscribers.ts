// src/types/Member.ts

import { Gym } from "../../gym/types/Gym";
import { User } from "../../users/types/User";

export interface Member {
  _id: string;
  userId:  User;
  gymId: string | Gym;
  isActive: boolean;
  activeSubscriptions?: any;
}
