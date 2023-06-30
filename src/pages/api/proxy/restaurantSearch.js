import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;

export default async function handler(req, res) {
  const { latitude, longitude, category } = req.query;
  
  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${latitude}%2C${longitude}&key=${apiKey}&category=${category}&radius=60&radiusUnit=km&language=en`;
  const headers = {
    accept: 'application/json',
    origin: 'https://nomada-frontend.vercel.app',
    "Referer": "https://nomada-frontend.vercel.app",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };
  
  try {
    const response = await axios.get(apiUrl, { headers });
    if (!response.data || !response.data.data) {
      return res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
    }

    const locationData = response.data.data.slice(0, 6);
    const exampleData = await Promise.all(
      locationData.map(async (item) => {
        const photoUrl = `https://api.content.tripadvisor.com/api/v1/location/${item.location_id}/photos?key=${apiKey}&language=en`;
        const photoData = await axios.get(photoUrl, { headers });
        return { ...item, ...(photoData.data || { data: [] }) };
      })
    );

    return res.status(200).json(exampleData);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
}
