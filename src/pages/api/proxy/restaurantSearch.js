import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;

export default async function handler(req, res) {
  const latitude = '21.14967'; //se obtiene de LocationDetails
  const longitude = '-86.80287'; //se obtiene de LocationDetails
  const category = 'restaurants';

  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${latitude}%2C${longitude}&key=${apiKey}&category=${category}&radius=60&radiusUnit=km&language=en`;

  try {
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.data) {
      res.status(500).json({ error: 'No data received from the TripAdvisor API' });
      return;
    }

    const locationData = response.data.data;
    const exampleData = await Promise.all(
      locationData.map(async (item) => {
        try {
          const responsePhoto = await axios.get(
            `https://api.content.tripadvisor.com/api/v1/location/${item.location_id}/photos?key=${apiKey}&language=en`,
          );
          return { ...item, ...responsePhoto.data };
        } catch (error) {
          console.error(`Error fetching photo for location ${item.location_id}:`, error);
          return item;
        }
      }),
    );

    res.status(200).json(exampleData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
}
