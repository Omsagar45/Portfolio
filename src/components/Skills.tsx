import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';

const Skills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'border-primary-500/50 hover:border-primary-500 hover:bg-primary-500/10';
      case 'secondary':
        return 'border-secondary-500/50 hover:border-secondary-500 hover:bg-secondary-500/10';
      case 'accent':
        return 'border-accent-500/50 hover:border-accent-500 hover:bg-accent-500/10';
      default:
        return 'border-primary-500/50 hover:border-primary-500 hover:bg-primary-500/10';
    }
  };

  return (
    <section id="skills" className="section-padding bg-dark-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="card group"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {category.name}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className={`skill-badge ${getColorClasses(category.color)}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Level Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Skill Proficiency
            </h3>
            <p className="text-gray-400">
              My comfort level with different technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { skill: 'Frontend Development', level: 85, color: 'primary' },
              { skill: 'Backend Development', level: 75, color: 'secondary' },
              { skill: 'Problem Solving', level: 90, color: 'accent' },
              { skill: 'Database Management', level: 70, color: 'primary' }
            ].map((item, index) => (
              <motion.div
                key={item.skill}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">{item.skill}</span>
                  <span className="text-gray-400 text-sm">{item.level}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-2 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600`}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 