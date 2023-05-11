import axios from 'axios';

//const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;

export default async function handler(req, res) {
  //const location = '150807';
  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/150807/photos?key=04B3D3D80B1943A2983FE2683832EFD8&language=en`;

  try {
    const response = await axios.get(apiUrl);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
}
