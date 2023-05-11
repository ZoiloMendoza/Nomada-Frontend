import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;

export default async function handler(req, res) {
  const latitude = '21.14967'; //se obtiene de LocationDetails
  const longitude = '-86.80287'; //se obtiene de LocationDetails
  const category = 'geos';

  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${latitude}%2C${longitude}&key=${apiKey}&category=${category}&radius=60&radiusUnit=km&language=en`;

  try {
    const response = await axios.get(apiUrl);
    const locationData = response.data.data;
    const exampleData = locationData.map( async (item) => {
      const responsePhoto = await axios.get(
        `https://api.content.tripadvisor.com/api/v1/location/${item.location_id}/photos?key=${apiKey}&language=en`,
      );
      return item;
    });
    res.status(200).json(exampleData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
}
