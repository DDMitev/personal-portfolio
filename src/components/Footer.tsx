'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background-light py-16">
      {/* Background grid lines */}
      <div className="absolute inset-0 grid-lines opacity-10"></div>
      
      {/* Glowing orbs */}
      <div className="absolute -top-8 left-1/4 w-32 h-32 bg-primary rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute -bottom-10 right-1/3 w-40 h-40 bg-secondary rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and tagline */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold group block mb-4">
              <span className="font-light text-foreground">Dev</span>
              <span className="heading-gradient">Portfolio</span>
              <span className="text-accent">.</span>
            </Link>
            <p className="text-foreground-muted text-sm mb-6">
              Crafting exceptional digital experiences with modern technology
            </p>
          </div>
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">About Me</h3>
            <p className="text-foreground-muted text-sm mb-4">
              I'm a passionate web developer focused on creating beautiful, 
              functional, and user-centered digital experiences.
            </p>
            <Link href="/about" className="text-primary hover:text-primary-dark transition-colors text-sm flex items-center">
              Learn more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground-muted hover:text-primary transition-all flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-foreground-muted hover:text-primary transition-all flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground-muted hover:text-primary transition-all flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground-muted hover:text-primary transition-all flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-background hover:bg-background-light border border-border transition-colors"
              >
                <svg className="w-5 h-5 text-foreground-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-background hover:bg-background-light border border-border transition-colors"
              >
                <svg className="w-5 h-5 text-foreground-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-background hover:bg-background-light border border-border transition-colors"
              >
                <svg className="w-5 h-5 text-foreground-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-foreground-muted">
              Email: <a href="mailto:contact@example.com" className="text-primary hover:text-primary-dark transition-colors">
                contact@example.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-foreground-muted">
          <p className="text-sm"> {currentYear} DevPortfolio. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-2 text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
