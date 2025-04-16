'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center grid-lines py-20">
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-opacity-20 text-accent border border-accent text-sm mb-2">
              Full-Stack Developer & UI/UX Designer
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              <span className="heading-gradient">Crafting</span> Digital <br />
              Experiences with Code
            </h1>
            <p className="text-lg text-foreground-muted mb-8 max-w-lg">
              I build beautiful, functional websites and applications powered by modern technology stacks that deliver exceptional user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/gallery" className="btn btn-primary">
                View My Work
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Get In Touch
              </Link>
            </div>
            
            <div className="pt-10">
              <p className="text-sm text-foreground-muted mb-3">Tech Stack:</p>
              <div className="flex flex-wrap gap-3">
                <span className="tech-badge badge-react">React</span>
                <span className="tech-badge badge-next">Next.js</span>
                <span className="tech-badge badge-ts">TypeScript</span>
                <span className="tech-badge badge-node">Node.js</span>
                <span className="tech-badge badge-tailwind">Tailwind</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="glow-effect relative aspect-square rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-background-light bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">👨‍💻</div>
                  <div className="text-2xl font-bold heading-gradient">Code. Create. Innovate.</div>
                </div>
              </div>
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 z-0"></div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-accent rounded-lg"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 border border-primary rounded-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Animated floating elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-primary opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-3 h-3 rounded-full bg-accent opacity-30 animate-pulse"></div>
      <div className="absolute top-3/4 left-1/4 w-6 h-6 rounded-full bg-secondary opacity-20 animate-pulse"></div>
    </section>
  );
};

export default HeroSection;
