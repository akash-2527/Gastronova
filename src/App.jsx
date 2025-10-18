import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navbar';
import HomePage from './components/Home';
import AboutPage from './components/About.jsx';
import ContactPage from './components/Contact';
import Footer from './components/Footer';
import ProductsQuery from './components/ProductQuery.jsx';  
import Careers from './components/Careers.jsx';
import ProductsPage from './components/Products.jsx';
import ProductDetail from './components/ProductDetail';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navigation Bar */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/product-related-query" element={<ProductsQuery />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            
            
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;