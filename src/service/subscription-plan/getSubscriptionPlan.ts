// services/subscriptionService.js

import apiClient from "../apiClient";
import SubscriptionPlan from "./types/SubscriptionPlan";

/**
 * get susbcription plans of a gym
 * @param gymId
 * @returns list of subscription plans
 */
const getSubscriptionPlans = async (
  gymId: string
): Promise<SubscriptionPlan[]> => {
  try {
    const response = await apiClient.get(`/subscription-plans/gym/${gymId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subscription plans", error);
    throw error;
  }
};

export default getSubscriptionPlans;


