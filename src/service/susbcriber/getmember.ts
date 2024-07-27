import { Member } from "../../pages/subscribers/types/Subscribers";
import apiClient from "../apiClient";

export const getMemberById = async (memberId: string): Promise<Member> => {
  try {
    const response = await apiClient.get(`/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to create member", error);
    throw error;
  }
};
