import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;
  const headers = {
    accept: 'application/json',
    origin: 'https://nomada-frontend.vercel.app',
    Referer: 'https://nomada-frontend.vercel.app',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/${id}/details?key=${apiKey}&language=en&currency=USD`;
  try {
    const response = await axios.get(apiUrl, { headers });
    if (!response) {
      return {};
    }
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
}
