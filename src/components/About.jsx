import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  Users, 
  Shield, 
  Lightbulb,
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
  Building,
  Microscope
} from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Excellence",
      description: "Committed to delivering the highest quality pharmaceutical solutions with uncompromising standards that have defined our 25-year legacy in healthcare innovation."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Pioneering breakthrough research and development in gastrointestinal therapeutics, continuously advancing the boundaries of pharmaceutical science and patient care."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassion",
      description: "Patient-centered approach that prioritizes human wellbeing, ensuring every solution we develop addresses real medical needs with empathy and understanding."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Impact",
      description: "Expanding our pharmaceutical expertise across 15+ countries, bringing world-class healthcare solutions to diverse populations and medical communities worldwide."
    }
  ];

  const milestones = [
    { year: '1999', title: 'Company Founded', description: 'Established with a vision to revolutionize gastrointestinal healthcare' },
    { year: '2005', title: 'First Breakthrough', description: 'Launched our flagship therapeutic solution' },
    { year: '2010', title: 'Global Expansion', description: 'Extended operations to 5 international markets' },
    { year: '2015', title: 'Research Excellence', description: 'Opened state-of-the-art R&D facility' },
    { year: '2020', title: 'Digital Innovation', description: 'Integrated AI-powered diagnostic solutions' },
    { year: '2024', title: '25 Years Strong', description: 'Celebrating a quarter-century of pharmaceutical excellence' }
  ];

  const achievements = [
    { icon: <Award className="w-6 h-6" />, text: 'ISO 9001:2015 Certified Manufacturing' },
    { icon: <Building className="w-6 h-6" />, text: 'FDA Approved Production Facilities' },
    { icon: <Microscope className="w-6 h-6" />, text: 'WHO GMP Compliant Operations' },
    { icon: <Star className="w-6 h-6" />, text: '50+ Patents in Pharmaceutical Innovation' },
    { icon: <Globe className="w-6 h-6" />, text: 'Presence in 15+ Countries Worldwide' },
    { icon: <TrendingUp className="w-6 h-6" />, text: '98% Customer Satisfaction Rate' }
  ];

  return (
    <div className="pt-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section */}
      <motion.section 
        className="py-20 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <Building className="w-4 h-4 mr-2" />
              Established 1999 • 25+ Years of Excellence
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              About 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-slate-700"> Gastro Nova</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              For over two decades, we have been at the forefront of pharmaceutical innovation, 
              pioneering advanced gastrointestinal and liver wellness solutions that transform 
              lives and set new standards in healthcare excellence.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-slate-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{achievement.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-slate-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <img 
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Pharmaceutical Excellence" 
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">25+</div>
                    <div className="text-sm font-medium text-slate-700">Years Legacy</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission, Vision, Values */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission */}
          <motion.div 
            className="grid lg:grid-cols-2 gap-16 items-center mb-32"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Our Mission</h2>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                To revolutionize gastrointestinal and liver healthcare through innovative pharmaceutical 
                solutions, leveraging our 25+ years of industry expertise to deliver life-changing 
                treatments that improve patient outcomes worldwide.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                We are committed to advancing medical science through rigorous research, maintaining 
                the highest quality standards, and ensuring our breakthrough therapies reach those 
                who need them most, regardless of geographic boundaries.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                {['Patient-Centered', 'Research-Driven', 'Quality Assured', 'Globally Accessible'].map((tag, index) => (
                  <span key={index} className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-8 rounded-3xl">
                <div className="w-full h-80 bg-gradient-to-br from-emerald-100 to-slate-100 rounded-2xl flex items-center justify-center">
                  <Target className="w-32 h-32 text-emerald-600 opacity-30" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div 
            className="grid lg:grid-cols-2 gap-16 items-center mb-32"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-slate-50 to-emerald-50 p-8 rounded-3xl order-2 lg:order-1">
              <div className="w-full h-80 bg-gradient-to-br from-slate-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <Eye className="w-32 h-32 text-slate-600 opacity-30" />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Our Vision</h2>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                To become the world's most trusted pharmaceutical company in gastrointestinal and 
                liver wellness, setting the gold standard for therapeutic innovation, patient care, 
                and healthcare accessibility across all markets we serve.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                By 2030, we envision a world where digestive health challenges are met with 
                precision medicine, where our pharmaceutical innovations have transformed 
                millions of lives, and where Gastro Nova is synonymous with excellence 
                in healthcare delivery.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                {['Global Leadership', 'Innovation Pioneer', 'Patient Impact', 'Healthcare Transformation'].map((tag, index) => (
                  <span key={index} className="px-4 py-2 bg-slate-100 text-slate-800 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The fundamental principles that have guided our 25-year journey and continue 
              to shape our commitment to pharmaceutical excellence.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-emerald-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow flex-shrink-0">
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section 
        className="py-20 bg-slate-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Milestones that mark our 25-year commitment to pharmaceutical excellence 
              and healthcare innovation.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-500/30 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-16 gap-8`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-emerald-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{milestone.title}</h3>
                      <p className="text-slate-300">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-900">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 lg:block hidden"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Join Our Legacy of Excellence
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Be part of the next chapter in our 25-year journey of pharmaceutical innovation 
              and healthcare transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Partnerships
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;