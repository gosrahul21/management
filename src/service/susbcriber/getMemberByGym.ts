import { Member } from "../../pages/subscribers/types/Subscribers";
import apiClient from "../apiClient";

export const getMembersByGym = async (gymId: string): Promise<Member[]> => {
    try {
      const response = await apiClient.get(`/members/gym/${gymId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch members by gym", error);
      throw error;
    }
  };
  