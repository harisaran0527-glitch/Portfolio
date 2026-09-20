export interface SkillCategory {
  title: string;
  skills: { name: string; icon?: string; tag?: string }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Java' },
      { name: 'C' },
      { name: 'C#' }
    ]
  },
  {
    title: 'Web & Frameworks',
    skills: [
      { name: 'React' },
      { name: 'Vite' },
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'REST APIs' },
      { name: 'HTML5 / CSS3' },
      { name: 'Tailwind CSS' }
    ]
  },
  {
    title: 'Databases & ORM',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'SQLite' },
      { name: 'Prisma' }
    ]
  },
  {
    title: 'AI & Data Science',
    skills: [
      { name: 'Machine Learning' },
      { name: 'Data Analysis' },
      { name: 'AI Applications' },
      { name: 'Data Visualization' },
      { name: 'Pandas & NumPy' }
    ]
  },
  {
    title: 'Development & Interactive',
    skills: [
      { name: 'Git & GitHub' },
      { name: 'Unity 3D' },
      { name: 'Socket.IO' },
      { name: 'Game Systems' },
      { name: 'Edge AI Concepts' }
    ]
  }
];
