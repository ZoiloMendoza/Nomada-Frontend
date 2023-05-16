import { Html, Head, Main, NextScript } from 'next/document';
import NavbarTwo from '@/components/Navbar/NavbarTwo';
import Footer from '@/components/Footer/Footer';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <NavbarTwo />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
