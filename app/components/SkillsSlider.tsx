'use client';

import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaPython, FaAws, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiBootstrap, SiExpress, SiMongodb, SiMysql, SiSocketdotio, SiNextdotjs, SiRedux, SiCloudinary, SiPostman } from 'react-icons/si';
import { BiLogoVisualStudio } from 'react-icons/bi';

const skills = [
    { name: 'HTML5', icon: FaHtml5, color: 'text-orange-500' },
    { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-500' },
    { name: 'JavaScript', icon: FaJs, color: 'text-yellow-400' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
    { name: 'React.js', icon: FaReact, color: 'text-cyan-400' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
    { name: 'Redux', icon: SiRedux, color: 'text-purple-500' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
    { name: 'Bootstrap', icon: SiBootstrap, color: 'text-purple-600' },
    { name: 'Node.js', icon: FaNode, color: 'text-green-500' },
    { name: 'Express.js', icon: SiExpress, color: 'text-gray-400' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
    { name: 'MySQL', icon: SiMysql, color: 'text-blue-500' },
    { name: 'Python', icon: FaPython, color: 'text-blue-400' },
    { name: 'Socket.io', icon: SiSocketdotio, color: 'text-white' },
    { name: 'AWS', icon: FaAws, color: 'text-orange-400' },
    { name: 'Cloudinary', icon: SiCloudinary, color: 'text-blue-400' },
    { name: 'Git', icon: FaGitAlt, color: 'text-orange-600' },
    { name: 'GitHub', icon: FaGithub, color: 'text-gray-300' },
    { name: 'Postman', icon: SiPostman, color: 'text-orange-500' },
    { name: 'VS Code', icon: BiLogoVisualStudio, color: 'text-blue-500' },
];

export default function SkillsSlider() {
    // Duplicate skills array for seamless infinite scroll
    const duplicatedSkills = [...skills, ...skills];

    return (
        <section className="py-6 relative overflow-hidden">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />

            {/* Animated Background */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" /> */}

            <div className="relative">
                <motion.div
                    className="flex gap-12"
                    animate={{
                        x: [0, -50 * skills.length],
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
                    {duplicatedSkills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer"
                            whileHover={{ scale: 1.2, y: -5 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <div className="relative">
                                {/* Glow Effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `radial-gradient(circle, currentColor, transparent 70%)`,
                                        filter: 'blur(15px)',
                                    }}
                                />

                                {/* Icon Container */}
                                <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/30 transition-all">
                                    <skill.icon className={`text-3xl ${skill.color} drop-shadow-lg`} />
                                </div>
                            </div>

                            <span className="text-xs text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
