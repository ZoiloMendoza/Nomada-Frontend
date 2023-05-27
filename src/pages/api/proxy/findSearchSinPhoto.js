import axios from 'axios';
const apiKey = process.env.NEXT_PUBLIC_API_TRIPADVISOR_KEY;

export default async function handler(req, res) {
  const data = await getDataFindSearchSinPhoto();
  if (Object.keys(data).length === 0) {
    return res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
  return res.status(200).json(data);
}
export async function getDataFindSearchSinPhoto({ params }) {
  const replaceSpace = (data) => Object.entries(data).reduce((newData, [key, value]) => {
      newData[key] = typeof value === 'string' ? value.replace(/ /g, '%20') : value;
      return newData;
    }, {});
  const newParams = replaceSpace(params);
  const location = `${newParams?.destino}%20${newParams?.paisDestino}`;
  //console.log(location, 'getDataFindSearchSinPhoto');
  const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${location}&category=geos&language=en`;
  try {
    const response = await axios.get(apiUrl);
    if (!response.data || !response.data.data) {
      return {};
    }
    const locationId = response?.data?.data[0];
    const responseDetalle = await axios.get(
      `https://api.content.tripadvisor.com/api/v1/location/${locationId.location_id}/details?key=${apiKey}&language=en&currency=USD`,
    );
    const infoDeralle = responseDetalle?.data;
    return {latitude: infoDeralle?.latitude, longitude: infoDeralle?.longitude };
  } catch (error) {
    console.error(error);
  }
}
