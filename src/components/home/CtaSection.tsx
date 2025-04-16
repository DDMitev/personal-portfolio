'use client';

import React from 'react';
import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background-light opacity-90 -z-10"></div>
      <div className="absolute inset-0 grid-lines opacity-10 -z-10"></div>
      <div className="absolute -left-40 -top-40 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-gradient inline-block">Ready to Start Your Project?</h2>
          <p className="text-xl mb-10 text-foreground-muted">
            Let's collaborate to bring your ideas to life. I'm currently available for freelance work and new opportunities.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg group">
            Contact Me
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
