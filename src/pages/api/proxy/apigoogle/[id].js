import axios from 'axios';

const API_GOOGLE = process.env.NEXT_PUBLIC_API_GOOGLE;
export default async function handler(req, res) {
  const {
    query: { placeId },
  } = req;
  try {
    console.log('api proxy',placeId)
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${API_GOOGLE}`
    );
    console.log('blabal')
    const photoReference = response.data.result.photos[0].photo_reference;
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_GOOGLE}`;
    console.log(photoUrl, 'dentro')
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the TripAdvisor API' });
  }
}

