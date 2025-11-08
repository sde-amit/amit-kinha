'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (isMobileMenuOpen) {
            const handleClickOutside = () => setIsMobileMenuOpen(false);
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'Experience', href: '#experience' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 600);
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-card py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center">
                    <motion.a
                        href="#home"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-2xl md:text-3xl font-black gradient-text cursor-pointer tracking-tight"
                    >
                        AK
                    </motion.a>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                whileHover={{ y: -2 }}
                                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-sm relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary"
                        >
                            <span>Let's Talk</span>
                        </motion.a>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMobileMenuOpen(!isMobileMenuOpen);
                        }}
                        className="md:hidden text-2xl text-white p-2 hover:text-indigo-400 transition-colors"
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: 1,
                            height: 'auto',
                            transition: {
                                height: { duration: 0.4, ease: 'easeInOut' },
                                opacity: { duration: 0.3, ease: 'easeIn' }
                            }
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                                height: { duration: 0.4, ease: 'easeInOut', delay: 0.2 },
                                opacity: { duration: 0.2, ease: 'easeOut' }
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="md:hidden glass-card mt-4 mx-4 overflow-hidden"
                    >
                        <div className="px-6 py-6 space-y-3">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            delay: 0.1 + index * 0.08,
                                            duration: 0.4,
                                            ease: 'easeOut'
                                        }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -30,
                                        transition: {
                                            delay: (navItems.length - 1 - index) * 0.05,
                                            duration: 0.3,
                                            ease: 'easeIn'
                                        }
                                    }}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="block text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg py-2 hover:pl-2"
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
