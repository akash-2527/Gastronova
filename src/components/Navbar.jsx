import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/kk.png';

const Logo = () => (
  <Link 
    to="/" 
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
  >
    <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
    <div>
      <h1 className="text-xl font-bold text-blue-900">GASTRO NOVA</h1>
      <p className="text-sm text-gray-600">Advanced GI & Liver Wellness</p>
    </div>
  </Link>
);

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Define navigation items with their routes
  const navItems = [
    { name: 'home', path: '/' },
    { name: 'about us', path: '/about' },
    { name: 'contact', path: '/contact' }
  ];

  // Function to check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle link click with scroll to top
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleLinkClick}
                className={`px-4 py-2 rounded-lg capitalize font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-green-500 text-white'
                    : 'text-blue-900 hover:text-green-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`block w-full text-left px-4 py-3 capitalize font-medium ${
                    isActive(item.path)
                      ? 'bg-green-500 text-white'
                      : 'text-blue-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;