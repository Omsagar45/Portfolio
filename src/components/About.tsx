import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

const About: React.FC = () => {
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
    <section id="about" className="section-padding bg-dark-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know me better and understand what drives my passion for technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-100">
                Who I Am
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {personalInfo.intro} I'm currently pursuing my B.Tech in Computer Science 
                and actively working on various projects to enhance my skills. My goal is 
                to become a full-stack developer who can create impactful solutions that 
                solve real-world problems.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-100">
                Personal Highlights
              </h3>
              <div className="space-y-3">
                {personalInfo.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-primary-400 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-400">{highlight}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <div className="card">
              {/* Profile Photo in About Section */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-primary-500/30 overflow-hidden shadow-lg">
                  <img
                    src={personalInfo.profilePhoto}
                    alt="Om Sagar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                          <div class="text-center">
                            <div class="text-3xl mb-2">👨‍💻</div>
                            <p class="text-gray-400 text-xs">Photo</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-6 text-gray-100 text-center">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-500/20 rounded-full">
                    <Phone className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-gray-100 font-medium">{personalInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary-500/20 rounded-full">
                    <Mail className="text-secondary-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-gray-100 font-medium">{personalInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-500/20 rounded-full">
                    <MapPin className="text-accent-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-gray-100 font-medium">{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-8 border-t border-dark-700">
                <h4 className="text-lg font-semibold mb-4 text-gray-100">
                  Quick Stats
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-dark-700 rounded-lg">
                    <div className="text-2xl font-bold text-primary-400">100+</div>
                    <div className="text-gray-400 text-sm">Coding Problems</div>
                  </div>
                  <div className="text-center p-4 bg-dark-700 rounded-lg">
                    <div className="text-2xl font-bold text-secondary-400">3+</div>
                    <div className="text-gray-400 text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 