'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaEnvelope, FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const nodesRef = useRef<Node[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [particles] = useState(() =>
        Array.from({ length: 15 }, (_, i) => ({
            left: (i * 7 + 13) % 100,
            top: (i * 11 + 25) % 100,
            duration: 5 + (i % 5),
            delay: i % 5,
        }))
    );

    useEffect(() => {
        setIsMounted(true);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize nodes
        const nodeCount = 50;
        nodesRef.current = Array.from({ length: nodeCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        }));

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodesRef.current.forEach((node, i) => {
                // Move nodes
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
                ctx.fill();

                // Draw connections to nearby nodes
                nodesRef.current.forEach((otherNode, j) => {
                    if (i === j) return;
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.3 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });

                // Draw connection to mouse
                const dxMouse = node.x - mousePos.x;
                const dyMouse = node.y - mousePos.y;
                const distanceToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distanceToMouse < 200) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mousePos.x, mousePos.y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${0.6 * (1 - distanceToMouse / 200)})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Draw glow at mouse
                    ctx.beginPath();
                    ctx.arc(mousePos.x, mousePos.y, 5, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
                    ctx.fill();
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [mousePos]);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-20 px-6"
            onMouseMove={handleMouseMove}
        >
            {/* Interactive Wire Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0.4 }}
            />

            {/* Floating 3D Geometric Shapes */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 border-2 border-indigo-500/30 rounded-lg"
                animate={{
                    y: [0, -30, 0],
                    rotateZ: [0, 180, 360],
                    rotateY: [0, 180, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ transformStyle: 'preserve-3d' }}
            />

            <motion.div
                className="absolute top-40 right-20 w-16 h-16 border-2 border-purple-500/30 rounded-full"
                animate={{
                    y: [0, 40, 0],
                    scale: [1, 1.2, 1],
                    rotateX: [0, 360, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ transformStyle: 'preserve-3d' }}
            />

            <motion.div
                className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-pink-500/30"
                animate={{
                    y: [0, -25, 0],
                    rotateZ: [0, -180, -360],
                    rotateX: [0, 180, 360],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ transformStyle: 'preserve-3d' }}
            />

            <motion.div
                className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-cyan-500/30 rounded-xl"
                animate={{
                    y: [0, 35, 0],
                    rotateY: [0, 360, 0],
                    rotateZ: [0, 180, 360],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ transformStyle: 'preserve-3d' }}
            />

            {/* Floating Particles */}
            {isMounted && particles.map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-indigo-500/40 rounded-full"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Gradient Orbs with 3D effect */}
            <motion.div
                className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.4, 1],
                    x: [0, -60, 0],
                    y: [0, 60, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block"
                        >
                            <span className="px-5 py-2 glass-card text-sm font-semibold text-indigo-400 inline-flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Available for work
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black leading-tight"
                        >
                            Hi, I'm <span className="gradient-text">Amit Kinha</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-2xl md:text-3xl font-bold text-gray-300 h-20"
                        >
                            <TypeAnimation
                                sequence={[
                                    'Full Stack Developer',
                                    2000,
                                    'MERN Stack Expert',
                                    2000,
                                    'React Specialist',
                                    2000,
                                    'Problem Solver',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                                className="gradient-text"
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg text-gray-400 leading-relaxed max-w-xl"
                        >
                            Crafting exceptional digital experiences with modern web technologies.
                            Passionate about building scalable applications that make a difference.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <span>Get In Touch</span>
                                <FaArrowRight className="text-sm" />
                            </motion.a>
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 glass-card rounded-full font-semibold hover:border-indigo-500 transition-all inline-flex items-center gap-2"
                            >
                                <span>View Projects</span>
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex items-center gap-4 pt-4"
                        >
                            {[
                                { icon: FaGithub, link: 'https://github.com/sde-amit' },
                                { icon: FaLinkedin, link: 'https://linkedin.com/in/sde-amit' },
                                { icon: FaEnvelope, link: 'mailto:amitkinha2000@gmail.com' },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:border-indigo-500 transition-all"
                                >
                                    <social.icon className="text-xl" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
                            />
                            <div className="relative glass-card p-4 rounded-3xl">
                                <Image
                                    src="/images/main-img.jpg"
                                    alt="Amit Kinha"
                                    width={600}
                                    height={600}
                                    className="rounded-2xl object-cover w-full h-auto select-none pointer-events-none"
                                    priority
                                    draggable={false}
                                />
                            </div>
                        </div>

                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-20 blur-2xl"
                        />
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl"
                        />
                    </motion.div>
                </div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-indigo-500 rounded-full flex justify-center p-1.5">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
