import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import MapDisplay from '@/components/map/mapDisplay';
import SearchBar from '@/components/map/SearchMapa';

const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

const styles = {
  title: {
    marginLeft: '15px',
  },
};

export default function Mapa() {
  const router = useRouter();
  const [rutaData, setRutaData] = useState(null);
  const { idRuta } = router.query;
  // console.log(idRuta);
  useEffect(() => {
    const getRuta = async () => {
      const responseRuta = await axios.get(`${URLRAILWAY}/api/v1/rutas/${idRuta}`);
      setRutaData(responseRuta.data);
    };
    if (idRuta) {
      getRuta();
    }
  }, [idRuta]);
  console.log(rutaData);
  return (
    <>
      <SearchBar />
      <h1 sx={styles.title}>Mapa de actividades en: </h1>
      {rutaData && <MapDisplay actividades={rutaData?.actividades} />}
    </>
  );
}
