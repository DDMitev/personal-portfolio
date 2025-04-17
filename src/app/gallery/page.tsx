'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot 
} from 'react-beautiful-dnd';

// Define types
interface Project {
  id: string;
  title: string;
  description: string;
  projectType: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

interface Category {
  id: string;
  name: string;
}

// Define event types
interface FormChangeEvent {
  target: {
    name: string;
    value: string;
    type?: string;
    checked?: boolean;
  }
}

interface MouseClickEvent {
  preventDefault: () => void;
}

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Website',
    description: 'A fully responsive e-commerce website built with Next.js and React, featuring product filtering, shopping cart, and Stripe integration for secure payments. Includes admin dashboard for inventory management.',
    projectType: 'web',
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/username/ecommerce-platform',
    liveUrl: 'https://ecommerce-platform.example.com',
    featured: true,
    order: 1
  },
  {
    id: '2',
    title: 'Corporate Website Redesign',
    description: 'Complete UI/UX redesign for a financial services company, focusing on user experience improvements and WCAG 2.1 accessibility compliance. Resulted in 45% increase in conversion rate.',
    projectType: 'design',
    technologies: ['Figma', 'Adobe XD', 'WCAG 2.1', 'User Testing'],
    githubUrl: 'https://github.com/username/finance-ux-redesign',
    liveUrl: 'https://finance-company.example.com',
    featured: true,
    order: 2
  },
  {
    id: '3',
    title: 'SaaS Dashboard',
    description: 'Interactive dashboard for a SaaS platform with real-time data visualization, user management, and subscription analytics. Built with a focus on performance optimization.',
    projectType: 'web',
    technologies: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
    githubUrl: 'https://github.com/username/saas-dashboard',
    featured: false,
    order: 3
  },
  {
    id: '4',
    title: 'Technical Architecture Overhaul',
    description: 'Conducted a complete architecture review and implementation for a healthcare startup, migrating from monolithic to microservices architecture. Reduced server costs by 35% and improved response times by 60%.',
    projectType: 'consulting',
    technologies: ['System Design', 'Docker', 'Kubernetes', 'AWS'],
    githubUrl: 'https://github.com/username/healthcare-architecture',
    featured: true,
    order: 4
  },
  {
    id: '5',
    title: 'SEO & Content Strategy',
    description: 'Comprehensive SEO audit and content strategy for an e-learning platform. Implemented technical SEO improvements and content optimization that resulted in 250% increase in organic traffic within 6 months.',
    projectType: 'marketing',
    technologies: ['SEO', 'Content Strategy', 'Google Analytics', 'Keyword Research'],
    liveUrl: 'https://learning-platform.example.com',
    featured: true,
    order: 5
  },
  {
    id: '6',
    title: 'Mobile App UI Kit',
    description: 'Designed and developed a comprehensive mobile UI component library with over 200 reusable components following atomic design principles. Includes dark mode support and accessibility features.',
    projectType: 'design',
    technologies: ['React Native', 'Storybook', 'Styled Components', 'Accessibility'],
    githubUrl: 'https://github.com/username/mobile-ui-kit',
    featured: false,
    order: 6
  }
];

// Categories for filtering
const categories: Category[] = [
  { id: 'all', name: 'All Projects' },
  { id: 'web', name: 'Web Development' },
  { id: 'design', name: 'UI/UX Design' },
  { id: 'consulting', name: 'Technical Consulting' },
  { id: 'marketing', name: 'SEO & Marketing' }
];

export default function GalleryPage() {
  // State variables
  const [allProjects, setAllProjects] = useState(sampleProjects as Project[]);
  const [filteredProjects, setFilteredProjects] = useState(sampleProjects as Project[]);
  const [selectedCategory, setSelectedCategory] = useState('all' as string);
  const [isAdmin, setIsAdmin] = useState(false as boolean);
  const [showPasswordModal, setShowPasswordModal] = useState(false as boolean);
  const [password, setPassword] = useState('' as string);
  const [passwordError, setPasswordError] = useState('' as string);
  const [currentProject, setCurrentProject] = useState(null as Project | null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false as boolean);
  const [showProjectForm, setShowProjectForm] = useState(false as boolean);
  const [editingProject, setEditingProject] = useState(null as Project | null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    projectType: 'web',
    technologies: [] as string[],
    githubUrl: '',
    liveUrl: '',
    featured: false
  });
  const [techInput, setTechInput] = useState('' as string);
  const [secretKeyInput, setSecretKeyInput] = useState('' as string);

  // Refs
  const modalRef = useRef(null);

  // Admin access through typing "admindev"
  useEffect(() => {
    let buffer = '';
    const secretCode = 'admindev';

    const handleKeyPress = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();

      // Keep only the last n characters where n is the length of the secret code
      if (buffer.length > secretCode.length) {
        buffer = buffer.substring(buffer.length - secretCode.length);
      }

      // Check if buffer matches secret code
      if (buffer === secretCode) {
        buffer = '';
        setShowPasswordModal(true);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  // Add console method for admin access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).adminAccess = () => {
        setShowPasswordModal(true);
      };
    }
  }, []);

  // Check the password
  const checkPassword = (): void => {
    const validPasswords = ['d3v2025', 'admin', 'dev2025']; // Multiple valid passwords
    if (validPasswords.includes(password)) {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Invalid password');
    }
  };

  // Filter projects by category
  const filterProjects = (category: string): void => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProjects([...allProjects]);
    } else {
      setFilteredProjects(allProjects.filter(project => project.projectType === category));
    }
  };

  // Project detail lightbox functions
  const openLightbox = (project: Project): void => {
    setCurrentProject(project);
    setIsLightboxOpen(true);
  };

  const closeLightbox = (): void => {
    setIsLightboxOpen(false);
    setCurrentProject(null);
  };

  // Click away handler for modals
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (isLightboxOpen) closeLightbox();
        if (showPasswordModal) setShowPasswordModal(false);
        if (showProjectForm) setShowProjectForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLightboxOpen, showPasswordModal, showProjectForm]);

  // Project form handlers
  const openProjectForm = (project: Project | null = null): void => {
    if (project) {
      setEditingProject(project);
      setFormValues({
        title: project.title,
        description: project.description,
        projectType: project.projectType,
        technologies: [...project.technologies],
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: project.featured
      });
    } else {
      setEditingProject(null);
      setFormValues({
        title: '',
        description: '',
        projectType: 'web',
        technologies: [],
        githubUrl: '',
        liveUrl: '',
        featured: false
      });
    }
    setShowProjectForm(true);
  };

  // Overload for MouseEvent compatibility
  const handleOpenProjectForm = (e: MouseClickEvent): void => {
    e.preventDefault();
    openProjectForm();
  };

  const handleFormChange = (e: FormChangeEvent): void => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormValues((prev: typeof formValues) => ({
        ...prev,
        [name]: e.target.checked
      }));
    } else {
      setFormValues((prev: typeof formValues) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTechInputChange = (e: FormChangeEvent): void => {
    setTechInput(e.target.value);
  };

  const addTechnology = (): void => {
    if (techInput.trim() !== '' && !formValues.technologies.includes(techInput.trim())) {
      setFormValues((prev: typeof formValues) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string, index: number): void => {
    setFormValues((prev: typeof formValues) => ({
      ...prev,
      technologies: prev.technologies.filter((t, i) => i !== index)
    }));
  };

  const saveProject = (): void => {
    if (!formValues.title || !formValues.description || formValues.technologies.length === 0) {
      return; // Validation failed
    }

    if (editingProject) {
      // Update existing project
      const updatedProjects = allProjects.map(project =>
        project.id === editingProject.id
          ? {
              ...project,
              title: formValues.title,
              description: formValues.description,
              projectType: formValues.projectType,
              technologies: [...formValues.technologies],
              githubUrl: formValues.githubUrl || undefined,
              liveUrl: formValues.liveUrl || undefined,
              featured: formValues.featured
            }
          : project
      );
      setAllProjects(updatedProjects);
      // Update filtered projects as well
      filterProjects(selectedCategory);
    } else {
      // Add new project
      const newProject: Project = {
        id: Date.now().toString(),
        title: formValues.title,
        description: formValues.description,
        projectType: formValues.projectType,
        technologies: [...formValues.technologies],
        githubUrl: formValues.githubUrl || undefined,
        liveUrl: formValues.liveUrl || undefined,
        featured: formValues.featured,
        order: allProjects.length + 1
      };

      const updatedProjects = [...allProjects, newProject];
      setAllProjects(updatedProjects);
      // Update filtered projects based on current filter
      filterProjects(selectedCategory);
    }

    // Reset form and close it
    setShowProjectForm(false);
    setEditingProject(null);
  };

  // Drag and drop handler for admin mode project reordering
  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) return;
    
    const items = Array.from(allProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update the order property on each item
    const updatedItems = items.map((item: Project, index: number) => ({
      ...item,
      order: index + 1
    }));
    
    setAllProjects(updatedItems);
    
    // Update filtered projects if needed
    if (selectedCategory !== 'all') {
      filterProjects(selectedCategory);
    } else {
      setFilteredProjects(updatedItems);
    }
  };

  // Delete project handler
  const deleteProject = (id: string): void => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = allProjects.filter(project => project.id !== id);
      
      // Re-number remaining projects
      const reorderedProjects = updatedProjects.map((project, index) => ({
        ...project,
        order: index + 1
      }));
      
      setAllProjects(reorderedProjects);
      
      // Update filtered projects
      if (selectedCategory !== 'all') {
        filterProjects(selectedCategory);
      } else {
        setFilteredProjects(reorderedProjects);
      }
    }
  };

  // Render projects in the gallery 
  const renderProjects = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects" isDropDisabled={!isAdmin}>
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project: Project, index: number) => (
                <Draggable
                  key={project.id}
                  draggableId={project.id}
                  index={index}
                  isDragDisabled={!isAdmin}
                >
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`card ${
                        snapshot.isDragging ? 'opacity-70 scale-105' : ''
                      }`}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      {/* Project Image Placeholder */}
                      <div className="h-48 bg-background-light relative rounded-t-xl -mt-6 -mx-6">
                        <div className={`absolute inset-0 rounded-t-xl bg-opacity-20 ${parseInt(project.id) % 3 === 0 ? 'bg-primary' : parseInt(project.id) % 3 === 1 ? 'bg-secondary' : 'bg-accent'}`}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <span className="text-lg font-semibold">{project.title}</span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="mt-4">
                        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                        <p className="text-foreground-muted mb-4">
                          {project.description.length > 120
                            ? `${project.description.substring(0, 120)}...`
                            : project.description}
                        </p>

                        {/* Technology Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className={`tech-badge ${
                                index % 3 === 0 ? 'badge-react' : index % 3 === 1 ? 'badge-ts' : 'badge-node'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Admin Controls */}
                        <div className="flex justify-between items-center mt-4">
                          <button
                            onClick={() => openLightbox(project)}
                            className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                          >
                            View Details <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                          {isAdmin && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openProjectForm(project)}
                                className="text-yellow-400 hover:text-yellow-300"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteProject(project.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <main className="py-16 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold heading-gradient mb-4">Project Gallery</h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto mb-8">
            Explore my portfolio of projects. Each project represents my skills, passion, and creativity.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => filterProjects(category.id)}
              className={`px-6 py-2 rounded-full transition-colors duration-200 text-sm md:text-base font-medium ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-background-light text-foreground hover:bg-background-light'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Admin Message */}
        {isAdmin && (
          <div className="card mb-8 border-l-4 border-primary">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-foreground">
                    Admin mode active. You can drag and drop projects to reorder them,
                    add new projects, or remove existing ones.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAdmin(false)}
                className="btn btn-outline text-sm"
              >
                Exit
              </button>
            </div>
          </div>
        )}

        {/* Add Project Button (Admin only) */}
        {isAdmin && (
          <div className="flex justify-end mb-8">
            <button
              onClick={handleOpenProjectForm}
              className="btn btn-primary"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 002 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Add New Project
            </button>
          </div>
        )}

        {/* Projects Grid with Drag & Drop in Admin Mode */}
        {isAdmin ? (
          renderProjects()
        ) : (
          // Regular projects grid for non-admin users
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: Project) => (
              <div key={project.id} className="card animate-fade-in">
                {/* Project Image Placeholder */}
                <div className="h-48 bg-background-light relative rounded-t-xl -mt-6 -mx-6">
                  <div className={`absolute inset-0 rounded-t-xl bg-opacity-20 ${parseInt(project.id) % 3 === 0 ? 'bg-primary' : parseInt(project.id) % 3 === 1 ? 'bg-secondary' : 'bg-accent'}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <span className="text-lg font-semibold">{project.title}</span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="mt-4">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-foreground-muted mb-4">
                    {project.description.length > 120
                      ? `${project.description.substring(0, 120)}...`
                      : project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech: string, index: number) => (
                      <span
                        key={index}
                        className={`tech-badge ${
                          index % 3 === 0 ? 'badge-react' : index % 3 === 1 ? 'badge-ts' : 'badge-node'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => openLightbox(project)}
                      className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                    >
                      View Details <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-glass backdrop-blur-sm">
          <div className="card w-80 max-w-md">
            <h3 className="text-lg font-medium heading-gradient mb-4">Admin Authentication</h3>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-foreground-muted mb-1">
                Enter password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
                className="w-full px-3 py-2 bg-background-light border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Password"
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword('');
                  setPasswordError('');
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={checkPassword}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-glass backdrop-blur-sm">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold heading-gradient mb-4">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-muted mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-background-light border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground-muted mb-1">
                    Project Type*
                  </label>
                  <select
                    name="projectType"
                    value={formValues.projectType}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-background-light border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {categories.filter(category => category.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground-muted mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-background-light border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground-muted mb-1">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={techInput}
                    onChange={handleTechInputChange}
                    className="w-full px-3 py-2 bg-background-light border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="React, TypeScript, Node.js"
                  />
                  <button
                    onClick={addTechnology}
                    className="btn btn-primary mt-2"
                  >
                    Add Technology
                  </button>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formValues.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="tech-badge badge-react"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(tech, index)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-muted mb-1">
                    Description*
                  </label>
                  <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleFormChange}
                    rows={5}
                    className="w-full px-3 py-2 bg-background-light border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground-muted mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formValues.githubUrl}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-background-light border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground-muted mb-1">
                    Live URL
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formValues.liveUrl}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-background-light border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="https://yourproject.com"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowProjectForm(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={saveProject}
                className="btn btn-primary"
              >
                {editingProject ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox/Modal for project details */}
      {isLightboxOpen && currentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-background-light rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto card">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-foreground-muted hover:text-primary"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold heading-gradient mb-4">{currentProject.title}</h3>

              {/* Project Image Placeholder */}
              <div className="h-64 bg-background rounded-lg flex items-center justify-center mb-6">
                <span className="text-foreground-muted">Project Screenshot</span>
              </div>

              <div className="mb-6">
                <p className="text-foreground-muted mb-6">{currentProject.description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech, index) => (
                      <span key={index} className={`tech-badge ${
                        index % 3 === 0 ? 'badge-react' : index % 3 === 1 ? 'badge-ts' : 'badge-node'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Project Links</h4>
                  <div className="flex flex-wrap gap-4">
                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline inline-flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" clipRule="evenodd" />
                      </svg>
                      GitHub Repository
                    </a>
                    )}
                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary inline-flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live Project
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={closeLightbox}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
