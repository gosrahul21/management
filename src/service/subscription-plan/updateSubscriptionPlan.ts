import apiClient from "../apiClient";
import SubscriptionPlan from "./types/SubscriptionPlan";
import CreateSusbscriptionDto from "./types/createSubscriptionPlanDto";

const updateSubscriptionPlan = async (
  subscriptionPlanId: string,
  planData: Partial<CreateSusbscriptionDto>
): Promise<SubscriptionPlan> => {
  try {
    const response = await apiClient.patch(
      `/subscription-plans/${subscriptionPlanId}`,
      planData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create subscription plan", error);
    throw error;
  }
};

export default updateSubscriptionPlan;
