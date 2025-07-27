import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Clock } from 'lucide-react';

const Projects: React.FC = () => {
  const placeholderProjects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "🛒"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      techStack: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
      image: "📋"
    },
    {
      title: "Weather Dashboard",
      description: "A weather application with location-based forecasts and interactive weather maps.",
      techStack: ["JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
      image: "🌤️"
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Tailwind CSS.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: "💼"
    },
    {
      title: "Chat Application",
      description: "Real-time chat application with user authentication and message history.",
      techStack: ["React", "Socket.io", "Express.js", "MongoDB"],
      image: "💬"
    },
    {
      title: "Blog Platform",
      description: "A content management system for creating and managing blog posts with rich text editor.",
      techStack: ["Next.js", "Prisma", "PostgreSQL", "NextAuth"],
      image: "📝"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="section-padding bg-dark-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcasing my work and the technologies I use to build solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {placeholderProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card group hover:scale-105 transition-all duration-300"
            >
              {/* Project Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center mb-6">
                <div className="text-6xl">{project.image}</div>
              </div>

              {/* Project Title */}
              <h3 className="text-xl font-semibold text-gray-100 mb-3">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-dark-700 border border-dark-600 text-gray-300 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm py-2">
                  <Clock size={16} />
                  Coming Soon
                </button>
                <button className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2">
                  <ExternalLink size={16} />
                  Preview
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              More Projects Coming Soon!
            </h3>
            <p className="text-gray-400 mb-6">
              I'm constantly working on new projects and learning new technologies. 
              Check back soon to see my latest work!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/om-sagar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Github size={20} />
                View GitHub
              </a>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <ExternalLink size={20} />
                Contact Me
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 