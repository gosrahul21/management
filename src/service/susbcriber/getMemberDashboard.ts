import apiClient from "../apiClient";

export const getMembersDashboard = async (gymId: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/members/dashboard/${gymId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch members by gym", error);
      throw error;
    }
  };