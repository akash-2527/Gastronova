import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Get Expert Consultation
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-blue-900 mb-8">
              Contact <span className="text-green-500">Our Experts</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Connect with our pharmaceutical specialists for personalized solutions, 
              partnership opportunities, or expert consultation on gastrointestinal and liver health.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div 
              ref={formRef}
              className="opacity-0 transform translate-y-8 transition-all duration-1000"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-gray-100">
                <h2 className="text-3xl font-bold text-blue-900 mb-8">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-4">Message Sent Successfully!</h3>
                    <p className="text-gray-600">Thank you for contacting us. Our team will respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-white"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-white"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Company/Organization
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-white"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="research">Research Collaboration</option>
                        <option value="product">Product Information</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-white resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-4 rounded-xl font-semibold hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div 
              ref={infoRef}
              className="opacity-0 transform translate-y-8 transition-all duration-1000"
            >
              <h2 className="text-3xl font-bold text-blue-900 mb-12">Get in Touch</h2>
              
              <div className="space-y-8">
                {[
                  {
                    icon: <Phone className="w-6 h-6" />,
                    title: "Phone Support",
                    primary: "+1 (800) 123-NOVA",
                    secondary: "+1 (800) 456-7890",
                    detail: "Available 24/7 for urgent inquiries"
                  },
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: "Email Contact",
                    primary: "info@gastronova.pharma",
                    secondary: "partnerships@gastronova.pharma",
                    detail: "Response within 24 hours"
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: "Headquarters",
                    primary: "Gastro Nova Pharmaceuticals",
                    secondary: "1250 Innovation Drive, BioTech Plaza",
                    detail: "Healthcare City, HC 12345, USA"
                  },
                  {
                    icon: <Clock className="w-6 h-6" />,
                    title: "Business Hours",
                    primary: "Monday - Friday: 8:00 AM - 6:00 PM EST",
                    secondary: "Saturday: 9:00 AM - 2:00 PM EST",
                    detail: "Emergency support available 24/7"
                  }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start gap-6 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900 mb-3 text-lg">{contact.title}</h3>
                      <p className="text-gray-800 font-medium">{contact.primary}</p>
                      <p className="text-gray-700">{contact.secondary}</p>
                      <p className="text-sm text-gray-600 mt-2">{contact.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl text-white">
                <h3 className="font-bold text-xl mb-4">Global Offices</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-blue-100">North America</p>
                    <p>5 locations across USA & Canada</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-100">Europe</p>
                    <p>12 offices in EU countries</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-100">Asia-Pacific</p>
                    <p>8 regional headquarters</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-100">Latin America</p>
                    <p>4 distribution centers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join our network of partners and healthcare professionals working towards better patient outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
              Schedule a Meeting
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-500 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;