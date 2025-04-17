'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/data/projects';

interface FeaturedProjectsProps {
  projects?: ProjectItem[];
}

// Gallery Project type matches the structure in gallery/page.tsx
interface GalleryProject {
  id: string;
  title: string;
  description: string;
  projectType: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

const FeaturedProjects = ({ projects = [] }: FeaturedProjectsProps) => {
  const [featuredProjects, setFeaturedProjects] = useState([] as GalleryProject[]);
  
  // Load projects from localStorage (where gallery projects are stored)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Try to get projects from localStorage where gallery stores them
        const savedProjects = localStorage.getItem('portfolio-projects');
        
        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects) as GalleryProject[];
          // Filter to only show featured projects and sort by order
          const featured = parsedProjects
            .filter(project => project.featured)
            .sort((a, b) => a.order - b.order)
            .slice(0, 3); // Take up to 3 featured projects
          
          setFeaturedProjects(featured);
        } else {
          // Fallback to static projects if none in localStorage
          const staticFeatured = projects.slice(0, 3);
          setFeaturedProjects(staticFeatured as unknown as GalleryProject[]);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to static projects on error
        setFeaturedProjects(projects.slice(0, 3) as unknown as GalleryProject[]);
      }
    }
  }, [projects]);

  return (
    <section className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 grid-lines opacity-10 -z-10"></div>
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-secondary opacity-5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient inline-block">Featured Projects</h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            A selection of my recent work. Each project represents a unique challenge and solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="card hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Project Image Placeholder */}
                <div className="h-48 rounded-lg overflow-hidden relative mb-4">
                  <div className={`absolute inset-0 ${
                    index === 0 ? 'bg-primary' : 
                    index === 1 ? 'bg-secondary' : 'bg-accent'
                  } opacity-10`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold">{project.title}</span>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-foreground-muted mb-4">
                    {project.description?.length > 120 
                      ? `${project.description.substring(0, 120)}...` 
                      : project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i} 
                        className={`px-3 py-1 text-xs rounded-full ${
                          i % 3 === 0 ? 'bg-primary bg-opacity-10 text-primary' : 
                          i % 3 === 1 ? 'bg-secondary bg-opacity-10 text-secondary' : 
                          'bg-accent bg-opacity-10 text-accent'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link href={`/gallery?project=${project.id}`} className="text-primary hover:text-accent font-medium transition-colors">
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center p-8">
              <p className="text-foreground-muted">No featured projects found. Visit the gallery to mark projects as featured.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/gallery" className="btn btn-primary">
            View All Projects
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
