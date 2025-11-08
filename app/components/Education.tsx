'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCertificate, FaHeart, FaCode, FaLanguage } from 'react-icons/fa';

const education = [
    {
        degree: 'Bachelor Of Computer Applications',
        institution: 'Maharaja Agrasen Himalayan Garhwal University',
        period: '2020 - 2023',
        color: 'from-indigo-500 to-purple-500',
    },
    {
        degree: 'Diploma Of Backend Developer',
        institution: 'Arth Institute',
        period: '2021 - 2023',
        color: 'from-green-500 to-emerald-500',
    },
];

const sections = [
    {
        title: 'Interests',
        icon: FaHeart,
        items: [
            'Exploring new technologies',
            'Backend architecture',
            'Problem-solving',
        ],
    },
    {
        title: 'Activities',
        icon: FaCode,
        items: [
            'Full-stack web applications',
            'Team-based projects',
            'ERP & eCommerce platforms',
        ],
    },
    {
        title: 'Languages',
        icon: FaLanguage,
        items: [
            'English - Professional',
            'Hindi - Native',
        ],
    },
];

export default function Education() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="education" className="py-12 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title gradient-text mb-4">Education & More</h2>
                    <p className="text-gray-400 text-lg">My academic background</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`bg-gradient-to-br ${edu.color} text-white rounded-2xl p-8 shadow-xl`}
                        >
                            <FaGraduationCap className="text-5xl mb-4" />
                            <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                            <p className="text-lg mb-2 opacity-90">{edu.institution}</p>
                            <p className="opacity-80">{edu.period}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <section.icon className="text-3xl text-indigo-400" />
                                <h3 className="text-xl font-bold text-white">{section.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {section.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                        <span className="text-indigo-400 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
