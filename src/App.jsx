// import React, { useState } from 'react';
// import Navigation from './components/Navbar';
// import HomePage from './components/Home';
// import AboutPage from './components/About';
// import ContactPage from './components/Contact';
// import Footer from './components/Footer';

// const App = () => {
//   const [activeSection, setActiveSection] = useState('home');

//   return (
//     <div className="min-h-screen bg-white">
//       <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

//       {activeSection === 'home' && <HomePage setActiveSection={setActiveSection} />}
//       {activeSection === 'about' && <AboutPage />}
//       {activeSection === 'contact' && <ContactPage />}

//       <Footer setActiveSection={setActiveSection} />
//     </div>
//   );
// };

// export default App;



import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Shield, Users, Award, ChevronRight } from 'lucide-react';
import logo from './assets/kk.png';
import hero from './assets/hero.jpg';
import mission from './assets/mission.png';
import vision from './assets/vision.png';
import l from './assets/l.png';
import s from './assets/s.png';
import p from './assets/p.png';
import b from './assets/b.png';
import exp from './assets/exp.png';

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
      <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
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
            {['home', 'about us', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-lg capitalize font-medium transition-all duration-300 ${activeSection === section
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
              {['home', 'about us', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 capitalize font-medium ${activeSection === section
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
                <img src='https://img.freepik.com/free-photo/doctor-talking-with-her-patient_1139-318.jpg' alt="Logo" className=" rounded  object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>





      <section className='py-20 mr-10 ml-20' >
        <div className="grid md:grid-cols-2  gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At the heart of our mission is a commitment to becoming a trusted leader in GI therapeutics. We strive to deliver innovative, high-quality products that address real  needs while ensuring every step we take aligns with ethical marketing principles. By focusing on doctor-centric engagement, we aim to foster long-term partnerships that drive better patient care and medical advancement.
            </p>
            
          </div>
          <div className="w-full h-74 flex items-center justify-center">
            <img src={mission} alt="Mission" className="h-74 object-cover rounded-2xl" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="p-8">
            <div className="w-full h-74 flex items-center justify-center">
              <img src={vision} alt="vision" className="h-74 object-cover rounded-2xl" />
            </div>

          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Vision</h2>
            <p className="text-gray-700 mb-6">
            Our vision is to become a leading force in advanced gastrointestinal and liver wellness by delivering innovative, science-driven solutions that transform patient outcomes and elevate standards of care.
          </p>
            <p className="text-gray-700">
              
We strive to empower individuals to enjoy healthier, fuller lives and to be recognized as trusted partners in the global journey toward GI and liver health excellence
  
            </p>
          </div>
        </div>


      </section>

      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
      From Essential to Advanced – A Complete Range for Digestive and Liver Health.
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Liver Care */}
      <div className="bg-green-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
        <span className="text-5xl mb-4"> <img src={l} className=' w-12 h-12'></img> </span> {/* Replace with a liver icon SVG if needed */}
        <h3 className="text-xl font-semibold text-green-900">Liver Care</h3>
      </div>

      {/* Gut Health */}
      <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
        <span className="text-5xl mb-4"><img src={s} className=' w-12 h-12'></img> </span> {/* Replace with stomach/gut SVG */}
        <h3 className="text-xl font-semibold text-green-900">Gut Health</h3>
      </div>

      {/* Amino Acid / Protein Supplements */}
      <div className="bg-cyan-100 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
        <span className="text-5xl mb-4"> <img src={b} className=' w-12 h-12'></img> </span> {/* You can use a bottle/tablet icon SVG */}
        <h3 className="text-xl font-semibold text-cyan-900">Amino Acid / Protein</h3>
      </div>

      {/* OTC */}
      <div className="bg-blue-100 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
        <span className="text-5xl mb-4"> <img src={p} className=' w-12 h-12'></img> </span> {/* Use a simple medicine bottle icon */}
        <h3 className="text-xl font-semibold text-blue-900">OTC</h3>
      </div>
    </div>
  </div>
</section>

<section className="py-24 bg-white px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
      Our Expertise
    </h2>

    <div className="grid md:grid-cols-2 items-center text-center justify-center gap-12">
      {/* Left: Experience Icon + Number */}
      <div className="flex flex-col items-center  justify-center md:items-start text-center md:text-left">
        <div className="w-20 h-20 mb-6 justify-center text-center items-center">
          {/* Replace with an SVG or icon of your choice */}
          <img src={exp} alt="Experience Icon" className="w-full h-full object-contain transform scale-x-[-1]" />
        </div>
        <h3 className="text-5xl font-bold text-gray-800 mb-2">25 +</h3>
        <p className="text-lg text-gray-500">Years Of Experience</p>
      </div>

      {/* Right: Message */}
      <div>
        <p className="text-xl text-gray-700 leading-relaxed">
          We sincerely value your trust as we embark on this exciting new journey.
          Backed by over <span className="font-semibold text-blue-900">25 years of industry expertise</span>,
          our team is committed to delivering high-quality pharmaceutical solutions with
          <span className="text-green-700 font-medium"> care</span>,
          <span className="text-green-700 font-medium"> ethics</span>, and
          <span className="text-green-700 font-medium"> excellence</span>.
          Your continued support is deeply appreciated.
        </p>
      </div>
    </div>
  </div>
</section>


<section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 px-4">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
      Product Portfolio Highlights
    </h2>
    <p className="text-gray-600 mb-12">
      Designed for precision care in gastrointestinal and liver wellness, our specialized portfolio blends therapeutic efficacy with advanced scientific innovation.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {/* PPI */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">Proton Pump Inhibitors (PPI)</h3>
        <p className="text-gray-700">
          Advanced acid suppression therapy for effective relief from acid reflux, GERD, and peptic ulcers – enhancing patient comfort and mucosal healing.
        </p>
      </div>

      {/* Pancreatin */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold text-green-900 mb-2">Pancreatin Enzymes</h3>
        <p className="text-gray-700">
          Supports digestion by supplementing natural enzymes in patients with pancreatic insufficiency, improving nutrient absorption and GI health.
        </p>
      </div>

      {/* Liver Care / Hepatoprotection */}
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold text-yellow-800 mb-2">Liver Care & Hepatoprotection</h3>
        <p className="text-gray-700">
          Science-backed formulations for detoxification, regeneration, and protection of liver cells, targeting both acute and chronic hepatic conditions.
        </p>
      </div>

      {/* GI Wellness */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold text-indigo-800 mb-2">GI Wellness</h3>
        <p className="text-gray-700">
          A holistic approach to gastrointestinal health through probiotics, prebiotics, and gut-focused therapies promoting optimal microbiome balance.
        </p>
      </div>

      {/* Protein / Amino Acid Nutrition */}
      <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold text-pink-800 mb-2">Protein & Amino Acid Nutrition</h3>
        <p className="text-gray-700">
          Essential nutritional support for recovery, muscle maintenance, and metabolic function—ideal for patients with compromised GI absorption.
        </p>
      </div>

      {/* Add-On (Optional - Custom Formulas) */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Custom Pharma Solutions</h3>
        <p className="text-gray-700">
          Flexible and doctor-centric product development for specific therapeutic gaps, aligned with ethical marketing and personalized care needs.
        </p>
      </div>
    </div>
  </div>
</section>




<section className="bg-[#0B1D59] text-white py-20 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      GASTRO NOVA – Your Trusted Ally in Digestive and Liver Health
    </h2>
    <p className="text-md md:text-l text-gray-200 leading-relaxed max-w-3xl mx-auto">
      Whether you're a healthcare professional, pharmacist, patient, or strategic partner,
      <span className="font-semibold text-white"> GASTRO NOVA</span> is here to support your journey toward better
      gastrointestinal and liver wellness. Backed by decades of specialized expertise, we are committed to delivering
      impactful, high-quality solutions that improve lives — every single day.
    </p>

    <p className="mt-6 text-xl font-semibold text-[#56E0C1] tracking-wide">
      GASTRO NOVA — Nurturing Wellness, Transforming Care.
    </p>
  </div>
</section>


    </div>
  );

  const AboutPage = () => (
  <div className="pt-20">
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* About Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">About GASTRO NOVA</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering advanced gastrointestinal and liver wellness solutions with a commitment to excellence,
            innovation, and personalized patient care.
          </p>
        </div>

        {/* OUR LEGACY Section */}
        <div className="bg-white p-10 mb-20 rounded-2xl border border-gray-200 shadow-md">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Our Legacy</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            At <strong>GASTRO NOVA</strong>, we believe that optimal digestive and liver health is a fundamental right for all.
            With over 25 years of specialized experience in gastroenterology and hepatology, we are dedicated to advancing
            the science, development, and delivery of innovative, accessible, and high-quality therapies that restore and
            protect vital functions. Grounded in clinical expertise, guided by empathy, and driven by cutting-edge research,
            we are committed to transforming GI and liver care for a healthier tomorrow.
          </p>
        
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            With decades of trusted presence in the healthcare industry, <strong>GASTRO NOVA</strong> has been shaped by
            principles of dependability, continuity, and ethical conduct. Our enduring pursuit of excellence fuels meaningful
            advancements in healthcare delivery across regions, populations, and clinical environments.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Ranging from essential generics to sophisticated therapeutic innovations, our diverse and expanding product
            portfolio is a testament to our comprehensive understanding of evolving patient needs and scientific advancement.
            Each formulation is manufactured in WHO-GMP certified facilities, ensuring adherence to the highest standards of
            global quality and regulatory compliance. Valued by healthcare professionals and patients alike, our offerings
            continue to contribute to lasting, positive health outcomes worldwide.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="bg-gray-50 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
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
    <section className="py-24 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Let’s work together for better GI and liver health. Reach out to our dedicated support team — we're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          

          {/* Contact Information */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-8">Get in Touch</h2>

            <div className="space-y-10">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 text-lg">Phone</h3>
                  <p className="text-gray-700">+91 99122 28610</p>
                  <p className="text-sm text-gray-500">Mon–Fri, 8:00 AM – 6:00 PM</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 text-lg">Email</h3>
                  <p className="text-gray-700">contact-us@gastronova.in</p>
                  <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 shadow-md p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="How can we assist you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
);


  const Footer = () => (
   <footer style={{ backgroundColor: 'rgb(252, 248, 230)' }} className="text-white py-12">

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Logo />
            {/* <p className="text-blue-900 mt-4">
              Leading provider of advanced gastrointestinal and liver wellness solutions.
            </p> */}
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'About us', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => setActiveSection(link.toLowerCase())}
                  className="block text-blue-900 hover:text-white transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-4">Contact Info</h3>
            <div className="space-y-2 text-blue-900">
              <p>+91 99122 28610</p>
              <p>contact-us@gastronova.in</p>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-900">
          <p>&copy; 2025 Gastro Nova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {activeSection === 'home' && <HomePage />}
      {activeSection === 'about us' && <AboutPage />}
      {activeSection === 'contact' && <ContactPage />}

      <Footer />
    </div>
  );
};

export default GastroNovaWebsite;