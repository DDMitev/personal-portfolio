'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import Image from 'next/image';
import { ProjectItem } from '@/data/projects';

interface DraggableGalleryProps {
  projects: ProjectItem[];
  onReorder: (projects: ProjectItem[]) => void;
  onViewProject: (project: ProjectItem) => void;
}

const DraggableGallery = ({ 
  projects, 
  onReorder,
  onViewProject 
}: DraggableGalleryProps) => {
  const [items, setItems] = useState(projects);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(items) as ProjectItem[];
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);
    
    setItems(reorderedItems);
    onReorder(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="projects" direction="horizontal">
        {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {items.map((project: ProjectItem, index: number) => (
              <Draggable key={project.id} draggableId={project.id} index={index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white rounded-lg overflow-hidden shadow-lg transition-transform ${
                      snapshot.isDragging ? 'scale-105 z-10 shadow-xl' : 'hover:scale-105'
                    }`}
                  >
                    {/* Project Image Placeholder */}
                    <div className="h-48 bg-gray-300 relative">
                      <div className={`absolute inset-0 ${
                        Number(project.id) % 3 === 0 ? 'bg-blue-500' : 
                        Number(project.id) % 3 === 1 ? 'bg-green-500' : 'bg-purple-500'
                      } opacity-20`}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <span className="text-lg font-semibold">{project.title}</span>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                      <p className="text-gray-700 mb-4">
                        {project.description.length > 120 
                          ? `${project.description.substring(0, 120)}...` 
                          : project.description}
                      </p>
                      
                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                          <span 
                            key={i} 
                            className={`px-3 py-1 ${
                              i % 3 === 0 ? 'bg-blue-100 text-blue-800' : 
                              i % 3 === 1 ? 'bg-green-100 text-green-800' : 
                              'bg-purple-100 text-purple-800'
                            } rounded-full text-sm`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button 
                          onClick={() => onViewProject(project)}
                          className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                          View Details →
                        </button>
                        
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button className="p-1 text-gray-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
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

export default DraggableGallery;
