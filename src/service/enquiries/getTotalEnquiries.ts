import apiClient from "../apiClient";

export const getTotalEnquiries = async (gymId: string, from: Date, to: Date) => {
  try {
    const response = await apiClient.get(`/gym-enquiries/gym/${gymId}?from=${from}&to=${to}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch groups", error);
    throw error;
  }
};

