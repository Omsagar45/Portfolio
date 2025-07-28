import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { education } from '../data/education';

const Education: React.FC = () => {
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
    <section id="education" className="section-padding bg-dark-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My academic journey and educational achievements
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card group hover:scale-105 transition-transform duration-300"
            >
              {/* Degree Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-primary-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    {edu.degree}
                  </h3>
                  <p className="text-primary-400 text-sm font-medium">
                    {edu.institution}
                  </p>
                </div>
              </div>

              {/* Duration and Score */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={16} />
                  <span>{edu.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="text-accent-400" size={16} />
                  <span className="text-accent-400 font-medium">{edu.score}</span>
                </div>
              </div>

              {/* Description */}
              {edu.description && (
                <p className="text-gray-400 text-sm leading-relaxed">
                  {edu.description}
                </p>
              )}

              {/* Progress Indicator for Current Education */}
              {index === 0 && (
                <div className="mt-4 pt-4 border-t border-dark-700">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-primary-400 font-medium">75%</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div className="w-3/4 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-100 mb-6">
              Academic Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-dark-700 rounded-lg">
                <div className="text-3xl font-bold text-primary-400 mb-2">8.2</div>
                <div className="text-gray-400 text-sm">Current CGPA</div>
              </div>
              <div className="text-center p-4 bg-dark-700 rounded-lg">
                <div className="text-3xl font-bold text-secondary-400 mb-2">89.33%</div>
                <div className="text-gray-400 text-sm">HSC Score</div>
              </div>
              <div className="text-center p-4 bg-dark-700 rounded-lg">
                <div className="text-3xl font-bold text-accent-400 mb-2">94.20%</div>
                <div className="text-gray-400 text-sm">SSC Score</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education; 