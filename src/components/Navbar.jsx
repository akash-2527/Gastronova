import React, { useState } from 'react';
import logo from '../assets/logo.png'

function Nav({ currentPage, setCurrentPage }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        // { id: 'products', label: 'Products' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <nav className="bg-white h-24 shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
                        <div className="rounded-lg mr-3">
                            <div className="bg-white mt-3.5 p-1.5 rounded w-28  flex items-center justify-center">
                                <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${currentPage === item.id
                                            ? 'text-teal-600 border-b-2 border-teal-600'
                                            : 'text-slate-600 hover:text-teal-600'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 hover:text-teal-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setCurrentPage(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300 ${currentPage === item.id
                                        ? 'text-teal-600 bg-teal-50'
                                        : 'text-slate-600 hover:text-teal-600 hover:bg-gray-50'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Nav;