'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaHeart, FaCode, FaLanguage } from 'react-icons/fa';

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
                            initial={{ opacity: 0, y: 30, rotateX: -20 }}
                            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
                            whileHover={{
                                scale: 1.05,
                                rotateY: 5,
                                rotateX: 5,
                                z: 50,
                                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)"
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                            className={`bg-gradient-to-br ${edu.color} text-white rounded-2xl p-8 shadow-xl cursor-pointer relative overflow-hidden`}
                        >
                            {/* Animated shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                            />

                            <motion.div
                                whileHover={{
                                    rotate: [0, -10, 10, -10, 0],
                                    scale: 1.2
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                <FaGraduationCap className="text-5xl mb-4 relative z-10" />
                            </motion.div>
                            <motion.h3
                                className="text-2xl font-bold mb-2 relative z-10"
                                whileHover={{ x: 5 }}
                            >
                                {edu.degree}
                            </motion.h3>
                            <p className="text-lg mb-2 opacity-90 relative z-10">{edu.institution}</p>
                            <p className="opacity-80 relative z-10">{edu.period}</p>

                            {/* Floating particles effect */}
                            <motion.div
                                className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full"
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.4, 1, 0.4]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute bottom-8 right-12 w-3 h-3 bg-white/30 rounded-full"
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1, type: "spring" }}
                            whileHover={{
                                scale: 1.05,
                                rotateZ: 2,
                                y: -10,
                                boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
                            }}
                            className="glass-card p-6 cursor-pointer relative overflow-hidden"
                        >
                            {/* Gradient background on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />

                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <motion.div
                                    whileHover={{
                                        rotate: 360,
                                        scale: 1.2
                                    }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <section.icon className="text-3xl text-indigo-400" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-white">{section.title}</h3>
                            </div>
                            <ul className="space-y-2 relative z-10">
                                {section.items.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-2 text-gray-300 text-sm"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5 + index * 0.1 + i * 0.1 }}
                                        whileHover={{ x: 5, color: "#a5b4fc" }}
                                    >
                                        <motion.span
                                            className="text-indigo-400 mt-1"
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                        >
                                            •
                                        </motion.span>
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Corner accent */}
                            <motion.div
                                className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-full"
                                whileHover={{ scale: 1.5 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
