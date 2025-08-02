import { Project } from '../data/projects';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? `${window.location.origin}/api` 
  : 'http://localhost:3000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects');
  }

  // Add new project
  async addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  // Update project
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    return this.request<Project>('/projects', {
      method: 'PUT',
      body: JSON.stringify({ id, ...updates }),
    });
  }

  // Delete project
  async deleteProject(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/projects?id=${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService(); 