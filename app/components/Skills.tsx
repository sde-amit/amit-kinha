'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaPython, FaAws, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiBootstrap, SiExpress, SiMongodb, SiMysql, SiSocketdotio, SiNextdotjs, SiRedux, SiCloudinary, SiPostman } from 'react-icons/si';
import { BiLogoVisualStudio } from "react-icons/bi";


const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'HTML5', icon: FaHtml5, color: 'text-orange-500' },
            { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-500' },
            { name: 'JavaScript', icon: FaJs, color: 'text-yellow-400' },
            { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
            { name: 'React.js', icon: FaReact, color: 'text-cyan-400' },
            { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
            { name: 'Redux', icon: SiRedux, color: 'text-purple-500' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
            { name: 'Bootstrap', icon: SiBootstrap, color: 'text-purple-600' },
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node.js', icon: FaNode, color: 'text-green-500' },
            { name: 'Express.js', icon: SiExpress, color: 'text-gray-400' },
            { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
            { name: 'MySQL', icon: SiMysql, color: 'text-blue-500' },
            { name: 'Python', icon: FaPython, color: 'text-blue-400' },
            { name: 'Socket.io', icon: SiSocketdotio, color: 'text-white' },
        ],
    },
    {
        title: 'Cloud & Tools',
        skills: [
            { name: 'AWS', icon: FaAws, color: 'text-orange-400' },
            { name: 'Cloudinary', icon: SiCloudinary, color: 'text-blue-400' },
            { name: 'Git', icon: FaGitAlt, color: 'text-orange-600' },
            { name: 'GitHub', icon: FaGithub, color: 'text-gray-300' },
            { name: 'Postman', icon: SiPostman, color: 'text-orange-500' },
            { name: 'VS Code', icon: BiLogoVisualStudio, color: 'text-blue-500' },
        ],
    },
    {
        title: 'Additional Skills',
        skills: [
            { name: 'REST APIs', icon: FaNode, color: 'text-green-400' },
            { name: 'Razorpay', icon: FaReact, color: 'text-blue-500' },
            { name: 'PayU', icon: FaReact, color: 'text-green-500' },
            { name: 'React Native', icon: FaReact, color: 'text-cyan-400' },
            { name: 'SEO', icon: FaReact, color: 'text-yellow-400' },
            { name: 'Agile/Scrum', icon: FaReact, color: 'text-indigo-400' },
        ],
    },
];

export default function Skills() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="skills" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title gradient-text mb-4">Skills & Expertise</h2>
                    <p className="text-gray-400 text-lg">Technologies I work with</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: catIndex * 0.15 }}
                            className="glass-card p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 gradient-text">{category.title}</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.4, delay: catIndex * 0.15 + skillIndex * 0.05 }}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
                                    >
                                        <skill.icon className={`text-3xl ${skill.color}`} />
                                        <span className="text-xs text-gray-300 font-medium text-center leading-tight">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
