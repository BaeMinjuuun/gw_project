import axios from "axios";
import { API_URL } from "../config/constants";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("image_url", file);

  try {
    const response = await axios.post(
      `${API_URL}/resourceRegisters/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
};
