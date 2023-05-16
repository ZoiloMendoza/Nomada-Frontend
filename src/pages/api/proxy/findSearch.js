
import axios from 'axios';
const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;
export default async function handler(req, res) {
  const data = await getData();
  if (Object.keys(data).length === 0) {
    return res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
  return res.status(200).json(data);
}
export async function getData({ params }) {
  const location = `${params.destino} ${params.paisDestino}`;
  console.log(location, 'getData');
  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=Mexico%20city%20Mx&category=geos&language=en`;
  try {
    const response = await axios.get(apiUrl);
    if (!response.data || !response.data.data) {
      return {};
    }
    console.log('destinoooooo',response.data)
    return response.data.data[0];
  } catch (error) {
    console.error(error);
  }
}