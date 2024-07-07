// services/groupService.js

import apiClient from "./apiClient";

const getGroups = async (gymId: string) => {
  try {
    const response = await apiClient.get(`/groups/gym/${gymId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch groups", error);
    throw error;
  }
};

const createGroup = async (groupData: any) => {
  try {
    const response = await apiClient.post(`/groups`, groupData);
    return response.data;
  } catch (error) {
    console.error("Failed to create group", error);
    throw error;
  }
};

export { getGroups, createGroup };
