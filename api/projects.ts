import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

// Database file path
const DB_FILE = path.join(process.cwd(), 'data', 'projects.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load projects from file
const loadProjects = () => {
  try {
    ensureDataDir();
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading projects:', error);
  }
  return [];
};

// Save projects to file
const saveProjects = (projects: any[]) => {
  try {
    ensureDataDir();
    fs.writeFileSync(DB_FILE, JSON.stringify(projects, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving projects:', error);
    return false;
  }
};

// Initialize with default projects if file doesn't exist
const initializeDefaultProjects = () => {
  const defaultProjects = [
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
    }
  ];

  if (!fs.existsSync(DB_FILE)) {
    saveProjects(defaultProjects);
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize default projects if needed
  initializeDefaultProjects();

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get all projects
        const projects = loadProjects();
        res.status(200).json(projects);
        break;

      case 'POST':
        // Add new project
        const newProject = {
          ...req.body,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        const currentProjects = loadProjects();
        const updatedProjects = [...currentProjects, newProject];
        
        if (saveProjects(updatedProjects)) {
          res.status(201).json(newProject);
        } else {
          res.status(500).json({ error: 'Failed to save project' });
        }
        break;

      case 'PUT':
        // Update project
        const { id, ...updates } = req.body;
        const projectsToUpdate = loadProjects();
        const projectIndex = projectsToUpdate.findIndex((p: any) => p.id === id);
        
        if (projectIndex === -1) {
          res.status(404).json({ error: 'Project not found' });
          return;
        }

        const updatedProject = {
          ...projectsToUpdate[projectIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };

        projectsToUpdate[projectIndex] = updatedProject;
        
        if (saveProjects(projectsToUpdate)) {
          res.status(200).json(updatedProject);
        } else {
          res.status(500).json({ error: 'Failed to update project' });
        }
        break;

      case 'DELETE':
        // Delete project
        const projectId = req.query.id as string;
        const projectsToDelete = loadProjects();
        const filteredProjects = projectsToDelete.filter((p: any) => p.id !== projectId);
        
        if (filteredProjects.length === projectsToDelete.length) {
          res.status(404).json({ error: 'Project not found' });
          return;
        }

        if (saveProjects(filteredProjects)) {
          res.status(200).json({ message: 'Project deleted successfully' });
        } else {
          res.status(500).json({ error: 'Failed to delete project' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 