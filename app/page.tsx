'use client';

import Navigation from '@/app/components/Navigation';
import Hero from '@/app/components/Hero';
import Experience from '@/app/components/Experience';
import Skills from '@/app/components/Skills';
import Projects from '@/app/components/Projects';
import Education from '@/app/components/Education';
import Achievements from '@/app/components/Achievements';
import Testimonials from '@/app/components/Testimonials';
import Contact from '@/app/components/Contact';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="animated-bg"></div>
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Testimonials />
        <Contact />
      </div>
    </div>
  );
}
