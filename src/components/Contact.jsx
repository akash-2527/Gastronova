import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
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
        delayChildren: 0.4 // Reduced delay for contact info
      }
    }
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-white to-blue-50">
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
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Let's work together for better GI and liver health. Reach out to our dedicated support team — we're here to help!
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              className="flex flex-col justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInFromLeft}
            >
              <motion.h2 
                className="text-2xl font-bold text-blue-900 mb-8"
                variants={itemVariants}
              >
                Get in Touch
              </motion.h2>

              <motion.div 
                className="space-y-10"
                variants={contactInfoVariants}
              >
                {/* Phone */}
                <motion.div 
                  className="flex items-start gap-4"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      backgroundColor: "#10b981",
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-blue-900 text-lg">Phone</h3>
                    <p className="text-gray-700">+91 99122 28610</p>
                    <p className="text-sm text-gray-500">Mon–Fri, 8:00 AM – 6:00 PM</p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                  className="flex items-start gap-4"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: -5,
                      backgroundColor: "#10b981",
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-blue-900 text-lg">Email</h3>
                    <p className="text-gray-700">contact-us@gastronova.in</p>
                    <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="bg-white border border-gray-200 shadow-md p-8 rounded-3xl"
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
                Send Us a Message
              </motion.h2>
              
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={formVariants}
              >
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
                    Message <span className="text-red-500">*</span>
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="How can we assist you?"
                    whileFocus={{ 
                      scale: 1.02,
                      borderColor: "#3b82f6",
                      transition: { duration: 0.2 }
                    }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-green-500  text-white font-semibold py-3 rounded-lg transition duration-200"
                  variants={inputVariants}
                  whileHover={{ 
                    boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    
                    transition: { duration: 0.1 }
                  }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;