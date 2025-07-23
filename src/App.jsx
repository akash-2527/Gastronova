import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Shield, Users, Award, ChevronRight } from 'lucide-react';

const GastroNovaWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const Logo = () => (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-green-500 rounded-lg flex items-center justify-center">
        <Shield className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-blue-900">GASTRO NOVA</h1>
        <p className="text-sm text-gray-600">Advanced GI & Liver Wellness</p>
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-lg capitalize font-medium transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-green-500 text-white'
                    : 'text-blue-900 hover:text-green-500'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="py-2">
              {['home', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 capitalize font-medium ${
                    activeSection === section
                      ? 'bg-green-500 text-white'
                      : 'text-blue-900 hover:bg-gray-50'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                Advanced GI & Liver Wellness Solutions
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Leading the way in gastrointestinal and liver health with innovative treatments, 
                expert care, and personalized wellness solutions for optimal digestive health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActiveSection('about')}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveSection('contact')}
                  className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-32 h-32 text-blue-900 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Core Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive gastrointestinal and liver wellness solutions tailored to your unique health needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Advanced Diagnostics",
                description: "State-of-the-art diagnostic tools and techniques for accurate assessment of GI and liver conditions."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Care Team",
                description: "Highly qualified specialists dedicated to providing personalized treatment plans and ongoing support."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Innovative Treatments",
                description: "Cutting-edge therapies and wellness programs designed for optimal digestive and liver health outcomes."
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards better digestive and liver health with our expert team
          </p>
          <button
            onClick={() => setActiveSection('contact')}
            className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">About Gastro Nova</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering advanced gastrointestinal and liver wellness solutions with a commitment to excellence, 
              innovation, and personalized patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                At Gastro Nova, we are dedicated to revolutionizing gastrointestinal and liver healthcare 
                through cutting-edge medical technologies, evidence-based treatments, and compassionate care. 
                Our mission is to improve the quality of life for patients by providing comprehensive, 
                personalized wellness solutions.
              </p>
              <p className="text-gray-700">
                We believe that every patient deserves access to the highest standard of care, delivered 
                by experienced professionals who understand the complexity of digestive health and liver function.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-24 h-24 text-blue-900 opacity-30" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl order-2 md:order-1">
              <div className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                <Award className="w-24 h-24 text-blue-900 opacity-30" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Vision</h2>
              <p className="text-gray-700 mb-6">
                To become the leading provider of advanced gastrointestinal and liver wellness solutions, 
                setting new standards in patient care, medical innovation, and treatment outcomes. We envision 
                a future where digestive health challenges are met with precision, expertise, and hope.
              </p>
              <p className="text-gray-700">
                Through continuous research, technological advancement, and collaborative care approaches, 
                we strive to transform the landscape of GI and liver health management.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description: "Committed to delivering the highest quality care and achieving superior treatment outcomes for every patient."
                },
                {
                  title: "Innovation",
                  description: "Embracing cutting-edge technologies and advanced treatment methodologies to stay at the forefront of medical care."
                },
                {
                  title: "Compassion",
                  description: "Providing empathetic, patient-centered care that addresses both physical health and emotional well-being."
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ContactPage = () => (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to take the next step in your wellness journey? Get in touch with our expert team today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Phone</h3>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-600">Mon-Fri 8:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Email</h3>
                    <p className="text-gray-700">info@gastronova.com</p>
                    <p className="text-gray-700">support@gastronova.com</p>
                    <p className="text-sm text-gray-600">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Location</h3>
                    <p className="text-gray-700">123 Wellness Drive</p>
                    <p className="text-gray-700">Medical Center, Suite 456</p>
                    <p className="text-gray-700">Healthcare City, HC 12345</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-2xl">
                <h3 className="font-semibold text-blue-900 mb-3">Office Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const Footer = () => (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Logo />
            <p className="text-blue-100 mt-4">
              Leading provider of advanced gastrointestinal and liver wellness solutions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'About', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => setActiveSection(link.toLowerCase())}
                  className="block text-blue-100 hover:text-white transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-blue-100">
              <p>+1 (555) 123-4567</p>
              <p>info@gastronova.com</p>
              <p>123 Wellness Drive, HC 12345</p>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; 2025 Gastro Nova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {activeSection === 'home' && <HomePage />}
      {activeSection === 'about' && <AboutPage />}
      {activeSection === 'contact' && <ContactPage />}
      
      <Footer />
    </div>
  );
};

export default GastroNovaWebsite;