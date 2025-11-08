'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCalendar } from 'react-icons/fa';

const experiences = [
    {
        company: 'Poliarc Services Pvt. Ltd.',
        position: 'Full Stack Developer',
        period: 'August 2025 - Present',
        description: 'Building election and political management software with campaign tracking, voter management, and social media tools.',
        color: 'from-indigo-500 to-purple-500',
    },
    {
        company: 'NGO Guru Pvt Ltd',
        position: 'Full Stack Developer',
        period: 'January 2024 - July 2025',
        description: 'Developed NGO websites, eCommerce platforms, ERP systems, and temple booking systems with payment integrations.',
        color: 'from-green-500 to-emerald-500',
    },
    {
        company: 'RKM Tech Research And Development',
        position: 'Full Stack Developer',
        period: 'February 2023 - November 2023',
        description: 'Built hospital management systems, eCommerce platforms, and gaming dashboards with backend APIs.',
        color: 'from-purple-500 to-pink-500',
    },
];

export default function Experience() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="experience" className="py-12 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title gradient-text mb-4">Experience</h2>
                    <p className="text-gray-400 text-lg">My professional journey</p>
                </motion.div>

                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, rotateY: -15 }}
                            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
                            whileHover={{
                                scale: 1.02,
                                rotateX: 2,
                                rotateY: index % 2 === 0 ? 2 : -2,
                                z: 50,
                                boxShadow: "0 25px 50px rgba(99, 102, 241, 0.3)"
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="glass-card p-8 relative overflow-hidden group cursor-pointer"
                        >
                            {/* Animated gradient bar */}
                            <motion.div
                                className={`absolute top-0 left-0 w-1 bg-gradient-to-b ${exp.color}`}
                                initial={{ height: 0 }}
                                animate={inView ? { height: "100%" } : {}}
                                transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                            />

                            {/* Glowing background effect */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 blur-2xl`}
                                whileHover={{ opacity: 0.1 }}
                                transition={{ duration: 0.4 }}
                            />

                            <div className="flex items-start gap-4 mb-4 relative z-10">
                                <motion.div
                                    className={`p-3 rounded-xl bg-gradient-to-br ${exp.color} text-white`}
                                    whileHover={{
                                        rotate: [0, -10, 10, -10, 0],
                                        scale: 1.1
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FaBriefcase className="text-xl" />
                                </motion.div>
                                <div className="flex-1">
                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-1"
                                        whileHover={{ x: 5 }}
                                    >
                                        {exp.position}
                                    </motion.h3>
                                    <p className="text-lg text-indigo-400 font-semibold mb-2">{exp.company}</p>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                        <FaCalendar />
                                        <span>{exp.period}</span>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                                </div>
                            </div>

                            {/* Corner decoration */}
                            <motion.div
                                className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${exp.color} opacity-5 rounded-tl-full`}
                                whileHover={{ scale: 1.5, opacity: 0.1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
