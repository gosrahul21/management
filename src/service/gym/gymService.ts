import axios from "axios";
import apiClient from "../apiClient";

const API_URL = "http://localhost:3000/gyms";

export const fetchGyms = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching gyms", error);
    throw error;
  }
};

export const createGym = async (gymData) => {
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
