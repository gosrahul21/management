import apiClient from "../apiClient";

export const createEmployee = async (employeeData: string) => {
  try {
    const response = await apiClient.post("/employees", employeeData);
    return response.data;
  } catch (error) {
    console.error("Failed to create employee", error);
    throw error;
  }
};
