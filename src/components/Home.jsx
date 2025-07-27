import React, { useEffect, useRef } from 'react';
import { ChevronRight, Shield, Users, Award, Microscope, Heart, Globe } from 'lucide-react';

const HomePage = ({ setActiveSection }) => {
  const statsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    if (statsRef.current) observer.observe(statsRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream-50 via-white to-green-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Trusted Since 1999
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-blue-900 leading-tight">
                Advanced GI & Liver 
                <span className="text-green-500"> Wellness</span> Solutions
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl">
                With over 25+ years of experience in the pharmaceutical industry, we deliver 
                innovative treatments and expert care for optimal digestive and liver health.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActiveSection('about')}
                  className="group bg-green-400 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Discover Our Story 
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setActiveSection('contact')}
                  className="border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Expert Consultation
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src='https://img.freepik.com/free-photo/doctor-talking-with-her-patient_1139-318.jpg' 
                  alt="Medical Consultation" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900">10M+</p>
                    <p className="text-sm text-gray-600">Lives Improved</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900">ISO Certified</p>
                    <p className="text-sm text-gray-600">Quality Assured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-20 bg-blue-900 opacity-0 transform translate-y-8 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Years Experience" },
              { number: "500+", label: "Research Studies" },
              { number: "50+", label: "Countries Served" },
              { number: "10M+", label: "Patients Treated" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <p className="text-blue-200 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={featuresRef}
        className="py-24 bg-white opacity-0 transform translate-y-8 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
              Our Core <span className="text-green-500">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive pharmaceutical solutions backed by decades of research and innovation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Microscope className="w-8 h-8" />,
                title: "Advanced Research & Development",
                description: "Cutting-edge pharmaceutical research with state-of-the-art laboratories and clinical trial capabilities for breakthrough treatments."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Quality Assurance Excellence",
                description: "ISO-certified manufacturing processes ensuring the highest standards of pharmaceutical quality and patient safety."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Medical Team",
                description: "World-class specialists and researchers dedicated to advancing gastrointestinal and liver health solutions."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Innovative Formulations",
                description: "Proprietary drug formulations and delivery systems designed for optimal therapeutic outcomes and patient compliance."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Patient-Centric Care",
                description: "Comprehensive support programs and personalized treatment approaches focused on improving quality of life."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Distribution Network",
                description: "Extensive international presence ensuring reliable access to our pharmaceutical products worldwide."
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-green-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join millions of patients worldwide who trust our pharmaceutical innovations for better health outcomes
          </p>
          <button
            onClick={() => setActiveSection('contact')}
            className="bg-green-400 text-white px-10 py-5 rounded-2xl font-semibold hover:bg-green-500 transition-all duration-300 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;