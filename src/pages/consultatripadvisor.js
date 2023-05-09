import axios from 'axios';
import { useEffect } from 'react';

export default function Registro() {
  useEffect(() => {
    axios
      .get('/api/proxy/tripadvisor')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}
