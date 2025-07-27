import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo + Description */}
          <div>
            <div className="flex items-center space-x-2 text-white text-xl font-bold mb-3">
              <span className="text-3xl">🍃</span>
              <span>GASTRO NOVA</span>
            </div>
            <p className="text-sm text-gray-400">Advanced GI & Liver Wellness</p>
            <p className="mt-2 text-sm text-gray-400">
              With over 25 years of expertise in pharmaceutical industry, 
              we deliver transformative healthcare solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#products" className="hover:text-white">Products</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#liver-care" className="hover:text-white">Liver Care</a></li>
              <li><a href="#gut-health" className="hover:text-white">Gut Health</a></li>
              <li><a href="#amino-acid" className="hover:text-white">Amino Acid Supplements</a></li>
              <li><a href="#otc" className="hover:text-white">OTC Solutions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span> 123 Health St., Htex 456
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span> +1 (800) 123-4567
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span> info@gastronova.com
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col lg:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 lg:mb-0">&copy; 2025 Gastro Nova. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
            <a href="#cookies" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>

      
     
    </footer>
  );
};

export default Footer;