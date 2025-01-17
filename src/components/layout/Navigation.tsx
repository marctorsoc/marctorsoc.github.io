import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DarkModeContext } from '../../utils/darkMode';

export default function Navigation() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { to: "/", text: "Home" },
    { to: "/academia", text: "Academia" },
    { to: "/blog", text: "Blog" },
    { to: "/resources", text: "Resources" }, 
    { to: "/about", text: "About" },
  ];

  return (
    <nav className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-xl font-bold animated-link">
            Stay curious, work hard, achieve anything
          </NavLink>

          <div className="flex items-center">
            {/* Desktop menu */}
            <ul className="hidden lg:flex items-center gap-14 text-xl ml-16 mr-16">
              {navItems.map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >
                    {item.text}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Hamburger button - mobile only */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded mr-4"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>

            {/* Dark mode button - always visible */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden mt-4`}>
          <ul className="flex flex-col space-y-4">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `block py-2 px-4 rounded transition-colors ${
                      isActive 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={closeMenu}
                >
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}