import apiClient from "../apiClient";
import SubscriptionPlan from "./types/SubscriptionPlan";

const deleteSubscriptionPlan = async (
    gymId: string
  ): Promise<SubscriptionPlan> => {
    try {
      const response = await apiClient.delete(`/subscription-plans/${gymId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to create subscription plan", error);
      throw error;
    }
  };
  

export default deleteSubscriptionPlan;