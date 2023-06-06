import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
    if (!usuarioLogeado) {
      router.replace('/registro');
      return;
    }

    setUser(usuarioLogeado);
  }, [router]);

  return user;
}