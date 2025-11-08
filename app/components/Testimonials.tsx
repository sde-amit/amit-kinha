'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
    {
        name: 'Rajesh Sharma',
        role: 'Director, Bhagwat Bhawan',
        project: 'Bhagwat Bhawan',
        rating: 5,
        text: 'Amit transformed our hotel business with a modern booking system. The website is beautiful, fast, and our bookings have increased by 40%. His understanding of hospitality industry needs is exceptional.',
    },
    {
        name: 'Priya Gupta',
        role: 'Founder, My Aashiyana Foundation',
        project: 'My Aashiyana Foundation',
        rating: 5,
        text: 'The platform Amit built for our animal rescue foundation has been a game-changer. We can now manage adoptions, track donations, and coordinate volunteers seamlessly. His dedication to our cause was evident throughout.',
    },
    {
        name: 'Pandit Vishwanath Joshi',
        role: 'Head Priest, Mangalagrah Mandir',
        project: 'Mangalagrah Mandir',
        rating: 5,
        text: 'Amit created a comprehensive temple management system with e-commerce and booking features. Devotees can now book pujas online and receive QR codes instantly. The payment integration works flawlessly.',
    },
    {
        name: 'Vikram Singh',
        role: 'CEO, Gajanan Skilltech',
        project: 'Gajanan Skilltech',
        rating: 5,
        text: 'The skill development platform Amit built connects job seekers, employers, and institutes perfectly. The real-time chat feature using Socket.io is brilliant. His full-stack expertise is truly impressive.',
    },
    {
        name: 'Dr. Anjali Mehta',
        role: 'Director, SPIET Organization',
        project: 'SPIET Organization',
        rating: 5,
        text: 'Our school website now beautifully showcases our educational mission and charity initiatives. The donation module and event management system work perfectly. Amit delivered beyond our expectations.',
    },
    {
        name: 'Ramesh Kumar',
        role: 'President, YKVM',
        project: 'YKVM',
        rating: 5,
        text: 'Amit developed a professional platform for our NGO that effectively communicates our rural empowerment mission. The blog section and program showcase help us engage with donors and volunteers effectively.',
    },
    {
        name: 'Swami Vedananda',
        role: 'Secretary, Maharishi Ved Vyas Sewa Samiti',
        project: 'Maharishi Ved Vyas',
        rating: 5,
        text: 'The spiritual platform Amit created perfectly captures our organization\'s essence. The Yoga course registration and event management features are exactly what we needed. His attention to detail is remarkable.',
    },
    {
        name: 'Neha Patel',
        role: 'Founder, TheNGOGuru',
        project: 'TheNGOGuru',
        rating: 5,
        text: 'Amit built a comprehensive digital platform that empowers NGOs across India. The consultancy booking system and funding alerts feature work seamlessly. His understanding of the non-profit sector is excellent.',
    },
];

export default function Testimonials() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title gradient-text mb-4">What Clients Say</h2>
                    <p className="text-gray-400 text-lg">Real feedback from real projects</p>
                </motion.div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    loop={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="testimonials-swiper pb-12"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="glass-card p-8 relative h-full"
                            >
                                <FaQuoteLeft className="text-4xl text-indigo-500 opacity-20 absolute top-6 right-6" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                                        <p className="text-xs text-indigo-400 mt-1">Project: {testimonial.project}</p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-gray-300 leading-relaxed text-sm">{testimonial.text}</p>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
