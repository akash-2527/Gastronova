import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import images using ES6 import statements
import missionImg from '/src/assets/mission.png';
import visionImg from '/src/assets/vision.png';
import lImg from '/src/assets/l.png';
import sImg from '/src/assets/s.png';
import pImg from '/src/assets/p.png';
import bImg from '/src/assets/b.png';
import expImg from '/src/assets/exp.png';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-blue-900 mb-6"
                variants={fadeInUp}
              >
                Advanced GI & Liver Wellness Solutions
              </motion.h1>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  onClick={() => navigate('/about')}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => navigate('/contact')}
                  className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-colors"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
            >
              <motion.div 
                className="w-full h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  src='https://img.freepik.com/free-photo/doctor-talking-with-her-patient_1139-318.jpg' 
                  alt="Doctor consultation" 
                  className="w-full h-full rounded-2xl object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className='py-20 px-4 max-w-6xl mx-auto'>
        {/* Mission */}
        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInLeft}>
            <motion.h2 
              className="text-3xl font-bold text-blue-900 mb-6"
              variants={fadeInUp}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-gray-700 mb-6"
              variants={fadeInUp}
            >
              At the heart of our mission is a commitment to becoming a trusted leader in GI therapeutics. We strive to deliver innovative, high-quality products that address real needs while ensuring every step we take aligns with ethical marketing principles. By focusing on doctor-centric engagement, we aim to foster long-term partnerships that drive better patient care and medical advancement.
            </motion.p>
          </motion.div>
          <motion.div 
            className="w-full h-74 flex items-center justify-center"
            variants={fadeInRight}
          >
            <motion.img 
              src={missionImg} 
              alt="Mission" 
              className="h-74 object-cover rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Vision */}
        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="p-8"
            variants={fadeInLeft}
          >
            <div className="w-full h-74 flex items-center justify-center">
              <motion.img 
                src={visionImg} 
                alt="vision" 
                className="h-74 object-cover rounded-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="order-1 md:order-2"
            variants={fadeInRight}
          >
            <motion.h2 
              className="text-3xl font-bold text-blue-900 mb-6"
              variants={fadeInUp}
            >
              Our Vision
            </motion.h2>
            <motion.p 
              className="text-gray-700 mb-6"
              variants={fadeInUp}
            >
              Our vision is to become a leading force in advanced gastrointestinal and liver wellness by delivering innovative, science-driven solutions that transform patient outcomes and elevate standards of care.
            </motion.p>
            <motion.p 
              className="text-gray-700"
              variants={fadeInUp}
            >
              We strive to empower individuals to enjoy healthier, fuller lives and to be recognized as trusted partners in the global journey toward GI and liver health excellence
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Product Categories Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            From Essential to Advanced – A Complete Range for Digestive and Liver Health.
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { img: lImg, title: "Liver Care", bg: "bg-green-200", color: "text-green-900" },
              { img: sImg, title: "Gut Health", bg: "bg-green-100", color: "text-green-900" },
              { img: bImg, title: "Amino Acid / Protein", bg: "bg-cyan-100", color: "text-cyan-900" },
              { img: pImg, title: "OTC", bg: "bg-blue-100", color: "text-blue-900" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`${item.bg} rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow`}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-5xl mb-4"
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={item.img} className='w-12 h-12' alt={item.title} />
                </motion.span>
                <h3 className={`text-xl font-semibold ${item.color}`}>{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      

      {/* Product Portfolio Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Product Portfolio Highlights
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Designed for precision care in gastrointestinal and liver wellness, our specialized portfolio blends therapeutic efficacy with advanced scientific innovation.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Proton Pump Inhibitors (PPI)",
                description: "Advanced acid suppression therapy for effective relief from acid reflux, GERD, and peptic ulcers – enhancing patient comfort and mucosal healing.",
                gradient: "from-blue-50 to-blue-100",
                color: "text-blue-900"
              },
              {
                title: "Pancreatin Enzymes",
                description: "Supports digestion by supplementing natural enzymes in patients with pancreatic insufficiency, improving nutrient absorption and GI health.",
                gradient: "from-green-50 to-green-100",
                color: "text-green-900"
              },
              {
                title: "Liver Care & Hepatoprotection",
                description: "Science-backed formulations for detoxification, regeneration, and protection of liver cells, targeting both acute and chronic hepatic conditions.",
                gradient: "from-yellow-50 to-yellow-100",
                color: "text-yellow-800"
              },
              {
                title: "GI Wellness",
                description: "A holistic approach to gastrointestinal health through probiotics, prebiotics, and gut-focused therapies promoting optimal microbiome balance.",
                gradient: "from-indigo-50 to-indigo-100",
                color: "text-indigo-800"
              },
              {
                title: "Protein & Amino Acid Nutrition",
                description: "Essential nutritional support for recovery, muscle maintenance, and metabolic function—ideal for patients with compromised GI absorption.",
                gradient: "from-pink-50 to-pink-100",
                color: "text-pink-800"
              },
              {
                title: "Custom Pharma Solutions",
                description: "Flexible and doctor-centric product development for specific therapeutic gaps, aligned with ethical marketing and personalized care needs.",
                gradient: "from-gray-50 to-gray-100",
                color: "text-gray-800"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${item.gradient} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow`}
                variants={slideInFromBottom}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className={`text-xl font-semibold ${item.color} mb-2`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <motion.section 
        className="bg-[#0B1D59] text-white py-20 px-6 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={fadeInUp}
          >
            GASTRO NOVA – Your Trusted Ally in Digestive and Liver Health
          </motion.h2>
          <motion.p 
            className="text-md md:text-l text-gray-200 leading-relaxed max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Whether you're a healthcare professional, pharmacist, patient, or strategic partner,
            <span className="font-semibold text-white"> GASTRO NOVA</span> is here to support your journey toward better
            gastrointestinal and liver wellness. Backed by decades of specialized expertise, we are committed to delivering
            impactful, high-quality solutions that improve lives — every single day.
          </motion.p>

          <motion.p 
            className="mt-6 text-xl font-semibold text-[#56E0C1] tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            GASTRO NOVA — Nurturing Wellness, Transforming Care.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;