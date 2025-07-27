export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  techStack: string[];
}

export const experience: Experience[] = [
  {
    role: "SDE Intern",
    company: "ITJOBXS",
    duration: "Jun 2025 – Jul 2025",
    location: "Remote",
    description: [
      "Built responsive web pages for company site",
      "Integrated Recaptcha for bot detection",
      "Worked on user auth and spam detection"
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL"]
  }
]; 