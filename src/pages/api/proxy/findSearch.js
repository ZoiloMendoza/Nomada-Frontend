
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
    const locationId = response.data.data[0];
    const exampleData = await Promise.all(async()=> {
      try{
        const responseDetalle = await axios.get(
          `https://api.content.tripadvisor.com/api/v1/location/${locationId.location_id}/details?key=${apiKey}&language=en&currency=USD`
        )
        return {...responseDetalle.data}
      } catch (error) {
        return item;
      }
    }
      
        
    
    );
    console.log('destinoooooo',exampleData)
    return exampleData;
  } catch (error) {
    console.error(error);
  }
}