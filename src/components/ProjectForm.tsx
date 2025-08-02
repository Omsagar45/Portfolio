import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Edit } from 'lucide-react';
import { Project, addProject, updateProject } from '../data/projects';

interface ProjectFormProps {
  project?: Project;
  onSave: () => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    image: '💼',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!project;

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        techStack: project.techStack.join(', '),
        image: project.image,
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured
      });
    }
  }, [project]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const techStackArray = formData.techStack
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);

    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      techStack: techStackArray,
      image: formData.image,
      liveUrl: formData.liveUrl.trim() || undefined,
      githubUrl: formData.githubUrl.trim() || undefined,
      featured: formData.featured
    };

    try {
      if (isEditing && project) {
        await updateProject(project.id, projectData);
      } else {
        await addProject(projectData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save project:', error);
      // Still call onSave to close the form
      onSave();
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const emojiOptions = [
    '💼', '🛒', '📋', '🌤️', '💬', '📝', '🎮', '📱', '🌐', '🔧', '📊', '🎨'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-dark-800 border border-dark-600 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.title ? 'border-red-400' : 'border-dark-600'
              }`}
              placeholder="Enter project title"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.description ? 'border-red-400' : 'border-dark-600'
              }`}
              placeholder="Describe your project"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tech Stack * (comma-separated)
            </label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => handleInputChange('techStack', e.target.value)}
              className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.techStack ? 'border-red-400' : 'border-dark-600'
              }`}
              placeholder="React, Node.js, MongoDB"
            />
            {errors.techStack && (
              <p className="text-red-400 text-sm mt-1">{errors.techStack}</p>
            )}
          </div>

          {/* Project Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleInputChange('image', emoji)}
                  className={`p-3 text-2xl rounded-lg border transition-colors ${
                    formData.image === emoji
                      ? 'border-primary-500 bg-primary-500/20'
                      : 'border-dark-600 hover:border-dark-500'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Live URL (optional)
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub URL (optional)
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleInputChange('featured', e.target.checked)}
              className="w-4 h-4 text-primary-500 bg-dark-700 border-dark-600 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-300">
              Featured Project (will appear prominently)
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-dark-700 border border-dark-600 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              {isEditing ? (
                <>
                  <Edit size={20} />
                  Update Project
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Add Project
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProjectForm; 