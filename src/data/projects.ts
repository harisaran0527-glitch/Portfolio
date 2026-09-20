export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  filterCategory: 'AI / DATA' | 'FULL STACK' | 'EDUCATION TECH' | 'HACKATHON' | 'UNITY / 3D' | 'EXPERIMENTAL';
  techStack: string[];
  shortDescription: string;
  featured: boolean;
  year: string;
  visualType: 'analytics' | 'network' | 'dashboard' | 'game-3d' | 'ai-mesh' | 'team-node' | 'attendance' | 'telemetry' | 'safety';
  caseStudy: {
    overview: string;
    problem: string;
    approach: string;
    keyFeatures: string[];
    contribution: string;
    workflow?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'student-performance-intelligence',
    number: '01',
    title: 'AI & DS Student Performance, Intelligence & Recognition System',
    category: 'AI / Data · Full Stack · Education Tech',
    filterCategory: 'AI / DATA',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    shortDescription: 'A department-focused platform designed to manage and visualize student academic performance, skills, achievements, participation, certifications, projects, and recognition.',
    featured: true,
    year: '2026',
    visualType: 'analytics',
    caseStudy: {
      overview: 'The AI & DS Student Performance, Intelligence & Recognition System was created to solve the fragmented state of department performance tracking. It unifies academic grades, coding platform metrics, project achievements, and certifications into a real-time intelligence hub.',
      problem: 'Faculty and department heads previously relied on disconnected spreadsheets to evaluate student achievements, leading to delayed recognition, missing metrics during accreditation, and lack of clarity on skill gaps.',
      approach: 'Built a centralized data pipeline using Node.js and PostgreSQL with Prisma ORM. Designed a clean, dashboard-first interface with interactive charts that visualize department-wide trends down to individual student radar charts.',
      keyFeatures: [
        'Comprehensive Academic & Skill Analytics Dashboards',
        'Student Achievement & Certification Verification System',
        'Automated Department Performance Ranking & Recognition',
        'Customizable Project Portfolio & Hackathon Tracker',
        'Faculty & Department Admin Oversight Module'
      ],
      contribution: 'Architected the full database schema using Prisma, developed custom data visualization components in React & TypeScript, and implemented real-time analytics aggregation routines.'
    }
  },
  {
    id: 'skillexchange',
    number: '02',
    title: 'SkillExchange',
    category: 'Full Stack · Social Learning · Real-Time Communication',
    filterCategory: 'FULL STACK',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    shortDescription: 'A student skill-sharing platform that helps learners discover other students based on technical skills, send learning requests, communicate, and exchange knowledge.',
    featured: true,
    year: '2025',
    visualType: 'network',
    caseStudy: {
      overview: 'SkillExchange creates a peer-to-peer knowledge network within student communities. Learners can offer their strengths (e.g. Python, Web Dev, 3D Design) and request guidance in areas they wish to master.',
      problem: 'Students often struggle to find study partners or peer mentors with complementary skill sets within their immediate campus environment.',
      approach: 'Engineered a real-time skill matching platform powered by MongoDB geospatial/text indexing and Socket.IO instant messaging, allowing instant connections and session requests.',
      keyFeatures: [
        'Dynamic Skill Discovery & Tag Filtering Engine',
        'Real-Time 1-on-1 Student Chat & Request Management',
        'Peer Feedback & Skill Rating System',
        'Interactive Student Networking Profiles',
        'Admin Monitoring & Platform Safety Controls'
      ],
      contribution: 'Designed and built the full stack application from ground up, including the WebSocket messaging engine, JWT authentication, and interactive discovery UI.'
    }
  },
  {
    id: 'student360',
    number: '03',
    title: 'Student360',
    category: 'Education Technology · Student Management',
    filterCategory: 'EDUCATION TECH',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'SQLite'],
    shortDescription: 'A centralized student management experience covering student information and attendance workflows with clean student-centric tracking and status-based attendance handling.',
    featured: true,
    year: '2025',
    visualType: 'dashboard',
    caseStudy: {
      overview: 'Student360 transforms complex institution-level student administrative workflows into a seamless, modern web app focused on student clarity and rapid attendance entry.',
      problem: 'Traditional campus portals are clunky, slow, and non-responsive, causing friction for both faculty recording daily attendance and students verifying their status.',
      approach: 'Focused on micro-interactions and low-latency database queries to make daily attendance logging effortless, paired with clear visual status indicators.',
      keyFeatures: [
        'Single-Screen 360 Degree Student Profile Hub',
        'Rapid Status-Based Attendance Logging (Present, Absent, OD, Medical)',
        'Attendance Percentage Breakdown & Early Warning Alerts',
        'Historical Attendance Logs & Timeline Views',
        'Responsive Mobile-First Interface for Faculty'
      ],
      contribution: 'Created the UI design system, implemented state management for fast batch attendance updates, and optimized offline-tolerant attendance logging.'
    }
  },
  {
    id: 'adventurequest',
    number: '04',
    title: 'AdventureQuest',
    category: 'Unity · 3D · Game Development',
    filterCategory: 'UNITY / 3D',
    techStack: ['Unity', 'C#', '3D Shader Graph', 'Cinemachine'],
    shortDescription: 'An interactive fantasy adventure game focused on exploration, environments, movement, camera systems, immersive world design, and interactive gameplay.',
    featured: true,
    year: '2025',
    visualType: 'game-3d',
    caseStudy: {
      overview: 'AdventureQuest is a 3D fantasy action-exploration title built in Unity. It showcases complex player kinematics, dynamic smooth camera mechanics, interactive environments, and hand-crafted atmosphere.',
      problem: 'Building fluid third-person controller mechanics with adaptive camera collisions and dynamic environment interactions in Unity requires high attention to physics and feel.',
      approach: 'Utilized Unity C# custom character controllers, Cinemachine state-driven camera blend trees, and custom HLSL shader graph nodes for atmospheric lighting.',
      keyFeatures: [
        'Fluid 3D Character Physics & Movement System',
        'Cinemachine Adaptive Camera Collisions & Target Tracking',
        'Interactive World Objects & Environment Triggers',
        'Fantasy World Design with Stylized Lighting & Shaders',
        'Sound Effect Triggers & Atmospheric Soundscapes'
      ],
      contribution: 'Developed all C# gameplay scripts, character controller logic, camera blend triggers, environment assembly, and particle effects.'
    }
  },
  {
    id: 'ai-tools-learning-platform',
    number: '05',
    title: 'AI Tools Learning Platform',
    category: 'AI · Product Development · Web',
    filterCategory: 'AI / DATA',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    shortDescription: 'A large AI tools discovery and learning platform designed to organize AI tools across categories such as chatbots, coding, image generation, video, voice, research, and design.',
    featured: true,
    year: '2026',
    visualType: 'ai-mesh',
    caseStudy: {
      overview: 'A high-performance portal cataloging cutting-edge AI tools. Built with dynamic tool loading so users can quickly explore, test, and launch tools without rendering heavy DOM structures.',
      problem: 'Most AI directories become slow and bloated when displaying hundreds of tools with embedded iframe previews or media assets.',
      approach: 'Engineered lightweight virtualized catalog listings with lazy component hydration, allowing instant filtering across categories like Code, Vision, LLMs, Voice, and Design.',
      keyFeatures: [
        'Multi-Category AI Tool Taxonomy & Instant Search',
        'On-Demand Tool Launcher & Performance Optimization',
        'Interactive Prompt Guides & Cheat-Sheets',
        'User Favorites & Custom Workflow Collector',
        'Minimalist Dark Mode Technical UI'
      ],
      contribution: 'Designed the architecture, built lazy loading tool containers, categorized tool data structures, and crafted the slick grid layout.'
    }
  },
  {
    id: 'team-head-portal',
    number: '06',
    title: 'Team Head Portal',
    category: 'Full Stack · Education Technology',
    filterCategory: 'FULL STACK',
    techStack: ['React', 'TypeScript', 'Express', 'Node.js', 'PostgreSQL'],
    shortDescription: 'A management platform for organizing student teams, team heads, members, and department-level performance information including LeetCode and NPTEL tracking.',
    featured: false,
    year: '2025',
    visualType: 'team-node',
    caseStudy: {
      overview: 'Team Head Portal empowers department leads to assemble project teams, enforce capacity constraints, and track performance indicators like LeetCode contest ranks and NPTEL certifications.',
      problem: 'Tracking team member progress across multiple external platforms (LeetCode, NPTEL) manually led to inaccurate team performance assessments.',
      approach: 'Created an administrative portal that centralizes team head assignments, caps team size, and aggregates certification and coding metrics.',
      keyFeatures: [
        'Team Head & Member Capacity Management',
        'LeetCode & NPTEL Certification Progress Tracker',
        'Best Team Head Spotlight & Performance Leaderboard',
        'Project Milestone Submission & Verification',
        'Department Exportable Reports'
      ],
      contribution: 'Implemented team assignment logic, constraint validations, and dynamic card layouts for team head scorecards.'
    }
  },
  {
    id: 'student-admission-attendance',
    number: '07',
    title: 'Student Admission & Attendance Management System',
    category: 'Education Technology · Student Management',
    filterCategory: 'EDUCATION TECH',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    shortDescription: 'A management platform for student admission information and subject-wise attendance tracking with detailed status codes (Present, Absent, OD, EL/Medical, Long Absent).',
    featured: false,
    year: '2025',
    visualType: 'attendance',
    caseStudy: {
      overview: 'An institutional web app focused on stream-lined student registration and detailed subject-wise attendance tracking across multi-term semesters.',
      problem: 'Handling multiple attendance exception codes (OD - On Duty, Medical Leave, Long Absence) often created errors in automated threshold warnings.',
      approach: 'Built a multi-status attendance tracking matrix with rule engines that compute weighted eligibility percentages automatically.',
      keyFeatures: [
        'Subject-Wise Attendance Percentage Calculator',
        'Granular Status Handling: Present, Absent, OD, EL/Medical, Long Absent',
        'Admission File Management & Student Record Registry',
        'Threshold Alerts for Shortage of Attendance',
        'Auditable Attendance Logs'
      ],
      contribution: 'Designed database schema for multi-subject attendance logs and built status toggle matrix UI.'
    }
  },
  {
    id: 'dustline',
    number: '08',
    title: 'Dustline',
    category: 'Unity · 3D · Game Development',
    filterCategory: 'UNITY / 3D',
    techStack: ['Unity', 'C#', 'Physics Engine', 'Particle Systems'],
    shortDescription: 'A Unity-based interactive game development project involving gameplay systems, player / vehicle movement, camera behavior, race direction, and environmental effects.',
    featured: false,
    year: '2025',
    visualType: 'telemetry',
    caseStudy: {
      overview: 'Dustline is a high-speed vehicle gameplay prototype in Unity exploring dynamic smoke physics, wheel friction curves, follow-camera springs, and lap telemetry.',
      problem: 'Achieving responsive arcade-style vehicle control in Unity while maintaining realistic suspension physics and particle drift effects.',
      approach: 'Developed custom C# vehicle controllers utilizing Raycast wheels, dynamic particle density triggers based on velocity, and dampening spring cameras.',
      keyFeatures: [
        'Custom Vehicle Kinematics & Suspension Simulation',
        'Dynamic Smoke & Dust Environmental Particle Effects',
        'Speed-Responsive Chase Camera System',
        'Checkpoint & Lap Waypoint Validation Logic',
        'Runtime Performance Diagnostics & Debug HUD'
      ],
      contribution: 'Authored C# scripts for vehicle physics, camera tracking, particle feedback, and track checkpoint systems.'
    }
  },
  {
    id: 'mineguard',
    number: '09',
    title: 'MineGuard',
    subtitle: 'AI-Powered Underground Mine Safety, Monitoring & Rescue System',
    category: 'Hackathon · AI · Safety Technology',
    filterCategory: 'HACKATHON',
    techStack: ['Python', 'Machine Learning', 'Edge AI', 'React', 'Node.js'],
    shortDescription: 'A safety-focused solution concept combining sensor data, edge processing, AI hazard analysis, alerts, monitoring, and rescue coordination.',
    featured: false,
    year: '2025',
    visualType: 'safety',
    caseStudy: {
      overview: 'MineGuard is an AI-backed hackathon solution concept designed to improve underground mining safety through real-time toxic gas detection, structural stress analysis, and emergency rescue routing.',
      problem: 'Underground mining hazardous events suffer from delay between sensor threshold breaches and surface emergency response dispatch.',
      approach: 'Proposed a end-to-end architecture: Sensors → Edge Data Collection → AI Hazard Analysis → Alerts & Monitoring → Rescue Coordination → Safer Operations.',
      keyFeatures: [
        'Edge Sensor Data Streaming Simulation',
        'AI Anomaly Detection Model for Hazardous Gas & Temperature Spikes',
        'Surface Control Room Emergency Radar Dashboard',
        'Automated Worker Location & Rescue Coordination Routing',
        'Multi-Tier Incident Escalation Protocol'
      ],
      contribution: 'Conceived the system architecture, built the prototype dashboard UI, and designed the workflow for sensor alert visualization.',
      workflow: 'Sensors → Edge Data Collection → AI Hazard Analysis → Alerts & Monitoring → Rescue Coordination → Safer Operations'
    }
  }
];
