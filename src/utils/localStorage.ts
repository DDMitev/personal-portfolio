// localStorage.ts - Utility for handling localStorage operations
// This helper ensures we only access localStorage on the client side

const PROJECTS_KEY = 'portfolio-projects';

// Type definitions
export interface Project {
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

// Get projects from localStorage
export const getStoredProjects = (): Project[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (!data) return [];
    
    const projects = JSON.parse(data);
    console.log('Retrieved projects from localStorage:', projects);
    return Array.isArray(projects) ? projects : [];
  } catch (error) {
    console.error('Error retrieving projects from localStorage:', error);
    return [];
  }
};

// Save projects to localStorage
export const saveProjects = (projects: Project[]): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const data = JSON.stringify(projects);
    localStorage.setItem(PROJECTS_KEY, data);
    console.log('Saved projects to localStorage:', projects);
    return true;
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
    return false;
  }
};

// Clear all projects from localStorage
export const clearProjects = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.removeItem(PROJECTS_KEY);
    console.log('Cleared projects from localStorage');
    return true;
  } catch (error) {
    console.error('Error clearing projects from localStorage:', error);
    return false;
  }
};
