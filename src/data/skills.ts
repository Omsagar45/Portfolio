export interface SkillCategory {
  name: string;
  skills: string[];
  color: string;
}

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["C++", "C", "JavaScript"],
    color: "primary"
  },
  {
    name: "Frontend",
    skills: ["HTML", "CSS", "Bootstrap", "Tailwind", "ReactJS"],
    color: "secondary"
  },
  {
    name: "Backend",
    skills: ["NodeJS", "ExpressJS", "PHP"],
    color: "accent"
  },
  {
    name: "Database",
    skills: ["MongoDB", "Firebase", "MySQL"],
    color: "primary"
  },
  {
    name: "Tools",
    skills: ["Git", "GitHub", "Postman", "Netlify"],
    color: "secondary"
  }
]; 