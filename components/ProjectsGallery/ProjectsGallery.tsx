'use client';

import { useEffect, useRef, useState } from 'react';

interface Project {
  id: string;
  title: string;
  location: string;
  image: string;
}

const projects: Project[] = [
  { id: '1', title: 'Costitx Project', location: 'Mallorca', image: 'placeholder-costitx' },
  { id: '2', title: 'Vanity Project', location: 'Palma', image: 'placeholder-vanity' },
  { id: '3', title: 'CSI Project', location: 'Barcelona', image: 'placeholder-csi' },
  { id: '4', title: 'Lonja de Mar Project', location: 'Valencia', image: 'placeholder-lonja' },
  { id: '5', title: 'Illetas Espanyolet Project', location: 'Mallorca', image: 'placeholder-illetas' },
];

export default function ProjectsGallery() {
  const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set());
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = projectsRef.current.map((project, index) => {
      if (!project) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => new Set(prev).add(projects[index].id));
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(project);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-h1 lg:text-display-md font-serif text-text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            Explore our portfolio of distinctive homes, each telling a unique story through thoughtful design.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectsRef.current[index] = el;
              }}
              className={`reveal ${visibleProjects.has(project.id) ? 'active' : ''}`}
            >
              <article className="group cursor-pointer">
                {/* Image */}
                <div className="relative aspect-[4/5] mb-6 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-accent-300 group-hover:scale-105 transition-transform duration-slower" />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-normal flex items-center justify-center">
                    <span className="text-white text-body font-medium">View Project</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-h3 font-serif text-text-primary mb-2 group-hover:text-accent-500 transition-colors duration-normal">
                    {project.title}
                  </h3>
                  <p className="text-body-sm text-text-muted">{project.location}</p>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-16 text-center">
          <a href="#projects" className="btn btn-secondary">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
