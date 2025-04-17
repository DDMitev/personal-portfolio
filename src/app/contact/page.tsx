'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Custom event types to avoid React namespace issues
interface FormChangeEvent {
  target: {
    name: string;
    value: string;
  };
}

interface FormSubmitEvent {
  preventDefault: () => void;
}

// Define the result interface
interface SubmitResult {
  success: boolean;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null as SubmitResult | null);
  const [activeField, setActiveField] = useState('');

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (field: string) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField('');
  };

  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulated form submission (in a real app, this would connect to a service like Formspree)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSubmitResult({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'There was an error sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pb-20 pt-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 grid-lines opacity-10 z-0"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Information Column */}
          <div className="w-full md:w-1/3 space-y-8">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="heading-gradient">Get in Touch</span>
              </h1>
              <p className="text-lg text-foreground-muted">
                I'm always open to new projects and opportunities. Whether you have a question or just want to say hello, I'll get back to you as soon as possible.
              </p>
            </div>
            
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="bg-background-light rounded-xl p-6 border border-border/50 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email</h3>
                    <a href="mailto:mitevmatey@gmail.com" className="text-primary hover:text-primary-dark">
                      mitevmatey@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-background-light rounded-xl p-6 border border-border/50 transition-all hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/5">
                <div className="flex items-start">
                  <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Location</h3>
                    <p className="text-foreground-muted">Eindhoven, Netherlands</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-background-light rounded-xl p-6 border border-border/50 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
                <div className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Working Hours</h3>
                    <p className="text-foreground-muted">Mon - Fri: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="pt-6">
              <h3 className="text-lg font-medium mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-background hover:bg-background-light border border-border transition-colors hover:border-primary/50"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-foreground-muted" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-background hover:bg-background-light border border-border transition-colors hover:border-primary/50"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-foreground-muted" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-background hover:bg-background-light border border-border transition-colors hover:border-primary/50"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-foreground-muted" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form Column */}
          <div className="w-full md:w-2/3">
            <div className="bg-background-light rounded-2xl p-8 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              {submitResult && submitResult.success ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-foreground-muted mb-8">{submitResult.message}</p>
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <div className={`relative ${activeField === 'name' ? 'border-primary' : 'border-border'} border rounded-xl transition-all duration-300 group focus-within:border-primary focus-within:shadow-sm focus-within:shadow-primary/10`}>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus('name')}
                            onBlur={handleBlur}
                            className="w-full px-4 py-4 bg-transparent border-none outline-none focus:ring-0 peer"
                            required
                          />
                          <label 
                            htmlFor="name" 
                            className={`absolute left-4 text-foreground-muted transition-all duration-300 transform ${
                              activeField === 'name' || formData.name 
                                ? '-translate-y-3 scale-75 top-2 text-primary' 
                                : 'top-1/2 -translate-y-1/2'
                            } pointer-events-none peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:top-2 peer-focus:text-primary`}
                          >
                            Your Name
                          </label>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <div className={`relative ${activeField === 'email' ? 'border-primary' : 'border-border'} border rounded-xl transition-all duration-300 group focus-within:border-primary focus-within:shadow-sm focus-within:shadow-primary/10`}>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            className="w-full px-4 py-4 bg-transparent border-none outline-none focus:ring-0 peer"
                            required
                          />
                          <label 
                            htmlFor="email" 
                            className={`absolute left-4 text-foreground-muted transition-all duration-300 transform ${
                              activeField === 'email' || formData.email 
                                ? '-translate-y-3 scale-75 top-2 text-primary' 
                                : 'top-1/2 -translate-y-1/2'
                            } pointer-events-none peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:top-2 peer-focus:text-primary`}
                          >
                            Your Email
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className={`relative ${activeField === 'subject' ? 'border-primary' : 'border-border'} border rounded-xl transition-all duration-300 group focus-within:border-primary focus-within:shadow-sm focus-within:shadow-primary/10`}>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => handleFocus('subject')}
                          onBlur={handleBlur}
                          className="w-full px-4 py-4 bg-transparent border-none outline-none focus:ring-0 peer"
                          required
                        />
                        <label 
                          htmlFor="subject" 
                          className={`absolute left-4 text-foreground-muted transition-all duration-300 transform ${
                            activeField === 'subject' || formData.subject 
                              ? '-translate-y-3 scale-75 top-2 text-primary' 
                              : 'top-1/2 -translate-y-1/2'
                          } pointer-events-none peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:top-2 peer-focus:text-primary`}
                        >
                          Subject
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className={`relative ${activeField === 'message' ? 'border-primary' : 'border-border'} border rounded-xl transition-all duration-300 group focus-within:border-primary focus-within:shadow-sm focus-within:shadow-primary/10`}>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={handleBlur}
                          rows={5}
                          className="w-full px-4 py-4 bg-transparent border-none outline-none focus:ring-0 peer resize-none"
                          required
                        />
                        <label 
                          htmlFor="message" 
                          className={`absolute left-4 text-foreground-muted transition-all duration-300 transform ${
                            activeField === 'message' || formData.message 
                              ? '-translate-y-3 scale-75 top-2 text-primary' 
                              : 'top-6'
                          } pointer-events-none peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:top-2 peer-focus:text-primary`}
                        >
                          Your Message
                        </label>
                      </div>
                    </div>
                    
                    {submitResult && !submitResult.success && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl" role="alert">
                        <div className="flex">
                          <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>{submitResult.message}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group ${
                          isSubmitting ? 'bg-primary/70' : 'bg-primary hover:bg-primary-dark'
                        }`}
                      >
                        <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                        <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
