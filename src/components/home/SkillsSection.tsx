'use client';

import React from 'react';

const SkillsSection = () => {
  const skills = {
    frontend: ['React', 'Vue', 'JavaScript', 'TypeScript', 'HTML/CSS'],
    backend: ['Node.js', 'Express', 'Python', 'Django', 'RESTful APIs'],
    design: ['UI/UX', 'Figma', 'Adobe XD', 'Responsive Design'],
    database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase']
  };

  return (
    <section className="py-20 relative">
      {/* Background effects */}
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-primary opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-1/3 w-72 h-72 bg-secondary opacity-5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient inline-block">Skills & Expertise</h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Technologies and methodologies I specialize in to create exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Skill Card - Frontend */}
          <div className="card hover:transform hover:scale-105">
            <div className="bg-primary bg-opacity-10 text-primary w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2 text-center">Frontend</h3>
            <ul className="space-y-1">
              {skills.frontend.map((skill, index) => (
                <li key={index} className="text-foreground-muted text-center">{skill}</li>
              ))}
            </ul>
          </div>

          {/* Skill Card - Backend */}
          <div className="card hover:transform hover:scale-105">
            <div className="bg-secondary bg-opacity-10 text-secondary w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2 text-center">Backend</h3>
            <ul className="space-y-1">
              {skills.backend.map((skill, index) => (
                <li key={index} className="text-foreground-muted text-center">{skill}</li>
              ))}
            </ul>
          </div>

          {/* Skill Card - Design */}
          <div className="card hover:transform hover:scale-105">
            <div className="bg-accent bg-opacity-10 text-accent w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2 text-center">Design</h3>
            <ul className="space-y-1">
              {skills.design.map((skill, index) => (
                <li key={index} className="text-foreground-muted text-center">{skill}</li>
              ))}
            </ul>
          </div>

          {/* Skill Card - Database */}
          <div className="card hover:transform hover:scale-105">
            <div className="bg-primary-dark bg-opacity-10 text-primary-dark w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2 text-center">Database</h3>
            <ul className="space-y-1">
              {skills.database.map((skill, index) => (
                <li key={index} className="text-foreground-muted text-center">{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
