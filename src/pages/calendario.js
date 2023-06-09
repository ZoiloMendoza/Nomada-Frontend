import Calendario from '@/components/Calendario/Calendario';
import Head from 'next/head';
import styles from '@/styles/Crear-viaje.module.css';
import { useAuth } from '@/utils/useAuth';
import axios from 'axios';
import { useState, useEffect } from 'react';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
export default function CalendarioPages() {
  const usuario = useAuth();
  const [viajesDelUsuario, setViajesDelUsuario] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const validacionViaje = async () => {
      try {
        const viajesDelUsuario = await axios.get(`${URLRAILWAY}/api/v1/users/${usuario.idUser}`);
        if (viajesDelUsuario.status === 200) {
          setViajesDelUsuario(viajesDelUsuario.data.viajes);
          console.log(viajesDelUsuario.data.viajes, 'viajes del usuario en calendario');
        }
      } catch (error) {
        console.error('Error fetching data', error);
        setError(error); 
      }
    };
    if (usuario) {
      validacionViaje();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <Head>
        <title>Nomada</title>
      </Head>
      <main className={styles.main}>
        <div>
          {viajesDelUsuario && <Calendario viajes={viajesDelUsuario}/>}
        </div>
      </main>
    </>
  );
}
