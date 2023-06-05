import axios from 'axios';

const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

export async function fetchTripData(tripId) {
  try {
    const response = await axios.get(`${URLRAILWAY}/api/v1/viajes/${tripId}`);
    if (response.status === 200) {
      const tripData = null;
      return tripData;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
