'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const contactInfo = [
    {
        icon: FaEnvelope,
        label: 'Email',
        value: 'amitkinha2000@gmail.com',
        link: 'mailto:amitkinha2000@gmail.com',
    },
    {
        icon: FaPhone,
        label: 'Phone',
        value: '+91 9896617898',
        link: 'tel:+919896617898',
    },
    {
        icon: FaMapMarkerAlt,
        label: 'Location',
        value: 'Vill. Badsa, Jhajjar, Haryana-124105',
        link: 'https://maps.app.goo.gl/C4H9oXFSuej1Qz5aA',
    },
    {
        icon: FaGlobe,
        label: 'Website',
        value: 'brightlayer.in',
        link: 'https://brightlayer.in',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        value: 'Connect with me',
        link: 'https://linkedin.com/in/sde-amit',
    },
    {
        icon: FaGithub,
        label: 'GitHub',
        value: 'View my code',
        link: 'https://github.com/sde-amit',
    },
];

export default function Contact() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="contact" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title gradient-text mb-4">Get In Touch</h2>
                    <p className="text-gray-400 text-lg">Let's build something amazing together</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-card p-6 group"
                        >
                            {info.link ? (
                                <a href={info.link} target="_blank" rel="noopener noreferrer" className="block">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white">
                                            <info.icon className="text-2xl" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{info.label}</h3>
                                    </div>
                                    <p className="text-gray-300 text-sm hover:text-indigo-400 transition-colors">{info.value}</p>
                                </a>
                            ) : (
                                <>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white">
                                            <info.icon className="text-2xl" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{info.label}</h3>
                                    </div>
                                    <p className="text-gray-300 text-sm">{info.value}</p>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-white text-center shadow-2xl"
                >
                    <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
                    <p className="text-lg mb-8 opacity-90">I'm available for freelance work and full-time opportunities</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <motion.a
                            href="mailto:amitkinha2000@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all inline-flex items-center gap-2"
                        >
                            <FaEnvelope /> Send Email
                        </motion.a>
                        <motion.a
                            href="tel:+919896617898"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 border-2 border-white rounded-full font-bold hover:bg-white/20 transition-all inline-flex items-center gap-2"
                        >
                            <FaPhone /> Call Now
                        </motion.a>
                    </div>
                </motion.div>

                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center text-gray-400"
                >
                    <p className="text-lg mb-2">© 2025 Amit Kinha. All rights reserved.</p>
                    <p className="text-sm">Built with Next.js, React & Tailwind CSS</p>
                </motion.footer>
            </div>
        </section>
    );
}
