import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const products = [
    {
      name: 'Liver Care',
      icon: '🫀',
      description: 'Advanced formulations for optimal liver health and detoxification',
      color: 'bg-green-500'
    },
    {
      name: 'Gut Health',
      icon: '🦠',
      description: 'Probiotics and digestive support for healthy gut microbiome',
      color: 'bg-green-400'
    },
    {
      name: 'Amino Acid Supplements',
      icon: '💊',
      description: 'Essential amino acids and protein supplements for recovery',
      color: 'bg-teal-500'
    },
    {
      name: 'OTC Products',
      icon: '🏥',
      description: 'Over-the-counter solutions including Bismuth, LOLA, Glutathione',
      color: 'bg-blue-400'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Gastroenterologist',
      text: 'Gastro Nova products have consistently delivered excellent results for my patients with liver conditions.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Internal Medicine',
      text: 'The quality and efficacy of their formulations make them my go-to choice for GI health.',
      rating: 5
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Hepatologist',
      text: 'Trust and reliability - that\'s what Gastro Nova represents in pharmaceutical excellence.',
      rating: 5
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen bg-gradient-to-br from-slate-700 via-slate-600 to-teal-600 flex items-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-black opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`text-white transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="flex items-center mb-6">
                <div className="bg-white p-3 rounded-lg mr-4">
                    <div className="bg-white mt-3.5 p-1.5 rounded w-28  flex items-center justify-center">
                                <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                            </div>
                </div>
                <div>
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Advanced GI & 
                <span className="text-teal-300 block">Liver Wellness</span>
              </h1>
              
              <p className="text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl">
               Gastro Nova to provide oviding effective products for gastroenterological and liver health this impact. With a legacy of over 25 years in the pharmaceutical industry, we are committed to developing, 
                manufacturing, and delivering effective, affordable, and high-quality medicines that improve and save lives.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Explore Products
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-slate-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Contact Us
                </button>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${visibleSections.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <img 
                src="https://www.theguthealthdoctor.com/wp-content/uploads/fly-images/4526/2-764x518-c.png" 
                alt="Doctor consulting with patient" 
                className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6">About Us</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Backed by over 25 years of expertise in the pharmaceutical industry, we are committed to the mission of 
              developing, manufacturing, and delivering effective, affordable, and high-quality medicines. Guided by 
              scientific rigor, compassionate values, and innovative technologies, we strive to provide transformative 
              healthcare solutions that make a real difference.
            </p>
          </div>
          
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔬', title: 'Scientific Excellence', desc: '25+ years of pharmaceutical research and development' },
              { icon: '💚', title: 'Compassionate Care', desc: 'Focused on improving and saving lives through quality medicines' },
              { icon: '🚀', title: 'Innovation', desc: 'Cutting-edge technologies for transformative healthcare solutions' }
            ].map((item, index) => (
              <div 
                key={index}
                className={`text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-500 transform hover:-translate-y-2 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div> */}
        </div> 
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('products') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6">Our Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of GI, liver, and nutritional supplements backed by clinical research
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group ${visibleSections.has('products') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 ${product.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {product.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">{product.name}</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-20 bg-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${visibleSections.has('why-choose') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Why Gastro Nova?</h2>
              <div className="space-y-6">
                {[
                  { icon: '✓', text: 'Clinically backed formulations with proven efficacy' },
                  { icon: '✓', text: 'Specialized focus on liver & gut health' },
                  { icon: '✓', text: 'Trusted by gastroenterologists worldwide' },
                  { icon: '✓', text: '25+ years of pharmaceutical excellence' },
                  { icon: '✓', text: 'Quality assurance and safety standards' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-teal-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {item.icon}
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${visibleSections.has('why-choose') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Medical professional" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6">What Doctors Say</h2>
            <p className="text-xl text-gray-600">Trusted by healthcare professionals worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold text-slate-700">{testimonial.name}</h4>
                  <p className="text-teal-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-slate-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Partner with Us?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of healthcare professionals who trust Gastro Nova for their patients' GI and liver health needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              View Products
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Contact Us Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;