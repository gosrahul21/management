import apiClient from "../apiClient";

export const checkUserExists = async (username: string) => {
  try {
    const response = await apiClient.get(
      `/employee/check-existence?username=${username}`
    );
    return response.data.exists;
  } catch (error) {
    console.error("Failed to check user existence", error);
    throw error;
  }
};
