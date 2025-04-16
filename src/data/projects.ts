export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  projectType: 'web' | 'mobile' | 'design' | 'other';
  date: string;
  githubUrl?: string;
  liveUrl?: string;
  additionalImages?: string[];
  category?: string; // Added for compatibility with gallery component
}

// Sample portfolio projects data
export const projects: ProjectItem[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A fully responsive e-commerce platform built with React and Node.js. Features include user authentication, product filtering, cart functionality, and payment processing.',
    imageUrl: '/images/projects/ecommerce.jpg',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    projectType: 'web',
    date: '2024-02',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://ecommerce-platform-demo.vercel.app',
    additionalImages: [
      '/images/projects/ecommerce-detail-1.jpg',
      '/images/projects/ecommerce-detail-2.jpg'
    ]
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A task management application with drag-and-drop functionality, allowing users to organize tasks by status. Includes user authentication and real-time updates.',
    imageUrl: '/images/projects/taskmanager.jpg',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'react-beautiful-dnd'],
    projectType: 'web',
    date: '2023-11',
    githubUrl: 'https://github.com/yourusername/task-management-app',
    liveUrl: 'https://task-manager-demo.netlify.app'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current and forecasted weather for multiple locations. Utilizes the OpenWeather API and features a clean, intuitive interface.',
    imageUrl: '/images/projects/weather.jpg',
    technologies: ['JavaScript', 'HTML', 'CSS', 'OpenWeather API'],
    projectType: 'web',
    date: '2023-09',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.vercel.app'
  },
  {
    id: '4',
    title: 'Mobile Fitness App',
    description: 'A React Native fitness application that tracks workouts, nutrition, and progress. Features include custom workout plans, progress charts, and social sharing.',
    imageUrl: '/images/projects/fitness.jpg',
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
    projectType: 'mobile',
    date: '2023-07',
    githubUrl: 'https://github.com/yourusername/mobile-fitness-app'
  },
  {
    id: '5',
    title: 'Portfolio Website Template',
    description: 'A customizable portfolio website template designed for developers and designers. Features a clean, modern design with animations and responsive layout.',
    imageUrl: '/images/projects/portfolio.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    projectType: 'design',
    date: '2023-05',
    githubUrl: 'https://github.com/yourusername/portfolio-template',
    liveUrl: 'https://portfolio-template-demo.netlify.app'
  }
];

export default projects;
