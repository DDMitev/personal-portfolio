'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Type definitions
interface Service {
  id: string;
  title: string;
  description: string;
  rate: string;
  duration: string;
  availability: string;
  category: string;
  order: number;
}

interface FormChangeEvent {
  target: {
    name: string;
    value: string;
    type?: string;
    checked?: boolean;
  };
}

interface MouseClickEvent {
  preventDefault: () => void;
}

interface DraggableProvided {
  draggableProps: any;
  dragHandleProps: any;
  innerRef: (element: HTMLElement | null) => void;
}

interface DraggableStateSnapshot {
  isDragging: boolean;
}

interface DroppableProvided {
  droppableProps: any;
  innerRef: (element: HTMLElement | null) => void;
  placeholder: any;
}

interface DropResult {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  destination?: {
    index: number;
    droppableId: string;
  };
}

// Sample services data
const sampleServices: Service[] = [
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

// Service categories
const serviceCategories = [
  { id: 'all', name: 'All Services' },
  { id: 'development', name: 'Development' },
  { id: 'design', name: 'Design' },
  { id: 'consulting', name: 'Consulting' }
];

export default function Services() {
  // State
  const [allServices, setAllServices] = useState(sampleServices);
  const [filteredServices, setFilteredServices] = useState(sampleServices);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null as Service | null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    rate: '',
    duration: '',
    availability: 'Available',
    category: 'development'
  });
  const [secretPattern, setSecretPattern] = useState('');
  const [secretKeyInput, setSecretKeyInput] = useState('');

  // Admin access through typing "admindev"
  useEffect(() => {
    let buffer = '';
    const secretCode = 'admindev';

    const handleKeyPress = (e: KeyboardEvent) => {
      buffer += e.key;
      buffer = buffer.slice(-secretCode.length);
      
      setSecretPattern(prev => prev + e.key);
      
      if (buffer === secretCode) {
        setShowPasswordModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Admin access through console
    if (typeof window !== 'undefined') {
      (window as any).adminAccess = () => {
        setShowPasswordModal(true);
      };
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Filter services by category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredServices(allServices);
    } else {
      setFilteredServices(allServices.filter(service => service.category === activeCategory));
    }
  }, [activeCategory, allServices]);

  // Admin password check
  const checkPassword = () => {
    // Multiple passwords for flexibility
    const validPasswords = ['d3v2025', 'admin', 'dev2025'];
    if (validPasswords.includes(password)) {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPassword('');
      alert('Admin mode activated. You can now add and edit services.');
    } else {
      alert('Invalid password');
    }
  };

  // Handlers for drag and drop reordering
  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) return;
    
    const items = Array.from(allServices) as Service[];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update service order
    const updatedItems = items.map((item, index) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        rate: item.rate,
        duration: item.duration,
        availability: item.availability,
        category: item.category,
        order: index + 1
      };
    });
    
    setAllServices(updatedItems);
  };

  // Form handlers
  const openServiceForm = (service: Service | null = null): void => {
    if (service) {
      setEditingService(service);
      setFormValues({
        title: service.title,
        description: service.description,
        rate: service.rate,
        duration: service.duration,
        availability: service.availability,
        category: service.category
      });
    } else {
      setEditingService(null);
      setFormValues({
        title: '',
        description: '',
        rate: '',
        duration: '',
        availability: 'Available',
        category: 'development'
      });
    }
    setShowServiceForm(true);
  };

  // Overload for MouseEvent compatibility
  const handleOpenServiceForm = (e: MouseClickEvent): void => {
    e.preventDefault();
    openServiceForm();
  };

  const handleFormChange = (e: FormChangeEvent): void => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormValues(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const saveService = (): void => {
    if (!formValues.title || !formValues.description || !formValues.rate) {
      alert('Please fill out all required fields');
      return;
    }

    if (editingService) {
      // Update existing service
      const updatedServices = allServices.map(service => 
        service.id === editingService.id 
          ? { 
              id: service.id,
              title: formValues.title,
              description: formValues.description,
              rate: formValues.rate,
              duration: formValues.duration,
              availability: formValues.availability,
              category: formValues.category,
              order: service.order
            } 
          : service
      );
      setAllServices(updatedServices);
    } else {
      // Add new service
      const newService: Service = {
        id: Date.now().toString(),
        title: formValues.title,
        description: formValues.description,
        rate: formValues.rate,
        duration: formValues.duration,
        availability: formValues.availability,
        category: formValues.category,
        order: allServices.length + 1
      };
      setAllServices([...allServices, newService]);
    }

    // Reset form
    setShowServiceForm(false);
    setEditingService(null);
  };

  const deleteService = (id: string): void => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setAllServices(allServices.filter(service => service.id !== id));
    }
  };

  // Render services with drag and drop in admin mode
  const renderServices = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="services" isDropDisabled={!isAdmin}>
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {filteredServices.map((service: Service, index: number) => (
                <Draggable
                  key={service.id}
                  draggableId={service.id}
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
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                        <p className="text-foreground-muted mb-4">{service.description}</p>

                        {/* Service Details Table */}
                        <table className="w-full mb-4 text-sm">
                          <tbody>
                            <tr className="border-b border-gray-700">
                              <td className="py-2 font-medium">Rate:</td>
                              <td className="py-2 text-right">{service.rate}</td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="py-2 font-medium">Duration:</td>
                              <td className="py-2 text-right">{service.duration}</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-medium">Availability:</td>
                              <td className="py-2 text-right">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  service.availability === 'Available' 
                                    ? 'bg-green-200 text-green-800' 
                                    : 'bg-yellow-200 text-yellow-800'
                                }`}>
                                  {service.availability}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Admin Controls */}
                        {isAdmin && (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => openServiceForm(service)}
                              className="text-yellow-400 hover:text-yellow-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteService(service.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        )}
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
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Services</h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Professional services offered with competitive rates. Based in Eindhoven, Netherlands.
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {serviceCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-background-light hover:bg-background-light/80 text-foreground-muted'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Add Service Button (Admin only) */}
        {isAdmin && (
          <div className="flex justify-end mb-8">
            <button
              onClick={handleOpenServiceForm}
              className="btn btn-primary"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 002 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Add New Service
            </button>
          </div>
        )}

        {/* Services Grid */}
        {renderServices()}

        {/* Admin Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-background-light p-6 rounded-lg shadow-xl max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Admin Access</h2>
              <p className="mb-4">Enter the admin password to continue.</p>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-background border border-gray-700 mb-4"
                placeholder="Password"
              />
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button 
                  onClick={checkPassword}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Service Edit/Add Form */}
        {showServiceForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-background-light p-6 rounded-lg shadow-xl max-w-2xl w-full">
              <h2 className="text-xl font-bold mb-4">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Service Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded bg-background border border-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={formValues.category}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded bg-background border border-gray-700"
                  >
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="consulting">Consulting</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Rate</label>
                  <input
                    type="text"
                    name="rate"
                    value={formValues.rate}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded bg-background border border-gray-700"
                    placeholder="e.g. $75/hour"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formValues.duration}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded bg-background border border-gray-700"
                    placeholder="e.g. 2-3 weeks"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Availability</label>
                  <select
                    name="availability"
                    value={formValues.availability}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded bg-background border border-gray-700"
                  >
                    <option value="Available">Available</option>
                    <option value="Limited">Limited</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formValues.description}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded bg-background border border-gray-700"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowServiceForm(false)}
                  className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={saveService}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Save Service
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
