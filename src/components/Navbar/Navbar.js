import { useState } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // aquí va la lógica del logout... pendiente
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link legacyBehavior href="/">
          <a className="navbar-logo">NomadApp</a>
        </Link>

        <div className="navbar-links">
          <Link legacyBehavior href="/about">
            <a>About</a>
          </Link>

          {!isLoggedIn && (
            <Link legacyBehavior href="/login">
              <a>Login</a>
            </Link>
          )}

          {isLoggedIn && (
            <>
              <Link legacyBehavior href="/dashboard">
                <a>Dashboard</a>
              </Link>

              <div className="navbar-dropdown">
                <div className="navbar-dropdown-toggle" onClick={toggleMenu}>
                  <FaUser />
                </div>

                {showMenu && (
                  <div className="navbar-dropdown-menu">
                    <Link legacyBehavior href="/account-settings">
                      <a>Account Settings</a>
                    </Link>
                    <Link legacyBehavior href="/favorites">
                      <a>Favorites</a>
                    </Link>
                    <Link legacyBehavior href="/likes">
                      <a>Likes</a>
                    </Link>
                    <button onClick={handleLogout}>Log out</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #FFFFFF;
          padding: 1rem;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }

        .navbar-container {
          display: flex;
          align-items: center;
        }

        .navbar-logo {
          font-weight: bold;
          font-size: 1.5rem;
          color: #000000;
          margin-right: 2rem;
        }

        .navbar-links a {
          color: #000000;
          margin-right: 1.5rem;
          transition: color 0.2s ease-in-out;
        }

        .navbar-links a:hover {
          color: #FF0000;
        }

        .navbar-links {
          display: flex;
          align-items: center;
        }

        .navbar-dropdown {
          position: relative;
        }

        .navbar-dropdown-toggle {
          display: flex;
          align-items: center;
          margin-left: 1.5rem;
          cursor: pointer;
        }

        .navbar-dropdown-toggle:hover {
          color: #FF0000;
        }

        .navbar-dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: #FFFFFF;
          border: 1px solid #000000;
          padding: 1rem;
          z-index: 1;
        }

        .navbar-dropdown-menu a {
          color: #000000;
          display: block;
          margin-bottom: 0.5rem;
          transition: color 0.2s ease-in-out;
        }

        .navbar-dropdown-menu a:hover {
          color: #FF0000;
        }
      `}</style>
    </nav>
  );

};

export default Navbar;
