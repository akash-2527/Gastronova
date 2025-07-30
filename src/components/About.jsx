import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const AboutPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2 // Reduced delay for faster loading
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInFromLeft = {
    hidden: { 
      opacity: 0, 
      x: -100 
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
      x: 100 
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

  const scaleIn = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const valuesVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3 
      }
    }
  };

  // Sequential animation variants for proper timing
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const legacyVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.8 // Appears after header with proper delay
      }
    }
  };

  // Restore previous individual paragraph animations for legacy section
  const legacyTitleVariants = {
    hidden: { 
      opacity: 0, 
      x: -100 
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

  const legacyParagraph1 = {
    hidden: { 
      opacity: 0, 
      x: 100 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const legacyParagraph2 = {
    hidden: { 
      opacity: 0, 
      x: -100 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  const legacyParagraph3 = {
    hidden: { 
      opacity: 0, 
      x: 100 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.6
      }
    }
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* About Header */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <motion.h1 
              className="text-4xl font-bold text-blue-900 mb-6"
              variants={itemVariants}
            >
              About GASTRO NOVA
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Pioneering advanced gastrointestinal and liver wellness solutions with a commitment to excellence,
              innovation, and personalized patient care.
            </motion.p>
          </motion.div>

          {/* OUR LEGACY Section */}
          <motion.div 
            className="bg-white p-10 mb-20 rounded-2xl border border-gray-200 shadow-md"
            initial="hidden"
            animate="visible"
            variants={legacyVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.h2 
              className="text-3xl font-bold text-blue-900 mb-6 text-center"
              variants={itemVariants}
            >
              Our Legacy
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-6"
              variants={itemVariants}
            >
              At <strong>GASTRO NOVA</strong>, we believe that optimal digestive and liver health is a fundamental right for all.
              With over 25 years of specialized experience in gastroenterology and hepatology, we are dedicated to advancing
              the science, development, and delivery of innovative, accessible, and high-quality therapies that restore and
              protect vital functions. Grounded in clinical expertise, guided by empathy, and driven by cutting-edge research,
              we are committed to transforming GI and liver care for a healthier tomorrow.
            </motion.p>
          
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-6"
              variants={itemVariants}
            >
              With decades of trusted presence in the healthcare industry, <strong>GASTRO NOVA</strong> has been shaped by
              principles of dependability, continuity, and ethical conduct. Our enduring pursuit of excellence fuels meaningful
              advancements in healthcare delivery across regions, populations, and clinical environments.
            </motion.p>

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-6"
              variants={itemVariants}
            >
              Ranging from essential generics to sophisticated therapeutic innovations, our diverse and expanding product
              portfolio is a testament to our comprehensive understanding of evolving patient needs and scientific advancement.
              Each formulation is manufactured in WHO-GMP certified facilities, ensuring adherence to the highest standards of
              global quality and regulatory compliance. Valued by healthcare professionals and patients alike, our offerings
              continue to contribute to lasting, positive health outcomes worldwide.
            </motion.p>
          </motion.div>

          {/* Our Values Section */}
          <motion.div 
            className="bg-gray-50 p-12 rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scaleIn}
            whileHover={{ 
              scale: 1.01,
              transition: { duration: 0.3 }
            }}
          >
            <motion.h2 
              className="text-3xl font-bold text-blue-900 mb-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              Our Values
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={valuesVariants}
            >
              {[
                {
                  title: "Excellence",
                  description:
                    "Committed to delivering the highest quality care and achieving superior treatment outcomes for every patient.",
                },
                {
                  title: "Innovation",
                  description:
                    "Embracing cutting-edge technologies and advanced treatment methodologies to stay at the forefront of medical care.",
                },
                {
                  title: "Compassion",
                  description:
                    "Providing empathetic, patient-centered care that addresses both physical health and emotional well-being.",
                },
              ].map((value, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ 
                      backgroundColor: "#10b981",
                      transition: { duration: 0.6 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shield className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold text-blue-900 mb-3"
                    variants={itemVariants}
                  >
                    {value.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600"
                    variants={itemVariants}
                  >
                    {value.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;