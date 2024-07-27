import apiClient from "../apiClient";

export const getEmployees = async (gymId: string) => {
  try {
    const response = await apiClient.get(`/employees/gym/${gymId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to create employee", error);
    throw error;
  }
};
