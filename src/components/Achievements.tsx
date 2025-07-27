import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data/achievements';

const Achievements: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="achievements" className="section-padding bg-dark-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Recognition and accomplishments that highlight my journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card group hover:scale-105 transition-all duration-300"
            >
              {/* Achievement Icon */}
              <div className="text-4xl mb-4">{achievement.icon}</div>
              
              {/* Achievement Title */}
              <h3 className="text-xl font-semibold text-gray-100 mb-3">
                {achievement.title}
              </h3>
              
              {/* Achievement Description */}
              <p className="text-gray-400 leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-100 mb-8 text-center">
              Additional Highlights
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-dark-700 rounded-lg">
                <div className="text-3xl font-bold text-primary-400 mb-2">100+</div>
                <div className="text-gray-400 text-sm">Coding Problems Solved</div>
              </div>
              
              <div className="text-center p-6 bg-dark-700 rounded-lg">
                <div className="text-3xl font-bold text-secondary-400 mb-2">3+</div>
                <div className="text-gray-400 text-sm">Years of Learning</div>
              </div>
              
              <div className="text-center p-6 bg-dark-700 rounded-lg">
                <div className="text-3xl font-bold text-accent-400 mb-2">10+</div>
                <div className="text-gray-400 text-sm">Technologies Mastered</div>
              </div>
              
              <div className="text-center p-6 bg-dark-700 rounded-lg">
                <div className="text-3xl font-bold text-primary-400 mb-2">5+</div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              Driven by Excellence
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Every achievement represents a milestone in my journey of continuous learning and growth. 
              I believe in pushing boundaries and setting new standards for myself, always striving 
              to deliver the best possible solutions and outcomes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-full text-sm">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-secondary-500/20 border border-secondary-500/30 text-secondary-400 rounded-full text-sm">
                Team Player
              </span>
              <span className="px-4 py-2 bg-accent-500/20 border border-accent-500/30 text-accent-400 rounded-full text-sm">
                Quick Learner
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements; 