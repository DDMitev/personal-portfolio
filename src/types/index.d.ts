// Type declarations for modules without TypeScript definitions
declare module 'react';
declare module 'react-dom';
declare module 'next';
declare module 'next/link';
declare module 'next/image';
declare module 'next/font/google';
declare module 'next/navigation';
declare module 'react-beautiful-dnd' {
  import * as React from 'react';
  
  export interface DraggableLocation {
    droppableId: string;
    index: number;
  }
  
  export interface DragStart {
    draggableId: string;
    type: string;
    source: DraggableLocation;
  }
  
  export interface DropResult {
    draggableId: string;
    type: string;
    source: DraggableLocation;
    destination?: DraggableLocation;
    reason?: 'DROP' | 'CANCEL';
  }
  
  export interface DraggableProvided {
    draggableProps: any;
    dragHandleProps: any;
    innerRef: React.RefObject<any>;
  }
  
  export interface DroppableProvided {
    droppableProps: any;
    innerRef: React.RefObject<any>;
    placeholder?: React.ReactNode;
  }
  
  export interface DraggableStateSnapshot {
    isDragging: boolean;
    isDropAnimating: boolean;
  }
  
  export interface DroppableStateSnapshot {
    isDraggingOver: boolean;
    draggingOverWith?: string;
  }
  
  export const DragDropContext: React.ComponentType<any>;
  export const Droppable: React.ComponentType<any>;
  export const Draggable: React.ComponentType<any>;
}

// Fix for 'Cannot find namespace React' error
declare namespace React {
  interface ReactNode {
    // This is intentionally empty
  }
  
  type RefObject<T> = {
    current: T | null;
  };
  
  type FC<P = {}> = FunctionComponent<P>;
  
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactNode;
    displayName?: string;
  }
}

// Fix for 'JSX element implicitly has type any' error
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
