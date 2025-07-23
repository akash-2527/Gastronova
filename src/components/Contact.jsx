import React, { useEffect, useState } from 'react';

function Contact() {
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
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
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you within 24 hours.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                organization: '',
                subject: '',
                message: ''
            });
            setIsSubmitting(false);
        }, 1000);
    };

    const contactInfo = [
        {
            icon: '📍',
            title: 'Corporate Office',
            details: ['123 Health Street, Pharmaceutical District', 'Hyderabad, Telangana 500001', 'India'],
            color: 'bg-blue-500'
        },
        {
            icon: '📞',
            title: 'Phone & WhatsApp',
            details: ['+91 (800) 123-4567', '+91 (800) 123-4568', 'Available 24/7 for emergencies'],
            color: 'bg-green-500'
        },
        {
            icon: '✉️',
            title: 'Email Contacts',
            details: ['info@gastronova.com', 'sales@gastronova.com', 'support@gastronova.com'],
            color: 'bg-teal-500'
        },
        {
            icon: '🕐',
            title: 'Business Hours',
            details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Emergency Only'],
            color: 'bg-purple-500'
        }
    ];

    const officeLocations = [
        {
            city: 'Hyderabad (HQ)',
            address: '123 Health Street, Pharmaceutical District',
            phone: '+91 (800) 123-4567',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            city: 'Mumbai',
            address: '456 Medical Plaza, Andheri East',
            phone: '+91 (800) 123-4568',
            image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            city: 'Delhi',
            address: '789 Pharma Complex, Connaught Place',
            phone: '+91 (800) 123-4569',
            image: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
    ];

    const departments = [
        { name: 'General Inquiries', email: 'info@gastronova.com', description: 'General questions and information' },
        { name: 'Sales & Partnerships', email: 'sales@gastronova.com', description: 'Business partnerships and bulk orders' },
        { name: 'Medical Information', email: 'medical@gastronova.com', description: 'Clinical questions and medical support' },
        { name: 'Customer Support', email: 'support@gastronova.com', description: 'Product support and complaints' },
        { name: 'Research & Development', email: 'research@gastronova.com', description: 'Clinical trials and R&D collaboration' },
        { name: 'Quality Assurance', email: 'quality@gastronova.com', description: 'Quality concerns and regulatory matters' }
    ];

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section id="contact-hero" className="relative bg-gradient-to-br from-slate-700 to-teal-600 text-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center transition-all duration-1000 ${visibleSections.has('contact-hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
                        <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
                            Get in touch with our team of experts. We're here to support your healthcare needs 24/7.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Contact Info */}
            <section id="quick-contact" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className={`text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 ${visibleSections.has('quick-contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto`}>
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-slate-700 mb-4">{info.title}</h3>
                                <div className="space-y-2">
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map Section */}
            <section id="contact-form" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className={`transition-all duration-1000 ${visibleSections.has('contact-form') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <div className="bg-white p-8 rounded-2xl shadow-xl">
                                <h2 className="text-3xl font-bold text-slate-700 mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                                placeholder="+91 12345 67890"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                                            <input
                                                type="text"
                                                name="organization"
                                                value={formData.organization}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Hospital/Clinic name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                        <select
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                        >
                                            <option value="">Select subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="sales">Sales & Partnership</option>
                                            <option value="medical">Medical Information</option>
                                            <option value="support">Customer Support</option>
                                            <option value="quality">Quality Concern</option>
                                            <option value="research">Research Collaboration</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                                    >
                                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Map & Additional Info */}
                        <div className={`transition-all duration-1000 delay-300 ${visibleSections.has('contact-form') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
                                <h3 className="text-2xl font-bold text-slate-700 mb-6">Visit Our Headquarters</h3>
                                <div className="bg-gray-200 h-64 rounded-xl mb-6 flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <div className="text-4xl mb-2">📍</div>
                                        <p>Interactive Map</p>
                                        <p className="text-sm">123 Health Street, Hyderabad</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-teal-600 rounded-full w-3 h-3"></div>
                                        <span className="text-gray-700">Free parking available on premises</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-teal-600 rounded-full w-3 h-3"></div>
                                        <span className="text-gray-700">Wheelchair accessible facility</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-teal-600 rounded-full w-3 h-3"></div>
                                        <span className="text-gray-700">Public transport connections available</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-teal-600 to-slate-600 text-white p-8 rounded-2xl">
                                <h3 className="text-2xl font-bold mb-4">Emergency Support</h3>
                                <p className="mb-4">For urgent medical inquiries and emergencies, our team is available 24/7.</p>
                                <div className="space-y-2">
                                    <p><span className="font-semibold">Emergency Hotline:</span> +91 (800) 123-URGENT</p>
                                    <p><span className="font-semibold">WhatsApp Support:</span> +91 (800) 123-4567</p>
                                    <p><span className="font-semibold">Email:</span> emergency@gastronova.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Locations */}
            <section id="locations" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('locations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6">Our Locations</h2>
                        <p className="text-xl text-gray-600">Find us across major cities in India</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {officeLocations.map((location, index) => (
                            <div
                                key={index}
                                className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 ${visibleSections.has('locations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <img src={location.image} alt={location.city} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-slate-700 mb-3">{location.city}</h3>
                                    <p className="text-gray-600 mb-2">{location.address}</p>
                                    <p className="text-teal-600 font-medium">{location.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Department Contacts */}

            <section id="departments" className="py-20 bg-slate-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('departments') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Contact Our Departments</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Connect directly with our specialized teams for targeted assistance with your inquiries.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map((dept, index) => (
                            <div
                                key={index}
                                className={`bg-slate-800 rounded-xl p-6 hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 ${visibleSections.has('departments') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <h3 className="text-xl font-semibold mb-3 text-teal-400">{dept.name}</h3>
                                <p className="text-gray-300 mb-4">{dept.description}</p>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href={`mailto:${dept.email}`} className="text-white hover:text-teal-300 transition-colors duration-300">{dept.email}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact-cta" className="py-24 bg-gradient-to-r from-teal-600 to-slate-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={`max-w-4xl mx-auto transition-all duration-1000 ${visibleSections.has('contact-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Healthcare Together?</h2>
                        <p className="text-xl mb-8">
                            Whether you're a healthcare provider, researcher, or patient, we're committed to supporting your journey with innovative pharmaceutical solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="#contact-form"
                                className="px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                            >
                                Get in Touch
                            </a>
                            <a
                                href="tel:+918001234567"
                                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:scale-105"
                            >
                                Call Us Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;