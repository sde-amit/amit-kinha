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
        description: 'Successfully delivered',
        color: 'from-blue-500 to-cyan-500',
        percentage: 95,
    },
    {
        icon: FaUsers,
        value: 30,
        suffix: '+',
        label: 'Happy Clients',
        description: 'Worldwide satisfaction',
        color: 'from-purple-500 to-pink-500',
        percentage: 98,
    },
    {
        icon: FaCoffee,
        value: 1000,
        suffix: '+',
        label: 'Cups of Coffee',
        description: 'Fuel for creativity',
        color: 'from-orange-500 to-red-500',
        percentage: 100,
    },
    {
        icon: FaTrophy,
        value: 5,
        suffix: '+',
        label: 'Awards Won',
        description: 'Recognition earned',
        color: 'from-yellow-500 to-orange-500',
        percentage: 90,
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
        <div ref={ref} className="flex items-baseline">
            <motion.span className="text-4xl md:text-5xl font-black">
                {rounded}
            </motion.span>
            <span className="text-4xl md:text-5xl font-black">{suffix}</span>
        </div>
    );
}

function ProgressBar({ percentage, color, inView }: { percentage: number; color: string; inView: boolean }) {
    return (
        <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${percentage}%` } : { width: 0 }}
                transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
                className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
            >
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
            </motion.div>
        </div>
    );
}

export default function Achievements() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="achievements" className="py-12 px-6 relative overflow-hidden">
            {/* Subtle Background Grid */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8 }}
                        className="section-title gradient-text mb-4"
                    >
                        By The Numbers
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-400 text-lg"
                    >
                        Measurable impact and proven results
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -15 : 15 }}
                            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.2,
                                type: 'spring',
                                stiffness: 100,
                            }}
                            whileHover={{
                                scale: 1.03,
                                rotateY: index % 2 === 0 ? 3 : -3,
                                rotateX: 2,
                                z: 50,
                                boxShadow: "0 30px 60px rgba(99, 102, 241, 0.4)"
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="group"
                        >
                            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden cursor-pointer">
                                {/* Animated Background Gradient */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${achievement.color.split(' ')[1]}, ${achievement.color.split(' ')[3]})`,
                                    }}
                                />

                                {/* Animated shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                />

                                {/* Content */}
                                <div className="relative z-10 flex items-start gap-6">
                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{
                                            rotate: [0, -10, 10, -10, 0],
                                            scale: 1.2,
                                            rotateY: 360
                                        }}
                                        transition={{ duration: 0.6 }}
                                        className="flex-shrink-0"
                                    >
                                        <motion.div
                                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg relative`}
                                            animate={{
                                                boxShadow: [
                                                    "0 10px 20px rgba(99, 102, 241, 0.3)",
                                                    "0 15px 30px rgba(99, 102, 241, 0.5)",
                                                    "0 10px 20px rgba(99, 102, 241, 0.3)"
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <achievement.icon className="text-3xl text-white" />

                                            {/* Pulsing ring */}
                                            <motion.div
                                                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${achievement.color} opacity-50`}
                                                animate={{
                                                    scale: [1, 1.3, 1],
                                                    opacity: [0.5, 0, 0.5]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </motion.div>
                                    </motion.div>

                                    {/* Text Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="mb-3">
                                            <motion.div
                                                className="gradient-text mb-1"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <Counter value={achievement.value} suffix={achievement.suffix} />
                                            </motion.div>
                                            <motion.h3
                                                className="text-xl font-bold text-white mb-1"
                                                whileHover={{ x: 5, color: "#a5b4fc" }}
                                            >
                                                {achievement.label}
                                            </motion.h3>
                                            <p className="text-sm text-gray-400">
                                                {achievement.description}
                                            </p>
                                        </div>

                                        {/* Progress Bar */}
                                        <ProgressBar
                                            percentage={achievement.percentage}
                                            color={achievement.color}
                                            inView={inView}
                                        />

                                        {/* Percentage Label */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                                            className="mt-2 text-right"
                                        >
                                            <span className={`text-xs font-semibold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                                                {achievement.percentage}% Success Rate
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Corner Accent with animation */}
                                <motion.div
                                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.color} opacity-5 rounded-bl-full`}
                                    whileHover={{ scale: 1.5, opacity: 0.1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Floating particles */}
                                <motion.div
                                    className={`absolute top-6 right-6 w-2 h-2 rounded-full bg-gradient-to-r ${achievement.color}`}
                                    animate={{
                                        y: [0, -15, 0],
                                        opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                />
                                <motion.div
                                    className={`absolute bottom-8 right-12 w-3 h-3 rounded-full bg-gradient-to-r ${achievement.color}`}
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.2, 0.8, 0.2]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 + 0.5 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Summary Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-indigo-500/30"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                        <div>
                            <h3 className="text-2xl font-bold gradient-text mb-2">
                                Ready to Add Your Project?
                            </h3>
                            <p className="text-gray-400">
                                Let's create something amazing together and add to these numbers
                            </p>
                        </div>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
                        >
                            <span>Start a Project</span>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
