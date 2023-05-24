import axios from 'axios';

export default async function handler(req, res) {
  try {
    const data = await searchLocation();
    if (Object.keys(data).length === 0) {
      return res.status(500).json({ error: 'Error al obtener los datos de geolocalización' });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log('Error al obtener los datos de geolocalización', error);
    return res.status(500).json({ error: 'Error al obtener los datos de geolocalización' });
  }
}

export async function searchLocation(destino) {
  const address = destino;
  const apiKey = 'eb3324be954b49dcae0dc6c606104a91';

  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: address,
        key: apiKey,
      },
    });

    if (!response.data || !response.data.results || response.data.results.length === 0) {
      return { error: 'No se encontraron resultados' };
    }

    const results = response.data.results;
    const firstResult = results[0];
    const { formatted, geometry } = firstResult;
    const latitude = geometry.lat;
    const longitude = geometry.lng;
    return { latitude, longitude };
  } catch (error) {
    console.log('Error al obtener los datos de geolocalización', error);
    return { error: 'Error al obtener los datos de geolocalización' };
  }
}
