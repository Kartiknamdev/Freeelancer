import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo1.png";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    const debouncedScroll = () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(handleScroll, 100);
    };
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [handleScroll]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-100 ${
        scrolled ? 'bg-white shadow-sm ' : 'bg-white'
      } ${menuOpen ? 'bg-white' : ''}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="hero" smooth={true} duration={500}>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src={logo}
                alt="PeerTask Logo"
                className="h-8 w-8 object-contain"
                loading="lazy"
              />
              <span className="text-xl font-bold text-blue-600">PeerTask</span>
            </div>
          </NavLink>
        </div>

        <div
          className="md:hidden cursor-pointer"
          onClick={toggleMenu}
        >
          <div className={`space-y-1.5 ${menuOpen ? 'transform rotate-90' : ''}`}>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 transform ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 md:static md:flex md:flex-row md:space-y-0 md:space-x-6 md:translate-x-0`}
        >
          <ul className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-6">
            <li>
              <NavLink
                to="features"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-500 transition"
              >
                Features
              </NavLink>
            </li>
            <li>
              <NavLink
                to="how-it-works"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-500 transition"
              >
                How It Works
              </NavLink>
            </li>
            <li>
              <NavLink
                to="testimonials"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-500 transition"
              >
                Testimonials
              </NavLink>
            </li>
            <li>
              <NavLink
                to="faq"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-500 transition"
              >
                FAQ
              </NavLink>
            </li>
          </ul>
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <NavLink to='login' className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
              Log In
            </NavLink>
            <NavLink to='signup' className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Sign Up
            </NavLink>
          </div>
          </div>
    </nav>
  );
};

export default Navbar;
