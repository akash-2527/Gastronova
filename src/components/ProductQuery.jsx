import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import apiService from '../services/api';

const ProductsQuery = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const products = [
    'Select Product Category',
    'Select Product Category',
    'Gastrointestinal Supplements',
    'Liver Health Products',
    'Digestive Enzymes',
    'Probiotics',
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitQuery = async (queryData) => {
    try {
      const response = await apiService.submitProductQuery(queryData);
      return { success: true, data: response };
    } catch (error) {
      console.error('Product query submission failed:', error);
      return { success: false, error: error.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.product || formData.product === 'Select Product Category' || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await submitQuery(formData);
    
    if (result.success) {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        product: '',
        message: ''
      });
    } else {
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setSubmitStatus(null);
  };

  // Animation variants (same as original)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
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

  const slideInFromLeft = {
    hidden: { 
      opacity: 0, 
      x: -60 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInFromRight = {
    hidden: { 
      opacity: 0, 
      x: 60 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3 
      }
    }
  };

  const inputVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contactInfoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
              variants={itemVariants}
            >
              Product Related Query
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Your health is our priority, and we're here to walk every step with you.
              If you have questions about any product, don't hesitate — we're just a message away.        
            </motion.p>
          </motion.div>

          {/* Contact Form - Centered */}
          <div className="flex justify-center">
            <motion.div 
              className="bg-white border border-gray-200 shadow-md p-8 rounded-3xl w-full max-w-4xl relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInFromRight}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.h2 
                className="text-2xl font-bold text-blue-900 mb-6"
                variants={itemVariants}
              >
                Send Us Your Product Query
              </motion.h2>
              
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={formVariants}
              >
                {/* Row 1: Full Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={inputVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter your full name"
                      whileFocus={{ 
                        scale: 1.02,
                        borderColor: "#3b82f6",
                        transition: { duration: 0.2 }
                      }}
                    />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter your email address"
                      whileFocus={{ 
                        scale: 1.02,
                        borderColor: "#3b82f6",
                        transition: { duration: 0.2 }
                      }}
                    />
                  </motion.div>
                </div>

                {/* Row 2: Phone and Product Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={inputVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <motion.input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter your phone number"
                      whileFocus={{ 
                        scale: 1.02,
                        borderColor: "#3b82f6",
                        transition: { duration: 0.2 }
                      }}
                    />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Category <span className="text-red-500">*</span>
                    </label>
                    <motion.select
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      whileFocus={{ 
                        scale: 1.02,
                        borderColor: "#3b82f6",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {products.map((product, index) => (
                        <option key={index} value={product} disabled={index === 0}>
                          {product}
                        </option>
                      ))}
                    </motion.select>
                  </motion.div>
                </div>

                {/* Row 3: Message */}
                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Tell us about your product requirements, quantities needed, or any specific questions..."
                    whileFocus={{ 
                      scale: 1.02,
                      borderColor: "#3b82f6",
                      transition: { duration: 0.2 }
                    }}
                  />
                </motion.div>

                <motion.div
                  className="relative overflow-hidden"
                  variants={inputVariants}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 relative overflow-hidden"
                    whileHover={!isSubmitting ? { 
                      boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    } : {}}
                    whileTap={!isSubmitting ? { 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    } : {}}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Sending Message...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="send"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </div>

        {/* Elegant Rocket Flight Animation */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Rocket Icon */}
              <motion.div
                className="absolute"
                initial={{ 
                  x: "5vw", 
                  y: "85vh",
                  scale: 1,
                  rotate: 0
                }}
                animate={{ 
                  x: "90vw",
                  y: "10vh",
                  scale: [1, 1.2, 0.8],
                  rotate: 45
                }}
                transition={{ 
                  duration: 3,
                  ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth flight
                }}
              >
                {/* Main Rocket */}
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 5px rgba(34, 197, 94, 0.3))",
                      "drop-shadow(0 0 15px rgba(34, 197, 94, 0.6))",
                      "drop-shadow(0 0 10px rgba(34, 197, 94, 0.4))"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <Send className="w-6 h-6 text-green-500" />
                </motion.div>

                {/* Air Dash Lines - Behind Rocket */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`dash-${i}`}
                    className="absolute h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"
                    style={{
                      left: `-${30 + i * 15}px`,
                      top: `${10 + i * 2}px`,
                      width: `${20 + i * 5}px`,
                    }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scaleX: [0.5, 1, 0.3],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* Air Force Swirls */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`swirl-${i}`}
                    className="absolute w-4 h-4 border-2 border-blue-300 rounded-full"
                    style={{
                      left: `-${25 + i * 20}px`,
                      top: `${5 + i * 8}px`,
                    }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      scale: [0.3, 1, 1.5],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* Speed Lines */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`speed-${i}`}
                    className="absolute h-px bg-gradient-to-r from-green-400 to-transparent"
                    style={{
                      left: `-${40 + i * 10}px`,
                      top: `${12 + Math.sin(i) * 8}px`,
                      width: `${25 + i * 8}px`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scaleX: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: "linear"
                    }}
                  />
                ))}

                {/* Particle Trail */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1.5 h-1.5 bg-green-400 rounded-full"
                    style={{
                      left: `-${15 + i * 8}px`,
                      top: `${8 + Math.random() * 16}px`,
                    }}
                    animate={{
                      opacity: [1, 0],
                      scale: [1, 0],
                      x: [0, -30],
                      y: [0, Math.random() * 20 - 10],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* Wind Effect Curves */}
                <motion.div
                  className="absolute -left-8 top-2"
                  animate={{
                    opacity: [0, 0.4, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg width="30" height="20" viewBox="0 0 30 20" className="text-blue-300">
                    <path
                      d="M2 10 Q8 5 15 10 T28 10"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M2 15 Q8 10 15 15 T28 15"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.4"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Air Pressure Waves */}
              <motion.div
                className="absolute"
                initial={{ x: "5vw", y: "85vh" }}
                animate={{ 
                  x: "90vw",
                  y: "10vh"
                }}
                transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`wave-${i}`}
                    className="absolute border border-blue-200 rounded-full"
                    animate={{
                      width: [0, 40, 80],
                      height: [0, 40, 80],
                      opacity: [0.8, 0.3, 0],
                      x: [-20, -40],
                      y: [-20, -40],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Success Message */}
              <motion.div
                className="absolute top-20 right-10 bg-white/90 backdrop-blur-sm border border-green-200 rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 2.5, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium text-sm"></span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Success/Error Modals */}
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {submitStatus === 'success' ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Query Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for your product inquiry. Our team will get back to you within 24 hours with detailed information.
                  </p>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't send your query. Please try again or contact us directly.
                  </p>
                </>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsQuery;