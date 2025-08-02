import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MessageViewer from './components/MessageViewer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/messages" element={<MessageViewer />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Education />
                <Projects />
                <Achievements />
                <Contact />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
