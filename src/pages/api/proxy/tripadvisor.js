import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;

export default async function handler(req, res) {
  const data = await getData();
  if (!data) {
    return res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
  return res.status(200).json(data);
}
export async function getData({ params }) {
  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/25126761/details?key=${apiKey}&language=en&currency=USD`;
  try {
    const response = await axios.get(apiUrl);
    if (!response) {
      return {};
    }
    return response.data
  } catch (error) {
    console.error(error);
  }
}