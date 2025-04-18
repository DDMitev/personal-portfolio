/**
 * Project Storage Module
 * 
 * This module provides robust localStorage operations for project data with fallbacks
 * and safeguards. It ensures data persistence between page refreshes and browser sessions.
 */

const STORAGE_KEY = 'portfolio-projects';

// Sample fallback projects if localStorage fails or is empty
const FALLBACK_PROJECTS = [
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

/**
 * Load projects from localStorage
 * @returns {Array} Array of project objects
 */
export function loadProjects() {
  if (typeof window === 'undefined') {
    return FALLBACK_PROJECTS;
  }
  
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      console.log('No projects found in localStorage, using fallback projects');
      saveProjects(FALLBACK_PROJECTS);
      return FALLBACK_PROJECTS;
    }
    
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      console.log('Invalid projects data in localStorage, using fallback projects');
      saveProjects(FALLBACK_PROJECTS);
      return FALLBACK_PROJECTS;
    }
    
    console.log(`Successfully loaded ${parsed.length} projects from localStorage`);
    return parsed;
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
    return FALLBACK_PROJECTS;
  }
}

/**
 * Save projects to localStorage
 * @param {Array} projects Array of project objects to save
 * @returns {boolean} Success status
 */
export function saveProjects(projects) {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    // Force serialization to detect any issues
    const serialized = JSON.stringify(projects);
    window.localStorage.setItem(STORAGE_KEY, serialized);
    console.log(`Successfully saved ${projects.length} projects to localStorage`);
    
    // Verify the save was successful
    const verification = window.localStorage.getItem(STORAGE_KEY);
    if (!verification) {
      console.error('Verification failed - projects were not saved properly');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
    return false;
  }
}

/**
 * Update a single project
 * @param {string} projectId Project ID to update
 * @param {Object} updatedData New project data
 * @returns {boolean} Success status
 */
export function updateProject(projectId, updatedData) {
  const projects = loadProjects();
  
  const index = projects.findIndex(p => p.id === projectId);
  if (index === -1) {
    console.error(`Project with ID ${projectId} not found`);
    return false;
  }
  
  projects[index] = { ...projects[index], ...updatedData };
  return saveProjects(projects);
}

/**
 * Delete a project
 * @param {string} projectId Project ID to delete
 * @returns {boolean} Success status
 */
export function deleteProject(projectId) {
  const projects = loadProjects();
  const filteredProjects = projects.filter(p => p.id !== projectId);
  
  if (filteredProjects.length === projects.length) {
    console.error(`Project with ID ${projectId} not found`);
    return false;
  }
  
  // Reorder remaining projects
  const reorderedProjects = filteredProjects.map((project, index) => ({
    ...project,
    order: index + 1
  }));
  
  return saveProjects(reorderedProjects);
}

/**
 * Add a new project
 * @param {Object} newProject New project data
 * @returns {boolean} Success status
 */
export function addProject(newProject) {
  const projects = loadProjects();
  
  // Generate ID if not provided
  if (!newProject.id) {
    newProject.id = Date.now().toString();
  }
  
  // Set default order to end of list
  if (!newProject.order) {
    newProject.order = projects.length + 1;
  }
  
  const updatedProjects = [...projects, newProject];
  return saveProjects(updatedProjects);
}

/**
 * Get featured projects
 * @returns {Array} Array of featured project objects
 */
export function getFeaturedProjects() {
  const projects = loadProjects();
  return projects
    .filter(project => project.featured)
    .sort((a, b) => a.order - b.order);
}

/**
 * Reset projects to default
 * @returns {boolean} Success status
 */
export function resetProjects() {
  return saveProjects(FALLBACK_PROJECTS);
}
