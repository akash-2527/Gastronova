import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import expImg from '/src/assets/exp.png';

// Animation variants for existing and new sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
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

const valuesVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const legacyVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.4 }
  }
};

const legacyParagraph1 = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.6 }
  }
};

const legacyParagraph2 = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.7 }
  }
};

const legacyParagraph3 = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.8 }
  }
};

// New Expertise Section Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 }
  }
};

const AboutPage = () => {
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

          {/* Our Legacy Section */}
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

            <motion.p className="text-gray-700 text-lg leading-relaxed mb-6" variants={legacyParagraph1}>
              At <strong> GASTRO NOVA</strong>, we believe that optimal digestive and liver health is a fundamental right for all. With over 25 years of specialized experience in gastroenterology and hepatology, we are dedicated to advancing the science, development, and delivery of innovative, accessible, and high-quality therapies that restore and protect vital functions. Grounded in clinical expertise, guided by empathy, and driven by cutting-edge research, we are committed to transforming GI and liver care for a healthier tomorrow.
            </motion.p>
            <motion.p className="text-gray-700 text-lg leading-relaxed mb-6" variants={legacyParagraph2}>
              With decades of trusted presence in the healthcare industry,<strong>  GASTRO NOVA </strong> has been shaped by principles of dependability, continuity, and ethical conduct. Our enduring pursuit of excellence fuels meaningful advancements in healthcare delivery across regions, populations, and clinical environments.
            </motion.p>
            <motion.p className="text-gray-700 text-lg leading-relaxed mb-6" variants={legacyParagraph3}>
              Ranging from essential generics to sophisticated therapeutic innovations, our diverse and expanding product portfolio is a testament to our comprehensive understanding of evolving patient needs and scientific advancement. Each formulation is manufactured in WHO-GMP certified facilities, ensuring adherence to the highest standards of global quality and regulatory compliance. Valued by healthcare professionals and patients alike, our offerings continue to contribute to lasting, positive health outcomes worldwide.
            </motion.p>
          </motion.div>

          {/* ✅ Integrated Expertise Section (No UI/Animation changes) */}
          <section className="py-24 bg-white px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-4xl font-bold text-gray-800 text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                Our Expertise
              </motion.h2>

              <motion.div
                className="grid md:grid-cols-2 items-center text-center justify-center gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
              >
                <motion.div
                  className="flex flex-col items-center justify-center md:items-center text-center md:text-right"
                  variants={fadeInLeft}
                >
                  <motion.div
                    className="w-27 h-27 mb-6  justify-center text-center items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={expImg} alt="Experience Icon" className="w-full h-full mt-6 object-contain transform scale-x-[-1]" />
                  </motion.div>
                  <motion.h3
                    className="text-5xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    25 +
                  </motion.h3>
                  <motion.p className="text-lg text-gray-500" variants={fadeInUp}>
                    Years Of Experience
                  </motion.p>
                </motion.div>

                <motion.div variants={fadeInRight}>
                  <motion.p className="text-xl text-gray-700 leading-relaxed" variants={fadeInUp}>
                    We sincerely value your trust as we embark on this exciting new journey. Backed by over <span className="font-semibold text-blue-900">25 years of industry expertise</span>,
                    our team is committed to delivering high-quality pharmaceutical solutions with <span className="text-green-700 font-medium">care</span>, <span className="text-green-700 font-medium">ethics</span>, and <span className="text-green-700 font-medium">excellence</span>.
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Our Values Section */}
          <motion.div
            className="bg-gray-50 p-12 rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scaleIn}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
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
                  description: "Committed to delivering the highest quality care and achieving superior treatment outcomes for every patient.",
                },
                {
                  title: "Innovation",
                  description: "Embracing cutting-edge technologies and advanced treatment methodologies to stay at the forefront of medical care.",
                },
                {
                  title: "Compassion",
                  description: "Providing empathetic, patient-centered care that addresses both physical health and emotional well-being.",
                },
              ].map((value, index) => (
                <motion.div key={index} className="text-center" variants={itemVariants}>
                  <motion.div
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ backgroundColor: "#10b981", transition: { duration: 0.6 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shield className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h3 className="text-xl font-semibold text-blue-900 mb-3" variants={itemVariants}>
                    {value.title}
                  </motion.h3>
                  <motion.p className="text-gray-600" variants={itemVariants}>
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
