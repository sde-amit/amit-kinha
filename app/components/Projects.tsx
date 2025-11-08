'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import { DndContext, closestCenter, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const projects = [
    {
        title: 'Bhagwat Bhawan',
        url: 'https://bhagwatbhawan.in',
        description: 'Modern hotel management system with booking, gallery, and admin dashboard',
        fullDescription: 'A modern, responsive website for Bhagwat Bhawan (Mathura) built with React and Tailwind CSS for the front-end, Node.js + Express for the back-end API, and MongoDB for data storage. Features room listings, availability status, online booking enquiry, photo gallery, guest reviews, and an admin dashboard for managing bookings and content. Optimized for mobile and desktop with intuitive navigation, fast performance, and easy content updates.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Cloudinary'],
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'My Aashiyana Foundation',
        url: 'https://myaashiyana.org',
        description: 'Animal rescue platform with adoption, donation tracking, and volunteer management',
        fullDescription: 'A vibrant, compassionate web-platform for My Aashiyana Foundation, showcasing the organisation\'s mission to rescue, care for and rehabilitate animals. Developed in React with Tailwind CSS for responsive interfaces (animal galleries, "adopt/sponsor" modules, donation call-to-action). The back-end uses Node.js/Express to power APIs (animal profiles, adoption status, donation tracking, volunteer signup), and MongoDB for flexible data storage. The site allows visitors to explore rescue stories, view live updates, submit support inquiries, and facilitates foundation administrators with content management and analytics.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Cloudinary'],
        color: 'from-green-500 to-emerald-500',
    },
    {
        title: 'Mangalagrah Mandir',
        url: 'https://mangalagrahmandir.org',
        description: 'Temple website with e-commerce, event management, and online offerings',
        fullDescription: 'A dynamic, responsive website built for Mangalagrah Mandir in Maharashtra that combines devotional presence with modern e-commerce and event management. The front-end is developed in React with Tailwind CSS, allowing devotees to explore the temple\'s history, participate in events and order offerings online. The back-end is powered by Node.js and Express, connected to MongoDB for scalable site data storage of product catalog (prasad), orders, events, temple details, and visitor inquiries. Visitors can browse temple information, see upcoming events, make online purchases of prasad and other temple products, register for events, and receive email confirmations.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Razorpay'],
        color: 'from-orange-500 to-red-500',
    },
    {
        title: 'YKVM',
        url: 'https://ykvm.in',
        description: 'NGO platform for rural empowerment through education and skill development',
        fullDescription: 'A responsive and informative website for Yuva Kaushal Vikas Mandal, developed to highlight the NGO\'s mission of empowering rural communities through education, skill development, and social welfare initiatives. The site includes sections for About, Programs, Blog, and Contact, offering easy navigation, clear communication, and a professional online presence to engage donors, volunteers, and partners.',
        tech: ['React', 'Node.js', 'Tailwind CSS', 'MongoDB'],
        color: 'from-purple-500 to-pink-500',
    },
    {
        title: 'Mangalagrah Booking',
        url: 'https://mangalagrahmandir.in',
        description: 'Online booking platform with payment gateway and QR code generation',
        fullDescription: 'A full-featured online booking platform for Mangalagrah Mandir (Maharashtra) developed using React, Tailwind CSS, Node.js, MySQL, and MongoDB. The website enables devotees to book Abhisheks online with an integrated payment gateway, auto-generated QR code slips sent via email, and detailed accounting dashboards for temple staff. The system uses MySQL for managing online bookings and payment data, while MongoDB handles offline bookings and dashboard activities. Admins can track payments, manage bookings, generate reports, and reconcile accounts in real time.',
        tech: ['React', 'Node.js', 'MySQL', 'MongoDB', 'Razorpay', 'QR Code'],
        color: 'from-indigo-500 to-blue-500',
    },
    {
        title: 'SPIET Organization',
        url: 'https://spiet.org',
        description: 'School platform with charity initiatives, events, and donation management',
        fullDescription: 'A modern, responsive web-platform for SPIET Organisation—a charity-driven national public school and community welfare body—built with React and Tailwind CSS in the front-end, with a Node.js/Express back-end and MongoDB for data storage. The site showcases SPIET\'s educational mission, charity initiatives, student stories, admission info, events calendar, teacher & volunteer profiles, donation/sponsorship module, and a blog/news section. Users can explore school programmes, register interest, make donations, view impact metrics, and subscribe for updates.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Cloudinary'],
        color: 'from-teal-500 to-green-500',
    },
    {
        title: 'Gajanan Skilltech',
        url: 'https://gajananskilltech.com',
        description: 'Skill development platform with job matching and real-time communication',
        fullDescription: 'Developed a full-stack web platform for Gajanan Skilltech, a skill development and employment ecosystem connecting Job Seekers, Employers, Institutes/Agencies, and Students through dedicated dashboards, real-time interactions, and a highly functional backend. The platform enables job matching, course management, placement tracking, and communication between all users—powered by Socket.io for real-time chat. Designed a clean, responsive UI for seamless user experience and built secure, scalable APIs with Node.js and MongoDB.',
        tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Tailwind CSS'],
        color: 'from-cyan-500 to-teal-500',
    },
    {
        title: 'Bright Layer Technology',
        url: 'https://brightlayer.in',
        description: 'Corporate website for technology firm showcasing services and expertise',
        fullDescription: 'I developed and delivered the fully-responsive public website for Bright Layer Technology, a cutting-edge technology firm specialising in software and digital transformation solutions. The website showcases the company\'s service offerings, domain expertise and provides a smooth user experience across devices.',
        tech: ['React', 'Tailwind CSS', 'Node.js'],
        color: 'from-sky-500 to-blue-500',
    },
    {
        title: 'TheNGOGuru',
        url: 'https://thengoguru.com',
        description: 'Digital platform empowering NGOs with comprehensive online solutions',
        fullDescription: 'TheNGOGuru is a digital platform designed to empower NGOs and non-profit organizations by providing them with comprehensive online solutions and strategic consultancy. The platform offers end-to-end services including NGO registration assistance, website development, digital branding, funding alerts, and ongoing virtual consultancy.',
        tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        color: 'from-violet-500 to-purple-500',
    },
    {
        title: 'Maa Tara Foundation',
        url: 'https://maatarafoundation.org',
        description: 'NGO website supporting old-age homes, orphanages and vulnerable communities',
        fullDescription: 'A responsive, user-friendly website developed to showcase the mission and activities of the Maa Tara Foundation — an NGO dedicated to supporting old-age homes, orphanages and vulnerable sections of society. The site features clear navigation, structured content detailing the foundation\'s programs (such as care and shelter provision), volunteer and donation information, and integration of social-media streams for outreach. Designed with accessibility and readability in mind.',
        tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        color: 'from-rose-500 to-pink-500',
    },
    {
        title: 'Maharishi Ved Vyas',
        url: 'https://maharishivedvyas.org',
        description: 'Spiritual organization platform for Yoga, Ayurveda and Vedic education',
        fullDescription: 'Developed and enhanced the official website for Maharishi Ved Vyas Sewa Samiti, an organization dedicated to promoting Yoga, Ayurveda, and Vedic spiritual education. The platform serves as an online space for spreading ancient Indian wisdom, conducting Yoga sessions, wellness programs, and connecting spiritual seekers across India. The website features a clean, serene, and responsive user interface that aligns with the organization\'s spiritual identity. It includes sections for Yoga courses, daily practices, teacher registration, events and workshops, and community outreach programs.',
        tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express'],
        color: 'from-amber-500 to-orange-500',
    },
    {
        title: 'CA Rajesh Verma',
        url: 'https://carajeshverma.com',
        description: 'Professional portfolio website for tax planning and financial advisory',
        fullDescription: 'A professional portfolio website built with Next.js for CA Rajesh Verma, showcasing his expertise in tax planning, auditing, and financial advisory. The site features a clean, responsive design, fast performance with server-side rendering, and SEO optimization. It includes sections like About, Services, Testimonials, and Contact, offering a seamless user experience and strong professional branding.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'SEO'],
        color: 'from-blue-600 to-indigo-600',
    },
];

interface SortableProjectCardProps {
    project: typeof projects[0];
    index: number;
    inView: boolean;
    onSelect: () => void;
}

function SortableProjectCard({ project, index, inView, onSelect }: SortableProjectCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: `project-${index}` });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 }}
        >
            <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={2000}
                gyroscope={true}
            >
                <div
                    {...attributes}
                    {...listeners}
                    className={`glass-card p-6 group cursor-grab active:cursor-grabbing h-full ${isDragging ? 'shadow-2xl ring-2 ring-indigo-500/50' : ''
                        }`}
                    onClick={onSelect}
                >
                    <div className={`h-1 w-16 bg-gradient-to-r ${project.color} rounded-full mb-4`} />
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-white/5 text-indigo-400 rounded-full text-xs font-medium">
                                {tech}
                            </span>
                        ))}
                        {project.tech.length > 3 && (
                            <span className="px-3 py-1 bg-white/5 text-purple-400 rounded-full text-xs font-medium">
                                +{project.tech.length - 3}
                            </span>
                        )}
                    </div>
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-semibold"
                    >
                        Visit Site <FaExternalLinkAlt className="text-xs" />
                    </a>
                </div>
            </Tilt>
        </motion.div>
    );
}

export default function Projects() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [projectList, setProjectList] = useState(projects);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            setActiveId(null);
            return;
        }

        const activeIndex = projectList.findIndex((_, idx) => `project-${idx}` === active.id);
        const overIndex = projectList.findIndex((_, idx) => `project-${idx}` === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
            const newProjects = [...projectList];
            const [movedProject] = newProjects.splice(activeIndex, 1);
            newProjects.splice(overIndex, 0, movedProject);
            setProjectList(newProjects);
        }

        setActiveId(null);
    };

    const activeProject = activeId ? projectList.find((_, idx) => `project-${idx}` === activeId) : null;

    return (
        <section id="projects" className="py-12 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title gradient-text mb-4">Featured Projects</h2>
                    <p className="text-gray-400 text-lg">Real-world applications I've built</p>
                </motion.div>

                {isMounted ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={projectList.map((_, idx) => `project-${idx}`)}
                            strategy={rectSortingStrategy}
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projectList.map((project, index) => (
                                    <SortableProjectCard
                                        key={`project-${index}`}
                                        project={project}
                                        index={index}
                                        inView={inView}
                                        onSelect={() => setSelectedProject(project)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                        <DragOverlay>
                            {activeProject && (
                                <div className="glass-card p-6 shadow-2xl ring-2 ring-indigo-500 rotate-3 scale-105">
                                    <div className={`h-1 w-16 bg-gradient-to-r ${activeProject.color} rounded-full mb-4`} />
                                    <h3 className="text-xl font-bold text-white mb-3">{activeProject.title}</h3>
                                    <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">{activeProject.description}</p>
                                </div>
                            )}
                        </DragOverlay>
                    </DndContext>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectList.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                            >
                                <Tilt
                                    tiltMaxAngleX={10}
                                    tiltMaxAngleY={10}
                                    perspective={1000}
                                    scale={1.02}
                                    transitionSpeed={2000}
                                    gyroscope={true}
                                >
                                    <div
                                        className="glass-card p-6 group cursor-pointer h-full"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        <div className={`h-1 w-16 bg-gradient-to-r ${project.color} rounded-full mb-4`} />
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 text-indigo-400 rounded-full text-xs font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech.length > 3 && (
                                                <span className="px-3 py-1 bg-white/5 text-purple-400 rounded-full text-xs font-medium">
                                                    +{project.tech.length - 3}
                                                </span>
                                            )}
                                        </div>
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-semibold"
                                        >
                                            Visit Site <FaExternalLinkAlt className="text-xs" />
                                        </a>
                                    </div>
                                </Tilt>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-3xl font-bold gradient-text mb-2">{selectedProject.title}</h3>
                                    <div className={`h-1 w-24 bg-gradient-to-r ${selectedProject.color} rounded-full`} />
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="text-gray-400 hover:text-white text-2xl p-2 hover:bg-white/5 rounded-lg transition-all"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed text-base">
                                {selectedProject.fullDescription || selectedProject.description}
                            </p>
                            <div className="mb-6">
                                <h4 className="text-lg font-bold text-white mb-3">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tech.map((tech, i) => (
                                        <span key={i} className="px-4 py-2 bg-white/10 text-indigo-300 rounded-lg text-sm font-medium border border-white/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <a
                                href={selectedProject.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <span>Visit Website</span>
                                <FaExternalLinkAlt />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
