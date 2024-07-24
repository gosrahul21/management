import { CreateMemberDTO } from "../../pages/subscribers/types/CreateSubscribersDto";
import { Member } from "../../pages/subscribers/types/Subscribers";
import apiClient from "../apiClient";

export const updateMember = async (
    id: string,
    updateMemberDto: Partial<CreateMemberDTO>
  ): Promise<Member> => {
    try {
      const response = await apiClient.put(`/members/${id}`, updateMemberDto);
      return response.data;
    } catch (error) {
      console.error("Failed to update member", error);
      throw error;
    }
  };
  