'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { FaCode, FaUsers, FaCoffee, FaTrophy } from 'react-icons/fa';

const achievements = [
    {
        icon: FaCode,
        value: 50,
        suffix: '+',
        label: 'Projects Completed',
        color: 'from-blue-500 to-cyan-500',
        shadowColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
        icon: FaUsers,
        value: 30,
        suffix: '+',
        label: 'Happy Clients',
        color: 'from-purple-500 to-pink-500',
        shadowColor: 'rgba(168, 85, 247, 0.5)',
    },
    {
        icon: FaCoffee,
        value: 1000,
        suffix: '+',
        label: 'Cups of Coffee',
        color: 'from-orange-500 to-red-500',
        shadowColor: 'rgba(249, 115, 22, 0.5)',
    },
    {
        icon: FaTrophy,
        value: 5,
        suffix: '+',
        label: 'Awards Won',
        color: 'from-yellow-500 to-orange-500',
        shadowColor: 'rgba(234, 179, 8, 0.5)',
    },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

    useEffect(() => {
        if (inView) {
            const controls = animate(count, value, { duration: 2.5, ease: 'easeOut' });
            return controls.stop;
        }
    }, [inView, count, value]);

    return (
        <div ref={ref}>
            <motion.span className="text-5xl md:text-6xl font-black">
                {rounded}
            </motion.span>
            <span className="text-5xl md:text-6xl font-black">{suffix}</span>
        </div>
    );
}

export default function Achievements() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="achievements" className="py-24 px-6 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8 }}
                        className="section-title gradient-text mb-4"
                    >
                        Achievements
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-400 text-lg"
                    >
                        Numbers that speak for themselves
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.15,
                                type: 'spring',
                                stiffness: 100,
                            }}
                            whileHover={{
                                scale: 1.08,
                                y: -10,
                            }}
                            className="relative group"
                        >
                            {/* Glow Effect on Hover */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at center, ${achievement.shadowColor}, transparent 70%)`,
                                    filter: 'blur(20px)',
                                }}
                            />

                            {/* Card */}
                            <div className="glass-card p-6 md:p-8 text-center relative overflow-hidden">
                                {/* Animated Border Gradient */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${achievement.shadowColor}, transparent)`,
                                        borderRadius: '1.5rem',
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon with Pulse Animation */}
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6, type: 'spring' }}
                                        className="relative mx-auto mb-6 w-20 h-20 md:w-24 md:h-24"
                                    >
                                        {/* Pulsing Ring */}
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.5, 0, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }}
                                            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${achievement.color}`}
                                        />

                                        {/* Icon Container */}
                                        <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-2xl`}>
                                            <achievement.icon className="text-3xl md:text-4xl text-white drop-shadow-lg" />
                                        </div>
                                    </motion.div>

                                    {/* Counter with Enhanced Gradient */}
                                    <motion.div
                                        className="gradient-text mb-3"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Counter value={achievement.value} suffix={achievement.suffix} />
                                    </motion.div>

                                    {/* Label */}
                                    <p className="text-gray-400 font-semibold text-sm md:text-base group-hover:text-gray-300 transition-colors">
                                        {achievement.label}
                                    </p>
                                </div>

                                {/* Decorative Corner Elements */}
                                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${achievement.color} opacity-10 rounded-bl-full`} />
                                <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${achievement.color} opacity-10 rounded-tr-full`} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Decorative Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="mt-16 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"
                />
            </div>
        </section>
    );
}
