# Deyan's Developer Portfolio

A modern, tech-inspired portfolio website built with Next.js 14 and Tailwind CSS. This portfolio showcases professional skills and projects with a clean, minimalist design and hidden admin functionality.

## Key Features

- **Modern Tech Design**: Dark-themed interface with glass morphism and gradient effects
- **Interactive Project Gallery**: Browse, filter, and view detailed project information
- **Hidden Admin Access**: Secret admin mode for content management
  - Type "admindev" anywhere to trigger login prompt
  - Use password "d3v2025" to access admin features
- **Project Management**: Add, edit, delete, and reorder projects (admin mode)
- **Responsive Design**: Optimized for all devices with a mobile-first approach
- **Contact Form**: Simple contact form with validation

## Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Project Reordering**: react-beautiful-dnd
- **Architecture**: App Router pattern

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/personal-portfolio.git
   cd personal-portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is optimized for deployment on Vercel, Netlify, or GitHub Pages.

## Admin Features

The portfolio includes a hidden admin mode for project management:
- **Access**: Type "admindev" anywhere on the gallery page to trigger the admin login
- **Authentication**: Use password "d3v2025" (or alternatives: "admin", "dev2025")
- **Project Management**: 
  - Add new projects
  - Edit existing projects
  - Delete projects
  - Drag-and-drop reordering

## License

MIT
