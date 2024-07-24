import apiClient from "../apiClient";
import SubscriptionPlan from "./types/SubscriptionPlan";
import CreateSusbscriptionDto from "./types/createSubscriptionPlanDto";

const createSubscriptionPlan = async (
  planData: CreateSusbscriptionDto
): Promise<SubscriptionPlan> => {
  try {
    const response = await apiClient.post(`/subscription-plans`, planData);
    return response.data;
  } catch (error) {
    console.error("Failed to create subscription plan", error);
    throw error;
  }
};

export default createSubscriptionPlan;
