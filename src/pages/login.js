import NavbarTwo from '@/components/Navbar/NavbarTwo';
import Add from '@/components/Add/Add';
import PlaceCards from '@/components/Add/PlaceCards';
import Footer from '@/components/Footer/Footer';

import { data } from '@/components/Add/data';

export default function Login() {
  return (
    <>
      <NavbarTwo/>
      <Add/>
      <PlaceCards data={data} />

      <Footer/>
    </>
  );
}
