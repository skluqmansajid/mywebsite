import type { Project, Skill, Education, Experience, Publication, Certificate } from '@/types';

export const personalInfo = {
  name: 'Shaik Luqman Sajid',
  title: 'Software Development Engineer — Applied AI & Machine Learning',
  location: 'India',
  email: 'shaikluqmansajid@gmail.com',
  phone: '+91 8801118786',
  github: 'github.com/skluqmansajid',
  linkedin: 'linkedin.com/in/luqmansajid',
  summary: `Research-oriented Software Development Engineer with strong experience in applied machine learning, computer vision, and data-driven systems. Proven ability to plan and execute experiments, preprocess large datasets, develop and evaluate models, and contribute to academic research workflows. Experienced in translating research ideas into reproducible experiments and scalable AI-driven systems, with hands-on exposure to publications, internships, and end-to-end ML pipelines.`,
  avatar: '/assets/profile.png',
  resume: '/assets/resume.pdf',
  availability: 'Immediate start',
  timezone: 'IST (UTC+5:30)',
  workingHours: 'Flexible'
};

export const certificates: Certificate[] = [
  {
    id: '1',
    name: 'Oracle Cloud Infrastructure 2025 Certified Architect Associate',
    issuer: 'Oracle',
    date: '2025',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=8A7F5C3E2D1B4A6098765432109876543210',
    category: 'cloud',
    icon: 'oracle'
  },
  {
    id: '2',
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: '2025',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=9B8G6D4F3E2C5B7109876543210987654321',
    category: 'ai',
    icon: 'oracle'
  },
  {
    id: '3',
    name: 'Building RAG Apps Using MongoDB',
    issuer: 'MongoDB & Credly',
    date: 'Feb 2026',
    url: 'https://www.credly.com/badges/4fe669a8-c993-4b7c-94b6-65a2b68e1197',
    category: 'database',
    icon: 'mongodb'
  },
  {
    id: '4',
    name: 'Gemini Certified Student',
    issuer: 'Google',
    date: '2026',
    url: 'https://edu.google.accredible.com/434c9693-f78a-4bcf-b3d4-8cb5ef94d189',
    category: 'ai',
    icon: 'google'
  },
  {
    id: '5',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    date: '2026',
    url: 'https://www.credly.com/go/X4OAXmv1',
    category: 'cloud',
    icon: 'aws'
  },
  {
    id: '6',
    name: 'Python Full Master',
    issuer: 'GeeksforGeeks',
    date: '2024',
    url: 'https://www.geeksforgeeks.org/certificate/verify',
    category: 'programming',
    icon: 'code'
  },
  {
    id: '7',
    name: 'Big Data Emerging Technologies',
    issuer: 'Yonsei University (Coursera)',
    date: '2024',
    url: 'https://coursera.org/verify/1234567890',
    category: 'data',
    icon: 'database'
  }
];

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Amrita Vishwa Vidyapeetham",
    year: "2023 - 2027",
    grade: "CGPA: 8.3"
  },
  {
    degree: "Intermediate",
    institution: "Junior College",
    year: "2021 - 2023",
    grade: "Percentage: 91.1%"
  },
  {
    degree: "Class X",
    institution: "Sri Krishnaveni E.M High School",
    year: "2020 - 2021",
    grade: "Percentage: 91.8%"
  }
];

export const experiences: Experience[] = [
  {
    title: "Research Intern",
    company: "King Abdullah University of Science and Technology (KAUST)",
    period: "Feb 2025 - Jun 2025",
    description: [
      "Planned and executed multiple deep learning experiments for computer vision applications",
      "Developed data preprocessing and augmentation pipelines to improve model robustness",
      "Analyzed model performance across multiple experimental runs using accuracy, precision, recall, and F1-score",
      "Identified performance bottlenecks and optimized training strategies through iterative experimentation",
      "Documented experimental outcomes and contributed to collaborative technical reviews"
    ]
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Infosys",
    period: "Nov 2025 - Dec 2025",
    description: [
      "Processed and consolidated multi-source datasets for Fire Weather Index (FWI) prediction",
      "Engineered features and normalized data to support regression-based modeling",
      "Trained and assessed regression models, ensuring stable predictions across validation runs",
      "Deployed trained models via a Flask-based inference service to support real-time evaluation"
    ]
  },
  {
    title: "AI Engineer Intern",
    company: "Innomatics Research Labs",
    period: "Feb 2024 - Apr 2024",
    description: [
      "Developed Retrieval-Augmented Generation (RAG) pipelines to extract structured insights from unstructured datasets",
      "Applied NLP techniques and LLM-based workflows to generate personalized learning recommendations",
      "Automated extraction of LinkedIn profile information from Zoom chat logs, reducing manual effort",
      "Delivered end-to-end ML pipelines covering data ingestion, processing, and inference"
    ]
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Multi-Label Ocular Disease Classification",
    description: "Developing a multi-label deep learning pipeline for classification from retinal fundus images. Applying image preprocessing and data augmentation techniques to address class imbalance.",
    status: "ongoing",
    technologies: ["Python", "TensorFlow", "Computer Vision", "Deep Learning"],
    year: "2025",
    category: "ai",
    githubUrl: "https://github.com/skluqmansajid/ocular-disease-classification"
  },
  {
    id: "2",
    title: "Face Expression Recognition",
    description: "Developed a computer vision pipeline to detect and classify human facial expressions. Applied preprocessing and feature extraction techniques to enhance classification accuracy.",
    status: "completed",
    technologies: ["Python", "OpenCV", "Deep Learning", "CNN"],
    year: "2024",
    category: "ai",
    githubUrl: "https://github.com/skluqmansajid/face-expression-recognition"
  },
  {
    id: "3",
    title: "PrescriptionX - Prescription Maker",
    description: "Developed a web-based application for generating structured medical prescriptions. Implemented standardized input workflows for patient details and medication dosage.",
    status: "completed",
    technologies: ["React", "Node.js", "MongoDB"],
    year: "2024",
    category: "web",
    githubUrl: "https://github.com/skluqmansajid/prescriptionx"
  },
  {
    id: "4",
    title: "URL Shortener",
    description: "Developed a Django-based URL shortening service with database-backed redirection logic. Implemented efficient link storage and retrieval mechanisms.",
    status: "completed",
    technologies: ["Django", "Python", "PostgreSQL"],
    year: "2024",
    category: "web",
    githubUrl: "https://github.com/skluqmansajid/url-shortener"
  },
  {
    id: "5",
    title: "Hand Gesture Shooter",
    description: "Built a browser-based shooting game controlled via real-time hand gesture recognition. Applied MediaPipe Hands for landmark detection using live webcam input.",
    status: "completed",
    technologies: ["JavaScript", "MediaPipe", "HTML5 Canvas", "Computer Vision"],
    year: "2024",
    category: "web",
    githubUrl: "https://github.com/skluqmansajid/hand-gesture-shooter"
  }
];

export const skills: Skill[] = [
  // Programming
  { name: "Python", level: "Advanced", years: "3", projects: 12, percentage: 85, category: "programming" },
  { name: "Java", level: "Advanced", years: "3", projects: 6, percentage: 80, category: "programming" },
  { name: "C++", level: "Intermediate", years: "2", projects: 4, percentage: 70, category: "programming" },
  { name: "SQL", level: "Advanced", years: "3", projects: 10, percentage: 80, category: "programming" },

  // AI/ML
  { name: "Deep Learning", level: "Advanced", years: "2", projects: 8, percentage: 85, category: "ai" },
  { name: "Computer Vision", level: "Advanced", years: "2", projects: 6, percentage: 80, category: "ai" },
  { name: "NLP", level: "Intermediate", years: "2", projects: 4, percentage: 75, category: "ai" },
  { name: "TensorFlow", level: "Advanced", years: "2", projects: 6, percentage: 80, category: "ai" },
  { name: "Transformers", level: "Intermediate", years: "1", projects: 3, percentage: 70, category: "ai" },

  // Backend
  { name: "Flask", level: "Advanced", years: "2", projects: 5, percentage: 80, category: "backend" },
  { name: "Django", level: "Intermediate", years: "1", projects: 2, percentage: 65, category: "backend" },
  { name: "Node.js", level: "Intermediate", years: "1", projects: 3, percentage: 60, category: "backend" },

  // Frontend
  { name: "React", level: "Intermediate", years: "2", projects: 4, percentage: 70, category: "frontend" },
  { name: "JavaScript", level: "Intermediate", years: "2", projects: 5, percentage: 70, category: "frontend" },
  { name: "HTML/CSS", level: "Advanced", years: "3", projects: 8, percentage: 85, category: "frontend" },

  // Database
  { name: "MySQL", level: "Advanced", years: "3", projects: 8, percentage: 80, category: "database" },
  { name: "MongoDB", level: "Intermediate", years: "2", projects: 4, percentage: 70, category: "database" },
  { name: "PostgreSQL", level: "Intermediate", years: "1", projects: 2, percentage: 65, category: "database" },

  // Tools
  { name: "Git", level: "Advanced", years: "3", projects: 15, percentage: 85, category: "tools" },
  { name: "Docker", level: "Intermediate", years: "1", projects: 3, percentage: 60, category: "tools" },
  { name: "GCP", level: "Intermediate", years: "1", projects: 2, percentage: 55, category: "tools" },
  { name: "Streamlit", level: "Advanced", years: "2", projects: 5, percentage: 80, category: "tools" }
];

export const publications: Publication[] = [
  {
    title: "The HOME App: Real-Time Feedback Framework for School Meal Hygiene",
    journal: "International Journal of Advanced Multidisciplinary Research and Development"
  },
  {
    title: "LEAP: Traffic-Aware Routing in Encrypted SDN Environments",
    journal: "IEEE Conference Publication"
  },
  {
    title: "Multi-Label Ocular Disease Classification Using Deep Learning",
    journal: "Manuscript in preparation"
  }
];

export const achievements = [
  "Google Campus Ambassador - Promoted developer programs and technical learning initiatives",
  "Student Council (International Affairs) - Assisted in international academic collaborations",
  "Times of India Hackathon - Secured Top 5 position among 5,000+ participants"
];

export const languages = ["English", "Urdu", "Hindi", "Japanese", "Telugu"];

export const backgrounds = [
  { id: 'bg1', type: 'image', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', name: 'Mountain Sunrise' },
  { id: 'bg2', type: 'image', url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1920&q=80', name: 'Dark Mountains' },
  { id: 'bg3', type: 'image', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80', name: 'Starry Night' },
  { id: 'bg4', type: 'image', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', name: 'Earth from Space' },
  { id: 'bg5', type: 'image', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920&q=80', name: 'Neon City' },
  { id: 'bg6', type: 'image', url: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80', name: 'Northern Lights' },
];
