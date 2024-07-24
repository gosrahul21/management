// src/service/memberService.ts

import { CreateMemberDTO } from "../../pages/subscribers/types/CreateSubscribersDto";
import { Member } from "../../pages/subscribers/types/Subscribers";
import apiClient from "../apiClient";
import { CreateSubscriptionDto } from "./types/CreateSubscriptionDto";

export const createSubscription = async (
  createMemberDto: CreateSubscriptionDto
): Promise<any> => {
  try {
    const response = await apiClient.post(`/subscriptions`, createMemberDto);
    return response.data;
  } catch (error) {
    console.error("Failed to Add Subscription", error);
    throw error;
  }
};

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

export const getMembersByGym = async (gymId: string): Promise<Member[]> => {
  try {
    const response = await apiClient.get(`/members/gym/${gymId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members by gym", error);
    throw error;
  }
};

