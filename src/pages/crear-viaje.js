import BoardingPassCardWrapper from '@/components/CrearViaje/CrearViaje';

import styles from '@/styles/Crear-viaje.module.css';

export default function Crear() {
  return (
    <>
      <main className={styles.main}>
        <div>
          <BoardingPassCardWrapper />
        </div>
      </main>
    </>
  );
}
