import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { Project, getProjects, deleteProject } from '../data/projects';
import { isAdmin, logout } from '../utils/auth';
import AdminLogin from './AdminLogin';
import ProjectForm from './ProjectForm';

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const adminStatus = isAdmin();
      setIsAuthenticated(adminStatus);
      if (!adminStatus) {
        setShowLogin(true);
      }
    };

    checkAuth();
    loadProjects();

    // Check auth status periodically
    const interval = setInterval(checkAuth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadProjects = async () => {
    try {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    loadProjects();
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  const handleAddProject = () => {
    setEditingProject(undefined);
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const success = await deleteProject(projectId);
      if (success) {
        await loadProjects();
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
    setShowConfirmDelete(null);
  };

  const handleFormSave = async () => {
    setShowForm(false);
    setEditingProject(undefined);
    await loadProjects();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(undefined);
  };

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        {showLogin && (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onCancel={() => setShowLogin(false)}
          />
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-600">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Manage your portfolio projects</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-dark-700 border border-dark-600 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-3xl font-bold text-primary-500">{projects.length}</div>
            <div className="text-gray-400 text-sm">Total Projects</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-secondary-500">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-gray-400 text-sm">Featured Projects</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-accent-500">
              {projects.filter(p => p.liveUrl).length}
            </div>
            <div className="text-gray-400 text-sm">Live Projects</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-green-500">
              {projects.filter(p => p.githubUrl).length}
            </div>
            <div className="text-gray-400 text-sm">GitHub Projects</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Projects</h2>
          <button
            onClick={handleAddProject}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        {/* Projects List */}
        <div className="grid gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{project.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-100">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-dark-700 border border-dark-600 text-gray-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                      <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-2 text-gray-400 hover:text-gray-300 hover:bg-dark-700 rounded-lg transition-colors"
                    title="Edit Project"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => setShowConfirmDelete(project.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {projects.length === 0 && (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">No Projects Yet</h3>
              <p className="text-gray-400 mb-6">
                Start by adding your first project to showcase your work.
              </p>
              <button
                onClick={handleAddProject}
                className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors mx-auto"
              >
                <Plus size={20} />
                Add Your First Project
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showForm && (
          <ProjectForm
            project={editingProject}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showConfirmDelete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-dark-800 border border-dark-600 rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmDelete(null)}
                  className="flex-1 py-2 px-4 bg-dark-700 border border-dark-600 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProject(showConfirmDelete)}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard; 