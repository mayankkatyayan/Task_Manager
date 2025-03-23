
export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  achievements?: string[];
}

export interface Skill {
  category: string;
  items: {
    name: string;
    level: number; // 1-100
  }[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Mock data - Replace with your own
export const personalData = {
  name: "John Doe",
  title: "Computer Science Engineer",
  email: "john.doe@example.com",
  phone: "+1 (123) 456-7890",
  location: "San Francisco, CA",
  bio: "Passionate computer science engineer with expertise in full-stack development, cloud computing, and AI. I thrive on solving complex problems and building elegant, scalable solutions.",
  about: "I'm a detail-oriented software engineer with a strong foundation in computer science principles and a passion for creating efficient, innovative solutions. With expertise in multiple programming languages and frameworks, I enjoy tackling challenging problems and continuously expanding my skill set. I'm committed to writing clean, maintainable code and collaborating effectively with cross-functional teams.",
  resumeUrl: "/John_Doe_Resume.pdf" // Replace with your actual resume PDF path
};

export const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    period: "Jan 2021 - Present",
    description: "Leading development of cloud-native applications using microservices architecture. Mentoring junior developers and implementing CI/CD pipelines for streamlined deployment.",
    skills: ["React", "Node.js", "AWS", "Docker", "Kubernetes", "CI/CD"]
  },
  {
    title: "Software Developer",
    company: "Data Systems LLC",
    period: "Jun 2018 - Dec 2020",
    description: "Developed and maintained high-performance web applications. Implemented RESTful APIs and optimized database queries for improved performance.",
    skills: ["JavaScript", "Python", "Django", "PostgreSQL", "Redis"]
  },
  {
    title: "Web Development Intern",
    company: "Startup Horizon",
    period: "Jan 2018 - May 2018",
    description: "Assisted in the development of responsive web interfaces. Participated in agile development processes and collaborated with design teams.",
    skills: ["HTML/CSS", "JavaScript", "UI/UX Design", "Agile Methodology"]
  }
];

export const projects: Project[] = [
  {
    title: "AI-Powered Healthcare Management System",
    description: "A comprehensive platform for healthcare providers to manage patient data, appointments, and medical records with AI-driven insights for better decision making.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
    technologies: ["React", "Node.js", "MongoDB", "Express", "TensorFlow"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    title: "Smart City IoT Dashboard",
    description: "Real-time monitoring dashboard for smart city infrastructure, integrating IoT sensor data and providing actionable insights for city administrators.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070",
    technologies: ["React", "WebSockets", "Python", "InfluxDB", "Grafana"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    title: "Blockchain-based Supply Chain Solution",
    description: "Transparent supply chain management system using blockchain technology to ensure authenticity and traceability of products.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072",
    technologies: ["Ethereum", "Solidity", "Web3.js", "React", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    title: "E-Learning Platform",
    description: "Interactive e-learning platform with personalized learning paths, progress tracking, and multimedia content delivery.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
    technologies: ["React", "Firebase", "Redux", "Material UI", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  }
];

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Technical University of Technology",
    period: "2014 - 2018",
    description: "Focused on software engineering, data structures, algorithms, and artificial intelligence. Participated in coding competitions and hackathons.",
    achievements: [
      "Graduated with First Class Honors",
      "Winner of Annual Hackathon 2017",
      "Published research paper on optimizing neural networks"
    ]
  },
  {
    degree: "High School Diploma, Science Stream",
    institution: "Excellence High School",
    period: "2012 - 2014",
    description: "Specialized in Mathematics, Physics, and Computer Science. Participated in various technical and scientific exhibitions.",
    achievements: [
      "School topper in Mathematics and Computer Science",
      "Led the school's robotics team to regional championship"
    ]
  }
];

export const skills: Skill[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "JavaScript/TypeScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "C/C++", level: 80 },
      { name: "Go", level: 70 }
    ]
  },
  {
    category: "Frontend Development",
    items: [
      { name: "React", level: 95 },
      { name: "HTML5/CSS3", level: 90 },
      { name: "Angular", level: 80 },
      { name: "Vue.js", level: 75 },
      { name: "Redux", level: 85 }
    ]
  },
  {
    category: "Backend Development",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "Django", level: 85 },
      { name: "Spring Boot", level: 80 },
      { name: "FastAPI", level: 85 }
    ]
  },
  {
    category: "DevOps & Cloud",
    items: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 80 },
      { name: "CI/CD", level: 85 },
      { name: "Terraform", level: 75 }
    ]
  }
];

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github"
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "linkedin"
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "twitter"
  },
  {
    platform: "Email",
    url: "mailto:john.doe@example.com",
    icon: "mail"
  }
];
