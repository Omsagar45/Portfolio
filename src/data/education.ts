export interface Education {
  degree: string;
  institution: string;
  duration: string;
  score: string;
  description?: string;
}

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Pimpri Chinchwad College of Engineering, Pune",
    duration: "2022 – 2026",
    score: "7.2 CGPA",
    description: "Currently pursuing Computer Science with focus on software development and algorithms."
  },
  {
    degree: "HSC (Higher Secondary)",
    institution: "Milind Junior College, Latur",
    duration: "2021",
    score: "89.33%",
    description: "Completed higher secondary education with distinction."
  },
  {
    degree: "SSC (Secondary School)",
    institution: "Shree Deshikendra Vidyalaya, Latur",
    duration: "2019",
    score: "94.20%",
    description: "Completed secondary education with excellent academic performance."
  }
]; 