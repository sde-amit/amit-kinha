'use client';

import { motion } from 'framer-motion';

const messages = [
    '🎨 Design Meets Functionality',
    '🚀 Building Digital Solutions That Matter',
    '💻 Ready to Bring Your Vision to Life',
    '🎯 Let\'s Build Something Amazing Together',
    '💡 Turning Ideas Into Reality',
    '🌟 Open to Full-Time Opportunities',
    '🔥 Passionate About Clean Code',
    '✨ Creating Exceptional User Experiences',
];

export default function MotivationalSlider() {
    // Duplicate messages for seamless loop
    const duplicatedMessages = [...messages, ...messages];

    return (
        <section className="py-8 relative overflow-hidden">
            {/* Animated Background Pattern */}
            {/* <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                />
            </div> */}

            {/* Gradient Overlays */}
            {/* <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent z-10" /> */}

            <div className="relative">
                <motion.div
                    className="flex gap-16 items-center"
                    animate={{
                        x: [0, -2400],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 30,
                            ease: 'linear',
                        },
                    }}
                >
                    {duplicatedMessages.map((message, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 group cursor-default"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <div className="relative">
                                {/* Glow Effect on Hover */}
                                {/* <motion.div
                                    className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                                    style={{
                                        background: 'linear-gradient(120deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4))',
                                    }}
                                /> */}

                                {/* Message Container */}
                                <div className="relative px-8 py-4 rounded-2xl">
                                    <span className="text-lg md:text-xl font-bold">
                                        {message}
                                    </span>
                                </div>

                                {/* Decorative Elements */}

                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Accent Line */}
        </section>
    );
}
