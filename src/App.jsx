import React, { useState } from 'react';
import Nav from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
      
      {/* WhatsApp Chat Icon */}
      {/* WhatsApp Chat Icon - Improved for all devices */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <a 
          href="https://wa.me/18001234567" 
          className="group bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp 
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-12" 
            fill="currentColor"
          />
          {/* Pulse animation for better visibility */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-30 group-hover:opacity-0"></div>
        </a>
        
        {/* Tooltip for desktop */}
        <div className="hidden sm:block absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
        </div>
    </div>
  );
}

export default App;