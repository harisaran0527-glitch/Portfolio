export interface JourneyMilestone {
  category: string;
  title: string;
  description: string;
  highlights: string[];
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    category: 'AI & Data Science',
    title: 'Foundational Intelligence & Analytics',
    description: 'Building strong academic foundation and technical knowledge in machine learning algorithms, statistical analysis, data pipelines, and intelligent system design at AVS Engineering College.',
    highlights: ['Machine Learning Foundations', 'Data Visualization & Analytics', 'Statistical Modeling']
  },
  {
    category: 'Full-Stack Development',
    title: 'Building Production Web Applications',
    description: 'Developing complete end-to-end web applications with React, TypeScript, Node.js, and relational/document databases. Crafting modern responsive user interfaces with solid architecture.',
    highlights: ['React & Node.js Ecosystem', 'PostgreSQL & Prisma Integration', 'RESTful API Engineering']
  },
  {
    category: 'AI & Product Development',
    title: 'Practical AI Integration & Tooling',
    description: 'Exploring how AI capabilities can be combined with modern software products to create experiences that are useful, scalable, and responsive.',
    highlights: ['AI Tools Discovery Engines', 'Model Integration', 'Product-First Architecture']
  },
  {
    category: 'Hackathons & Innovation',
    title: 'Rapid Solution Prototyping',
    description: 'Turning real-world problem statements into functional technical solutions under tight time constraints, such as safety systems and collaborative student tools.',
    highlights: ['MineGuard Safety Concept', 'Rapid UI/UX Wireframing', 'System Architecture Design']
  },
  {
    category: 'Interactive Development',
    title: 'Unity 3D & Real-Time Physics Systems',
    description: 'Exploring Unity, C#, 3D environments, camera controllers, physics dynamics, and interactive gameplay mechanics in projects like AdventureQuest and Dustline.',
    highlights: ['Unity C# Scripting', 'Cinemachine Camera Systems', '3D Environment Design']
  }
];
