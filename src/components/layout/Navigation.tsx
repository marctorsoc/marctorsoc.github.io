import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../utils/darkMode';

export default function Navigation() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center">
          <Link 
            to="/" 
            className="text-xl font-bold mb-4 md:mb-0 animated-link"
          >
            Stay curious, work hard, achieve anything.
          </Link>
          
          <div className="md:mx-auto">
            <ul className="flex flex-wrap gap-8 items-center text-lg">
              <li>
                <Link 
                  to="/academia" 
                  className="nav-link"
                >
                  Academia
                </Link>
              </li>
              <li>
                <Link 
                  to="/divulgation" 
                  className="nav-link"
                >
                  Divulgation
                </Link>
              </li>
              <li>
                <Link 
                  to="/off-topic" 
                  className="nav-link"
                >
                  Off-topic
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="nav-link"
                >
                  About me
                </Link>
              </li>
            </ul>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 mt-4 md:mt-0 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
            ) : (
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
} 