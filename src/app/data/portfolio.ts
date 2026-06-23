export const OWNER = {
  name: "Bridleen P",
  initials: "BP",
  titles: ["Full Stack Developer", "MERN Stack Developer", "Flutter Developer", "Software Engineer"],
  email: "perricpp@gmail.com",
  location: "Coimbatore, Tamil Nadu, India",
  github: "https://github.com/Bridleen08",
  linkedin: "https://www.linkedin.com/in/bridleen-p-a6ab68304",
  resume: "/Bridleen.resume.pdf",
  description: "I build scalable web applications, mobile applications, and modern software solutions through clean code, problem-solving, and continuous learning.",
  about: [
    "I am an Electronics and Communication Engineering student passionate about Full Stack Development, Mobile App Development, Cloud Technologies, and Software Engineering.",
    "My experience spans across MERN Stack Development, Django Development, Flutter Development, REST API Integration, Database Management, and modern frontend technologies.",
    "I enjoy building real-world applications, solving complex problems, and continuously learning emerging technologies.",
  ],
};

export const SKILLS = {
  "Programming Languages": ["C", "C++", "Java", "Python", "JavaScript"],
  "Frontend": ["HTML5", "CSS3", "React.js", "Tailwind CSS"],
  "Backend": ["Node.js", "Express.js", "Django", "REST APIs"],
  "Mobile": ["Flutter", "Dart"],
  "Database": ["MySQL", "MongoDB", "SQLite"],
  "Core CS": ["DSA", "OOP", "DBMS", "OS", "Computer Networks"],
  "Tools": ["Git", "GitHub", "VS Code", "Android Studio", "Postman"],
  "Cloud": ["FireBase","AWS (Learning)"],
};

export const PROJECTS = [
  // --- 2 MOBILE PROJECTS ---
  {
    title: "Campus Project Collaboration Hub",
    type: "mobile",
    tech: ["Flutter", "Firebase", "Provider"],
    features: ["Project Discovery", "Real-time Collaboration", "User Authentication", "State Management", "Server Synchronization"],
    color: "from-indigo-600 to-purple-700",
    icon: "📱",
  },
  {
    title: "Expense Tracker Mobile App",
    type: "web",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Charts.js"],
    features: ["Expense Tracking", "Budget Monitoring", "Monthly Analytics", "Local Storage", "CRUD Functionality"],
    color: "from-blue-600 to-indigo-700",
    icon: "💰",
  },

  // --- BEST 4 CORE ENGINEERING & WEB PROJECTS ---
  {
    title: "Advanced Online Auction System",
    type: "web",
    tech: ["Django", "MySQL", "HTML", "CSS", "JavaScript"],
    features: ["Authentication", "Live Auction Bidding", "Product Listings", "Admin Dashboard", "Bid History", "Auto Auction Closing"],
    color: "from-violet-600 to-purple-700",
    icon: "🔨",
  },
  {
    title: "Student Emotional Well-being Analytics",
    type: "web",
    tech: ["Django", "Python", "Analytics"],
    features: ["Emotional Analysis", "Burnout Detection", "Student Insights", "Parent Dashboard", "Teacher Reports"],
    color: "from-pink-600 to-rose-700",
    icon: "📊",
  },
  {
    title: "Tourist Guide App",
    type: "mobile", // 
    tech: ["Flutter", "Firebase", "REST APIs", "Geolocation"],
    features: ["Tourism Discovery", "Location Recommendations", "Maps Integration", "Travel Information", "Foundational Database UI"],
    color: "from-amber-600 to-orange-700",
    icon: "🗺️",
  },
  {
    title: "Cultural Fest Management System",
    type: "web",
    tech: ["Django", "Python", "MySQL"],
    features: ["Event Registration", "Team Management", "Participant Tracking", "Schedule Management"],
    color: "from-cyan-600 to-teal-700",
    icon: "🎭",
  },
];

export const EXPERIENCE = [
  {
    role: "MERN Stack Development Intern",
    type: "Internship",
    points: [
      "Built responsive web applications using MongoDB, Express, React, Node.js",
      "Worked on frontend and backend integration",
      "Developed and consumed REST APIs",
      "Collaborated on full-stack projects following industry practices",
    ],
    color: "from-violet-500 to-purple-600",
  },
  {
    role: "Mobile App Development Intern",
    type: "Internship",
    points: [
      "Developed cross-platform Flutter applications",
      "Implemented responsive UI/UX features",
      "Integrated REST APIs and local SQLite storage",
      "Optimized app performance and user experience",
    ],
    color: "from-blue-500 to-cyan-600",
  },
];

export const CERTIFICATIONS = [
  { title: "MERN Stack Development", issuer: "Internship Certification", color: "from-violet-500 to-purple-600" },
  { title: "Flutter Development", issuer: "Internship Certification", color: "from-blue-500 to-cyan-600" },
  { title: "Python Programming", issuer: "Online Platform", color: "from-yellow-500 to-amber-600" },
  { title: "Web Development", issuer: "Online Platform", color: "from-green-500 to-emerald-600" },
  { title: "AWS Cloud Fundamentals", issuer: "Amazon Web Services", color: "from-orange-500 to-red-600" },
  { title: "Data Structures & Algorithms", issuer: "Online Platform", color: "from-pink-500 to-rose-600" },
];

export const ACHIEVEMENTS = [
  { icon: "🚀", text: "Built multiple full-stack web applications from concept to deployment" },
  { icon: "📱", text: "Developed cross-platform mobile applications using Flutter" },
  { icon: "💡", text: "Solved numerous Data Structures and Algorithms problems" },
  { icon: "🤝", text: "Participated in collaborative software development projects" },
  { icon: "☁️", text: "Continuous learner in cloud and modern development technologies" },
];

export const TECH_STACK = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Express", icon: "⚡", color: "#ffffff" },
  { name: "Django", icon: "🎯", color: "#092E20" },
  { name: "Flutter", icon: "💙", color: "#02569B" },
  { name: "MongoDB", icon: "🍃", color: "#47A248" },
  { name: "MySQL", icon: "🐬", color: "#4479A1" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "Git", icon: "🔀", color: "#F05032" },
  { name: "GitHub", icon: "🐙", color: "#ffffff" },
];

export const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Certifications", id: "certifications" },
  { label: "Achievements", id: "achievements" },
  { label: "GitHub", id: "github" },
  { label: "Contact", id: "contact" },
];