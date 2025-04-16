import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  // Update skills data based on actual expertise
  const skills = {
    frontend: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'SASS'],
    backend: ['Node.js', 'Express', 'Python'],
    database: ['MongoDB', 'MySQL'],
    tools: ['Git', 'GitHub', 'VSCode', 'Figma'],
    other: ['Problem Solving', 'Mechanical Engineering', 'International Baccalaureate']
  };

  // Personal metrics - will be used for the visual skill bars
  const skillMetrics = [
    { name: 'Frontend Development', value: 80 },
    { name: 'UI/UX Design', value: 75 },
    { name: 'Backend Development', value: 65 },
    { name: 'Database Management', value: 60 },
    { name: 'Problem Solving', value: 85 },
  ];

  return (
    <div className="min-h-screen py-16">
      {/* Hero section with geometric elements */}
      <section className="relative overflow-hidden mb-16">
        <div className="absolute top-0 left-0 w-full h-full grid-lines opacity-30"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-24 h-24 border border-primary rounded-lg opacity-30 transform rotate-12"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-secondary rounded-full opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="heading-gradient text-5xl font-bold mb-6">About Me</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Profile and info */}
          <div className="lg:col-span-5">
            <div className="card relative overflow-hidden">
              {/* Profile header */}
              <div className="relative mb-6">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-primary via-secondary to-accent rounded-full p-1">
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                      <span className="text-3xl">DM</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">Deyan Mitev</h2>
                    <p className="text-foreground-muted">Freelance Developer & Engineering Student</p>
                  </div>
                </div>
              </div>

              {/* Personal details with tech-inspired layout */}
              <div className="space-y-6">
                <div className="terminal-container bg-background border border-border rounded-lg p-4">
                  <div className="flex gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="font-mono text-sm">
                    <p className="mb-2"><span className="text-accent">const</span> <span className="text-primary">developer</span> = {'{'}</p>
                    <p className="pl-4 mb-1"><span className="text-foreground-muted">name:</span> <span className="text-secondary">"Deyan Mitev"</span>,</p>
                    <p className="pl-4 mb-1"><span className="text-foreground-muted">role:</span> <span className="text-secondary">"Freelance Developer"</span>,</p>
                    <p className="pl-4 mb-1"><span className="text-foreground-muted">education:</span> <span className="text-secondary">"Mechanical Engineering Student"</span>,</p>
                    <p className="pl-4 mb-1"><span className="text-foreground-muted">background:</span> <span className="text-secondary">"IB Graduate"</span>,</p>
                    <p className="pl-4 mb-1"><span className="text-foreground-muted">interests:</span> [<span className="text-secondary">"Web Development"</span>, <span className="text-secondary">"Engineering"</span>, <span className="text-secondary">"Design"</span>]</p>
                    <p>{'}'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Education Journey
                  </h3>
                  <div className="space-y-4">
                    <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-accent before:rounded-full before:shadow-glow-accent">
                      <h4 className="text-foreground font-medium">Mechanical Engineering</h4>
                      <p className="text-foreground-muted text-sm">Bachelor's Student</p>
                    </div>
                    <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-primary before:rounded-full before:shadow-glow-primary">
                      <h4 className="text-foreground font-medium">International Baccalaureate</h4>
                      <p className="text-foreground-muted text-sm">IB Graduate</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    My Approach
                  </h3>
                  <div className="text-foreground-muted">
                    <p className="mb-3">
                      I combine my engineering background with modern web development to create elegant, functional solutions.
                    </p>
                    <p>
                      My dual perspective allows me to bridge the gap between technical requirements and user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Skills and experience */}
          <div className="lg:col-span-7">
            {/* My story section */}
            <div className="card mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                My Story
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="mb-4">
                  As a Mechanical Engineering student with a passion for coding, I've found a unique path that combines technical precision with creative problem-solving. My journey began with the International Baccalaureate program, where I developed strong analytical skills and a methodical approach to challenges.
                </p>
                <p className="mb-4">
                  My engineering background gives me a different perspective on web development—I see websites and applications as systems with interconnected components that need to function both independently and as a cohesive whole. This approach helps me build solutions that are not only visually appealing but also structurally sound.
                </p>
                <p>
                  Now, as I embark on my freelance development journey, I'm excited to bring this dual expertise to projects that require both technical excellence and innovative thinking. I'm particularly interested in projects that bridge the gap between the physical and digital worlds.
                </p>
              </div>
            </div>

            {/* Skills section */}
            <div className="card">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Skills & Expertise
              </h3>

              {/* Skill metrics with animated bars */}
              <div className="mb-8">
                {skillMetrics.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-primary">{skill.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-background-light rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" 
                        style={{ 
                          width: `${skill.value}%`,
                          animation: `growBar 1.5s ease-out forwards ${index * 0.2}s` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech skills with badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Frontend */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Frontend Development
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill, index) => (
                      <span key={index} className="tech-badge badge-react">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    Backend Development
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill, index) => (
                      <span key={index} className="tech-badge badge-node">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Database */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Database
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.database.map((skill, index) => (
                      <span key={index} className="tech-badge badge-tailwind">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Others */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    Tools & Background
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill, index) => (
                      <span key={index} className="tech-badge badge-ts">
                        {skill}
                      </span>
                    ))}
                    {skills.other.map((skill, index) => (
                      <span key={index} className="tech-badge badge-js">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-8 text-center">
              <Link href="/contact" className="btn btn-primary">
                Let's Work Together
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
