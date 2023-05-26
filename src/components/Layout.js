//import React, { PropsWithChildren } from 'react';
import NavbarTwo from './Navbar/NavbarTwo';
import Footer from './Footer/Footer';

const Layout = ({ children }) => (
  <>
    <NavbarTwo />
    {children}

    <Footer />
  </>
);
export default Layout;
