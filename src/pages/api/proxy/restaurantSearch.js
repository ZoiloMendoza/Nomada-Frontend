import axios from 'axios';
const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;

export default async function handler(req, res) {
  const data = await getData();
  if (Object.keys(data).length === 0) {
    return res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
  return res.status(200).json(data);
}

export async function getData(params) {
  console.log('params de proxy',params)
  const { latitude, longitude, category} = params
  //const latitude = params.latitude; //se obtiene de LocationDetails
  //const longitude = params.longitude; //se obtiene de LocationDetails
  //const category = 'restaurants';
  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${latitude}%2C${longitude}&key=${apiKey}&category=${category}&radius=60&radiusUnit=km&language=en`;

  try {
    const response = await axios.get(apiUrl);
    if (!response.data || !response.data.data) {
      return {};
    }

    const locationData = response.data.data.slice(0, 4);
    const exampleData = await Promise.all(
      locationData.map(async (item) => {
        try {
          const responsePhoto = await axios.get(
            `https://api.content.tripadvisor.com/api/v1/location/${item.location_id}/photos?key=${apiKey}&language=en`,
          );
          const photoData = responsePhoto?.data || { data: [] };
          return { ...item, ...photoData };
        } catch (error) {
          console.error(`Error fetching photo for location ${item.location_id}:`, error);
          return item;
        }
      }),
    );
    return exampleData;
  } catch (error) {
    
    return {};
    
  }
}
