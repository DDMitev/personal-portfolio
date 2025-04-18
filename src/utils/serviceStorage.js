/**
 * Service Storage Module
 * 
 * This module provides robust localStorage operations for service data with fallbacks
 * and safeguards. It ensures data persistence between page refreshes and browser sessions.
 */

const STORAGE_KEY = 'portfolio-services';

// Sample fallback services if localStorage fails or is empty
const FALLBACK_SERVICES = [
  {
    id: '1',
    title: 'Web Development',
    description: 'End‑to‑end website and web‑app development using modern frameworks (React, Node.js, Django), responsive layouts, and CMS integration. Includes testing and deployment.',
    rate: '$75/hour',
    duration: '4–8 weeks (small‑scale); 12–16 weeks (enterprise)',
    availability: 'Limited (10 hrs/week)',
    category: 'development',
    order: 1
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'User research, wireframing, high‑fidelity mockups and interactive prototypes. Focus on accessibility (WCAG 2.1) and conversion‑optimized interfaces.',
    rate: '$65/hour',
    duration: '2–4 weeks',
    availability: 'Available',
    category: 'design',
    order: 2
  },
  {
    id: '3',
    title: 'Technical Consulting',
    description: 'Architecture reviews, performance audits, DevOps strategy, and technology road‑mapping. Includes a final report with prioritized recommendations.',
    rate: '$90/hour',
    duration: '1–2 weeks',
    availability: 'Available',
    category: 'consulting',
    order: 3
  },
  {
    id: '4',
    title: 'SEO & Digital Marketing',
    description: 'On‑page/off‑page SEO audits, keyword strategy, content optimization, and paid‑media campaign setup (Google Ads, social).',
    rate: '$60/hour or $2,500/project',
    duration: '4–6 weeks',
    availability: 'Available',
    category: 'consulting',
    order: 4
  }
];

/**
 * Load services from localStorage
 * @returns {Array} Array of service objects
 */
export function loadServices() {
  if (typeof window === 'undefined') {
    return FALLBACK_SERVICES;
  }
  
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      console.log('No services found in localStorage, using fallback services');
      saveServices(FALLBACK_SERVICES);
      return FALLBACK_SERVICES;
    }
    
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      console.log('Invalid services data in localStorage, using fallback services');
      saveServices(FALLBACK_SERVICES);
      return FALLBACK_SERVICES;
    }
    
    console.log(`Successfully loaded ${parsed.length} services from localStorage`);
    return parsed;
  } catch (error) {
    console.error('Error loading services from localStorage:', error);
    return FALLBACK_SERVICES;
  }
}

/**
 * Save services to localStorage
 * @param {Array} services Array of service objects to save
 * @returns {boolean} Success status
 */
export function saveServices(services) {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    // Force serialization to detect any issues
    const serialized = JSON.stringify(services);
    window.localStorage.setItem(STORAGE_KEY, serialized);
    console.log(`Successfully saved ${services.length} services to localStorage`);
    
    // Verify the save was successful
    const verification = window.localStorage.getItem(STORAGE_KEY);
    if (!verification) {
      console.error('Verification failed - services were not saved properly');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving services to localStorage:', error);
    return false;
  }
}

/**
 * Update a single service
 * @param {string} serviceId Service ID to update
 * @param {Object} updatedData New service data
 * @returns {boolean} Success status
 */
export function updateService(serviceId, updatedData) {
  const services = loadServices();
  
  const index = services.findIndex(s => s.id === serviceId);
  if (index === -1) {
    console.error(`Service with ID ${serviceId} not found`);
    return false;
  }
  
  services[index] = { ...services[index], ...updatedData };
  return saveServices(services);
}

/**
 * Delete a service
 * @param {string} serviceId Service ID to delete
 * @returns {boolean} Success status
 */
export function deleteService(serviceId) {
  const services = loadServices();
  const filteredServices = services.filter(s => s.id !== serviceId);
  
  if (filteredServices.length === services.length) {
    console.error(`Service with ID ${serviceId} not found`);
    return false;
  }
  
  // Reorder remaining services
  const reorderedServices = filteredServices.map((service, index) => ({
    ...service,
    order: index + 1
  }));
  
  return saveServices(reorderedServices);
}

/**
 * Add a new service
 * @param {Object} newService New service data
 * @returns {boolean} Success status
 */
export function addService(newService) {
  const services = loadServices();
  
  // Generate ID if not provided
  if (!newService.id) {
    newService.id = Date.now().toString();
  }
  
  // Set default order to end of list
  if (!newService.order) {
    newService.order = services.length + 1;
  }
  
  const updatedServices = [...services, newService];
  return saveServices(updatedServices);
}

/**
 * Reset services to default
 * @returns {boolean} Success status
 */
export function resetServices() {
  return saveServices(FALLBACK_SERVICES);
}
