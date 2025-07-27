import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/kk.png';

const Navigation = ({ activeSection, setActiveSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const Logo = () => (
        <div className="flex items-center gap-3">
            {/* <img src={logo} alt="Gastro Nova Logo" className=" w-38 h-16 object-contain" /> */}
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />

            <div>
                <h1 className="text-xl font-bold text-blue-900">GASTRO NOVA</h1>
                <p className="text-sm text-gray-600">Advanced GI & Liver Wellness</p>
            </div>



        </div>
    );

    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Logo />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {['home', 'about', 'contact'].map((section) => (
                            <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`px-4 py-2 rounded-lg capitalize font-medium transition-all duration-300 ${activeSection === section
                                        ? 'bg-green-400 text-white shadow-md'
                                        : 'text-blue-900 hover:text-green-500 hover:bg-green-50'
                                    }`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6 text-blue-900" /> : <Menu className="w-6 h-6 text-blue-900" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="py-2 space-y-1">
                            {['home', 'about', 'contact'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => {
                                        setActiveSection(section);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block w-full text-left px-4 py-3 capitalize font-medium transition-colors ${activeSection === section
                                            ? 'bg-green-400 text-white'
                                            : 'text-blue-900 hover:bg-green-50 hover:text-green-600'
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
};

export default Navigation;