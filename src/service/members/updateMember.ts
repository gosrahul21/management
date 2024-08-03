import apiClient from "../apiClient";

export const updateProfileDetails = async (
    userId: string, 
    data: any
  ): Promise<any> => {
    try {
      const response = await apiClient.patch(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error("Failed to Add Subscription", error);
      throw error;
    }
  };
  