export const personalInfo = {
  name: "Arjun C.",
  avatar: "/arjun-cutout.png",
  photo: "/arjun-photo.png",
  role: "Creative Software & Full-Stack Developer",
  specialization: "Software & Full-Stack Development",
  education: "B.Tech – Computer Technology",
  location: "Tamil Nadu, India",
  email: "arjun06c@gmail.com",
  github: "https://github.com/arjun06c",
  linkedin: "https://www.linkedin.com/in/arjun-c06/",
  leetcode: "https://leetcode.com/u/arjun06c/",
  geeksforgeeks: "https://auth.geeksforgeeks.org/user/arjun06c/",
  hackerrank: "https://www.hackerrank.com/arjun06c",
  headline: "Building Modern Web Experiences & Scalable Full-Stack Applications.",
  shortIntro: "I'm a passionate Full-Stack Developer specializing in building responsive, user-friendly web applications. I enjoy solving real-world problems through clean code, modern technologies, and creative engineering.",
  heroSubtext: "I build modern web applications, develop scalable software solutions, and solve real-world problems through clean code, efficient algorithms, and creative engineering."
};

export const codingProfiles = [
  {
    platform: "LeetCode",
    username: "arjun06c",
    url: "https://leetcode.com/u/arjun06c/",
    icon: "SiLeetcode"
  },
  {
    platform: "GitHub",
    username: "arjun06c",
    url: "https://github.com/arjun06c",
    icon: "SiGithub"
  },
  {
    platform: "GeeksForGeeks",
    username: "arjun06c",
    url: "https://auth.geeksforgeeks.org/user/arjun06c/",
    icon: "SiGeeksforgeeks"
  },
  {
    platform: "HackerRank",
    username: "arjun06c",
    url: "https://www.hackerrank.com/arjun06c",
    icon: "SiHackerrank"
  }
];

export const technicalAchievements = [
  {
    id: 1,
    title: "Guidewire DEVTrails Hackathon",
    badge: "NATIONAL HACKATHON",
    year: "2026",
    iconType: "trophy",
    description: "Competed in the national-level insurtech hackathon organized in collaboration with EY and the National Insurance Academy (NIA), proposing automated digital claims processing workflows.",
    actionText: "PARTICIPATED →",
    verificationUrl: null
  },
  {
    id: 2,
    title: "EY Techathon 6.0",
    badge: "NATIONAL CHALLENGE",
    year: "2026",
    iconType: "code",
    description: "Selected for Round 1 Executive Summary submission conducted by Ernst & Young (EY). Represented Bannari Amman Institute of Technology with an innovative enterprise technology solution.",
    actionText: "PARTICIPATED →",
    verificationUrl: null
  },
  {
    id: 3,
    title: "InnovateX 4.0",
    badge: "COLLEGE EVENT",
    year: "2024",
    iconType: "lightbulb",
    description: "Advanced to Round 3 ('AI in Action') at Presidency University, engineering automated algorithmic prototypes with intelligent data processing workflows.",
    actionText: "PARTICIPATED →",
    verificationUrl: null
  },
  {
    id: 4,
    title: "HackSpark Codeathon",
    badge: "COLLEGE EVENT",
    year: "2026",
    iconType: "trophy",
    description: "Participated in timed competitive programming challenges, solving core algorithmic and data structure problems with optimized time and space complexity.",
    actionText: "PARTICIPATED →",
    verificationUrl: null
  },
  {
    id: 5,
    title: "TN-IMPACT 2026",
    badge: "INDUSTRIAL HACKATHON",
    year: "2026",
    iconType: "trophy",
    description: "Competed in the TN-IMPACT 2026 Industrial Hackathon, addressing real-world industrial optimization challenges through rapid full-stack software prototyping.",
    actionText: "PARTICIPATED →",
    verificationUrl: null
  },
  {
    id: 6,
    title: "TurboHAQ 2026",
    badge: "INDUSTRY HACKATHON",
    year: "2026",
    iconType: "trophy",
    description: "Actively participated in TurboHAQ'26 powered by TurboticAB Sweden and QIBR Technologies, collaborating on AI-driven process automation and workflow solutions.",
    actionText: "PARTICIPATED →",
    verificationUrl: null
  }
];

export const skillsData = {
  Frontend: [
    { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
    { name: "React.js", icon: "SiReact", color: "#61DAFB" },
    { name: "HTML5", icon: "SiHtml5", color: "#E34F26" },
    { name: "CSS3", icon: "SiCss3", color: "#1572B6" },
    { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" }
  ],
  Backend: [
    { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
    { name: "Express.js", icon: "SiExpress", color: "#FFFFFF" }
  ],
  Language: [
    { name: "Java", icon: "FaJava", color: "#ED8B00" },
    { name: "C", icon: "SiC", color: "#A8B9CC" },
    { name: "C++", icon: "SiCplusplus", color: "#00599C" }
  ],
  Database: [
    { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
    { name: "SQL", icon: "SiMysql", color: "#4479A1" }
  ],
  Tools: [
    { name: "Git", icon: "SiGit", color: "#F05032" },
    { name: "GitHub", icon: "SiGithub", color: "#FFFFFF" },
    { name: "VS Code", icon: "SiVisualstudiocode", color: "#007ACC" },
    { name: "Postman", icon: "SiPostman", color: "#FF6C37" },
    { name: "Figma", icon: "SiFigma", color: "#F24E1E" }
  ]
};

export const projectsData = [
  {
    id: 1,
    title: "WheelGo – Bike Rental Platform",
    subtitle: "Peer-to-Peer Rental Web Application",
    description: "A comprehensive peer-to-peer bike rental web application that connects bike owners with commuters and tourists. Enables owners to monetize unused vehicles and renters to book verified rides instantly with transparent pricing and real-time availability.",
    problem: "Urban commuters and tourists often face high rental rates and fragmented booking systems, while bike owners lack a secure platform to monetize idle bikes safely.",
    solution: "Engineered a full-stack MERN application featuring JWT authentication, automated reservation workflows, geo-filtering, and an administrative oversight dashboard.",
    contribution: "Architected end-to-end database schemas in MongoDB, created RESTful endpoints in Express.js/Node.js, and built the responsive client in React.js with Tailwind CSS.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "User Authentication & Role-based Authorization",
      "Bike Fleet Listing & Inventory Management",
      "Instant Booking & Availability Verification",
      "Admin Analytics & Reservation Tracking",
      "Responsive Mobile-First Dashboard"
    ],
    github: "https://github.com/arjun06c/wheelgo-bike-rental",
    liveDemo: null,
    badge: "MERN Stack",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Faculty Workload Optimization",
    subtitle: "Academic Management & Scheduling System",
    description: "An automated academic management system engineered to streamline university faculty workload distribution, subject assignments, and departmental scheduling without conflicting constraints.",
    problem: "Manual scheduling and course allocation in academic departments lead to uneven workload distribution, subject mismatch, and scheduling conflicts.",
    solution: "Developed an optimization platform that algorithms balance teaching credits, laboratory hours, and faculty subject specializations transparently.",
    contribution: "Implemented the course-allocation logic, created CRUD API routes for departmental records, designed relational data models, and constructed the administrative control panel.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Automated Workload Allocation Algorithm",
      "Faculty Skill & Specialization Mapping",
      "Departmental Timetable Conflict Detection",
      "Interactive Academic Admin Dashboard",
      "Exportable Workload & Audit Reports"
    ],
    github: "https://github.com/arjun06c/faculty-workload-optimization",
    liveDemo: null,
    badge: "Full-Stack Web App",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Tamil Nadu WelfarePath",
    subtitle: "Citizen Welfare Scheme & Eligibility Portal",
    description: "A public-interest social welfare portal designed to help citizens rapidly discover state government schemes, check personalized eligibility criteria, and access application guides with bilingual clarity.",
    problem: "Citizens frequently miss out on government welfare subsidies and scholarship entitlements due to dispersed information and complex eligibility jargon.",
    solution: "Designed a centralized portal with dynamic eligibility assessment, structured benefit categories, step-by-step checklists, and clear documentation guides.",
    contribution: "Engineered client-side dynamic filtering, organized scheme data structures in MongoDB, and delivered an intuitive, accessible bilingual UI.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Social Welfare Scheme Directory & Search",
      "Real-Time Citizen Eligibility Assessment",
      "Structured Documentation & Application Guides",
      "Category Filtering (Students, Farmers, Healthcare)",
      "Department Administrative CMS Portal"
    ],
    github: "https://github.com/arjun06c/tn-welfarepath",
    liveDemo: null,
    badge: "Social Impact Portal",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  }
];

export const servicesData = [
  {
    id: 1,
    title: "Frontend Engineering",
    iconType: "code",
    color: "#FFD600",
    description: "Crafting modern, accessible, and high-performance web applications using React.js, JavaScript (ES6+), and Tailwind CSS with fluid Framer Motion micro-interactions.",
    highlights: ["React.js Architecture", "Tailwind CSS & Responsive Layouts", "Fluid Framer Motion Animations", "Component Reusability & Web Vitals"]
  },
  {
    id: 2,
    title: "Backend Development",
    iconType: "server",
    color: "#FFD600",
    description: "Architecting reliable server-side systems and RESTful APIs with Node.js, Express.js, MongoDB, and SQL. Implementing secure JWT auth, validation, and database schemas.",
    highlights: ["RESTful API Architecture", "MongoDB & SQL Schema Design", "JWT Authentication & Role-Based Access", "Secure Validation & Error Handling"]
  },
  {
    id: 3,
    title: "Full-Stack Web Engineering",
    iconType: "layers",
    color: "#FFD600",
    description: "Delivering complete end-to-end software solutions by merging responsive frontends with robust backend architectures, clean code principles, and Git version control.",
    highlights: ["End-to-End MERN Applications", "Database Modeling & Optimization", "Clean Code & Data Structures", "Production Deployment & Maintenance"]
  }
];
