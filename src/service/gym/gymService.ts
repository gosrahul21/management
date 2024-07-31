import apiClient from "../apiClient";

export const fetchGyms = async () => {
  try {
    const response = await apiClient.get("/gyms");
    return response.data;
  } catch (error) {
    console.error("Error fetching gyms", error);
    throw error;
  }
};

export const createGym = async (gymData: any) => {
  try {
    const response = await apiClient.post("/gyms", gymData);
    return response.data;
  } catch (error) {
    console.error("Error creating gym", error);
    throw error;
  }
};

export const getGymDetails = async (gymId: string) => {
  try {
    const response = await apiClient.get(`/gyms/${gymId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gym details", error);
    throw error;
  }
};
