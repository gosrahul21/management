import apiClient from "../apiClient";

export const getSubscriptionById = async (id: string) => {
  try {
    const response = await apiClient.get(`/subscriptions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to Add Subscription", error);
    throw error;
  }
};
