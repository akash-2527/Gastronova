import React, { useEffect, useState } from 'react';

function About() {
    const [visibleSections, setVisibleSections] = useState(new Set());

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

    const milestones = [
  { title: 'Vision & Foundation', desc: 'Laid the groundwork with a mission to revolutionize GI healthcare' },
  { title: 'First Breakthrough', desc: 'Developed our first clinically proven liver care formulation' },
  { title: 'Global Recognition', desc: 'Earned trust of gastroenterologists across multiple countries' },
  { title: 'R&D Excellence', desc: 'Built cutting-edge research and development facilities' },
  { title: 'Digital Transformation', desc: 'Integrated digital healthcare and telemedicine solutions' },
  { title: 'Worldwide Reach', desc: 'Now serving healthcare professionals in 25+ countries' }
];


    const values = [
        {
            icon: '🎯',
            title: 'Mission',
            description: 'To develop, manufacture, and deliver effective, affordable, and high-quality medicines that improve and save lives, specifically focusing on gastrointestinal and liver health.'
        },
        {
            icon: '👁️',
            title: 'Vision',
            description: 'To become the global leader in GI and liver wellness solutions, transforming healthcare through scientific innovation and compassionate care.'
        },
        {
            icon: '💎',
            title: 'Values',
            description: 'Scientific rigor, compassionate care, innovative thinking, quality excellence, and unwavering commitment to patient well-being guide everything we do.'
        }
    ];

   

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section id="about-hero" className="relative bg-gradient-to-br from-slate-700 to-teal-600 text-white py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center transition-all duration-1000 ${visibleSections.has('about-hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">About Gastro Nova</h1>
                        <p className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
                            25 Years of Excellence in Gastrointestinal & Liver Healthcare Solutions
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section id="values" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className={`text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 ${visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                {/* <div className="text-6xl mb-6">{value.icon}</div> */}
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section id="story" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className={`transition-all duration-1000 ${visibleSections.has('story') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6">Our Story</h2>
                            <div className="space-y-6 text-lg text-gray-600">
                                <p>
                                    With over 25 years of expertise in the pharmaceutical industry, Gastro Nova has consistently pursued a bold vision:
                                    to revolutionize gastrointestinal and liver healthcare through innovative, scientifically-backed solutions.
                                </p>
                                <p>
                                    What began as a small venture has grown into a trusted name, serving healthcare professionals and patients across the globe.
                                    Our unwavering commitment to scientific excellence and compassionate care has been the cornerstone of our journey.
                                </p>
                                <p>
                                    Today, we stand as a testament to what dedication, innovation, and a patient-first approach can achieve.
                                    Our products are trusted by gastroenterologists worldwide, and our research continues to push the
                                    boundaries of what's possible in GI and liver health.
                                </p>

                            </div>
                        </div>

                        <div className={`transition-all duration-1000 delay-300 ${visibleSections.has('story') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <img
                                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Modern pharmaceutical facility"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section id="timeline" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6">Our Journey</h2>
                        <p className="text-xl text-gray-600">Key milestones that shaped our path to excellence</p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-200"></div>

                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'} transition-all duration-1000 ${visibleSections.has('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="text-2xl font-bold text-teal-600 mb-2">{milestone.year}</div>
                                        <h3 className="text-xl font-semibold text-slate-700 mb-3">{milestone.title}</h3>
                                        <p className="text-gray-600">{milestone.desc}</p>
                                    </div>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-teal-600 rounded-full border-4 border-white shadow-lg"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            

            {/* Quality & Certifications */}
            <section id="quality" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className={`transition-all duration-1000 ${visibleSections.has('quality') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <img
                                src="https://cdn.flabs.in/webassets/fffbfcfa4258230ed9a7.jpg"
                                alt="Quality control laboratory"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                        </div>

                        <div className={`transition-all duration-1000 delay-300 ${visibleSections.has('quality') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6">Quality Excellence</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Our commitment to quality is unwavering. Every product undergoes rigorous testing and quality
                                control measures to ensure safety, efficacy, and consistency.
                            </p>

                            <div className="space-y-4">
                                {[
                                    'WHO-GMP Certified Manufacturing',
                                    'ISO 9001:2015 Quality Management',
                                    'FDA-Approved Facilities',
                                    'European CE Marking',
                                    'Clinical Research Organization Partnership',
                                    '100% Batch Testing Protocol'
                                ].map((cert, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <div className="bg-teal-600 rounded-full w-3 h-3"></div>
                                        <span className="text-lg text-gray-700">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-slate-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">Partner with Excellence</h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        Join us in our mission to transform gastrointestinal and liver healthcare. Together, we can make a difference in patients' lives.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                            Explore Partnership
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                            Contact Our Team
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;