import apiClient from "../apiClient";

export const getExpenses = async (gymId: string, from: Date, to: Date) => {
  try {
    const response = await apiClient.get(`/expenses/gym/${gymId}?from=${from}&to=${to}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch groups", error);
    throw error;
  }
};

