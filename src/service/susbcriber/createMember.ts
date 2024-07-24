import { CreateMemberDTO } from "../../pages/subscribers/types/CreateSubscribersDto";
import { Member } from "../../pages/subscribers/types/Subscribers";
import apiClient from "../apiClient";

export const createMember = async (
  createMemberDto: CreateMemberDTO
): Promise<Member> => {
  try {
    const response = await apiClient.post(`/members`, createMemberDto);
    return response.data;
  } catch (error) {
    console.error("Failed to create member", error);
    throw error;
  }
};

