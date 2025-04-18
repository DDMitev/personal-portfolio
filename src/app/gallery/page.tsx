'use client';

import { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Link from 'next/link';
import { loadProjects, saveProjects, addProject, updateProject, deleteProject as removeProject } from '@/utils/projectStorage';

// Define types
type FormChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
type MouseClickEvent = React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

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

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Small Business Website',
    description: 'A responsive business website for a local restaurant featuring online menu, reservations system, and contact form. Built with modern web technologies for optimal performance and SEO.',
    projectType: 'web',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Netlify'],
    githubUrl: 'https://github.com/username/restaurant-website',
    liveUrl: 'https://restaurant-example.com',
    featured: true,
    order: 1
  },
  {
    id: '2',
    title: 'Enterprise E-Commerce Platform',
    description: 'Large-scale e-commerce website handling thousands of products with custom product filtering, user accounts, and secure payment processing. Includes extensive analytics dashboard.',
    projectType: 'web',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    githubUrl: 'https://github.com/username/enterprise-ecommerce',
    liveUrl: 'https://enterprise-ecommerce.example.com',
    featured: true,
    order: 2
  },
  {
    id: '3',
    title: 'Content-Driven Blog Platform',
    description: 'SEO-optimized content platform featuring automated meta tag generation, structured data markup, and content performance analytics. Resulted in 200% increase in organic traffic.',
    projectType: 'web',
    technologies: ['Gatsby', 'GraphQL', 'Sanity CMS', 'SEO Tools'],
    githubUrl: 'https://github.com/username/seo-blog-platform',
    featured: true,
    order: 3
  },
  {
    id: '4',
    title: 'Corporate Website Redesign',
    description: 'Complete website overhaul for a financial services company, focusing on modern design, improved user experience, and performance optimization. Includes multilingual support.',
    projectType: 'web',
    technologies: ['Vue.js', 'Nuxt.js', 'SCSS', 'i18n'],
    githubUrl: 'https://github.com/username/corporate-redesign',
    liveUrl: 'https://corporate-redesign.example.com',
    featured: true,
    order: 4
  },
  {
    id: '5',
    title: 'Backend Admin Dashboard',
    description: 'Comprehensive administration system for managing users, content, and transactions. Features role-based access control, activity logging, and customizable reporting.',
    projectType: 'web',
    technologies: ['React', 'Express', 'PostgreSQL', 'JWT Authentication'],
    githubUrl: 'https://github.com/username/admin-dashboard',
    featured: false,
    order: 5
  },
  {
    id: '6',
    title: 'Progressive Web App',
    description: 'Fully responsive PWA with offline functionality, push notifications, and app-like experience. Optimized for performance with a perfect Lighthouse score.',
    projectType: 'web',
    technologies: ['React', 'Workbox', 'IndexedDB', 'Service Workers'],
    githubUrl: 'https://github.com/username/progressive-web-app',
    liveUrl: 'https://pwa-example.com',
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
  const [isLoading, setIsLoading] = useState(true);
  const [allProjects, setAllProjects] = useState(sampleProjects);
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentProject, setCurrentProject] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    projectType: 'web',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    featured: false
  });
  const [techInput, setTechInput] = useState('');
  const [secretKeyInput, setSecretKeyInput] = useState('');

  // Refs
  const modalRef = useRef(null);

  // Admin access through typing "admindev"
  useEffect(() => {
    let buffer = '';
    const secretCode = 'admindev';

    const handleKeyPress = (e) => {
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

  // Load projects from localStorage when component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjects = loadProjects();
      console.log('Loading from localStorage:', storedProjects);
      setAllProjects(storedProjects);
      filterProjects(selectedCategory, storedProjects);
      setIsLoading(false);
    }
  }, []);

  // Add a function to force save all projects to localStorage
  const forceSaveProjects = () => {
    if (typeof window !== 'undefined') {
      try {
        const success = saveProjects(allProjects);
        if (success) {
          alert('Projects saved successfully!');
          console.log('Projects force-saved to localStorage:', allProjects);
        } else {
          alert('Error saving projects. Please check console for details.');
        }
      } catch (error) {
        console.error('Error saving projects to localStorage:', error);
        alert('Error saving projects: ' + error.message);
      }
    }
  };

  // Check the password
  const checkPassword = () => {
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
  const filterProjects = (category, projectsToFilter = null) => {
    setSelectedCategory(category);
    const projects = projectsToFilter || allProjects;
    
    if (!projects) {
      setFilteredProjects([]);
      return;
    }
    
    if (category === 'all') {
      setFilteredProjects([...projects]);
    } else {
      setFilteredProjects(projects.filter(project => project.projectType === category));
    }
  };

  // Project detail lightbox functions
  const openLightbox = (project) => {
    setCurrentProject(project);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setCurrentProject(null);
  };

  // Click away handler for modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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
  const openProjectForm = (project = null) => {
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
  const handleOpenProjectForm = (e) => {
    e.preventDefault();
    openProjectForm();
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormValues((prev) => ({
        ...prev,
        [name]: e.target.checked
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTechInputChange = (e) => {
    setTechInput(e.target.value);
  };

  const addTechnology = () => {
    if (techInput.trim() !== '' && !formValues.technologies.includes(techInput.trim())) {
      setFormValues((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech, index) => {
    setFormValues((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t, i) => i !== index)
    }));
  };

  const saveProject = () => {
    if (!formValues.title || !formValues.description || formValues.technologies.length === 0) {
      return; // Validation failed
    }

    if (editingProject) {
      // Update existing project
      const updatedProject = {
        ...editingProject,
        title: formValues.title,
        description: formValues.description,
        projectType: formValues.projectType,
        technologies: [...formValues.technologies],
        githubUrl: formValues.githubUrl || undefined,
        liveUrl: formValues.liveUrl || undefined,
        featured: formValues.featured
      };
      
      // Use our utility to update the project
      updateProject(editingProject.id, updatedProject);
      
      // Update local state
      const updatedProjects = allProjects.map(project =>
        project.id === editingProject.id ? updatedProject : project
      );
      setAllProjects(updatedProjects);
      
      // Update filtered projects
      filterProjects(selectedCategory, updatedProjects);
    } else {
      // Add new project
      const newProject = {
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

      // Use our utility to add the project
      addProject(newProject);
      
      // Update local state
      const updatedProjects = [...allProjects, newProject];
      setAllProjects(updatedProjects);
      
      // Update filtered projects
      filterProjects(selectedCategory, updatedProjects);
    }

    // Reset form and close it
    setShowProjectForm(false);
    setEditingProject(null);
  };

  // Drag and drop handler for admin mode project reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(allProjects) as Project[];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update the order property on each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    // Update local state
    setAllProjects(updatedItems);
    
    // Save to localStorage using our utility
    saveProjects(updatedItems);
    
    // Update filtered projects if needed
    filterProjects(selectedCategory, updatedItems);
  };

  // Delete project handler
  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      // Use our utility to delete the project
      removeProject(id);
      
      // Update local state
      const updatedProjects = allProjects.filter(project => project.id !== id);
      
      // Re-number remaining projects for local state
      const reorderedProjects = updatedProjects.map((project, index) => ({
        ...project,
        order: index + 1
      }));
      
      setAllProjects(reorderedProjects);
      
      // Update filtered projects
      filterProjects(selectedCategory, reorderedProjects);
    }
  };

  // Render projects in the gallery 
  const renderProjects = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects" isDropDisabled={!isAdmin}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <Draggable
                  key={project.id}
                  draggableId={project.id}
                  index={index}
                  isDragDisabled={!isAdmin}
                >
                  {(provided, snapshot) => (
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
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S16.627 6 12 6z"></path>
          </svg>
        </div>
      ) : (
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
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
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
              <button
                onClick={forceSaveProjects}
                className="btn btn-primary ml-4"
              >
                Force Save Projects
              </button>
            </div>
          )}

          {/* Projects Grid with Drag & Drop in Admin Mode */}
          {isAdmin ? (
            renderProjects()
          ) : (
            // Regular projects grid for non-admin users
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
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
      )}

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

                <div className="mt-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formValues.featured}
                      onChange={handleFormChange}
                      className="form-checkbox h-5 w-5 text-primary rounded border-border bg-background-light"
                    />
                    <span className="text-sm font-medium text-foreground-muted">
                      Feature this project on homepage
                    </span>
                  </label>
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
