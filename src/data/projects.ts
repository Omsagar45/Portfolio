import { apiService } from '../services/api';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "🛒",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    techStack: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
    image: "📋",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10"
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A weather application with location-based forecasts and interactive weather maps.",
    techStack: ["JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
    image: "🌤️",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05"
  },
  {
    id: "4",
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Tailwind CSS.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "💼",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01"
  },
  {
    id: "5",
    title: "Chat Application",
    description: "Real-time chat application with user authentication and message history.",
    techStack: ["React", "Socket.io", "Express.js", "MongoDB"],
    image: "💬",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false,
    createdAt: "2023-12-20",
    updatedAt: "2023-12-20"
  },
  {
    id: "6",
    title: "Blog Platform",
    description: "A content management system for creating and managing blog posts with rich text editor.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "NextAuth"],
    image: "📝",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false,
    createdAt: "2023-12-15",
    updatedAt: "2023-12-15"
  }
];

// Local storage key for projects
export const PROJECTS_STORAGE_KEY = 'portfolio_projects';

// Helper functions for managing projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    return await apiService.getProjects();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    // Fallback to local storage if API fails
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return projects;
  }
};

export const saveProjects = async (projects: Project[]): Promise<void> => {
  // Save to localStorage as backup
  if (typeof window !== 'undefined') {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  }
};

export const addProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  try {
    const newProject = await apiService.addProject(project);
    // Update local storage
    const currentProjects = await getProjects();
    const updatedProjects = [...currentProjects, newProject];
    await saveProjects(updatedProjects);
    return newProject;
  } catch (error) {
    console.error('Failed to add project:', error);
    // Fallback to local storage
    const projects = await getProjects();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedProjects = [...projects, newProject];
    await saveProjects(updatedProjects);
    return newProject;
  }
};

export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project | null> => {
  try {
    const updatedProject = await apiService.updateProject(id, updates);
    // Update local storage
    const currentProjects = await getProjects();
    const projectIndex = currentProjects.findIndex(p => p.id === id);
    if (projectIndex !== -1) {
      currentProjects[projectIndex] = updatedProject;
      await saveProjects(currentProjects);
    }
    return updatedProject;
  } catch (error) {
    console.error('Failed to update project:', error);
    // Fallback to local storage
    const projects = await getProjects();
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) return null;
    
    const updatedProject: Project = {
      ...projects[projectIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = updatedProject;
    await saveProjects(updatedProjects);
    return updatedProject;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    await apiService.deleteProject(id);
    // Update local storage
    const currentProjects = await getProjects();
    const filteredProjects = currentProjects.filter(p => p.id !== id);
    await saveProjects(filteredProjects);
    return true;
  } catch (error) {
    console.error('Failed to delete project:', error);
    // Fallback to local storage
    const projects = await getProjects();
    const filteredProjects = projects.filter(p => p.id !== id);
    
    if (filteredProjects.length === projects.length) return false;
    
    await saveProjects(filteredProjects);
    return true;
  }
}; 