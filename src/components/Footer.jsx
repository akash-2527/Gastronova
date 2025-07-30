import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/kk.png';

const Logo = () => (
  <motion.div 
    className="flex items-center gap-3"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <motion.img 
      src={logo} 
      alt="Logo" 
      className="w-16 h-16 object-contain"
      whileHover={{ rotate: 5 }}
      transition={{ duration: 0.3 }}
    />
    <div>
      <motion.h1 
        className="text-xl font-bold text-blue-900"
        whileHover={{ color: "#059669" }}
        transition={{ duration: 0.3 }}
      >
        GASTRO NOVA
      </motion.h1>
      <p className="text-sm text-gray-600">Advanced GI & Liver Wellness</p>
    </div>
  </motion.div>
);

const Footer = () => {
  const location = useLocation();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Define navigation items with their routes
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Function to check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle link click with scroll to top
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2 // Reduced delay for faster loading
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const linksContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3 // Reduced delay for footer links
      }
    }
  };

  return (
    <motion.footer 
      style={{ backgroundColor: 'rgb(252, 248, 230)' }} 
      className="text-white py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {/* Logo Section */}
          <motion.div variants={itemVariants}>
            <Logo />
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="font-semibold text-blue-900 mb-4"
            >
              Quick Links
            </motion.h3>
            <motion.div 
              className="space-y-2"
              variants={linksContainerVariants}
            >
              {navItems.map((item) => (
                <motion.div key={item.name} variants={linkVariants}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`block transition-colors duration-300 ${
                      isActive(item.path)
                        ? 'text-green-600 font-semibold'
                        : 'text-blue-900 hover:text-green-600'
                    }`}
                  >
                    <motion.span
                      whileHover={{ 
                        scale: 1.05,
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="font-semibold text-blue-900 mb-4"
            >
              Contact Info
            </motion.h3>
            <motion.div 
              className="space-y-2 text-blue-900"
              variants={linksContainerVariants}
            >
              <motion.p 
                variants={linkVariants}
                whileHover={{ 
                  scale: 1.02,
                  color: "#059669",
                  x: 5,
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer"
              >
                +91 99122 28610
              </motion.p>
              <motion.p 
                variants={linkVariants}
                whileHover={{ 
                  scale: 1.02,
                  color: "#059669",
                  x: 5,
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer"
              >
                contact-us@gastronova.in
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div 
          className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p
            whileHover={{ 
              scale: 1.02,
              color: "#059669",
              transition: { duration: 0.3 }
            }}
          >
            &copy; 2025 Gastro Nova. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;