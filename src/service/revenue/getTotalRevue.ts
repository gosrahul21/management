// services/subscriptionService.js

import apiClient from "../apiClient";

/**
 * get susbcription plans of a gym
 * @param gymId
 * @returns list of subscription plans
 */
const getTotalRevenue = async (
  gymId: string,
  fromDate: any,
  toDate: any
): Promise<{ revenue: number }> => {
  try {
    const response = await apiClient.get(`subscriptions/revenue/gym/${gymId}?fromDate=${fromDate}&toDate=${toDate}`,);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subscription plans", error);
    throw error;
  }
};

export default getTotalRevenue;
