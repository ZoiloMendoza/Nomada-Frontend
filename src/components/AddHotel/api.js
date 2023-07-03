import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND;

export const createHospedaje = async (hospedaje) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/hospedajes`, hospedaje);
    return response.data;
  } catch (error) {
    throw error;
  }
};
