// src/service/image/imageService.js

import apiClient from "../apiClient";

export const uploadImage = async (imageFile: string) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await apiClient.post('/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image', error);
    throw error;
  }
};
