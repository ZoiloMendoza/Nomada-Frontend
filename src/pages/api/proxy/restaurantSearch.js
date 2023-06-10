import axios from 'axios';
const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;

export default async function handler(req, res) {
  const { latitude, longitude, category } = req.query;
  const host = req.headers.host;
  const data = await getData({ latitude, longitude, category, host });
  if (Object.keys(data).length === 0) {
    return res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
  return res.status(200).json(data);
}

export async function fetchData(url, headers) {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getData(params) {
  const { latitude, longitude, category, host } = params;
  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${latitude}%2C${longitude}&key=${apiKey}&category=${category}&radius=60&radiusUnit=km&language=en`;
  console.log(host, 'es mi host');
  const headers = {
    accept: 'application/json',
    origin: 'https://nomada-frontend.vercel.app',
    "Referer": "https://nomada-frontend.vercel.app",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };

  const responseData = await fetchData(apiUrl, headers);
  if (!responseData || !responseData.data) {
    return [];
  }

  const locationData = responseData.data.slice(0, 3);
  const exampleData = await Promise.all(
    locationData.map(async (item) => {
      const photoUrl = `https://api.content.tripadvisor.com/api/v1/location/${item.location_id}/photos?key=${apiKey}&language=en`;
      const photoData = await fetchData(photoUrl, headers);
      console.log(photoData, 'restaurante');
      return { ...item, ...(photoData || { data: [] }) };
    })
  );

  return exampleData;
}
